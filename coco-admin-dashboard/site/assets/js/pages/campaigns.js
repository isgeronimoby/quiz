var Campaigns = {};

$(document).ready(function(){

	var datePicker = $('#reportrange');
	datePicker.daterangepicker(
		{
			format: 'DD-MM-YYYY',
			minDate: '01/01/2012',
			maxDate: '12/31/2018',
			ranges: {},
			startDate: moment().subtract('days', 29),
			endDate: moment()
		},
		function(start, end) {
			datePicker.find('span').html('<span class="hidden-xs">From: </span>' + '<span class="startDate">' + start.format('MMMM D, YYYY') + '</span>'
				+ ' to ' + '<span class="endDate">' + end.format('MMMM D, YYYY') + '</span>');
//			ReloadReports(start, end);
		}
	);


	/* ********************************* */


	function getRandVal(){
		return Math.round(Math.random() * 5000 );
	}
	Campaigns.fakeData = [
		{ name: 'Website Visits', chrome: getRandVal(), firefox: getRandVal(), safari: getRandVal(), ie: getRandVal(), ios: getRandVal(), android: getRandVal(), total: 3250 },
		{ name: 'Click Install Buttons', chrome: getRandVal(), firefox: getRandVal(), safari: getRandVal(), ie: getRandVal(), ios: getRandVal(), android: getRandVal(), total: 3100 },
		{ name: 'Install Application', chrome: getRandVal(), firefox: getRandVal(), safari: getRandVal(), ie: getRandVal(), ios: getRandVal(), android: getRandVal(), total: 2820 },
		{ name: 'Create Account', chrome: getRandVal(), firefox: getRandVal(), safari: getRandVal(), ie: getRandVal(), ios: getRandVal(), android: getRandVal(), total: 3560 },
		{ name: 'Enter the draw', chrome: getRandVal(), firefox: getRandVal(), safari: getRandVal(), ie: getRandVal(), ios: getRandVal(), android: getRandVal(), total: 2800 },
		{ name: 'Send Browser Ext. Link', chrome: getRandVal(), firefox: getRandVal(), safari: getRandVal(), ie: getRandVal(), ios: getRandVal(), android: getRandVal(), total: 2430 },
		{ name: 'Send Mobile App Link', chrome: getRandVal(), firefox: getRandVal(), safari: getRandVal(), ie: getRandVal(), ios: getRandVal(), android: getRandVal(), total: 2300 },
		{ name: 'Reward For Facebook Share', chrome: getRandVal(), firefox: getRandVal(), safari: getRandVal(), ie: getRandVal(), ios: getRandVal(), android: getRandVal(), total: 2100 },
		{ name: 'Reward for Twitter Share', chrome: getRandVal(), firefox: getRandVal(), safari: getRandVal(), ie: getRandVal(), ios: getRandVal(), android: getRandVal(), total: 2050 },
		{ name: 'Click Invite Friend Button', chrome: getRandVal(), firefox: getRandVal(), safari: getRandVal(), ie: getRandVal(), ios: getRandVal(), android: getRandVal(), total: 1800  },
		{ name: 'Invitation Sent (Desktop)', chrome: getRandVal(), firefox: getRandVal(), safari: getRandVal(), ie: getRandVal(), ios: getRandVal(), android: getRandVal(), total: 1670 }
	];
	Campaigns.fullTooltips = [];

	Campaigns.barsTooltipsFill = function (data) {
		Campaigns.fullTooltips = [];
		data.forEach(function (elem) {
			var str = "";
			for (var a in elem) {
				if (a == 'name') {
					str += ('<span class="graph-heading">' + elem[a] + '</span><br/>');
					continue;
				} else if (a == 'total') {
					str += ('<span class="graph-total">Total: ' + elem[a] + '</span><br/>');
					continue;
				}
				str += ('<span data-browser="' + a.toLowerCase() + '">' + a + ': ' + '<b>' + elem[a] + '</b></span><br/>');
			}
			Campaigns.fullTooltips.push(str);
		});
	};
	Campaigns.barsTooltipsFill(Campaigns.fakeData);

	Campaigns.barChart = AmCharts.makeChart("amchart-bar-fake",
		{
			"type": "serial",
			"categoryField": "name",
			"angle": 15,
			"depth3D": 5,
			"columnWidth": 0.8,
			"columnSpacing": 0,
			"startDuration": 0,
			"theme": "light",
			"fontSize": 10,
			"categoryAxis": {
				"gridPosition": "start",
				"labelRotation": 30
			},
			"trendLines": [],
			"graphs": [
				{
					"fillAlphas": 1,
					"id": "AmGraph-1",
					"title": "Chrome",
					"type": "column",
					"valueField": "chrome",
					"markerType": "circle",
					"balloonFunction": function(gdi, amc){
						for(var i = 0; i < Campaigns.fullTooltips.length; i++) {
							if ( Campaigns.fullTooltips[i].indexOf(gdi.category) != -1 ){
								var curTooltip = Campaigns.fullTooltips[i];
								var regexp = new RegExp('<span data-browser="' + gdi.graph.valueField + '"', 'g');
								var newTooltip = curTooltip.replace(regexp,
									'<span style="text-shadow: 0 0 10px rgba(255,255,255,0.5);color:' + gdi.graph.bulletColorR + '; data-browser="' + gdi.graph.valueField + '"' );
								return newTooltip;
							}
						}
					}
				},
				{
					"fillAlphas": 1,
					"id": "AmGraph-2",
					"title": "Firefox",
					"type": "column",
					"valueField": "firefox",
					"markerType": "circle",
					"balloonFunction": function(gdi, amc){
						for(var i = 0; i < Campaigns.fullTooltips.length; i++) {
							if ( Campaigns.fullTooltips[i].indexOf(gdi.category) != -1 ){
								var curTooltip = Campaigns.fullTooltips[i];
								var regexp = new RegExp('<span data-browser="' + gdi.graph.valueField + '"', 'g');
								var newTooltip = curTooltip.replace(regexp,
									'<span style="text-shadow: 0 0 10px rgba(255,255,255,0.5);color:' + gdi.graph.bulletColorR + '; data-browser="' + gdi.graph.valueField + '"' );
								return newTooltip;
							}
						}
					}
				},
				{
					"fillAlphas": 1,
					"id": "AmGraph-3",
					"title": "Safari",
					"type": "column",
					"valueField": "safari",
					"markerType": "circle",
					"balloonFunction": function(gdi, amc){
						for(var i = 0; i < Campaigns.fullTooltips.length; i++) {
							if ( Campaigns.fullTooltips[i].indexOf(gdi.category) != -1 ){
								var curTooltip = Campaigns.fullTooltips[i];
								var regexp = new RegExp('<span data-browser="' + gdi.graph.valueField + '"', 'g');
								var newTooltip = curTooltip.replace(regexp,
									'<span style="text-shadow: 0 0 10px rgba(255,255,255,0.5);color:' + gdi.graph.bulletColorR + '; data-browser="' + gdi.graph.valueField + '"' );
								return newTooltip;
							}
						}
					}
				},
				{
					"fillAlphas": 1,
					"id": "AmGraph-4",
					"title": "IE",
					"type": "column",
					"valueField": "ie",
					"markerType": "circle",
					"balloonFunction": function(gdi, amc){
						for(var i = 0; i < Campaigns.fullTooltips.length; i++) {
							if ( Campaigns.fullTooltips[i].indexOf(gdi.category) != -1 ){
								var curTooltip = Campaigns.fullTooltips[i];
								var regexp = new RegExp('<span data-browser="' + gdi.graph.valueField + '"', 'g');
								var newTooltip = curTooltip.replace(regexp,
									'<span style="text-shadow: 0 0 10px rgba(255,255,255,0.5);color:' + gdi.graph.bulletColorR + '; data-browser="' + gdi.graph.valueField + '"' );
								return newTooltip;
							}
						}
					}
				},
				{
					"fillAlphas": 1,
					"id": "AmGraph-5",
					"title": "iOS",
					"type": "column",
					"valueField": "ios",
					"markerType": "circle",
					"balloonFunction": function(gdi, amc){
						for(var i = 0; i < Campaigns.fullTooltips.length; i++) {
							if ( Campaigns.fullTooltips[i].indexOf(gdi.category) != -1 ){
								var curTooltip = Campaigns.fullTooltips[i];
								var regexp = new RegExp('<span data-browser="' + gdi.graph.valueField + '"', 'g');
								var newTooltip = curTooltip.replace(regexp,
									'<span style="text-shadow: 0 0 10px rgba(255,255,255,0.5);color:' + gdi.graph.bulletColorR + '; data-browser="' + gdi.graph.valueField + '"' );
								return newTooltip;
							}
						}
					}
				},
				{
					"fillAlphas": 1,
					"id": "AmGraph-6",
					"title": "Android",
					"type": "column",
					"valueField": "android",
					"markerType": "circle",
					"balloonFunction": function(gdi, amc){
						for(var i = 0; i < Campaigns.fullTooltips.length; i++) {
							if ( Campaigns.fullTooltips[i].indexOf(gdi.category) != -1 ){
								var curTooltip = Campaigns.fullTooltips[i];
								var regexp = new RegExp('<span data-browser="' + gdi.graph.valueField + '"', 'g');
								var newTooltip = curTooltip.replace(regexp,
									'<span style="text-shadow: 0 0 10px rgba(255,255,255,0.5);color:' + gdi.graph.bulletColorR + '; data-browser="' + gdi.graph.valueField + '"' );
								return newTooltip;
							}
						}
					}
				}
			],
			"guides": [],
			"valueAxes": [],
			"allLabels": [],
			"balloon": {
				"borderColor": "#FD0000",
				"borderThickness": 6,
				"color": "#FFFFFF",
				"cornerRadius": 20,
				"fillAlpha": 0.8,
				"fillColor": "#235B8C",
				"fontSize": 12,
				"horizontalPadding": 20,
				"shadowAlpha": 0,
				"showBullet": true,
				"verticalPadding": 12
			},
			"legend": {
				"useGraphSettings": false
			},
			"titles": [],
			"dataProvider": Campaigns.fakeData
		}
	);

	/* ********************************* */


	Campaigns.funnelAllTrafficSource = [
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
			"value": 1
		}
	];

	Campaigns.amchartFunnelAllTraffic = AmCharts.makeChart("amchart-funnel-traffic",
		{
			"type": "funnel",
			"pathToImages": "http://cdn.amcharts.com/lib/3/images/",
			"angle": 35,
			"balloonText": "[[title]]:<b>[[value]]</b>",
			"baseWidth": "80%",
			"depth3D": 150,
			"labelPosition": "right",
			"neckHeight": "0%",
			"neckWidth": "0%",
			"startX": 400,
			"startY": 100,
			"valueRepresents": "area",
			"labelTickColor": "#ffffff",
			"color": "#ffffff",
			"colors": [
				"#adb7b7",
				"#4c5160",
				"#73c39c",
				"#f6c442",
				"#d75953",
				"#75b9d8",
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
			"dataProvider": Campaigns.funnelAllTrafficSource,
			"export": {
				"enabled": true,
				"libs": {
					"path": "./assets/libs/amcharts/plugins/export/libs/"
				}
			}
		}
	);

	Campaigns.amchartFunnelFacebook = AmCharts.makeChart("amchart-funnel-facebook",
		{
			"type": "funnel",
			"pathToImages": "http://cdn.amcharts.com/lib/3/images/",
			"angle": 35,
			"balloonText": "[[title]]:<b>[[value]]</b>",
			"baseWidth": "80%",
			"depth3D": 150,
			"labelPosition": "right",
			"neckHeight": "0%",
			"neckWidth": "0%",
			"labelsEnabled": true,
			"startX": 400,
			"startY": 100,
			"valueRepresents": "area",
			"colors": Campaigns.amchartFunnelAllTraffic.colors,
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
			"dataProvider": Campaigns.funnelAllTrafficSource
		}
	);

	Campaigns.amchartFunnelAdwords = AmCharts.makeChart("amchart-funnel-adwords",
		{
			"type": "funnel",
			"pathToImages": "http://cdn.amcharts.com/lib/3/images/",
			"angle": 35,
			"balloonText": "[[title]]:<b>[[value]]</b>",
			"baseWidth": "80%",
			"depth3D": 150,
			"labelPosition": "right",
			"neckHeight": "0%",
			"neckWidth": "0%",
			"labelsEnabled": true,
			"startX": 400,
			"startY": 100,
			"valueRepresents": "area",
			"colors": Campaigns.amchartFunnelAllTraffic.colors,
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
			"dataProvider": Campaigns.funnelAllTrafficSource
		}
	);

	Campaigns.amchartFunnelBing = AmCharts.makeChart("amchart-funnel-bing",
		{
			"type": "funnel",
			"pathToImages": "http://cdn.amcharts.com/lib/3/images/",
			"angle": 35,
			"balloonText": "[[title]]:<b>[[value]]</b>",
			"baseWidth": "80%",
			"depth3D": 150,
			"labelPosition": "right",
			"neckHeight": "0%",
			"neckWidth": "0%",
			"labelsEnabled": true,
			"startX": 400,
			"startY": 100,
			"valueRepresents": "area",
			"colors": Campaigns.amchartFunnelAllTraffic.colors,
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
			"dataProvider": Campaigns.funnelAllTrafficSource
		}
	);

	Campaigns.amchartFunnelAllTraffic.dataProvider = Campaigns.funnelAllTrafficSource;


// example of the JSON
	Campaigns.tableJSON = [
		{
			source: 'All Traffic',
			clicks: 1000,
			installs: 300,
			signups: 1,
			sharefacebook: 400,
			sharetwitter: 301,
			linkeddevices: 15,
			mobilebilling: 1.22
		},
		{
			source: 'Adwords',
			clicks: 1000,
			installs: 300,
			signups: 1,
			sharefacebook: 300,
			sharetwitter: 301,
			linkeddevices: 15,
			mobilebilling: 1.45
		},
		{
			source: 'BING',
			clicks: 1000,
			installs: 300,
			signups: 1,
			sharefacebook: 450,
			sharetwitter: 301,
			linkeddevices: 15,
			mobilebilling: 1.45
		}
	];

	// initializing table with default data
	var tableExportButtonsArray = ( currentPlatform == "desktop" ) ? ["copy", "csv", "xls", "pdf"] : [];

	Campaigns.tableRows = $('#export-table-apps').DataTable({
		dom: 'T<"clear">lfrtip',
		tableTools: {
			"sSwfPath": "./assets/libs/jquery-datatables/extensions/TableTools/swf/copy_csv_xls_pdf.swf",
			aButtons: tableExportButtonsArray
		},
		paging: false,
		info: false,
		data: Campaigns.tableJSON,
		searching: false,
		columns: [
			{ "data": "source", type: 'natural' },
			{ "data": "clicks", type: 'natural' },
			{ "data": "installs", type: 'natural' },
			{ "data": "signups", type: 'natural' },
			{ "data": "sharefacebook", type: 'natural' },
			{ "data": "sharetwitter", type: 'natural' },
			{ "data": "linkeddevices", type: 'natural' },
			{ "data": "mobilebilling", type: 'natural' }
		],
		order: [ [2, 'asc'] ] // first par - column index, "source" - 0, "clicks" - 1, and so on, second direction:
		// "asc" - highest at the top, "desc" - lowest at the top
	});

	//update table with your data
	Campaigns.updateTableRows = function( data ){
		if( data ) {
			Campaigns.tableRows.clear().draw();
			Campaigns.tableRows.rows.add( data ).draw();
		}
	};

	Campaigns.reloadFunnels = function(){
		Campaigns.amchartFunnelAllTraffic.validateData();
		Campaigns.amchartFunnelFacebook.validateData();
		Campaigns.amchartFunnelAdwords.validateData();
		Campaigns.amchartFunnelBing.validateData();

		Campaigns.amchartFunnelAllTraffic.validateNow();
		Campaigns.amchartFunnelFacebook.validateNow();
		Campaigns.amchartFunnelAdwords.validateNow();
		Campaigns.amchartFunnelBing.validateNow();

		Campaigns.barChart.validateData();
		Campaigns.barChart.validateNow();
	};

	// Select campaign list
	$('.dropdown > ul li a').click(function(e){
		e.preventDefault();
		// do something
	});

	if ( currentPlatform == 'mobile' ) $('.amExportButton').hide();

	$(window).resize(function(){
		if ( window.outerHeight == screen.availHeight || window.outerWidth == screen.availWidth ) {
			setTimeout(function(){
				Campaigns.reloadFunnels();
			}, 300);
		}
		Campaigns.reloadFunnels();
	});

	Campaigns.fillMobileVersion = function( chart ){
		var blockFill = '<ul>';
		chart.chartData.forEach(function(el){
			blockFill += '<li><h5><span>' + el.title + ':</span> <span class="data">' + el.value + '</span></h5></li>';
		});
		blockFill += '</ul>';
		$(chart.div).parent().find('.mobile-data-list').html( blockFill );
	};

	// hack to force funnels reloading if small-screen detected
	setTimeout(function(){
		if ( $('body').hasClass('smallscreen') ) {
			Campaigns.reloadFunnels();
		}
	}, 1000);
});