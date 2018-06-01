'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('user',
    {
      username: {
        type: DataTypes.STRING,
        unique: true,
        validate: {
          len: {
              args: [6, 128],
              msg: "Email address must be between 6 and 128 characters in length"
          },
          // isEmail: {
          //     msg: "Email address must be valid"
          // }
        }
      },
      password: {
        type: DataTypes.STRING,
      },
      user_id: { 
        type: DataTypes.INTEGER, primaryKey: true
      },
      type:{
        type: DataTypes.STRING
      },
      language:{
        type: DataTypes.STRING
      },
      // api_token:{
      //   type: DataTypes.STRING
      // },
      verification_email:{
        type: DataTypes.STRING
      },
      email_token:{
        type: DataTypes.STRING
      },
      email_expire_time : {
        type: DataTypes.DATE
      },
      email_one_expire_time : {
        type: DataTypes.DATE
      },
      verif_login_email : {
        type : DataTypes.STRING
      },
      verif_login_token : {
        type : DataTypes.STRING
      },
      verification_username : {
        type : DataTypes.STRING
      },
      token : {
        type : DataTypes.STRING
      },
      verification_cell_email : {
        type : DataTypes.STRING
      },
      verification_cell_token : {
        type : DataTypes.STRING
      },
      previous_username_updated : {
        type : DataTypes.DATEONLY
      },
      previous_username : {
        type : DataTypes.STRING
      },
      login_state : {
        type : DataTypes.STRING
      }

    },
    {
      tableName: 'users',
      updatedAt: 'modified',
      createdAt: 'created',
      timestamps: true
  },  
  );

  User.associate = function(models){
    User.hasOne(models.crm_prospect, { as:'CrmProspect',foreignKey: 'user_id'} );
  }
  return User;
};