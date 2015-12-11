// =========================================================================
//Required Module===========================================================
// =========================================================================
//this module will encrypt signup password before storing it in DB
var bcrypt = require("bcryptjs");
//this module will enable us to use a strategy for authenticating with a username and password.
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;

//require  model (collection name + Schema )
var Users = require("../app/models/user");
//oAuth
var configAuth = require('./auth');


module.exports = function( passport)
{

    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    /**
     *when the  strategy  later on "return done(null, user);" passport.serializeUser method will be excuted.
     * this method can access the user object we passed back to the middleware. It's its job
     * to determine what data from the user object should be stored in the session. The result
     * of the serializeUser method is attached to the session
     * as req.session.passport.user = { // our serialised user object // }.
     * The result is also attached to the request as req.user.
     */
    //Serialize function determine what data from the user object should be stored in the session.
    passport.serializeUser(function(user, done) {

        done(null, user);
    });
     //user object ataches to the request as req.user
      passport.deserializeUser(function(user, done) {
        done(null, user);
    });

    // =========================================================================
    // Sign Up ================================================================
    // =========================================================================
    /**
     * parameter 1 : the name of the strategy which will be used to identify
     *            this strategy when applied by passing it to     "passport.authenticate" first parameter
     *           in "signup" route.
     * parameter 2 : create the strategy
     */
    passport.use("local-SignUp",new LocalStrategy({

            /**
             *  by default, local strategy uses "username" and "password" , we will override with email
             *
             *  usernameField     : send  email POST param (that has been sent to "signup" route)  to the Callback function 2nd parameter
             *  passwordField     : send  password POST param (that has been sent to "signup" route) to the Callback function 3rd parameter
             *  passReqToCallback : pass the whole POST request (that has been sent to "signup" route) to the callback first parameter "req"
             */
            usernameField : 'email',
            passwordField : 'motdePasse',
            passReqToCallback : true
        },

        function(req,email, motdePasse, done) {
            process.nextTick(function () {

                    //******************* SignUp  Logic begin ***************************/
                    // 1-get one document from the DB collection that has  "document email" ="Post email"
                    //email: POST email send to the signUP route
                    Users.findOne({'local.email':email},function(err, user) {

                            //2-ERROR : In case of any error, return using the done method
                            if (err) {
                                return done(err);
                            }
                            /**
                             * 3-DUPLICATE EMAIL : if Query return a collection then email exist in DB collection
                             * so redirect the user to "passport.authenticate" => "failureRedirect "
                             * using  "return done(null, false);"
                             */

                            if (user) {
                                return done(null, false , req.flash('signupMessage', email + ' semble être associée à un autre compte.'));
                            }

                            /**
                             * 4-INSERT IN DB : else if there is no error  and email not duplicated
                             * Insert user POST inputs in the database collection
                             */
                            else{
                                //4-1) Create a model instance (document that respect the userSchema assigned  to the model)
                                var newUser = new Users();
                                //4-2) Fill the model instance(document)
                                newUser.local.email         =   email;
                                newUser.local.motdePasse    =   bcrypt.hashSync(motdePasse, bcrypt.genSaltSync(8), null);
                                newUser.local.sexe          =  req.body.sexe ;
                                newUser.local.prenom        =  req.body.prenom  ;
                                newUser.local.nom           =  req.body.nom   ;
                                //4-3)Insert Document in Database
                                newUser.save(function(error) {
                                    //4-4)if document not inserted in DB display the error in console
                                    if (error) console.log('error' + error.message);
                                    //4-5)if document inserted successfully redirect user to  "passport.authenticate" => " successRedirect"
                                    //and store done() second parameter "newUser" in the session
                                    else return done(null, newUser);
                                });//-newUser.save
                            }//-else
                        }//-Users.findOne
                        //*******************SingUp  Logic  ends ***************************/

                    )}
            )}
    ));

    // =========================================================================
    // Login====================================================================
    // =========================================================================
    /**
     * parameter 1 :  the name of the strategy which will be used to identify
     * this strategy when applied by passing it to
     *    "passport.authenticate" first aprameter
     */
    passport.use("local-login",new LocalStrategy({
            /**
             *  by default, local strategy uses "username" and "password" , we will override with email
             *
             *  usernameField     : send  email POST param (that has been sent to "signup" route)  to the Callback function 2nd parameter
             *  passwordField     : send  password POST param (that has been sent to "signup" route) to the Callback function 3rd parameter
             *  passReqToCallback : pass the whole POST request (that has been sent to "signup" route) to the callback first parameter "req"
             */
            usernameField : 'email',
            passwordField : 'motdePasse',
            passReqToCallback : true
        },
        function(req,email, motdePasse, done) {///by default, local strategy uses "username" and "password"
            process.nextTick(function () {

                    //******************* Auth Check Logic begin ***************************/
                    // 1-get one document from the DB collection that has   "collection username" = "Post username"
                    //username : the name of the Post input in login.ejs
                    Users.findOne({'local.email':email},function(err, user) {

                            //2-In case of any error, return using the done method
                            if (err) {
                                return done(err);
                            }
                            /**
                             * 3-if POST "email" doesn't exist in the "Users" database Collection
                             * redirect user to route specified in ==>app.js -> passport.authenticate -> failureRedirect
                             */
                            if (!user) {
                                //console.log('Email  Not Found in Databse Collection : '+ email);
                                return done(null, false  ,req.flash('loginMessage', 'No user found.'));
                            }
                            /**
                             * 4-if POST "password" send to the login post route from login.ejs deosn't match the returned document password "user.password"
                             * redirect user to route specified in ==>app.js -> passport.authenticate -> failureRedirect
                             */
                            if ( !bcrypt.compareSync(motdePasse , user.local.motdePasse) ) {
                                //console.log('Invalid mot de Passe: ' + motdePasse );
                                return done(null, false , req.flash('loginMessage', 'Oops! Wrong password.'));
                            }
                            /**
                             *5- if POST "User" and "password" both match Collection "User" and "password"
                             * use    return done(null, user); to create session and store done() second parameter "user" insdie it
                             * then send cookie to client then
                             * redirect user to route specified in ==>app.js -> passport.authenticate -> successRedirect
                             *
                             */

                            //console.log('user name and passwod match the one in DB collection');
                            return done(null, user);

                        }
                        //******************* Auth Check Logic ends ***************************/
                    )}
            )}
    ));


    // =========================================================================
    // FACEBOOK login===========================================================
    // =========================================================================
    passport.use(new FacebookStrategy({
            /**
             *  profileFields : The Facebook returns some of the default attributes. If you wan't to access more details
             * about client's profile you would have to
             * declare it under the FacebookStrategy:
             */
            // pull in our app id and secret from our auth.js file
            clientID        : configAuth.facebookAuth.clientID,
            clientSecret    : configAuth.facebookAuth.clientSecret,
            callbackURL     : configAuth.facebookAuth.callbackURL,
            profileFields: ['displayName','email', 'photos','gender' ,'profileUrl'],
            passReqToCallback : true

        },

        // facebook will send back the token and profile
        function(req,token, refreshToken, profile, done) {

            // asynchronous
            process.nextTick(function() {

                // find the user in the database based on their facebook id
                Users.findOne({ 'facebook.id' : profile.id }, function(err, user) {

                    // if there is an error, stop everything and return that
                    // ie an error connecting to the database
                    if (err)
                        return done(err);

                    // if the user is found, then log them in
                    if (user) {
                        return done(null, user); // user found, return that user
                    }

                    else {
                        // if there is no user found with that facebook id, create them
                        var newUser            = new Users();

                        newUser.facebook.id    = profile.id; // set the users facebook id
                        newUser.facebook.token = token; // we will save the token that facebook provides to the user
                        newUser.facebook.sexe  = profile.gender;
                        newUser.facebook.displayName  = profile.displayName;
                        newUser.facebook.email = profile.emails[0].value; // facebook can return multiple emails so we'll take the first



                        // save our user to the database
                        newUser.save(function(err) {
                            if (err)
                                throw err;

                            // if successful, return the new user
                            return done(null, newUser);
                        });
                    }//else

                });
            });

        }));



}//module.exports
