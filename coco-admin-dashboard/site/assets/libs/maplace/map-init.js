dashboardCharts.mapInit = function () {
	var map_styles = [
			{
				"featureType": "administrative",
				"elementType": "labels",
				"stylers": [
					{
						"visibility": "on"
					},
					{
						"gamma": "1.82"
					},
					{
						"weight": "1.34"
					},
					{
						"saturation": "15"
					},
					{
						"hue": "#001dff"
					}
				]
			},
			{
				"featureType": "administrative",
				"elementType": "labels.text.fill",
				"stylers": [
					{
						"visibility": "on"
					},
					{
						"gamma": "1.96"
					},
					{
						"lightness": "-9"
					}
				]
			},
			{
				"featureType": "administrative",
				"elementType": "labels.text.stroke",
				"stylers": [
					{
						"visibility": "off"
					}
				]
			},
			{
				"featureType": "administrative.country",
				"elementType": "all",
				"stylers": [
					{
						"visibility": "on"
					}
				]
			},
			{
				"featureType": "landscape",
				"elementType": "all",
				"stylers": [
					{
						"visibility": "on"
					},
					{
						"lightness": "90"
					},
					{
						"gamma": "1.00"
					},
					{
						"saturation": "57"
					},
					{
						"color": "#ffffff"
					},
					{
						"weight": "0.82"
					}
				]
			},
			{
				"featureType": "landscape.man_made",
				"elementType": "all",
				"stylers": [
					{
						"visibility": "off"
					}
				]
			},
			{
				"featureType": "landscape.natural",
				"elementType": "all",
				"stylers": [
					{
						"visibility": "on"
					}
				]
			},
			{
				"featureType": "landscape.natural.landcover",
				"elementType": "all",
				"stylers": [
					{
						"saturation": "-3"
					},
					{
						"lightness": "-8"
					},
					{
						"visibility": "on"
					}
				]
			},
			{
				"featureType": "landscape.natural.landcover",
				"elementType": "geometry",
				"stylers": [
					{
						"visibility": "on"
					}
				]
			},
			{
				"featureType": "poi.business",
				"elementType": "all",
				"stylers": [
					{
						"visibility": "off"
					}
				]
			},
			{
				"featureType": "poi.park",
				"elementType": "all",
				"stylers": [
					{
						"visibility": "off"
					}
				]
			},
			{
				"featureType": "road",
				"elementType": "all",
				"stylers": [
					{
						"visibility": "off"
					}
				]
			},
			{
				"featureType": "road",
				"elementType": "geometry.stroke",
				"stylers": [
					{
						"visibility": "off"
					}
				]
			},
			{
				"featureType": "road",
				"elementType": "labels.icon",
				"stylers": [
					{
						"visibility": "off"
					}
				]
			},
			{
				"featureType": "road.highway",
				"elementType": "geometry",
				"stylers": [
					{
						"hue": "#ffaa00"
					},
					{
						"saturation": "-43"
					},
					{
						"visibility": "on"
					}
				]
			},
			{
				"featureType": "road.highway",
				"elementType": "geometry.stroke",
				"stylers": [
					{
						"visibility": "off"
					}
				]
			},
			{
				"featureType": "road.highway",
				"elementType": "labels",
				"stylers": [
					{
						"visibility": "simplified"
					},
					{
						"hue": "#ffaa00"
					},
					{
						"saturation": "-70"
					}
				]
			},
			{
				"featureType": "road.highway.controlled_access",
				"elementType": "labels",
				"stylers": [
					{
						"visibility": "on"
					}
				]
			},
			{
				"featureType": "road.arterial",
				"elementType": "all",
				"stylers": [
					{
						"visibility": "on"
					},
					{
						"saturation": "-100"
					},
					{
						"lightness": "30"
					}
				]
			},
			{
				"featureType": "road.local",
				"elementType": "all",
				"stylers": [
					{
						"saturation": "-100"
					},
					{
						"lightness": "40"
					},
					{
						"visibility": "off"
					}
				]
			},
			{
				"featureType": "transit.station.airport",
				"elementType": "geometry.fill",
				"stylers": [
					{
						"visibility": "on"
					},
					{
						"gamma": "0.80"
					}
				]
			},
			{
				"featureType": "water",
				"elementType": "all",
				"stylers": [
					{
						"visibility": "simplified"
					},
					{
						"saturation": "-50"
					},
					{
						"lightness": "30"
					},
					{
						"weight": "1"
					}
				]
			}
		];
	var mapOptions = {
		center: new google.maps.LatLng(52.240496, -0.988263),
		zoom: 7,
		maxZoom: 9,
//		minZoom: 6,
		disableDefaultUI: true,
		zoomControl: true,
		zoomControlOptions: {
			style: google.maps.ZoomControlStyle.LARGE
		},
		mapTypeId: 'Default'
	};
	dashboardCharts.maplace = new google.maps.Map(document.getElementById("vector-map"),mapOptions);
	var styledMapType = new google.maps.StyledMapType(map_styles, { name: 'Default' });
	dashboardCharts.maplace.mapTypes.set('Default', styledMapType);

};


dashboardCharts.mapMarkersArray = [];

dashboardCharts.addDataToMap = function (locData){
	function getMaplaceRadius(locData) {
		var maximumRadius = 20000;
		var max = 0;

		for (var i = 0; i < locData.length; i++) {
			if (locData[i].number > max) max = locData[i].number;
		}
		for (var i = 0; i < locData.length; i++) {
			locData[i].radius = locData[i].number / max * maximumRadius;
		}
		return locData;
	}
	locData = getMaplaceRadius(locData);

	if (dashboardCharts.mapMarkersArray.length > 0) {
		for (var i = 0; i < dashboardCharts.mapMarkersArray.length; i++) {
			for (var el in dashboardCharts.mapMarkersArray[i]) {
				dashboardCharts.mapMarkersArray[i][el].setMap(null);
			}
		}
	}

	for (var i = 0; i < locData.length; i++) {
		var position = new google.maps.LatLng(locData[i].lat, locData[i].lon);
		var populationOptions = {
			strokeColor: '#00369C',
			strokeOpacity: 0.8,
			strokeWeight: 2,
			fillColor: '#00369C',
			fillOpacity: 0.35,
			map: dashboardCharts.maplace,
			center: position,
			radius: locData[i].radius
		};
		var circle = new google.maps.Circle(populationOptions);
		var marker = new google.maps.Marker({
			position: position,
			map: dashboardCharts.maplace,
			animation: google.maps.Animation.DROP,
			title: String(locData[i].number)
		});

		var infowindow = new google.maps.InfoWindow();
		google.maps.event.addListener(marker, 'click', (function(marker, i) {
			return function() {
				infowindow.setContent(String(locData[i].number));
				infowindow.open(dashboardCharts.maplace, marker);
			}
		})(marker, i));

		dashboardCharts.mapMarkersArray.push({
			marker: marker,
			circle: circle,
			infowindow: infowindow
		});
	}
};

// google.maps.event.trigger(maplace, "resize");
// trigger when map is resized
