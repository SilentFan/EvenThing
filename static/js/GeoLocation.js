/**
 * Created by greg on 10/23/15.
 */
var lat, lng;
lat = Cookies.get("lat");
lng = Cookies.get("lng");

getLatAndLong = new XMLHttpRequest();
getAddress = new XMLHttpRequest();
var map, mapProp, geocoder;
var markers = [];

function addMarker(location) {
  var marker = new google.maps.Marker({
    position: location,
    map: map
  });
  markers.push(marker);
}

function setMapOnAll(map) {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }
}

function init() {
    var myCenter = new google.maps.LatLng(lat, lng);
    geocoder = new google.maps.Geocoder();
    mapProp = {
        center:new google.maps.LatLng(lat, lng),
        zoom:15, mapTypeId:google.maps.MapTypeId.ROADMAP
    };

    map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
        var marker = new google.maps.Marker({
        position:myCenter,
    });
    addMarker(myCenter);
    setMapOnAll(map);
    google.maps.event.addDomListener(window, 'load', init);
}

getLatAndLong.onreadystatechange = function() {
    if (getLatAndLong.readyState == 4 && getLatAndLong.status == 200) {
        var data = JSON.parse(getLatAndLong.responseText)['location'];
        lat = data['lat'];
        lng = data['lng'];
        init();
        getAddress.open("POST",
                        "https://maps.googleapis.com/maps/api/geocode/json?latlng="
                        + lat + "," + lng + "&&key=AIzaSyAecSYHFPQm8laP50QAwxbIBh9_VVTdr1M",
                        false);
        getAddress.send();
    }
};

getAddress.onreadystatechange = function() {
    if (getAddress.readyState == 4 && getAddress.status == 200) {
        var address = JSON.parse(getAddress.responseText);
        var formatedAdress;
        formatedAdress = address.results[0].formatted_address;
        document.getElementById("address_text").innerHTML += " " + formatedAdress;
    }
};

console.log(lat + " " + lng);
if (lat) {
    init();
    console.log("yeah");
} else {
    getLatAndLong.open("POST", 'https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyAecSYHFPQm8laP50QAwxbIBh9_VVTdr1M', false);
    getLatAndLong.send();
}
