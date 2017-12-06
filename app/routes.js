// app/routes.js
module.exports = function(app, passport) {

        // =====================================
        // HOME PAGE (with login links) ========
        // =====================================
        app.get('/', function(req, res) {
            res.render('index.pug'); // load the index.ejs file
        });

        // =====================================
        // PROFILE SECTION =====================
        // =====================================
        app.get('/catalog/candidates', isLoggedIn, function(req, res) {
            res.render('candidate_list.pug', {
                user: req.user // get the user out of session and pass to template
            });
        });

        // =====================================
        // GOOGLE ROUTES =======================
        // =====================================
        app.get('/auth/google', passport.authenticate('google', {
            scope: ['profile', 'email']
        }));

        // the callback after google has authenticated the user

        app.get('/auth/google/callback',
                    passport.authenticate('google', {
                            successRedirect : '/catalog/candidates',
                            failureRedirect : '/'
                    }));
        };

        // route middleware to make sure a user is logged in
        function isLoggedIn(req, res, next) {

            // if user is authenticated in the session, carry on 
            if (req.isAuthenticated())
                return next();

            // if they aren't redirect them to the home page
            res.redirect('/');
        }