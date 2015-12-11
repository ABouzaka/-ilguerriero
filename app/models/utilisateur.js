//1-require mongoose and store it in var
var mongoose = require("mongoose");

/**
 * 2-create Collection schema
 * Schema :specify the structure of the collection by :
 *      -setting the field name and type of all documents in a collection
 */
var utilisateurSchema = new  mongoose.Schema({
        "_id" : mongoose.Schema.ObjectId,
        "nom" : String,
        "prenom" : String,
        "coordonnees" : {
            "adresse" : {
                "ligne1" : String,
                "ligne2" : String,
                "ligne3" : String,
                "codePostal" : Number,
                "ville" : String,
                "pays" : String,
                "municipalite" : String,
                "latitude" : String,
                "longitude" : String
            },
            "telephone" : Number,
            "email" : String
        },
        "photo" : String,
        "sexe" : String,
        "dateNaissance" : Date,
        "dateDebut" : Date,
        "dateModification" : Date,
        "dateFin" : Date,
        "travail" : String,
        "etudes" : String,
        "livre" : String,
        "film" : String,
        "serieTV" : String,
        "siteInternet" : String,
        "description" : String
    }
    , {collection: 'utilisateur'});


/**
 * 3-Create a Model and Return a mongoose.model() when user require this file.
 * model : will specify the CollectionName that we will work with in "prm1"
 * and the Schema that the model instance should respect in "prm2"
 */
module.exports = mongoose.model('utilisateur',utilisateurSchema);






