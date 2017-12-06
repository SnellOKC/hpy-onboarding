var express = require('express');
var router = express.Router();


// Require our controllers
var candidate_controller = require('../controllers/candidateController');

// /* GET catalog home page. */
router.get('/', candidate_controller.index);  

/// GENRE ROUTES ///

/* GET request for creating a Candidate. NOTE This must come before route that displays Candidate (uses id) */
router.get('/candidate/create', candidate_controller.candidate_create_get);

/* GET request for list of all archived Candidates. */
router.get('/archive', candidate_controller.candidate_archive);

/* POST request for creating Candidate. */
router.post('/candidate/create', candidate_controller.candidate_create_post);

/* GET request to delete Candidate. */
router.get('/candidate/:id/delete', candidate_controller.candidate_delete_get);

// POST request to delete Candidate
router.post('/candidate/:id/delete', candidate_controller.candidate_delete_post);

/* GET request to update Candidate. */
router.get('/candidate/:id/update', candidate_controller.candidate_update_get);

// POST request to update Candidate
router.post('/candidate/:id/update', candidate_controller.candidate_update_post);

/* GET request for one Candidate. */
router.get('/candidate/:id', candidate_controller.candidate_detail); //Currently not being used. The list of candidates links directly to their update page if clicked, if want to move away from that in the future, use this as the URL and inside this page display an update option

/* GET request for list of all Candidate. */
router.get('/candidates', candidate_controller.candidate_list);


module.exports = router;
