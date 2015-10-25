/**
 * Created by greg on 10/23/15.
 */

function clearMarkers() {
  setMapOnAll(null);
}
var addressConfirm = document.getElementById("confirm_address");
addressConfirm.addEventListener('click', function() {
    if (Cookies.get("fucking-eu-cookies")) {
        Cookies.set("lat", lat, { path: '/' });
        Cookies.set("lng", lng, { path: '/' });
        document.getElementById("address_text").innerHTML = "Address successfully updated";
    }
});

var addressSubmit = document.getElementById("address_submit");
addressSubmit.addEventListener('click', function() {
    setMapOnAll(null);
    clearMarkers();
    markers = [];
    geocodeAddress();
});


function geocodeAddress() {
    var address_value = document.getElementById('address_input').value;
    geocoder.geocode({'address': address_value}, function(results, status) {
    if (status === google.maps.GeocoderStatus.OK) {
        map.setCenter(results[0].geometry.location);
        lat = results[0].geometry.location.lat();
        lng = results[0].geometry.location.lng();

        var marker = new google.maps.Marker({
            map: map,
            position: results[0].geometry.location
        });
        document.getElementById("address_text").innerHTML = "Is this your location? " + address_value;
        } else {
         alert('Geocode was not successful for the following reason: ' + status);
        }
    });
}