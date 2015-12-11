
app.controller('mapController', function($http, $interval, NgMap,$rootScope) {
    var vm = this;
    vm.positions = [
        ];

    vm.dynMarkers = []
    NgMap.getMap().then(function(map) {
        var bounds = new google.maps.LatLngBounds();
        for (var k in map.customMarkers) {
            var cm = map.customMarkers[k];
            vm.dynMarkers.push(cm);
            bounds.extend(cm.getPosition());
        };

        vm.markerClusterer = new MarkerClusterer(map, vm.dynMarkers, {});
       // map.setCenter(bounds.getCenter());
       // map.fitBounds(bounds);
    });
});

