var mongoose = require('mongoose');
var moment = require('moment'); //for date handling

var Schema = mongoose.Schema;

var OnboardingSchema = Schema(
	{
		cand_name: {type: String, required: true}//,
		// cand_title: {type: String, enum:['RM', 'TM', 'SPA', 'Payroll TM', 'Cross-Sell RM', 'E-Commerce Specialist', 'DM', 'Payroll DM', 'National Accounts Director']},
		// cand_gpid: {type: String},
		// cand_empid: {type: String},
		// manager_name: {type: String},
		// manager_title: {type: String, enum:['DM','Payroll DM','VP']},
		// cand_region: {type: String, enum:['Evergreen','Great Lakes','Mid Atlantic','Mid Central','Midwest','New York','North Central','Northeast','South Atlantic','South Central','South Pacific','Southeast','Southwest','Inside Sales','Major Accounts']},
		// cand_division: {type: String},
		// tentative_hire_date: {type: Date},
		// wd_offer_sent: {type: Boolean},
		// wd_offer_date: {type: Date},
		// signed_offer_letter: {type: Boolean},
		// signed_sales_agreement: {type: Boolean},
		// ssn: {type: String}, //Mask this?
		// address1: {type: String},
		// address2: {type: String},
		// city: {type: String},
		// state: {type: String, max: 2},
		// dob: {type: Date},
		// driver_license: {type: String}, //Mask this?
		// background_ordered: {type: Boolean},
		// id_received: {type: Boolean},
		// onboarding_email_sent: {type: Boolean},
		// auto_ins_received: {type: Boolean},
		// actual_hire_date: {type: Date},
		// add_workphone_email_prehire: {type: Boolean},
		// approve_background: {type: Boolean},
		// rdy_for_hire: {type: Boolean},
		// enter_hire_date: {type: Boolean},
		// reason: {type: String, enum:['New Hire','Rehire']},
		// job_prof_change: {type: Boolean},
		// update_salary: {type: Boolean},
		// update_company: {type: Boolean},
		// background_cleared: {type: String, enum:['Yes','No']},
		// update_cost_center: {type: Boolean},
		// update_division: {type: Boolean},
		// update_home_dept: {type: Boolean},
		// update_region: {type: Boolean},
		// confirm_ssn: {type: Boolean},
		// ipad_carrier: {type: Boolean},
		// new_hire_announcement: {type: Boolean},
		// update_sgm: {type: Boolean},
		// assign_mgr_sgm: {type: Boolean},
		// send_welcome_email: {type: Boolean},
		// complete_inine: {type: Boolean},
		// passed_js: {type: String, enum:['Yes','No']},
		// js_completed_date: {type: Date},
		// order_bus_card: {type: Boolean},
		// update_tax_info: {type: Boolean},
		// change_job_title: {type: Boolean},
		// update_direct_deposit: {type: Boolean},
		// probationary_dates: {type: Boolean},
		// update_ovation_title: {type: Boolean},
		// terminate: {type: Boolean},
		// term_ticket_it: {type: Boolean},
		// term_payroll: {type: Boolean},
		// reset_payroll: {type: Boolean},
		// term_announcement: {type: Boolean},
		// term_letter_sent: {type: Boolean}
		}
	);

OnboardingSchema
.virtual('url')
.get(function () {
	return '/catalog/candidate/' + this._id
});

module.exports = mongoose.model('Candidate', OnboardingSchema);