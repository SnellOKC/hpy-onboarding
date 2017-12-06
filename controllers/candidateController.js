var moment = require('moment');
var Candidate = require('../models/candidate');
var async = require('async');
// var PythonShell = require('python-shell');

// PythonShell.run('my_script.py', { scriptPath: '/Users/matthew.snell/express-locallibrary-tutorial/controllers' }, function(err){
//     if(err) throw err;
//     console.log('finished');
// });

exports.index = function(req, res) {

    async.parallel({
        candidate_count: function(callback) {
            Candidate.count(callback);
        },
    }, function(err, results) {
        res.render('index', { title: 'Onboarding', error: err, data: results });
    });
};

// Display list of all Candidate
exports.candidate_list = function(req, res, next) {

  Candidate.find({archived:false})
    .sort([['name', 'ascending']])
    .exec(function (err, list_candidates) {
      if (err) { return next(err); }
      //Successful, so render
        res.render('candidate_list', { title: 'Candidates In Process', list_candidates:  list_candidates});
    });

};

// Display list of all Candidate
exports.candidate_archive = function(req, res, next) {

  Candidate.find({archived:true})
    .sort([['name', 'ascending']])
    .exec(function (err, list_candidates) {
      if (err) { return next(err); }
      //Successful, so render
        res.render('candidate_archive', { title: 'Archived Candidates', list_candidates:  list_candidates});
    });

};

// Display detail page for a specific Candidate
exports.candidate_detail = function(req, res, next) {

    async.parallel({
        candidate: function(callback) {

            Candidate.req.params._id
              .exec(callback);
        },

    }, function(err, results) {
        if (err) { 
            return next(err); 
        }
        //Successful, so render

        res.render('candidate_detail', { title: 'Candidate Detail', candidate: results.candidate } );
    });

};

// Display Candidate create form on GET
exports.candidate_create_get = function(req, res, next) {
    res.render('candidate_form', { title: 'Create Candidate'});
};

// Handle Candidate create on POST
exports.candidate_create_post = function(req, res, next) {

    //Check that the name field is not empty
    req.checkBody('name', 'Candidate name required').notEmpty();
    req.checkBody('tentative_hire_date', 'Invalid date').optional({ checkFalsy: true }).isDate();
    req.checkBody('wd_offer_date', 'Invalid date').optional({ checkFalsy: true }).isDate();
    req.checkBody('actual_hire_date', 'Invalid date').optional({ checkFalsy: true }).isDate();

    //Trim and escape the name field.
    req.sanitize('name').escape();
    req.sanitize('cand_title').escape();
    req.sanitize('name').trim();
    req.sanitize('cand_title').trim();
    req.sanitize('cand_empid').trim();
    req.sanitize('manager_name').escape();
    req.sanitize('manager_name').trim();
    req.sanitize('manager_empid').trim();
    req.sanitize('manager_title').escape();
    req.sanitize('manager_title').trim();

    req.sanitize('cand_region').trim();
    req.sanitize('cand_region').escape();

    req.sanitize('cand_region').trim();
    req.sanitize('cand_division').escape();

    req.sanitize('tentative_hire_date').toDate();
    req.sanitize('wd_offer_date').toDate();
    req.sanitize('actual_hire_date').toDate();


    //Run the validators
    var errors = req.validationErrors();

    req.body.signed_offer_letter = (req.body.signed_offer_letter == undefined || req.body.signed_offer_letter == false || req.body.signed_offer_letter == "false" ) ? false : true;
    req.body.archived = (req.body.archived == undefined || req.body.archived == false || req.body.archived == "false") ? false : true;
    req.body.wd_offer_sent = (req.body.wd_offer_sent == undefined || req.body.wd_offer_sent == false || req.body.wd_offer_sent == "false") ? false : true;
    req.body.background_ordered = (req.body.background_ordered == undefined || req.body.background_ordered == false || req.body.background_ordered == "false") ? false : true;
    req.body.signed_sales_agreement = (req.body.signed_sales_agreement == undefined || req.body.signed_sales_agreement == false || req.body.signed_sales_agreement == "false") ? false : true;
    req.body.signed_background_auth = (req.body.signed_background_auth == undefined || req.body.signed_background_auth == false || req.body.signed_background_auth == "false") ? false: true;
    req.body.add_workphone_email_prehire = (req.body.add_workphone_email_prehire == undefined || req.body.add_workphone_email_prehire == false || req.body.add_workphone_email_prehire == "false") ? false: true;
    req.body.approve_background = (req.body.approve_background == undefined || req.body.approve_background == false || req.body.approve_background == "false") ? false: true;
    req.body.rdy_for_hire = (req.body.rdy_for_hire == undefined || req.body.rdy_for_hire == false || req.body.rdy_for_hire == "false") ? false: true;
    req.body.enter_hire_date = (req.body.enter_hire_date == undefined || req.body.enter_hire_date == false || req.body.enter_hire_date == "false") ? false: true;
    req.body.job_prof_change = (req.body.job_prof_change == undefined || req.body.job_prof_change == false || req.body.job_prof_change == "false") ? false: true;
    req.body.update_salary = (req.body.update_salary == undefined || req.body.update_salary == false || req.body.update_salary == "false") ? false: true;
    req.body.update_company = (req.body.update_company == undefined || req.body.update_company == false || req.body.update_company == "false") ? false: true;
    req.body.update_cost_center = (req.body.update_cost_center == undefined || req.body.update_cost_center == false || req.body.update_cost_center == "false") ? false: true;
    req.body.update_home_dept = (req.body.update_home_dept == undefined || req.body.update_home_dept == false || req.body.update_home_dept == "false") ? false: true;
    req.body.update_division = (req.body.update_division == undefined || req.body.update_division == false || req.body.update_division == "false") ? false: true;
    req.body.update_region = (req.body.update_region == undefined || req.body.update_region == false || req.body.update_region == "false") ? false: true;
    req.body.confirm_ssn = (req.body.confirm_ssn == undefined || req.body.confirm_ssn == false || req.body.confirm_ssn == "false") ? false: true;
    req.body.ipad_carrier = (req.body.ipad_carrier == undefined || req.body.ipad_carrier == false || req.body.ipad_carrier == "false") ? false: true;
    req.body.new_hire_announcement = (req.body.new_hire_announcement == undefined || req.body.new_hire_announcement == false || req.body.new_hire_announcement == "false") ? false: true;
    req.body.send_welcome_email = (req.body.send_welcome_email == undefined || req.body.send_welcome_email == false || req.body.send_welcome_email == "false") ? false: true;
    req.body.update_sgm = (req.body.update_sgm == undefined || req.body.update_sgm == false || req.body.update_sgm == "false") ? false: true;
    req.body.id_received = (req.body.id_received == undefined || req.body.id_received == false || req.body.id_received == "false") ? false: true;
    req.body.onboarding_email_sent = (req.body.onboarding_email_sent == undefined || req.body.onboarding_email_sent == false || req.body.onboarding_email_sent == "false") ? false: true;
    req.body.auto_ins_received = (req.body.auto_ins_received == undefined || req.body.auto_ins_received == false || req.body.auto_ins_received == "false") ? false: true;
    req.body.update_info_prehire_record = (req.body.update_info_prehire_record == undefined || req.body.update_info_prehire_record == false || req.body.update_info_prehire_record == "false") ? false: true;
    req.body.update_info_candidate_record = (req.body.update_info_candidate_record == undefined || req.body.update_info_candidate_record == false || req.body.update_info_candidate_record == "false") ? false: true;
    req.body.verify_personal_info_entered = (req.body.verify_personal_info_entered == undefined || req.body.verify_personal_info_entered == false || req.body.verify_personal_info_entered == "false") ? false: true;
    req.body.background_cleared = (req.body.background_cleared == undefined || req.body.background_cleared == false || req.body.background_cleared == "false") ? false: true;
    req.body.complete_inine = (req.body.complete_inine == undefined || req.body.complete_inine == false || req.body.complete_inine == "false") ? false: true;
    req.body.assign_mgr_sgm = (req.body.assign_mgr_sgm == undefined || req.body.assign_mgr_sgm == false || req.body.assign_mgr_sgm == "false") ? false: true;

    req.body.order_bus_card = (req.body.order_bus_card == undefined || req.body.order_bus_card == false || req.body.order_bus_card == "false") ? false: true;
    req.body.update_tax_info = (req.body.update_tax_info == undefined || req.body.update_tax_info == false || req.body.update_tax_info == "false") ? false: true;
    req.body.change_job_title = (req.body.change_job_title == undefined || req.body.change_job_title == false || req.body.change_job_title == "false") ? false: true;
    req.body.update_direct_deposit = (req.body.update_direct_deposit == undefined || req.body.update_direct_deposit == false || req.body.update_direct_deposit == "false") ? false: true;
    req.body.probationary_dates = (req.body.probationary_dates == undefined || req.body.probationary_dates == false || req.body.probationary_dates == "false") ? false: true;
    req.body.update_ovation_title = (req.body.update_ovation_title == undefined || req.body.update_ovation_title == false || req.body.update_ovation_title == "false") ? false: true;
    req.body.order_ipad = (req.body.order_ipad == undefined || req.body.order_ipad == false || req.body.order_ipad == "false") ? false: true;
    req.body.terminate = (req.body.terminate == undefined || req.body.terminate == false || req.body.terminate == "false") ? false: true;
    req.body.term_ticket_it = (req.body.term_ticket_it == undefined || req.body.term_ticket_it == false || req.body.term_ticket_it == "false") ? false: true;
    req.body.term_payroll = (req.body.term_payroll == undefined || req.body.term_payroll == false || req.body.term_payroll == "false") ? false: true;
    req.body.reset_payroll = (req.body.reset_payroll == undefined || req.body.reset_payroll == false || req.body.reset_payroll == "false") ? false: true;
    req.body.term_announcement = (req.body.term_announcement == undefined || req.body.term_announcement == false || req.body.term_announcement == "false") ? false: true;
    req.body.term_letter_sent = (req.body.term_letter_sent == undefined || req.body.term_letter_sent == false || req.body.term_letter_sent == "false") ? false: true;
    
    var candidate = new Candidate(
      { 
        name: req.body.name,
        cand_empid: req.body.cand_empid,
        cand_title: req.body.cand_title,
        manager_name: req.body.manager_name,
        manager_title: req.body.manager_title,
        manager_empid: req.body.manager_empid,
        signed_offer_letter: req.body.signed_offer_letter,
        date_modified: moment(Date()).format('lll'),
        archived: req.body.archived,
        cand_region: req.body.cand_region,
        cand_division: req.body.cand_division,
        tentative_hire_date: req.body.tentative_hire_date,
        actual_hire_date: req.body.actual_hire_date,
        wd_offer_date: req.body.wd_offer_date,
        wd_offer_sent: req.body.wd_offer_sent,
        background_ordered: req.body.background_ordered,
        signed_sales_agreement: req.body.signed_sales_agreement,
        signed_background_auth: req.body.signed_background_auth,
        add_workphone_email_prehire: req.body.add_workphone_email_prehire,
        approve_background: req.body.approve_background,
        rdy_for_hire: req.body.rdy_for_hire,
        enter_hire_date: req.body.enter_hire_date,
        job_prof_change: req.body.job_prof_change,
        update_salary: req.body.update_salary,
        update_company: req.body.update_company,
        update_cost_center: req.body.update_cost_center,
        update_home_dept: req.body.update_home_dept,
        update_division: req.body.update_division,
        update_region: req.body.update_region,
        confirm_ssn: req.body.confirm_ssn,
        ipad_carrier: req.body.ipad_carrier,
        new_hire_announcement: req.body.new_hire_announcement,
        send_welcome_email: req.body.send_welcome_email,
        update_sgm: req.body.update_sgm,
        id_received: req.body.id_received,
        onboarding_email_sent: req.body.onboarding_email_sent,
        auto_ins_received: req.body.auto_ins_received,
        verify_personal_info_entered: req.body.verify_personal_info_entered,
        update_info_candidate_record: req.body.update_info_candidate_record,
        update_info_prehire_record: req.body.update_info_prehire_record,
        background_cleared: req.body.background_cleared,
        complete_inine: req.body.complete_inine,
        assign_mgr_sgm: req.body.assign_mgr_sgm,
        order_bus_card: req.body.order_bus_card,
        update_tax_info: req.body.update_tax_info,
        change_job_title: req.bod.change_job_title,
        update_direct_deposit: req.body.update_direct_deposit,
        probationary_dates: req.body.probationary_dates,
        update_ovation_title: req.body.update_ovation_title,
        order_ipad: req.body.order_ipad,
        terminate: req.body.terminate,
        term_ticket_it: req.body.term_ticket_it,
        term_payroll: req.body.term_payroll,
        reset_payroll: req.body.reset_payroll,
        term_announcement: req.body.term_announcement,
        term_letter_sent: req.body.term_letter_sent
      });

    if (errors) {
        //If there are errors render the form again, passing the previously entered values and errors
        res.render('candidate_form', { title: 'Add', candidate: candidate, errors: errors});
        return;
    }
    else {
      candidate.save(function (err) {
        if (err) { return next(err); }
          //Candidate saved. Redirect to candidate detail page
          res.redirect('/catalog/candidates');
         });
    }

};

// Display Candidate delete form on GET
exports.candidate_delete_get = function(req, res, next) {

    async.parallel({
        candidate: function(callback) {
            Candidate.findById(req.params.id).exec(callback);
        },
    }, function(err, results) {
        if (err) { return next(err); }
        //Successful, so render
        res.render('candidate_delete', { title: 'Delete Candidate', candidate: results.candidate } );
    });

};

// Handle Candidate delete on POST
exports.candidate_delete_post = function(req, res, next) {

    req.checkBody('id', 'Candidate id must exist').notEmpty();

            //Candidate has no books. Delete object and redirect to the list of candidates.
            Candidate.findByIdAndRemove(req.body.id, function deleteGenre(err) {
                if (err) { return next(err); }
                //Success - got to candidates list
                res.redirect('/catalog/candidates');
            });

        };

// Display Candidate update form on GET
exports.candidate_update_get = function(req, res, next) {

    req.sanitize('id').escape();
    req.sanitize('id').trim();
    Candidate.findById(req.params.id, function(err, candidate) {
        if (err) { return next(err); }
        //On success
        res.render('candidate_form', { title: 'Update Candidate', candidate: candidate });
    });

};

// Handle Candidate update on POST
exports.candidate_update_post = function(req, res, next) {

    req.sanitize('id').escape();
    req.sanitize('id').trim();
    //Check that the name field is not empty
    req.checkBody('name', 'Candidate name required').notEmpty();
    req.checkBody('tentative_hire_date', 'Invalid date').optional({ checkFalsy: true }).isDate();
    req.checkBody('wd_offer_date', 'Invalid date').optional({ checkFalsy: true }).isDate();
    req.checkBody('actual_hire_date', 'Invalid date').optional({ checkFalsy: true }).isDate();

    //Trim and escape the name field.
    req.sanitize('name').escape();
    req.sanitize('cand_title').escape();
    req.sanitize('name').trim();
    req.sanitize('cand_title').trim();
    req.sanitize('cand_empid').trim();
    req.sanitize('manager_name').escape();
    req.sanitize('manager_name').trim();
    req.sanitize('manager_empid').trim();
    req.sanitize('manager_title').escape();
    req.sanitize('manager_title').trim();

    req.sanitize('cand_region').trim();
    req.sanitize('cand_region').escape();

    req.sanitize('cand_region').trim();
    req.sanitize('cand_division').escape();

    req.sanitize('tentative_hire_date').toDate();
    req.sanitize('wd_offer_date').toDate();
    req.sanitize('actual_hire_date').toDate();

    req.body.signed_offer_letter = (req.body.signed_offer_letter == undefined || req.body.signed_offer_letter == false || req.body.signed_offer_letter == "false" ) ? false : true;
    req.body.archived = (req.body.archived == undefined || req.body.archived == false || req.body.archived == "false") ? false : true;
    req.body.wd_offer_sent = (req.body.wd_offer_date == undefined || req.body.wd_offer_date == false || req.body.wd_offer_date == "false") ? false : true;
    req.body.background_ordered = (req.body.background_ordered == undefined || req.body.background_ordered == false || req.body.background_ordered == "false") ? false : true;
    req.body.signed_sales_agreement = (req.body.signed_sales_agreement == undefined || req.body.signed_sales_agreement == false || req.body.signed_sales_agreement == "false") ? false : true;
    req.body.signed_background_auth = (req.body.signed_background_auth == undefined || req.body.signed_background_auth == false || req.body.signed_background_auth == "false") ? false: true;
    req.body.add_workphone_email_prehire = (req.body.add_workphone_email_prehire == undefined || req.body.add_workphone_email_prehire == false || req.body.add_workphone_email_prehire == "false") ? false: true;
    req.body.approve_background = (req.body.approve_background == undefined || req.body.approve_background == false || req.body.approve_background == "false") ? false: true;
    req.body.rdy_for_hire = (req.body.rdy_for_hire == undefined || req.body.rdy_for_hire == false || req.body.rdy_for_hire == "false") ? false: true;
    req.body.enter_hire_date = (req.body.enter_hire_date == undefined || req.body.enter_hire_date == false || req.body.enter_hire_date == "false") ? false: true;
    req.body.job_prof_change = (req.body.job_prof_change == undefined || req.body.job_prof_change == false || req.body.job_prof_change == "false") ? false: true;
    req.body.update_salary = (req.body.update_salary == undefined || req.body.update_salary == false || req.body.update_salary == "false") ? false: true;
    req.body.update_company = (req.body.update_company == undefined || req.body.update_company == false || req.body.update_company == "false") ? false: true;
    req.body.update_cost_center = (req.body.update_cost_center == undefined || req.body.update_cost_center == false || req.body.update_cost_center == "false") ? false: true;
    req.body.update_home_dept = (req.body.update_home_dept == undefined || req.body.update_home_dept == false || req.body.update_home_dept == "false") ? false: true;
    req.body.update_division = (req.body.update_division == undefined || req.body.update_division == false || req.body.update_division == "false") ? false: true;
    req.body.update_region = (req.body.update_region == undefined || req.body.update_region == false || req.body.update_region == "false") ? false: true;
    req.body.confirm_ssn = (req.body.confirm_ssn == undefined || req.body.confirm_ssn == false || req.body.confirm_ssn == "false") ? false: true;
    req.body.ipad_carrier = (req.body.ipad_carrier == undefined || req.body.ipad_carrier == false || req.body.ipad_carrier == "false") ? false: true;
    req.body.new_hire_announcement = (req.body.new_hire_announcement == undefined || req.body.new_hire_announcement == false || req.body.new_hire_announcement == "false") ? false: true;
    req.body.send_welcome_email = (req.body.send_welcome_email == undefined || req.body.send_welcome_email == false || req.body.send_welcome_email == "false") ? false: true;
    req.body.update_sgm = (req.body.update_sgm == undefined || req.body.update_sgm == false || req.body.update_sgm == "false") ? false: true;
    req.body.id_received = (req.body.id_received == undefined || req.body.id_received == false || req.body.id_received == "false") ? false: true;
    req.body.onboarding_email_sent = (req.body.onboarding_email_sent == undefined || req.body.onboarding_email_sent == false || req.body.onboarding_email_sent == "false") ? false: true;
    req.body.auto_ins_received = (req.body.auto_ins_received == undefined || req.body.auto_ins_received == false || req.body.auto_ins_received == "false") ? false: true;
    req.body.update_info_prehire_record = (req.body.update_info_prehire_record == undefined || req.body.update_info_prehire_record == false || req.body.update_info_prehire_record == "false") ? false: true;
    req.body.update_info_candidate_record = (req.body.update_info_candidate_record == undefined || req.body.update_info_candidate_record == false || req.body.update_info_candidate_record == "false") ? false: true;
    req.body.verify_personal_info_entered = (req.body.verify_personal_info_entered == undefined || req.body.verify_personal_info_entered == false || req.body.verify_personal_info_entered == "false") ? false: true;
    req.body.background_cleared = (req.body.background_cleared == undefined || req.body.background_cleared == false || req.body.background_cleared == "false") ? false: true;
    req.body.complete_inine = (req.body.complete_inine == undefined || req.body.complete_inine == false || req.body.complete_inine == "false") ? false: true;
    req.body.assign_mgr_sgm = (req.body.assign_mgr_sgm == undefined || req.body.assign_mgr_sgm == false || req.body.assign_mgr_sgm == "false") ? false: true;
    req.body.order_bus_card = (req.body.order_bus_card == undefined || req.body.order_bus_card == false || req.body.order_bus_card == "false") ? false: true;
    req.body.update_tax_info = (req.body.update_tax_info == undefined || req.body.update_tax_info == false || req.body.update_tax_info == "false") ? false: true;
    req.body.change_job_title = (req.body.change_job_title == undefined || req.body.change_job_title == false || req.body.change_job_title == "false") ? false: true;
    req.body.update_direct_deposit = (req.body.update_direct_deposit == undefined || req.body.update_direct_deposit == false || req.body.update_direct_deposit == "false") ? false: true;
    req.body.probationary_dates = (req.body.probationary_dates == undefined || req.body.probationary_dates == false || req.body.probationary_dates == "false") ? false: true;
    req.body.update_ovation_title = (req.body.update_ovation_title == undefined || req.body.update_ovation_title == false || req.body.update_ovation_title == "false") ? false: true;
    req.body.order_ipad = (req.body.order_ipad == undefined || req.body.order_ipad == false || req.body.order_ipad == "false") ? false: true;
    req.body.terminate = (req.body.terminate == undefined || req.body.terminate == false || req.body.terminate == "false") ? false: true;
    req.body.term_ticket_it = (req.body.term_ticket_it == undefined || req.body.term_ticket_it == false || req.body.term_ticket_it == "false") ? false: true;
    req.body.term_payroll = (req.body.term_payroll == undefined || req.body.term_payroll == false || req.body.term_payroll == "false") ? false: true;
    req.body.reset_payroll = (req.body.reset_payroll == undefined || req.body.reset_payroll == false || req.body.reset_payroll == "false") ? false: true;
    req.body.term_announcement = (req.body.term_announcement == undefined || req.body.term_announcement == false || req.body.term_announcement == "false") ? false: true;
    req.body.term_letter_sent = (req.body.term_letter_sent == undefined || req.body.term_letter_sent == false || req.body.term_letter_sent == "false") ? false: true;
    

    //Run the validators
    var errors = req.validationErrors();

    //Create a candidate object with escaped and trimmed data (and the old id!)
    var candidate = new Candidate(
      {
      name: req.body.name,
      cand_empid: req.body.cand_empid,
      cand_title: req.body.cand_title,
      manager_name: req.body.manager_name,
      manager_title: req.body.manager_title,
      manager_empid: req.body.manager_empid,
      signed_offer_letter: req.body.signed_offer_letter,
      date_created: req.body.date_created,
      date_modified: moment(Date()).format('lll'),
      _id: req.params.id,
      archived: req.body.archived,
      cand_region: req.body.cand_region,
      cand_division: req.body.cand_division,
      tentative_hire_date: req.body.tentative_hire_date,
      actual_hire_date: req.body.actual_hire_date,
      wd_offer_date: req.body.wd_offer_date,
      wd_offer_sent: req.body.wd_offer_sent,
      background_ordered: req.body.background_ordered,
      signed_sales_agreement: req.body.signed_sales_agreement,
      signed_background_auth: req.body.signed_background_auth,
      add_workphone_email_prehire: req.body.add_workphone_email_prehire,
      approve_background: req.body.approve_background,
      rdy_for_hire: req.body.rdy_for_hire,
      enter_hire_date: req.body.enter_hire_date,
      job_prof_change: req.body.job_prof_change,
      update_salary: req.body.update_salary,
      update_company: req.body.update_company,
      update_cost_center: req.body.update_cost_center,
      update_home_dept: req.body.update_home_dept,
      update_division: req.body.update_division,
      update_region: req.body.update_region,
      confirm_ssn: req.body.confirm_ssn,
      ipad_carrier: req.body.ipad_carrier,
      new_hire_announcement: req.body.new_hire_announcement,
      send_welcome_email: req.body.send_welcome_email,
      update_sgm: req.body.update_sgm,
      id_received: req.body.id_received,
      onboarding_email_sent: req.body.onboarding_email_sent,
      auto_ins_received: req.body.auto_ins_received,
      verify_personal_info_entered: req.body.verify_personal_info_entered,
      update_info_candidate_record: req.body.update_info_candidate_record,
      update_info_prehire_record: req.body.update_info_prehire_record,
      background_cleared: req.body.background_cleared,
      complete_inine: req.body.complete_inine,
      assign_mgr_sgm: req.body.assign_mgr_sgm,
      order_bus_card: req.body.order_bus_card,
      update_tax_info: req.body.update_tax_info,
      change_job_title: req.body.change_job_title,
      update_direct_deposit: req.body.update_direct_deposit,
      probationary_dates: req.body.probationary_dates,
      update_ovation_title: req.body.update_ovation_title,
      order_ipad: req.body.order_ipad,
      terminate: req.body.terminate,
      term_ticket_it: req.body.term_ticket_it,
      term_payroll: req.body.term_payroll,
      reset_payroll: req.body.reset_payroll,
      term_announcement: req.body.term_announcement,
      term_letter_sent: req.body.term_letter_sent
      }
    );

    if (errors) {
        //If there are errors render the form again, passing the previously entered values and errors
        res.render('candidate_form', { title: 'Update Candidate', candidate: candidate, errors: errors});
        return;
    }
    else {
        // Data from form is valid. Update the record.
        Candidate.findByIdAndUpdate(req.params.id, candidate, {}, function (err,thecandidate) {
            if (err) { return next(err); }
               //successful - redirect to candidate detail page.
               res.redirect('/catalog/candidates');
            });
    }

};
