'use strict';
var conf = require('../../../config');
module.exports = (sequelize, DataTypes) => {
  var CrmProspect = sequelize.define('crm_prospect',
    {
      first_name: {
        type: DataTypes.STRING,
      },
      last_name: {
        type: DataTypes.STRING,
      },
      id : { 
        type: DataTypes.INTEGER, primaryKey: true
      },
      gender: {
        type: DataTypes.STRING,
      },
      first_name_jp: {
        type: DataTypes.STRING,
      },
      last_name_jp: {
        type: DataTypes.STRING,
      },
      email_one : {
        type : DataTypes.STRING,
          validate : {
          isEmail: {
                msg: "Email address must be valid"
          },
        }
      },
      email_two : {
        type : DataTypes.STRING,
          validate : {
            isEmail: {
                  msg: "Email address must be valid"
            },    
          }
      },
      confirm_email : {
        type : DataTypes.STRING,
          validate : {
            isEmail: {
                  msg: "Email address must be valid"
            },    
          }
      }, 
      job_details : {
        type : DataTypes.STRING
      },
      hobbies : {
        type : DataTypes.STRING
      },
      dream_goals : {
        type : DataTypes.STRING
      },
      website : {
        type : DataTypes.STRING
      },
      language : {
        type : DataTypes.STRING
      },
      jp_teacher : {
        type : DataTypes.STRING
      },
      lesson_reminder_email : {
        type : DataTypes.STRING
      },
      occupation : {
        type : DataTypes.STRING
      },
      mobile_number : {
        type : DataTypes.STRING
      },
      phone_number : {
        type : DataTypes.STRING
      },
      previous_email_one_updated : {
        type : DataTypes.DATEONLY
      },
      previous_email_one : {
        type : DataTypes.STRING
      },
      previous_email_two : {
        type : DataTypes.STRING
      },
      previous_email_two_updated : {
        type : DataTypes.DATEONLY
      },
      previous_confirm_email_updated : {
        type : DataTypes.STRING
      },
      previous_confirm_email : {
        type : DataTypes.DATEONLY
      },
    },
    {
      tableName: 'crm_prospects',
      updatedAt: 'modified',
      createdAt: 'created',
      timestamps: true,

     
  },
  );
  CrmProspect.associate = function(models){
    CrmProspect.belongsTo(models.user, { as:'User',foreignKey: 'user_id'});
  },
  CrmProspect.getUserByEmail = function(email) { //console.log(email);
      return this.findOne({
        where : {
          [conf.op.or] : [
            {
              email_one : email
            },
            {
              email_two : email
            },
            {
              confirm_email : email
            }
          ]
        }
      })
     }
return CrmProspect;

};

