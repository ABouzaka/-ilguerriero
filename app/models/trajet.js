//1-require mongoose and store it in var
var mongoose = require("mongoose");

/**
 * 2-create Collection schema
 * Schema :specify the structure of the collection by :
 *      -setting the field name and type of all documents in a collection
 */
var trajetSchema = new  mongoose.Schema({
        "depart" : {
            "ville" : String,
            "latitude" : String,
            "longitude" : String
        },
        "arrivee" : {
            "ville" : String,
            "latitude" : String,
            "longitude" : String
        },
        "dateHeureDepart" : Date,
        "prix" : Number,
        "placeAnnonce" : Number,
        "placeRestante" : Number ,
        "informationSup":{
            "fumer":Boolean,
            "musique":Boolean,
            "bagage":Boolean,
            "climatise":Boolean
        },
        "utilisateur" : {type: mongoose.Schema.Types.ObjectId, ref: 'utilisateur' },
        "Annonce"  : {type: mongoose.Schema.Types.ObjectId, ref: 'annonce' },
        "comments":[{type: mongoose.Schema.Types.ObjectId, ref: 'commentaire' }],
        "avis":{
        "like": String,
        "dislike": String
    },
        "description" : String,
         "marqueVehicule" :String,
         "CouleurVehicule" :String
    }
    , {collection: 'trajet'});


/**
 * 3-Create a Model and Return a mongoose.model() when user require this file.
 * model : will specify the CollectionName that we will work with in "prm1"
 * and the Schema that the model instance should respect in "prm2"
 */
module.exports = mongoose.model('trajet',trajetSchema);


