'use strict';
module.exports = (sequelize, DataTypes) => {
  var CrmProspectAddress = sequelize.define('CrmProspectAddress',
    {
      id : { 
        type: DataTypes.INTEGER, primaryKey: true
      },
      user_id : {
        type : DataTypes.INTEGER,
      },
      home_post_code : {
        type : DataTypes.INTEGER,
      },
      previous_home_post_code : {
        type : DataTypes.STRING,
      },
      home_prefecture_id : {
        type : DataTypes.INTEGER,
      },
      previous_home_prefecture_id : {
        type : DataTypes.STRING,
      },
      home_city_id : {
        type : DataTypes.INTEGER,
      },
      previous_home_city_id : {
        type : DataTypes.STRING,
      },
      home_address_line_one : {
        type : DataTypes.STRING,
      },
      previous_home_address_line_one : {
        type : DataTypes.STRING,
      },
      home_address_line_two : {
        type : DataTypes.STRING,
      },
      previous_home_address_line_two : {
        type : DataTypes.STRING,
      },
    },
    {
      tableName: 'crm_prospect_addresses',
      updatedAt: 'modified',
      createdAt: 'created',
      timestamps: true
    },
  );
  // CrmProspectAddress.associate = function(models){
  //   CrmProspectAddress.belongsTo(models.crm_prospect, { as:'CrmProspect',foreignKey: 'user_id'});
  // }
 
return CrmProspectAddress;

};

