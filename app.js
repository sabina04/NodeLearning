
// const { isDev } = require('./src/globals/methods');
const { port, apiPrefix, mobApiPrefix } = require('./config');
const config = require('./config');

const express = require('express'),
cors = require('cors'),
models = require('./src/db/models'),
  app = express(),
  mailer = require('express-mailer');
  app.use(cors());
  bodyParser = require('body-parser'),
  // expCtrl = require('express-controllers-routes'),
  expCtrl = require('./src/utilities/routes-generator'),
  restResponse = require('express-rest-response'),
  session = require('express-session');
  var jwt = require('jsonwebtoken');
  var token = require('./src/auth/token');

app.use(require('cors')());
app.set('views', __dirname + '/src/view');
app.set('view engine', 'ejs');
//express-rest-response middleware configuration  
app.use(restResponse({
  showStatusCode: true,
  showDefaultMessage: true
}));

mailer.extend(app, {
  from: 'bhawanasoni@gmail.com',
  host: 'smtp.gmail.com', // hostname 
  secureConnection: true, // use SSL 
  port: 465, // port for secure SMTP 
  transportMethod: 'SMTP', // default is SMTP. Accepts anything that nodemailer accepts 
  auth: {
    user: 'sabina.khan@a3logics.in',
    pass: 'Sabina@a3logics'
  }
});


//using express-session middleware
app.use(session({
  cookie: {
    httpOnly: config.expressSessionHttpOnly,
    path: '/',
    maxAge: (7 * 24 * 60 * 60 * 1000), //expires 7 days
    secure: config.expressSessionSecure,
  },
  resave: false,
  saveUninitialized: true,
  secret: '98safhsaf98safklnf'
}));



//using body-parser middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));




//use cors for Access-Control-Allow-Origin' issue
// if (isDev) {
// app.use(require('cors')());
// }

//check auth and roles using middleware
// app.use(require('./src/auth/checkPermissions'));

//defining and using routers
const router = express.Router();
expCtrl.bind(router, __dirname + '/src/controllers/', apiPrefix); // For Api Routing
// expCtrl.bind(router, __dirname + '/src/mob-apis/', mobApiPrefix); // For Mobile Api Routing
// Added JWT Token
const authAllow = ['/api/v1/users/login','/api/v1/users/forgotPassword','/api/v1/users/recoveryAccountDetail','/api/v1/users/test'];

router.use(function (req, res, next) {
  var tokenData = req.get('token');
  var check = token.verifyToken(tokenData);
  if(typeof check === 'undefined' && authAllow.indexOf(req.url) < 0){
    res.rest.unauthorized('You are not authorized to perform this action.');
  } else {
    // check for login state
    if(authAllow.indexOf(req.url) < 0){
      user_id = check.data.user_id;
      console.log(check);
      models.user.count({
        where: {
            user_id:user_id,
            login_state : '1'
        }
      }).then(function(count){
        if(count == 0){
          res.rest.unauthorized('You are not authorized to perform this action.');
        } else {
          next();
        }
      });
    } else {
      next()
    }
    
  }
  
})


//Function To upload File
var multer = require('multer');
var path = require('path');
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
      callback(null, config.webrootPath);
  },
  filename: (req, file, callback) => {
      callback(null, file.originalname.replace(".png", "") + "_" + Date.now() + path.extname(file.originalname));
  }
});
var upload = multer({storage:storage}).single('file_name');
router.post('/studentProfile/uploadStudentImage', upload, function (req, res, next) {
  console.log(req.file);
  if (!(req.file)){
    res.send('Failed To upload the file');
  } else {
    if(path.extname(req.file.originalname) != ".png") {
      res.send("Only png files are allowed to save")
    } else {
     // console.log(req.file.filename);
      models.crm_student_detail.findOne({
          where: {user_id : req.body.user_id}
      }).then(function(studentData){
              studentData.updateAttributes({
                  photo : req.file.filename
        });
      });
      res.send('File has been uplaoded successfully');
    }
  }
});

app.use(router);


//capture all 404 urls
app.use(function (req, res, next) {
  // respond with json
  if (req.accepts('json')) {
    res.rest.notFound();
    return;
  }
  // default to plain-text. send()
  res.type('txt').send('Not found');
});

//connecting database
const connect = require('./src/db/connect');
// require('./src/db/connect')();

app.listen(port, () => {
  console.log('Express App listening on port:', port);
});
