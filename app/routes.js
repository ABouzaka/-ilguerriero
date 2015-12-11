module.exports = function(app, passport)
{

// =====================================
// HOME PAGE (with login links) ========
// =====================================
    /**
     * 1-load the Home page  and display an error message
     * if login failed
     */
    app.get('/', function(req, res) {
        res.render('layoutSite.ejs',{ message: req.flash('loginMessage') }); // load the index.ejs file
    });
    app.get('/erreur', function(req, res) {
        var x=req.flash('loginMessage');

        res.send({msg:x[0],ok:false});

    });

// =====================================
// LOGIN ===============================
// =====================================

    /**
     * 2-PROCESS LOGIN FORM :
     *     parameter 1 of passport.authenticate : specify the name of the Strategy(will be created later on)
     *     parameter 2 of passport.authenticate :
     *      -successRedirect: redirect user to "/loginSuccess"  route if he login successfully according to strategy in prm1
     *     - failureRedirect: redirect user to "/loginFailure"  route if  login failed according to strategy in prm1
     */
    app.post('/login',
        passport.authenticate('local-login', {
            successRedirect: '/Service/covoiturage/index',
            failureRedirect: '/erreur',
            failureFlash : true // allow flash messages
        })
    );


// =====================================
// SIGNUP ==============================
// =====================================

    app.get('/erreurSingUp', function(req, res) {
        console.log("gggg");

        var x=req.flash('signupMessage');
        res.send({msg:x[0],ok:false});

    });

// process the signup form
    app.post('/CreationProfilCoxino', passport.authenticate('local-SignUp', {
        successRedirect : '/Service/covoiturage/index', // redirect to the secure profile section
        failureRedirect : '/erreurSingUp' ,// redirect back to the signup page if there is an error4
        failureFlash : true // allow flash messages
    }));

// =====================================
// PROFILE SECTION =====================
// =====================================
    app.get('/profile', isLoggedIn, function(req, res) {
         console.log( req.user);
        /**
         *passport will store the logged in user document in "req.user"
         * so get user logged in user document and send it to the profile view
         */
       res.render("application/covoiturage/index.ejs", {user : req.user});
    //    res.render('site/profile.ejs', {
    //       user : req.user
    //});
    });

    /**
     * to prevent use from accesing to private profile if his not logged in
     * -before renderin the private profile Check if user is Authenticated first.
     * so if some one that is not autheticated try to acces to http://localhost:3000/loginSuccess he will be redirected
     * to /login route
     */
   // route middleware to make sure a user is logged in
    function isLoggedIn(req, res, next) {

        // if user is authenticated in the session, pass to next middleware
        if (req.isAuthenticated()) return next();
        // if user not authenticated redirect them to the home page
        res.redirect('/');
    }

// =====================================
// FACEBOOK ROUTES =====================
// =====================================
    // route for facebook authentication and login
    app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));

    // handle the callback after facebook has authenticated the user
    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect : '/profile',
            failureRedirect : '/'
        }));

// =====================================
// LOGOUT ==============================
// =====================================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });


// ==================================================
// CovoiturageAceueil  ==============================
// ==================================================
    app.get('/CovoiturageAccueil', function(req, res) {
        res.render("CovoiturageAccueil");
    });

    app.get('/CreerAnnonceCovoiturage', function(req, res) {
        res.render("CreerAnnonceCovoiturage");
    });


// ==================================================
// Route Application  ==============================
// ==================================================

    //Route Layout
    app.get('/application', function(req, res) {
        console.log( req.originalUrl );//get('host')
      //  var className = window.location.hash.replace('#/','');
        res.render("layoutApp.ejs");
    });
    app.get('/covoiturage', function(req, res) {
        res.render("application/covoiturage/index.ejs");
    });

    //Route  menu
    app.get('/Service/:partial/:page', isLoggedIn,function (req, res){
        var partial = req.params.partial;
        var page = req.params.page;
        console.log("hhhhh"+req.user.local.nom);
       // console.log("/application/"+partial+"/index.ejs");
        //console.log(partial);
       // res.json(req.user);
       res.render("application/"+partial+"/"+page+".ejs");

    });






}//module.exports