var sequelize    = require('../../db/connect');
module.exports = {
    listLessonNotesForUser : function(user_id, limit, res){
        return sequelize.query(`
            select ScheduleLessonStudent.schedule_lesson_id, ScheduleLesson.date, ScheduleLesson.course_id, ScheduleLesson.schedule_slot_id, 
EmployeeBasicDetail.first_name as teacher_first_name, EmployeeBasicDetail.last_name as teacher_last_name, ScheduleSlot.lesson_start_time, ScheduleSlot.lesson_end_time,
CrmProspect.first_name as student_first_name, CrmProspect.last_name as student_last_name, Course.name as course_name, Course.specialization_id, Textbook.name as textbook,
Case 
When LessonStudentRatingNote.student_user_id = `+user_id+`
Then LessonStudentRatingNote.rating
Else 0
End as rating

from schedule_lesson_students as ScheduleLessonStudent

JOIN schedule_lessons as ScheduleLesson on ScheduleLessonStudent.schedule_lesson_id = ScheduleLesson.schedule_lesson_id
JOIN schedule_lesson_teachers as ScheduleLessonTeacher on ScheduleLessonStudent.schedule_lesson_id = ScheduleLessonTeacher.schedule_lesson_id
JOIN employee_basic_details as EmployeeBasicDetail on ScheduleLessonTeacher.user_id = EmployeeBasicDetail.user_id
JOIN schedule_slots as ScheduleSlot on ScheduleLesson.schedule_slot_id = ScheduleSlot.schedule_slot_id
JOIN crm_prospects as CrmProspect on ScheduleLessonStudent.user_id = CrmProspect.user_id
JOIN courses as Course on ScheduleLesson.course_id = Course.course_id
LEFT JOIN lesson_student_rating_notes as LessonStudentRatingNote on ScheduleLessonStudent.schedule_lesson_id = LessonStudentRatingNote.schedule_lesson_id
JOIN textbooks as Textbook on ScheduleLesson.textbook_id = Textbook.textbook_id

where ScheduleLessonStudent.user_id = `+user_id+` AND ScheduleLesson.lesson_finalized = 'yes'
ORDER BY ScheduleLesson.date DESC  LIMIT `+limit+` ;
            `, { type: sequelize.QueryTypes.SELECT});
    },

    detailLessonNotes : function(schedule_lesson_id, res){
        var scheduleLessonStudentQuery = `
            select ScheduleLessonStudent.schedule_lesson_id, ScheduleLesson.date, ScheduleLesson.course_id, ScheduleLesson.schedule_slot_id, 
EmployeeBasicDetail.first_name as teacher_first_name, EmployeeBasicDetail.last_name as teacher_last_name, ScheduleSlot.lesson_start_time, ScheduleSlot.lesson_end_time,
CrmProspect.first_name as student_first_name, CrmProspect.last_name as student_last_name, Course.name as course_name, Course.specialization_id, Textbook.name as textbook,
ScheduleLesson.lesson_recording_file,
Case 
When LessonStudentRatingNote.student_user_id = `+schedule_lesson_id+`
Then LessonStudentRatingNote.rating
Else 0
End as rating

from schedule_lesson_students as ScheduleLessonStudent

JOIN schedule_lessons as ScheduleLesson on ScheduleLessonStudent.schedule_lesson_id = ScheduleLesson.schedule_lesson_id
JOIN schedule_lesson_teachers as ScheduleLessonTeacher on ScheduleLessonStudent.schedule_lesson_id = ScheduleLessonTeacher.schedule_lesson_id
JOIN employee_basic_details as EmployeeBasicDetail on ScheduleLessonTeacher.user_id = EmployeeBasicDetail.user_id
JOIN schedule_slots as ScheduleSlot on ScheduleLesson.schedule_slot_id = ScheduleSlot.schedule_slot_id
JOIN crm_prospects as CrmProspect on ScheduleLessonStudent.user_id = CrmProspect.user_id
JOIN courses as Course on ScheduleLesson.course_id = Course.course_id
LEFT JOIN lesson_student_rating_notes as LessonStudentRatingNote on ScheduleLessonStudent.schedule_lesson_id = LessonStudentRatingNote.schedule_lesson_id
JOIN textbooks as Textbook on ScheduleLesson.textbook_id = Textbook.textbook_id

where ScheduleLessonStudent.schedule_lesson_id = `+schedule_lesson_id+` ;`

            var selectType = { type: sequelize.QueryTypes.SELECT};
            return sequelize.query(scheduleLessonStudentQuery, selectType);
    },

    getLessonNotes : function(schedule_lesson_id){
        var lessonNotesQuery = 'SELECT lesson_notes, vocabulary, grammar, expression, mic_count, last_updated FROM lesson_notes WHERE schedule_lesson_id = '+schedule_lesson_id+';';
        var selectType = { type: sequelize.QueryTypes.SELECT};
        return sequelize.query(lessonNotesQuery,selectType);
    },

    getVocabulary : function(schedule_lesson_id){
        var vocabularyQuery = `select word, defination from schedule_lesson_vocabularies where schedule_lesson_id = `+schedule_lesson_id;
        var selectType = { type: sequelize.QueryTypes.SELECT};
        return sequelize.query(vocabularyQuery,selectType);
    }
};