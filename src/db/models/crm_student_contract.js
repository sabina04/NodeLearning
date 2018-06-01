'use strict';
module.exports = (sequelize, DataTypes) => {
  var CrmStudentContract = sequelize.define('CrmStudentContract',
    {
      student_contract_id : { 
        type: DataTypes.INTEGER, primaryKey: true
      },
      contract_uid : { 
        type: DataTypes.STRING
      },
      name : { 
        type: DataTypes.STRING
      },
      type : { 
        type: DataTypes.STRING
      },
      class_size : { 
        type: DataTypes.STRING
      },
      contract_id : { 
        type: DataTypes.INTEGER
      },
      user_id : { 
        type: DataTypes.INTEGER
      },
      renew_from_std_contract_id : { 
        type: DataTypes.INTEGER
      },
      units : { 
        type: DataTypes.INTEGER
      },
      quantity : { 
        type: DataTypes.INTEGER
      },
      initial_quantity : { 
        type: DataTypes.INTEGER
      },
      original_promotions : { 
        type: DataTypes.INTEGER
      },
      promotion_quantity : { 
        type: DataTypes.INTEGER
      },
      promotion_quantity_earlier : { 
        type: DataTypes.INTEGER
      },
      cost : { 
        type: DataTypes.INTEGER
      },
      duration : { 
        type: DataTypes.INTEGER
      },
      creted_date : { 
        type: DataTypes.DATE
      },
      start_date:{
        type: DataTypes.DATE
      },
      end_date:{
        type: DataTypes.DATE
      },
      end_date:{
        type: DataTypes.DATE
      },
      holiday_extension:{
        type: DataTypes.INTEGER
      },
      is_flex:{
        type: DataTypes.STRING
      },
      description:{
        type: DataTypes.STRING
      },
      discount_name:{
        type: DataTypes.STRING
      },
      discount_amount:{
        type: DataTypes.INTEGER
      },
      discount_reason:{
        type: DataTypes.STRING
      },
      enroll_name:{
        type: DataTypes.STRING
      },
      cur_discount:{
        type: DataTypes.STRING
      },
      cur_name:{
        type: DataTypes.INTEGER
      },
      remarks:{
        type: DataTypes.STRING
      },
      payment_remarks:{
        type: DataTypes.STRING
      },
      conversion_potential:{
        type: DataTypes.STRING
      },
      conversion_remarks:{
        type: DataTypes.STRING
      },
      installment_payment:{
        type: DataTypes.STRING
      },
      installment_notes:{
        type: DataTypes.STRING
      },
      enrollment_fee:{
        type: DataTypes.INTEGER
      },
      status:{
        type: DataTypes.STRING
      },
      operational_status:{
        type: DataTypes.STRING
      },
      usability_date:{
        type: DataTypes.DATE
      },
      compensation_quantity:{
        type: DataTypes.INTEGER
      },
      feedback_points : {
        type: DataTypes.INTEGER
      },
      used_expiry_business_rule : {
        type: DataTypes.INTEGER
      },
      css_mbs_transfer_month : {
        type: DataTypes.INTEGER
      },
      used_zero_point_business_rule : {
        type: DataTypes.INTEGER
      },
      handling_charges : {
        type: DataTypes.INTEGER
      },
      handling_note : {
        type: DataTypes.STRING
      },
      other_charges : {
        type: DataTypes.INTEGER
      },
      other_notes : {
        type: DataTypes.STRING
      },
      documents_collected : {
        type: DataTypes.INTEGER
      },
      commission_paid : {
        type: DataTypes.INTEGER
      },
      contract_creator_id : {
        type: DataTypes.INTEGER
      },
      contract_status : {
        type: DataTypes.STRING
      },
      admin_tuition : {
        type: DataTypes.INTEGER
      },
      discount_amount_admin : {
        type: DataTypes.INTEGER
      },
      discount_name_admin : {
        type: DataTypes.STRING
      },
      activation_month_lessons : {
        type: DataTypes.INTEGER
      },
      collection_status : {
        type: DataTypes.STRING
      },
      units_carried_over : {
        type: DataTypes.INTEGER
      },
      installment_fee : {
        type: DataTypes.INTEGER
      },
      lesson_cancellation_allowed : {
        type: DataTypes.INTEGER
      },
      lesson_cancellation_allowed : {
        type: DataTypes.INTEGER
      },
      consumption_rule : {
        type: DataTypes.INTEGER
      },
      type_of_sale : {
        type: DataTypes.STRING
      }
    },
    {
      tableName: 'crm_student_contracts',

      updatedAt: 'modified',
      createdAt: 'created',
      timestamps: true
  },
  );

return CrmStudentContract;

};

