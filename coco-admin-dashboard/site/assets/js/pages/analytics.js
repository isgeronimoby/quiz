var Analytics = {};

$(document).ready(function(){

	var datePicker = $('#reportrange');
	datePicker.daterangepicker(
		{
			format: 'DD-MM-YYYY',
			minDate: '01/01/2012',
			maxDate: '12/31/2018',
			ranges: {
				'Today': [moment(), moment()],
				'Yesterday': [moment().subtract('days', 1), moment().subtract('days', 1)],
				'Last 7 Days': [moment().subtract('days', 6), moment()],
				'Last 30 Days': [moment().subtract('days', 29), moment()],
				'This Month': [moment().startOf('month'), moment().endOf('month')],
				'Last Month': [moment().subtract('month', 1).startOf('month'), moment().subtract('month', 1).endOf('month')]
			},
			startDate: moment().subtract('days', 29),
			endDate: moment()
		},
		function(start, end) {
			datePicker.find('span').html('<span class="hidden-xs">From: </span>' + '<span class="startDate">' + start.format('MMMM D, YYYY') + '</span>'
				+ ' to ' + '<span class="endDate">' + end.format('MMMM D, YYYY') + '</span>');
//			ReloadReports(start, end);
		}
	);

	Analytics.funnelAllTrafficSource = [
		{
			"title": "Website visits",
			"value": 300
		},
		{
			"title": "Downloads",
			"value": 123
		},
		{
			"title": "Requested prices",
			"value": 98
		},
		{
			"title": "Contaced",
			"value": 72
		},
		{
			"title": "Purchased",
			"value": 35
		},
		{
			"title": "Asked for support",
			"value": 25
		},
		{
			"title": "Purchased more",
			"value": 18
		}
	];

	Analytics.amchartFunnelAllTraffic = AmCharts.makeChart("amchart-funnel-traffic",
		{
			"type": "funnel",
			"pathToImages": "http://cdn.amcharts.com/lib/3/images/",
			"angle": 35,
			"balloonText": "[[title]]:<b>[[value]]</b>",
			"baseWidth": "60%",
			"depth3D": 150,
			"labelPosition": "right",
			"neckHeight": "0%",
			"neckWidth": "0%",
			"startX": 400,
			"startY": 100,
			"valueRepresents": "area",
			"colors": [
				"#010173",
				"#235B8C",
				"#4586BF",
				"#73B2D9",
				"#9CC8D9",
				"#4F818C",
				"#F0900D",
				"#02029B"
			],
			"gradientRatio": [],
			"labelTickAlpha": 0.25,
			"marginBottom": 40,
			"marginLeft": 40,
			"marginRight": 200,
			"marginTop": 40,
			"outlineAlpha": 0.16,
			"outlineThickness": 2,
			"pullOutEffect": "easeInSine",
			"pullOutOnlyOne": true,
			"startEffect": "easeOutSine",
			"titleField": "title",
			"valueField": "value",
			"handDrawScatter": 1,
			"allLabels": [],
			"balloon": {
				"borderColor": "#FD0000",
				"borderThickness": 6,
				"color": "#FFFFFF",
				"cornerRadius": 20,
				"fillAlpha": 0.5,
				"fillColor": "#235B8C",
				"fontSize": 12,
				"horizontalPadding": 20,
				"shadowAlpha": 0,
				"showBullet": true,
				"verticalPadding": 12
			},
			"titles": [],
			"dataProvider": Analytics.funnelAllTrafficSource
		}
	);

	Analytics.amchartFunnelFacebook = AmCharts.makeChart("amchart-funnel-facebook",
		{
			"type": "funnel",
			"pathToImages": "http://cdn.amcharts.com/lib/3/images/",
			"angle": 35,
			"balloonText": "[[title]]:<b>[[value]]</b>",
			"baseWidth": "100%",
			"depth3D": 150,
			"labelPosition": "right",
			"neckHeight": "0%",
			"neckWidth": "0%",
			"labelsEnabled": false,
			"startX": 400,
			"startY": 100,
			"valueRepresents": "area",
			"colors": Analytics.amchartFunnelAllTraffic.colors,
			"gradientRatio": [],
			"labelTickAlpha": 0.25,
			"marginBottom": 40,
			"marginLeft": 40,
			"marginRight": 40,
			"marginTop": 40,
			"outlineAlpha": 0.16,
			"outlineThickness": 2,
			"pullOutEffect": "easeInSine",
			"pullOutOnlyOne": true,
			"startEffect": "easeOutSine",
			"titleField": "title",
			"valueField": "value",
			"handDrawScatter": 1,
			"allLabels": [],
			"balloon": Analytics.amchartFunnelAllTraffic.balloon,
			"titles": [],
			"dataProvider": Analytics.funnelAllTrafficSource
		}
	);

	Analytics.amchartFunnelTwitter = AmCharts.makeChart("amchart-funnel-twitter",
		{
			"type": "funnel",
			"pathToImages": "http://cdn.amcharts.com/lib/3/images/",
			"angle": 35,
			"balloonText": "[[title]]:<b>[[value]]</b>",
			"baseWidth": "100%",
			"depth3D": 150,
			"labelPosition": "right",
			"neckHeight": "0%",
			"neckWidth": "0%",
			"labelsEnabled": false,
			"startX": 400,
			"startY": 100,
			"valueRepresents": "area",
			"colors": Analytics.amchartFunnelAllTraffic.colors,
			"gradientRatio": [],
			"labelTickAlpha": 0.25,
			"marginBottom": 40,
			"marginLeft": 40,
			"marginRight": 40,
			"marginTop": 40,
			"outlineAlpha": 0.16,
			"outlineThickness": 2,
			"pullOutEffect": "easeInSine",
			"pullOutOnlyOne": true,
			"startEffect": "easeOutSine",
			"titleField": "title",
			"valueField": "value",
			"handDrawScatter": 1,
			"allLabels": [],
			"balloon": Analytics.amchartFunnelAllTraffic.balloon,
			"titles": [],
			"dataProvider": Analytics.funnelAllTrafficSource
		}
	);

	Analytics.reloadFunnels = function(){
		Analytics.amchartFunnelAllTraffic.validateData();
		Analytics.amchartFunnelFacebook.validateData();
		Analytics.amchartFunnelTwitter.validateData();

		Analytics.amchartFunnelAllTraffic.validateNow();
		Analytics.amchartFunnelFacebook.validateNow();
		Analytics.amchartFunnelTwitter.validateNow();
	};
	Analytics.amchartFunnelAllTraffic.dataProvider = Analytics.funnelAllTrafficSource;

	$(window).resize(function(){
		if ( window.outerHeight == screen.availHeight || window.outerWidth == screen.availWidth ) {
			setTimeout(function(){
				Analytics.reloadFunnels();
			}, 300);
		}
		Analytics.reloadFunnels();
	});

	// hack to force funnels reloading if small-screen detected
	setTimeout(function(){
		if ( $('body').hasClass('smallscreen') ) {
			Analytics.reloadFunnels();
		}
	}, 1000);
});