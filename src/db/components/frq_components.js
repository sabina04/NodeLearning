var models = require('../models');
var async = require('async');
const config = require('../../../config');
module.exports = {
    getFrq: function (std_id, cb) {
        const student_contract_id = std_id;
        const self = this;
        async.parallel({
            pacedContractDetail: function (callback) {
                self.getPacedContractLessons(student_contract_id, function (data1) {
                    callback(null, data1);
                });
            },
            studentContractDetail: function (callback) {
                self.getStudentContractDetail(student_contract_id, function(cd){
                    callback(null, cd);
                });
            },
            getLessonsDetail : function(callback){
                models.ScheduleLessonStudent.getLessonsDetail(student_contract_id).then(data=>{
                    callback(null, data)
                });
            },
            getCancelledLessonsDetail : function(callback){
                models.ScheduleLessonCancelledStudent.getCancelledLessonsDetail(student_contract_id).then(data=>{
                    callback(null, data)
                });
            }
        }, function (err, results) {
            if(results.getLessonsDetail[0].regular_attended == null) results.getLessonsDetail[0].regular_attended = 0;
            if(results.getLessonsDetail[0].regular_absent == null) results.getLessonsDetail[0].regular_absent = 0;
            if(results.getCancelledLessonsDetail[0].regular_cancel_unit == null) results.getCancelledLessonsDetail[0].regular_cancel_unit = 0;
            if(isNaN(results.pacedContractDetail)){
                results.pacedContractDetail = 0;
            }
            if(results.getLessonsDetail[0].compensation_attended == null) results.getLessonsDetail[0].compensation_attended = 0;
            if(results.getLessonsDetail[0].compensation_absent == null) results.getLessonsDetail[0].compensation_absent = 0;
            if(results.getCancelledLessonsDetail[0].compensation_cancel_unit == null) results.getCancelledLessonsDetail[0].compensation_cancel_unit = 0;
            if(results.getLessonsDetail[0].promotion_attended == null) results.getLessonsDetail[0].promotion_attended = 0;
            if(results.getLessonsDetail[0].promotion_absent == null) results.getLessonsDetail[0].promotion_absent = 0;
            if(results.getCancelledLessonsDetail[0].promotion_cancel_unit == null) results.getCancelledLessonsDetail[0].promotion_cancel_unit = 0;
            if(results.getLessonsDetail[0].feedback_attended == null) results.getLessonsDetail[0].feedback_attended = 0;
            if(results.getLessonsDetail[0].feedback_absent == null) results.getLessonsDetail[0].feedback_absent = 0;
            if(results.getCancelledLessonsDetail[0].feedback_cancel_unit == null) results.getCancelledLessonsDetail[0].feedback_cancel_unit = 0;

            var regular_recognized = parseInt(results.getLessonsDetail[0].regular_attended) + parseInt(results.getLessonsDetail[0].regular_absent) + parseInt(results.getCancelledLessonsDetail[0].regular_cancel_unit) + parseInt(results.pacedContractDetail);

            var compensation_recognized = parseInt(results.getLessonsDetail[0].compensation_attended) + parseInt(results.getLessonsDetail[0].compensation_absent) + parseInt(results.getCancelledLessonsDetail[0].compensation_cancel_unit);

            var promotion_recognized = parseInt(results.getLessonsDetail[0].promotion_attended) + parseInt(results.getLessonsDetail[0].promotion_absent) + parseInt(results.getCancelledLessonsDetail[0].promotion_cancel_unit);

            var feedback_recognized = parseInt(results.getLessonsDetail[0].feedback_attended) + parseInt(results.getLessonsDetail[0].feedback_absent) + parseInt(results.getCancelledLessonsDetail[0].feedback_cancel_unit);
            
            var current_recognized = regular_recognized + compensation_recognized + promotion_recognized + feedback_recognized;
            var regular_unrecognized = results.studentContractDetail[0].initial_quantity - regular_recognized;
            var compensation_unrecognized = results.studentContractDetail[0].compensation_quantity - compensation_recognized;
            var promotion_unrecognized = results.studentContractDetail[0].original_promotions - promotion_recognized;
            var recommended_unrecognized = regular_unrecognized + compensation_unrecognized + promotion_unrecognized;
            var unit_type = results.studentContractDetail[0].units;
            var activationDate = results.studentContractDetail[0].start_date;
            var endDate = results.studentContractDetail[0].end_date;
            var original_regular_units = results.studentContractDetail[0].initial_quantity;
            var usability_date = results.studentContractDetail[0].usability_date;
            
            var finalFrq = {};
            if(results.studentContractDetail[0].type == 'package'){
                // commitment frq
                commitmentFrq = self.calculateFRQ(original_regular_units, activationDate, endDate, unit_type);
                if(results.studentContractDetail[0].consumption_rule != '0'){
                    finalFrq.commitmentFrq = results.studentContractDetail[0].consumption_rule;
                } else {
                    if(commitmentFrq.diffMonths < 2 && commitmentFrq.diffDays < 31){
                        finalFrq.commitmentFrq = original_regular_units;
                    } else {
                        finalFrq.commitmentFrq = Math.ceil(commitmentFrq.frq);
                    }
                }

                // current frq & recommended frq
                var today = config.momentDate();
                var today = today.format('YYYY-MM-DD')
                if(today < activationDate || today > usability_date){
                    finalFrq.currentFrq = 'NA';
                    finalFrq.recommendedFrq = 'NA';
                } else {
                    // current
                    currentFrq = self.calculateFRQ(current_recognized, activationDate, today, unit_type);
                    if(currentFrq.diffMonths < 2 && currentFrq.diffDays < 31){
                        finalFrq.currentFrq = current_recognized;
                    } else {
                        if(currentFrq.frq > current_recognized){
                            finalFrq.currentFrq = current_recognized;
                        } else {
                            finalFrq.currentFrq = Math.round(currentFrq.frq * 10) / 10;
                        }
                    }

                    // recommended
                    recommendedFrq = self.calculateFRQ(recommended_unrecognized, today, usability_date, unit_type);
                    if(recommendedFrq.diffMonths < 2 && recommendedFrq.diffDays < 31){
                        finalFrq.recommendedFrq = recommended_unrecognized;
                    } else {
                        if(recommendedFrq.frq < finalFrq.commitmentFrq){
                            finalFrq.recommendedFrq = finalFrq.commitmentFrq;
                        } else {
                            finalFrq.recommendedFrq = Math.ceil(recommendedFrq.frq);
                        }
                    }
                }
                // color & symbol
                if(finalFrq.currentFrq >= (finalFrq.commitmentFrq * 1.5)){
                    finalFrq.currentFrqColor = '#0066b3';
                    finalFrq.symbol = 'High_FRQ';
                } else if(finalFrq.currentFrq >= finalFrq.commitmentFrq && finalFrq.currentFrq < (finalFrq.commitmentFrq * 1.5)){
                    finalFrq.currentFrqColor = '#407927';
                    finalFrq.symbol = 'Normal_FRQ';
                } else if(finalFrq.currentFrq < finalFrq.commitmentFrq && finalFrq.currentFrq >= (finalFrq.commitmentFrq * 0.5)){
                    finalFrq.currentFrqColor = '#d4711a';
                    finalFrq.symbol = 'Low_FRQ';
                } else if(finalFrq.currentFrq < (finalFrq.commitmentFrq * 0.5)){
                    finalFrq.currentFrqColor = '#ce181e';
                    finalFrq.symbol = 'Very_Low_FRQ';
                }
                //console.log(original_regular_units, activationDate, endDate);
                cb(finalFrq);
            } else {
                cb('NA for Monthly')
            }
            
        });
    },
    calculateFRQ : function(unitQuantity, startDate, endDate, unitType){
        if(unitType == 'points'){
            unitQuantity = unitQuantity / 20;
        }
        
        var startDate = config.momentDate(startDate,'YYYY-MM-DD');
        var endDate = config.momentDate(endDate,'YYYY-MM-DD');
        
        //endDate = md(startDate,'YYYY-MM-DD');

        diffMonths = endDate.diff(startDate, 'months', true);
        diffDays = endDate.diff(startDate, 'days', true) + 1;
        var monthlyAvg = diffDays / diffMonths;
        var frq = (unitQuantity / diffDays) * monthlyAvg;
        return {'frq':frq, 'diffMonths': diffMonths, 'diffDays':diffDays};
    },
    getPacedContractLessons: function (student_contract_id, cb) {
        return models.CrmStudentActivityLog.sum('unit_transacted',
            {
                where: {
                    student_contract_id : student_contract_id
                    ,activity_type : 'CPD'
                }
            }).then(data => {
                cb(data);
            });
    },
    getStudentContractDetail : function(student_contract_id, cb){
        return models.CrmStudentContract.findAll({
            where : {
                student_contract_id : student_contract_id
            },
            attributes : ['student_contract_id','initial_quantity','end_date','usability_date','start_date', 'compensation_quantity','original_promotions','units','consumption_rule','type']
            
        }).then(data=>{
            cb(data);
        });
    }
};