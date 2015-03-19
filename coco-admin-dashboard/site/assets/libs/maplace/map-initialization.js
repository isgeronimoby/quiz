var maplace = new Maplace({
	map_div: '#vector-map',
	type: 'circle',
	map_options: {
		set_center: [52.240496, -0.988263],
		zoom: 6,
		maxZoom: 9,
		minZoom: 6
	},
	styles: {
		'Default':[
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
		]
	}
});
