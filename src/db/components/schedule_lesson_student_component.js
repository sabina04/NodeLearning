var express = require('express');
var models = require('../models');
var conf = require('../../../config');
module.exports = {
    upcomingLessons : function(data, msg, error) {
        return models.ScheduleLessonStudent.findAll({
            //raw : true,
            where : {
                user_id : data.user_id,
                '$ScheduleLesson.date$' : {[conf.op.gte] : data.date},
            },
            include : [{
                model : models.ScheduleLesson,
                as : 'ScheduleLesson',
                required: true
            }],
            
        });
    },
  
};

