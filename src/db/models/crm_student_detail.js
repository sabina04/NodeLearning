'use strict';
module.exports = (sequelize, DataTypes) => {
  var CrmStudentDetail = sequelize.define('crm_student_detail',
    {
      crm_student_details_id : { 
        type: DataTypes.INTEGER, primaryKey: true
      },
      user_id: {
        type: DataTypes.INTEGER,
      },
      photo: {
        type: DataTypes.STRING,
      },
     
    },
    {
      tableName: 'crm_student_details',
      updatedAt: 'modified',
      createdAt: 'created',
      timestamps: true
  },
  );

  // CrmStudentDetail.associate = function(models){
  //   CrmStudentDetail.belongsTo(models.prospect, { as:'CrmProspect',foreignKey: 'user_id'} );
  // }

return CrmStudentDetail;

};

