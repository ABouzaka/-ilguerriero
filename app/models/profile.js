//1-require mongoose and store it in var
var mongoose = require("mongoose");

/**
 * 2-create Collection schema
 * Schema :specify the structure of the collection by :
 *      -setting the field name and type of all documents in a collection
 */
var profileSchema = new  mongoose.Schema({


        "_id" :mongoose.Schema.ObjectId,
        "type" : String,
        "dateDebut" : Date,
        "dateModification" : Date,
        "dateFin" : Date,
        "utilisateur_id" : mongoose.Schema.ObjectId
    }
    , {collection: 'profile'});


/**
 * 3-Create a Model and Return a mongoose.model() when user require this file.
 * model : will specify the CollectionName that we will work with in "prm1"
 * and the Schema that the model instance should respect in "prm2"
 */
module.exports = mongoose.model('profile',profileSchema);






