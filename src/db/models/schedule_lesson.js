'use strict';
module.exports = (sequelize, DataTypes) => {
  var ScheduleLesson = sequelize.define('ScheduleLesson',
    {
      schedule_lesson_id : { 
        type: DataTypes.INTEGER, primaryKey: true
      },
      date: {
        type: DataTypes.DATEONLY,
      },
      
     
    },
    {
      tableName: 'schedule_lessons',
      updatedAt: 'modified',
      createdAt: 'created',
      timestamps: true
  },
  );

  // CrmStudentDetail.associate = function(models){
  //   CrmStudentDetail.belongsTo(models.prospect, { as:'CrmProspect',foreignKey: 'user_id'} );
  // }

return ScheduleLesson;

};

