/**
 * Created by greg on 10/23/15.
 */

function positionIsRight() {
    document.cookie = "lat="+lat+ ";lng="+lng;
    console.log(lat + " " + lng);
    $(document).ready(function() {
        $(".address_elements").css("visibility","hidden");
        $("#change_address").css("visibility","hidden");
    });
}

function clearMarkers() {
  setMapOnAll(null);
}

function positionIsNotRight() {
    console.log("no right nigga");

    $(document).ready(function() {
       $("#change_address").css("visibility","visible");
    });

    var addressSubmit = document.getElementById("address_submit");
    addressSubmit.addEventListener('click', function() {
        setMapOnAll(null);
        clearMarkers();
        markers = [];
        geocodeAddress();
    });
}

function geocodeAddress() {
    var address_value = document.getElementById('address_input').value;
    geocoder.geocode({'address': address_value}, function(results, status) {
    if (status === google.maps.GeocoderStatus.OK) {
        map.setCenter(results[0].geometry.location);
        lat = results[0].geometry.location.lat();
        lng = results[0].geometry.location.lng();

        if(Cookies.get("fucking-eu-cookies")) {
            document.cookie = "lat=" + lat;
            document.cookie = "lng=" + lng;
        }

        var marker = new google.maps.Marker({
            map: map,
            position: results[0].geometry.location
        });
        document.getElementById("text").innerHTML = "Is this your location? " + address_value;
        } else {
         alert('Geocode was not successful for the following reason: ' + status);
        }
    });
}

function changeLatAndLong() {
    var getAddr = new XMLHttpRequest();
    getAddr.onreadystatechange = function() {
        if (getAddr.status == 200 && getAddr.readyState == 4) {

        }
    };

    var myCenter = new google.maps.LatLng(lat, lng);

    var marker = new google.maps.Marker({
              position:myCenter,
    });
    marker.setMap(map);
}