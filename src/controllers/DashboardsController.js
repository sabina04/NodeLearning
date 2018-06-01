var models = require('../db/models');
const express = require('express');
var commonComponent = require('../db/components/common_component');
var lessonNotes = require('../db/components/lesson_notes_component');
var frq = require('../db/components/frq_components');
var sequelize    = require('../db/connect');
const config = require('../../config');
var async = require('async');

module.exports = {
    name : 'dashboards',
    post : {
        // param : user_id of desired student, limit, token
        // By Prateek Jadhav for SV-19
        listRecentLessonNotes : function(req, res, next){
            user_id = req.body.user_id;
            if(!user_id){
                //res.rest.serverError('user_id is missing');
                res.rest.success({
                    'data':{},
                    'message':'User Id is missing',
                    'actionStatus':false
                });
            }
            limit = req.body.limit;
            if(!limit){
                //res.rest.serverError('limit is missing');
                res.rest.success({
                    'data':{},
                    'message':'Limit is missing',
                    'actionStatus':false
                });
            }
            lessonNotes.listLessonNotesForUser(user_id, limit).then(function(data){
               // res.rest.success(data);
               res.rest.success({
                'data':data,
                'message':'Data Found',
                'actionStatus':true
            });
            });
            
        },
        // Detail lesson notes SV-19 By Prateek
        // Params : schedule_lesson_id, user_id
        detailLessonNotes : function(req, res, next){
            schedule_lesson_id = req.body.schedule_lesson_id;
            if(!schedule_lesson_id){
                //res.rest.serverError('schedule_lesson_id is missing');
                res.rest.success({
                    'data':{},
                    'message':'Schedule Lesson Id is missing',
                    'actionStatus':false
                });
            }
            lessonNotes.detailLessonNotes(schedule_lesson_id).then(function(data){
                var dt = data[0];
                lessonNotes.getLessonNotes(schedule_lesson_id).then(function(ln){
                    dt.lessonNotes = ln;
                    lessonNotes.getVocabulary(schedule_lesson_id).then(function(vocab){
                        dt.vocabulary = vocab;
                        res.rest.success(dt);
                    });
                });
            });
        },
        test112 : function(req, res, next){
            var dt = [];
            schedule_lesson_id = req.body.schedule_lesson_id;
            if(!schedule_lesson_id){
                //res.rest.serverError('schedule_lesson_id is missing');
                res.rest.success({
                    'data':{},
                    'message':'Schedule Lesson Id is missing',
                    'actionStatus':false
                });
            }
            Promise.all([
                lessonNotes.detailLessonNotes(schedule_lesson_id),
                lessonNotes.getLessonNotes(schedule_lesson_id),
                lessonNotes.getVocabulary(schedule_lesson_id)]).then(function(vals){
                    res.rest.success({
                        'data':vals,
                        'message':'Data Found',
                        'actionStatus':true
                    });
                //res.rest.success(vals);
            });
        },
        // messageBoard
        // Prateek Jadhav for SV-20
        messageBoard : function(req, res, next){
            var school_id = req.body.school_id;
            if(!school_id){
                //res.rest.serverError('school_id is missing');
                res.rest.success({
                    'data':{},
                    'message':'School Id is missing',
                    'actionStatus':false
                });
            }
            var RelSchoolMessageQuery = 'SELECT * FROM rel_school_messages where school_id = '+school_id;
            var messageQuery = 'SELECT * FROM messages where messages_id = ';
            var selectType = { type: sequelize.QueryTypes.SELECT};
            sequelize.query(RelSchoolMessageQuery,selectType).then(RelSchoolMessage=>{
                var message_id = RelSchoolMessage[0]['message_id'];
                    sequelize.query(messageQuery+message_id,selectType).then(message=>{
                            //res.rest.success(message);  
                            res.rest.success({
                                'data':message,
                                'message':'Data Found',
                                'actionStatus':true
                            });
                    });
            });
        },


        // FRQ : SV-17 By Prateek Jadhav
        // Params : student_contract_id
        getFRQ : function(req, res, next){
            var student_contract_id = req.body.student_contract_id;    
            if(!student_contract_id){
                //res.rest.serverError('student_contract_id is missing');
                res.rest.success({
                    'data':{},
                    'message':'Student Contract Id is missing',
                    'actionStatus':false
                });
            }
            var frqDetail = frq.getFrq(student_contract_id, function(data){
                res.rest.success({
                    'data': data,
                    'message':'FRQ Detail',
                    'actionStatus':true
                });
            }); 
             
            
        },
        test : function(req, res, next){
            user_id = req.body.user_id;
            console.log(user_id);
            var obj = {};
            lessonNotes.listLessonNotesForUser(user_id, 1).then(function(dt1)
            {
                console.log('first',dt1);
                obj.one = dt1;
                return dt1;
            }).then(function(dt2){
                console.log('second',dt2);
                obj.two = dt2;
                return dt2;
            }).then(function(dt3){
                console.log('third',dt3);
                obj.three = dt3;
                res.rest.success(obj);
                return dt3;
            });
            //lessonNotes.getLessonNotes(schedule_lesson_id);
            //lessonNotes.getVocabulary(schedule_lesson_id);           
        }

    },
    get : {
        
    }
};