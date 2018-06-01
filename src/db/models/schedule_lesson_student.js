'use strict';
const config = require('../../../config');
var sequelize    = require('../../db/connect');
module.exports = (sequelize, DataTypes) => {
  var ScheduleLessonStudent = sequelize.define('ScheduleLessonStudent',
    {
      schedule_lesson_student_id : { 
        type: DataTypes.INTEGER, primaryKey: true
      },
      user_id: {
        type: DataTypes.INTEGER,
      },
    },
    {
      tableName: 'schedule_lesson_students',
      updatedAt: 'modified',
      createdAt: 'created',
      timestamps: true
  },
  );

  ScheduleLessonStudent.associate = function(models){
    ScheduleLessonStudent.belongsTo(models.ScheduleLesson, { as:'ScheduleLesson',foreignKey: 'schedule_lesson_id'} );
  }
  ,
  ScheduleLessonStudent.getLessonsDetail = function(student_contract_id){
    var date1 = config.momentDate();
    var date = date1.format('YYYY-MM-DD');
    var time = date1.format('HH:mm:s');
    
    var query = `SELECT sum(Case WHEN is_present="yes" THEN used_regular_quantity ELSE NULL END) as regular_attended, sum(Case WHEN is_present="no" THEN used_regular_quantity ELSE NULL END) as regular_absent, sum(Case WHEN is_present="yes" THEN used_compensation_quantity ELSE NULL END) as compensation_attended, sum(Case WHEN is_present="no" THEN used_compensation_quantity ELSE NULL END) as compensation_absent, sum(Case WHEN is_present="yes" THEN used_promotion_quantity ELSE NULL END) as promotion_attended, sum(Case WHEN is_present="no" THEN used_promotion_quantity ELSE NULL END) as promotion_absent, sum(Case WHEN is_present="yes" THEN used_feedback_quantity ELSE NULL END) as feedback_attended, sum(Case WHEN is_present="no" THEN used_feedback_quantity ELSE NULL END) as feedback_absent FROM schedule_lesson_students AS ScheduleLessonStudent INNER JOIN schedule_lessons AS ScheduleLesson ON (ScheduleLesson.schedule_lesson_id = ScheduleLessonStudent.schedule_lesson_id) INNER JOIN schedule_slots AS ScheduleSlot ON (ScheduleLesson.schedule_slot_id = ScheduleSlot.schedule_slot_id)  WHERE ScheduleLessonStudent.student_contract_id = '`+student_contract_id+`' AND ((ScheduleLesson.date < '`+date+`') OR (((ScheduleLesson.date = '`+date+`') AND (ScheduleSlot.lesson_end_time <= '`+time+`'))))    LIMIT 1`;
    var selectType = { type: sequelize.QueryTypes.SELECT};
    return sequelize.query(query,selectType);
  }
return ScheduleLessonStudent;

};

