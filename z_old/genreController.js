var moment = require('moment');
var Genre = require('../models/candidate');
var Candidate = require('../models/candidate');
var Book = require('../models/book');
var async = require('async');

// Display list of all Candidate
exports.candidate_list = function(req, res, next) {

  Candidate.find({})
    .sort([['name', 'ascending']])
    .exec(function (err, list_candidates) {
      if (err) { return next(err); }
      //Successful, so render
      res.render('candidate_list', { title: 'Candidates', list_candidates:  list_candidates});
    });

};

// Display detail page for a specific Candidate
exports.candidate_detail = function(req, res, next) {

    async.parallel({
        candidate: function(callback) {

            Candidate.findById(req.params.id)
              .exec(callback);
        },

        candidate_books: function(callback) {
          Book.find({ 'candidate': req.params.id })
          .exec(callback);
        },

    }, function(err, results) {
        if (err) { return next(err); }
        //Successful, so render

        res.render('candidate_detail', { title: 'Candidate Detail', candidate: results.candidate, candidate_books: results.candidate_books } );
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

    //Trim and escape the name field.
    req.sanitize('name').escape();
    req.sanitize('cand_title').escape();
    req.sanitize('name').trim();
    req.sanitize('cand_title').trim();

    //Run the validators
    var errors = req.validationErrors();

    req.body.signed_offer_letter = (req.body.signed_offer_letter == undefined || req.body.signed_offer_letter == false) ? false : true;

    //Create a candidate object with escaped and trimmed data.
    var candidate = new Candidate(
      { 
        name: req.body.name,
        cand_title: req.body.cand_title,
        signed_offer_letter: req.body.signed_offer_letter,
        date_modified: moment(Date()).format('lll')
      });

    if (errors) {
        //If there are errors render the form again, passing the previously entered values and errors
        res.render('candidate_form', { title: 'Create Candidate', candidate: candidate, errors: errors});
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
        candidate_books: function(callback) {
            Book.find({ 'candidate': req.params.id }).exec(callback);
        },
    }, function(err, results) {
        if (err) { return next(err); }
        //Successful, so render
        res.render('candidate_delete', { title: 'Delete Candidate', candidate: results.candidate, candidate_books: results.candidate_books } );
    });

};

// Handle Candidate delete on POST
exports.candidate_delete_post = function(req, res, next) {

    req.checkBody('id', 'Candidate id must exist').notEmpty();

    async.parallel({
        candidate: function(callback) {
            Candidate.findById(req.params.id).exec(callback);
        },
        candidate_books: function(callback) {
            Book.find({ 'candidate': req.params.id }).exec(callback);
        },
    }, function(err, results) {
        if (err) { return next(err); }
        //Success
        if (results.candidate_books.length > 0) {
            //Candidate has books. Render in same way as for GET route.
            res.render('candidate_delete', { title: 'Delete Candidate', candidate: results.candidate, candidate_books: results.candidate_books } );
            return;
        }
        else {
            //Candidate has no books. Delete object and redirect to the list of candidates.
            Candidate.findByIdAndRemove(req.body.id, function deleteGenre(err) {
                if (err) { return next(err); }
                //Success - got to candidates list
                res.redirect('/catalog/candidates');
            });

        }
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
    req.checkBody('cand_title', 'Title required').notEmpty();
    //Trim and escape the name field.
    req.sanitize('name').escape();
    req.sanitize('name').trim();
    req.sanitize('cand_title').escape();
    req.sanitize('cand_title').trim();

    req.body.signed_offer_letter = (req.body.signed_offer_letter == undefined || req.body.signed_offer_letter == false) ? false : true;

    //Run the validators
    var errors = req.validationErrors();

    //Create a candidate object with escaped and trimmed data (and the old id!)
    var candidate = new Candidate(
      {
      name: req.body.name,
      cand_title: req.body.cand_title,
      signed_offer_letter: req.body.signed_offer_letter,
      date_created: req.body.date_created,
      date_modified: moment(Date()).format('lll'),
      _id: req.params.id
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
