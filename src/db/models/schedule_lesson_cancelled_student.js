'use strict';
const config = require('../../../config');
var sequelize    = require('../../db/connect');
module.exports = (sequelize, DataTypes) => {
  var ScheduleLessonCancelledStudent = sequelize.define('ScheduleLessonCancelledStudent',
    {
      schedule_lesson_student_id : { 
        type: DataTypes.INTEGER, primaryKey: true
      },
      user_id: {
        type: DataTypes.INTEGER,
      },
    },
    {
      tableName: 'schedule_lesson_cancelled_student',
      updatedAt: 'modified',
      createdAt: 'created',
      timestamps: true
  },
  );


  ScheduleLessonCancelledStudent.getCancelledLessonsDetail = function(student_contract_id){
    var query = `SELECT sum(used_promotion_quantity) as promotion_cancel_unit, sum(used_compensation_quantity) as compensation_cancel_unit, sum(used_feedback_quantity) as feedback_cancel_unit, sum(used_regular_quantity) as regular_cancel_unit FROM schedule_lesson_cancelled_students AS ScheduleLessonCancelledStudent LEFT JOIN schedule_lessons AS ScheduleLesson ON (ScheduleLessonCancelledStudent.schedule_lesson_id = ScheduleLesson.schedule_lesson_id)  WHERE student_contract_id = `+student_contract_id+` AND cancel_type = 'toujitsu_cancel'    LIMIT 1 `;
    var selectType = { type: sequelize.QueryTypes.SELECT};
    return sequelize.query(query,selectType);
  }
return ScheduleLessonCancelledStudent;

};

