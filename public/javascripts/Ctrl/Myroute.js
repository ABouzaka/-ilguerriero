


app.config(['$routeProvider',function(r)
{
    r.when('/covoiturage',{templateUrl:'/Service/covoiturage/index'})
        .when('/location',{templateUrl:'/Service/location/index'})
        .when('/achat',{templateUrl:'/Service/achat'})
        .when('/SOS',{templateUrl:'/Service/SOS'})
        .when('/publier',{templateUrl:'/Service/covoiturage/publier'})
        .when('/detail',{templateUrl:'/Service/covoiturage/detail'})
            .when('/profile',{templateUrl:'/Service/covoiturage/index'})



}]);

app.controller('ContactInfo',['$scope',function(s,r)
{

}]);