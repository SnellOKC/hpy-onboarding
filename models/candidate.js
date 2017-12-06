var mongoose = require('mongoose'); 
var moment = require('moment-timezone'); //for date handling

var Schema = mongoose.Schema;

var CandidateSchema = Schema(
	{
		//cand_id: {type: String, required: true},
		cand_id: {trype: String},
		name: {type: String, required: true},
		cand_title: {type: String},
		cand_gpid: {type: String},
		cand_empid: {type: String},
		manager_name: {type: String},
		manager_title: {type: String},
		manager_empid: {type: String},
		cand_region: {type: String},
		cand_division: {type: String},
		tentative_hire_date: {type: Date},
		wd_offer_sent: {type: Boolean},
		wd_offer_date: {type: Date},
		signed_offer_letter: {type: Boolean},
		signed_sales_agreement: {type: Boolean},
		signed_background_auth: {type: Boolean},
		update_info_prehire_record: {type: Boolean},
		update_info_candidate_record: {type: Boolean},
		verify_personal_info_entered: {type: Boolean},
		ssn: {type: Boolean},
		dob: {type: Date},
		driver_license: {type: Boolean},
		background_ordered: {type: Boolean},
		background_cleared: {type: Boolean},
		id_received: {type: Boolean},
		onboarding_email_sent: {type: Boolean},
		auto_ins_received: {type: Boolean},
		actual_hire_date: {type: Date},
		add_workphone_email_prehire: {type: Boolean},
		approve_background: {type: Boolean},
		rdy_for_hire: {type: Boolean},
		enter_hire_date: {type: Boolean},
		hire_type: {type: String, enum:['','New Hire','Rehire']},
		job_prof_change: {type: Boolean},
		update_salary: {type: Boolean},
		update_company: {type: Boolean},
		background_cleared: {type: Boolean},
		update_cost_center: {type: Boolean},
		update_division: {type: Boolean},
		update_home_dept: {type: Boolean},
		update_region: {type: Boolean},
		confirm_ssn: {type: Boolean},
		ipad_carrier: {type: Boolean},
		new_hire_announcement: {type: Boolean},
		update_sgm: {type: Boolean},
		assign_mgr_sgm: {type: Boolean},
		send_welcome_email: {type: Boolean},
		complete_inine: {type: Boolean},
		passed_js: {type: Boolean},
		js_completed_date: {type: Date},
		order_bus_card: {type: Boolean},
		update_tax_info: {type: Boolean},
		change_job_title: {type: Boolean},
		update_direct_deposit: {type: Boolean},
		probationary_dates: {type: Boolean},
		update_ovation_title: {type: Boolean},
		order_ipad: {type: Boolean},
		terminate: {type: Boolean},
		term_ticket_it: {type: Boolean},
		term_payroll: {type: Boolean},
		reset_payroll: {type: Boolean},
		term_announcement: {type: Boolean},
		term_letter_sent: {type: Boolean},
		date_modified: {type: String},
		archived: {type: Boolean},
		});

CandidateSchema
.virtual('url')
.get(function () {
	return '/catalog/candidate/' + this._id
});

CandidateSchema
.virtual('date_created')
.get(function() {
	var date_created_string='';
	if (this._id.getTimestamp()){
		date_created_string=moment(this._id.getTimestamp()).format('lll')
	}
	return date_created_string
});

CandidateSchema
.virtual('tentative_hire_date_yyyy_mm_dd')
.get(function() {
	return moment(this.tentative_hire_date).tz('GMT').format('YYYY-MM-DD');
});

CandidateSchema
.virtual('actual_hire_date_yyyy_mm_dd')
.get(function() {
	return moment(this.actual_hire_date).tz('GMT').format('YYYY-MM-DD');
});

CandidateSchema
.virtual('wd_offer_date_yyyy_mm_dd')
.get(function() {
	return moment(this.wd_offer_date).tz('GMT').format('YYYY-MM-DD');
});

CandidateSchema
.virtual('bucket')
.get(function(){
	var today = moment(new Date(), 'YYYY-MM-DD').tz('GMT');
	var offer_date_str = moment(this.wd_offer_date, 'YYYY-MM-DD').tz('GMT');
	return today.diff(offer_date_str, 'days') > 11 ? 'outstanding' : this.background_ordered == true ? 'ordered' : 'offer';
});

CandidateSchema
.virtual('days_since_offer')
.get(function(){
	var today = moment(new Date(), 'YYYY-MM-DD').tz('GMT');
	var offer_date_str = moment(this.wd_offer_date, 'YYYY-MM-DD').tz('GMT');
	return today.diff(offer_date_str, 'days') + ' days';
});

module.exports = mongoose.model('Candidate', CandidateSchema);


