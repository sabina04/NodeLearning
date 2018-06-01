var db = {
    host: 'schoolmaster.cwab2veqfsbh.ap-northeast-1.rds.amazonaws.com',
    port: 3306,
    user: 'schoolmaster',
    password: 'schoolmaster',
    database: 'smc_2018_05_04'

};

var mail = {
    from: 'Demo',
    host: 'smtp.gmail.com',
    port: 25,
    auth: {
        user: '',
        pass: ''
    }
};

module.exports.db = db;
module.exports.mail = mail;
