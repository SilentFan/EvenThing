/**
 * Created by greg on 10/23/15.
 */
var lat = null;
var lng = null;
request = new XMLHttpRequest();
request.onreadystatechange = function() {
    if (request.readyState == 4 && request.status == 200) {
        var data = JSON.parse(request.responseText)['location'];
        lat = data['lat'];
        lng = data['lng'];
        function init() {
            var myCenter = new google.maps.LatLng(lat, lng);
            var mapProp = {
            center:new google.maps.LatLng(lat, lng),
            zoom:15,
            mapTypeId:google.maps.MapTypeId.ROADMAP
          };
            var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
            var marker=new google.maps.Marker({
              position:myCenter,
              });
              marker.setMap(map);
        }
        google.maps.event.addDomListener(window, 'load', init);
    }
}
request.open("POST", "https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyAecSYHFPQm8laP50QAwxbIBh9_VVTdr1M", true);
request.send();