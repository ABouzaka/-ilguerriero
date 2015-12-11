/**
 * Created by admin on 03/12/2015.
 */


app.controller("publierService",function($scope , $http)
{
   // $scope.initMap();
//###########################publier une annance ################################

    $("#depart").on({
        "placecomplete:selected": function(evt, placeResult) {
            var x=JSON.stringify(placeResult);
            var data=jQuery.parseJSON(x);
            $scope.trajet.depart.ville=data.formatted_address;
            $scope.trajet.depart.latitude=data.geometry.location.lat;
            $scope.trajet.depart.longitude=data.geometry.location.lng;

            console.log(data.geometry.location.lat);
        }
    });
    $("#arrivee").on({
        "placecomplete:selected": function(evt, placeResult) {
            var x=JSON.stringify(placeResult);
            var data=jQuery.parseJSON(x);
            $scope.trajet.arrivee.ville=data.formatted_address;
            $scope.trajet.arrivee.latitude=data.geometry.location.lat;
            $scope.trajet.arrivee.longitude=data.geometry.location.lng;

            console.log(data.geometry.location.lat);
        }
    });
    $scope.publier= function(){
        $scope.vm.positions.push([ $scope.trajet.depart.latitude, $scope.trajet.depart.longitude]);
        $scope.vm.positions.push([ $scope.trajet.arrivee.latitude, $scope.trajet.arrivee.longitude]);
        $scope.vm.Dep= $scope.trajet.depart.ville;
        $scope.vm.Arr= $scope.trajet.arrivee.ville;
       $scope.trajet.Annonce="566894cc345c4da4136c432d";
        $scope.trajet.utilisateur="56696434f014bab80a73daa6";

        $http.post("/publier/trajet",$scope.trajet).success(function(response){
            //acces to the model variable
console.log("hhhhhhh");
           // $scope.contactlist.push(response);
        });

    }

})


app.controller("CovoiturageService",function($scope , $http)
{
    $("#depart").on({
        "placecomplete:selected": function(evt, placeResult) {
            var x=JSON.stringify(placeResult);
            var data=jQuery.parseJSON(x);
            $scope.depart=data.formatted_address;

            console.log(data.geometry.location.lat);
        }
    });
    $("#arrivee").on({
        "placecomplete:selected": function(evt, placeResult) {
            var x=JSON.stringify(placeResult);
            var data=jQuery.parseJSON(x);
            $scope.arrivee=data.formatted_address;

            console.log(data.geometry.location.lat);
        }
    });



    //###########################get type annance ################################

    $http.get("/GetAll/annonce").success(function(response){
        //acces to the model variable
        $scope.TypeAnnan= response;
    });
//###########################get all annance ################################

    $scope.search= function(){
    var url="/SearchCov/"+$scope.typeAnnan._id+"/"+$scope.depart+"/"+$scope.arrivee;
        console.log(url);
    $http.get(url).success(function(response){
        //acces to the model variable
        console.log(response);
        $scope.vm.positions=[];
        for(var i=0;i<response.length;i++)
        {
            $scope.vm.positions.push([response[i].depart.latitude,response[i].depart.longitude]);
        }
        $scope.trajetlist= response;
    });
}

})


//###########################tab control msg et commentaire################################
app.controller('TabsCtrl', ['$scope', function ($scope) {
    $scope.tabs = [{
        title: 'chat question',
        url: 'commentaire'
    }, {
        title: 'message',
        url: 'msg'
    }];

    $scope.currentTab = 'msg';

    $scope.onClickTab = function (tab) {
        $scope.currentTab = tab.url;
    }

    $scope.isActiveTab = function(tabUrl) {
        return tabUrl == $scope.currentTab;
    }
}]);


