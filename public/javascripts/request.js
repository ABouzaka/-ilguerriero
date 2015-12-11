//Angular : 4-create a module and store it in varaible
//!module name is the same as the one set at step 1ng-app="MyApp"
var MyApp= angular.module('MyApp',[]);

//Angular : 5-create a Controller inside your module
//then use the $scope object to access to the "controller ng-model and template var"
MyApp.controller("AppCtrl",function($scope , $http) {

//##################set HTTP request###############################
    $http.get("/contactlist").success(function(response){
        console.log("I got the data I required");
        $scope.contactlist= response;
    });
//###########################################################

    $scope.addDocument = function(){
        console.log($scope.covoiturage);
        /*$http.post("/contactlist",$scope.contact).success(function(response){
            //acces to the model variable

            $scope.contactlist.push(response);
        });*/

    }


    $scope.removeContact= function(id){
        console.log("the id of the Cliked button : ");
        console.log( id );
        $http.delete("/contactlist/" + id).success(function(response)
        {
            if (response.n == 1) {
                /*DeletingDocumentFromMongoDB#10 : send HTTP get request to  the server
                 Which will respond with all the document collection in DB  */
                $http.get("/contactlist").success(function (response) {
                    $scope.contactlist = response;
                });
            }
        });


    }


    //#####################EDIT###############################
    //UpdatingDocumentInMonogDB#3 : get the argument sent from the view and store it in parameter
    $scope.edit= function(id){
        console.log("edit button has been clicked");
        console.log("edit() first parameter -id  = "+id);
//UpdatingDocumentInMonogDB#4 : send get HTTP request to  "/contactlist/:id" (!next step in /server.js)
        $http.get("/contactlist/"+ id).success(function(response){
            console.log("this is the sever response :",response);
//UpdatingDocumentInMonogDB#9 : store the response in the model variable ex "contact" JSON object
            $scope.contact= response;
        });
    };
//#########################################################


    //#################UPDATE#################################
    $scope.update= function(){

        console.log('Update button has been clicked.');
//getting document _id   from the model Varaible (already set with edit function when user clicks on Edit button)
        var id = $scope.contact._id;
        console.log('id of document that will be updated: '+ id );
        $http.put('/contactlist/'+id , $scope.contact).success(function(reponse){

//refresh the page to get new content when you recieve rea response from the server
            $http.get("/contactlist").success(function(response){
                $scope.contactlist= response;
            });//$http.get()

        });//$http.put()

    };
//########################################################



})//MyApp.controller


