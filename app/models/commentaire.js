//1-require mongoose and store it in var
var mongoose = require("mongoose");

/**
 * 2-create Collection schema
 * Schema :specify the structure of the collection by :
 *      -setting the field name and type of all documents in a collection
 */
var commentaireSchema = new  mongoose.Schema({

        "idutilisateur" : {type: mongoose.Schema.Types.ObjectId, ref: 'utilisateur' },
        "trajet" : {type: mongoose.Schema.Types.ObjectId, ref: 'trajet' } ,


        "comment" : {
                "txtcommentaire" : String,
                "datecommentaire" : Date
            },
        "message" : {
                "txtmessage" : String,
                "datemessage" : Date
            },
    }
    , {collection: 'commentaire'});


/**
 * 3-Create a Model and Return a mongoose.model() when user require this file.
 * model : will specify the CollectionName that we will work with in "prm1"
 * and the Schema that the model instance should respect in "prm2"
 */
module.exports = mongoose.model('commentaire',commentaireSchema);


