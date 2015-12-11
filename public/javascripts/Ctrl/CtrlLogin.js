/**
 * Created by Chawki-pc on 26/11/2015.
 */
// app= angular.module('MyApp',[]);





//then use the $scope object to access to the "controller ng-model and template var"
app.controller("AppCtrlConx",function($scope , $http, $window) {
    //click button connexion
    $scope.connexion= function(){
        $http.post("/login",$scope.user).success(function(response){
            // si user n'existe pas un msg erreur affiche
            if( typeof(response.ok) != "undefined" ){
                console.log(response.msg);
                $scope.message=response.msg;
            }else{
                //redirect to view profile
                $window.location.href='#covoiturage';
            }

        });

    }

})//MyApp.controller

app.directive('validPasswordC', function() {
    return {
        require: 'ngModel',
        scope: {

            reference: '=validPasswordC'

        },
        link: function(scope, elm, attrs, ctrl) {
            ctrl.$parsers.unshift(function(viewValue, $scope) {

                var noMatch = viewValue != scope.reference
                ctrl.$setValidity('noMatch', !noMatch);
                return (noMatch)?noMatch:undefined;
            });

            scope.$watch("reference", function(value) {;
                ctrl.$setValidity('noMatch', value === ctrl.$viewValue);

            });
        }
    }
});

app.controller("AppCtrlInscrip",function($scope , $http, $window) {


    $scope.Inscription= function(){
        $http.post("/CreationProfilCoxino",$scope.user).success(function(response){
            if( typeof(response.ok) != "undefined" ){
                console.log(response.msg);
                $scope.message=response.msg;
            }else{
                $window.location.href='/profile';
            }
        });

    }

})//MyApp.controller
