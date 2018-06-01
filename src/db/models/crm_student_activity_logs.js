'use strict';
module.exports = (sequelize, DataTypes) => {
  var CrmStudentActivityLog = sequelize.define('CrmStudentActivityLog',
    {
      crm_student_activity_log_id : { 
        type: DataTypes.INTEGER, primaryKey: true
      },
      student_contract_id: {
        type: DataTypes.INTEGER,
      },
      user_id: {
        type: DataTypes.INTEGER,
      },
      activity_type: {
        type: DataTypes.STRING,
      },
      cancel_type: {
        type: DataTypes.STRING,
      },
      student_contract_name: {
        type: DataTypes.STRING,
      },
      activity_date: {
        type: DataTypes.DATE,
      },
      description: {
        type: DataTypes.STRING,
      },
      unit_transanction : {
          type : DataTypes.INTEGER,
      }
    },
    {
      tableName: 'crm_student_activity_logs',

      getPacedContractLessons : function(student_contract_id){
        return  this.sum('unit_transanction', { where: { student_contract_id:  student_contract_id} });
      }
  },
  
  );

return CrmStudentActivityLog;

};

