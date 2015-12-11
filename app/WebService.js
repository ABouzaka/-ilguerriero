module.exports = function(app) {
    require("../app/models/annonce");
    require("../app/models/user");
    require("../app/models/trajet");
    require("../app/models/commentaire");
    //======================================================================
    //GET===================================================================
    //=====================================================================
    //GetAll fonction pour retourner tous les documents de la collecction
    // modelName(afficher par exemple les listes d'user)
    app.get("/GetAll/:modelName",function(req,res) {
        var  model = require(  "../app/models/"+req.params.modelName   );
        model.find(function (err, collection) {
        //    console.log(collection);
            res.json(collection);
        });
    })

    app.get("/SearchCov/:idTypeAnnan/:depart/:arrivee/",function(req,res) {
        var  model = require(  "../app/models/trajet"   );
        console.log(req.params.arrivee);
        var query = {
            $or:[
                {"depart.ville" : req.params.depart},
                {"arrivee.ville" : req.params.arrivee},
                //{"dateHeureDepart" : req.params.dateHeureDepart},
                {"idAnnonce" : req.params.idTypeAnnan}
            ]
        };

        model.find(query)
            .populate('utilisateur')
            .exec(function(err, trajets){
                console.log(trajets[0].idutilisateur);
                res.json(trajets);
            })
    })


    //=====================================================================
    //POST=================================================================
    //=====================================================================
    //publier fonction pour insert tous les documents de la collecction

    app.post("/publier/trajet",function(req,res) {

        var model = require("../app/models/trajet");
        console.log(req.body);
        model.create(req.body, function(err, docs){

            if(err){
                var errorMsg = "error: " + err.message;
                console.log(errorMsg + " / " + err.getLastError());
                response.status(500).send(err);

            } else {
                console.log("success");

            }

        });

      //  res.json({name:"manel",age:"20"});
       // console.log(res);
    })
    app.get("/AddTyeAnnance/",function(req,res) {
        var model = require("../app/models/annonce");
       var MAn=new model({
           typeservice:"covoiturage",
           typeannonce:"condecteur",
       });
        MAn.save();
        res.json(MAn);
    })
    app.get("/AddCmt/",function(req,res) {
        var model = require("../app/models/commentaire");
        var trajet=require("../app/models/trajet");

        var MAn=new model({
            idutilisateur :"56696434f014bab80a73daa6" ,
            trajet: "5669df2d71353cd4059b6e89" ,
            comment:  {
                txtcommentaire : "cmt99"
            },
            message : {
                txtmessage : "msg99"

            },
        });
        MAn.save();
        trajet.findById("5669df2d71353cd4059b6e89",function (err, collection) {
            //
            // res.json(collection);
            collection.comments.push(MAn);
          collection.save();
            console.log(collection);
        });


       // tr.save(callback);
        res.json(MAn);
    })


    app.get("/GetTrajet/:idAnc",function(req,res) {
        console.log("hhh");
        var model = require("../app/models/trajet");

        model.find({
                Annonce : req.params.idAnc
            })
            .populate('Annonce')
            .exec(function(err, trajets){
                console.log(trajets[0].idAnnonce.typeannonce);
                res.json(trajets);
            })
    })

    app.get("/GetTrajetUser/:idAnc",function(req,res) {
        console.log("hhh");
        var model = require("../app/models/trajet");

        model.find({
                utilisateur : req.params.idAnc
            })
            .populate('utilisateur')
            .exec(function(err, trajets){
                console.log(trajets[0].idutilisateur);
                res.json(trajets);
            })

    })


    app.get("/Getdetail/:idAnc",function(req,res) {
        console.log("hhh");
        var model = require("../app/models/trajet");

        model.findById(req.params.idAnc)
            .populate('comments')
            .exec(function(err, trajets){
              //  console.log(trajets[0].idutilisateur);
                res.json(trajets);
            })

    })

}
