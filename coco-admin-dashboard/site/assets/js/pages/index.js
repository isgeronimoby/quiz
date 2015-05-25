var dashboardCharts = {};
dashboardCharts.dataForMap = [
	{
		lat: 51.71386,
		lon: -0.09559,
		number: 15
	},
	{
		lat: 51.51420,
		lon: -0.09303,
		number: 12
	},
	{
		lat: 53.51386,
		lon: -0.09559,
		number: 5
	},
	{
		lat: 51.21420,
		lon: -0.09303,
		number: 2
	}
];

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

	// SORTABLE ELEMENTS -> UNCOMMENT AJAX TO SEND POSITIONS
	if ( currentPlatform == 'desktop' ) {
		$("#sortableArea").sortable({
			handle: ".widget-header",
			cancel: ".modal-widget",
			opacity: 0.5,
			revert: 300,
			dropOnEmpty: false,
			tolerance: "pointer",
			forcePlaceholderSize: true,
			helper: 'clone',
			receive: function (event, ui) {
				$("body").trigger("resize")
			},
			update: function (event, ui) {
				if (this === ui.item.parent()[0]) {
					var data = $(this).sortable('toArray');

					var layout = "";

					var widgets = $("#sortableArea>div.col-lg-4");

					$.each(widgets, function (index, value) {
						layout += $(value).attr("id") + ";";
					});

					//$.ajax({
					//	type: "POST",
					//	url: updateLayoutUrl,
					//	data: { layout: layout },
					//	dataType: "json",
					//	success: function (response) {
					//	},
					//	error: function (error) {
					//		console.log(error);
					//	}
					//});
				}
			}
		});
	}

  load_charts();

	$(window).resize(function(){
		dashboardCharts.overallLineChart.validateNow();
	});

	var minHeight = $('#amchart-line-graphic').css('min-height');
	$('#website-statistic').parent().parent().find('.widget-maximize').click(function(e){
		if( !$('.widget-line-statistic').hasClass('maximized') ) {
			setTimeout(function () {
				$('#amchart-line-graphic').height($('.widget-line-statistic').height() - 50);
				$('body').bind('touchmove', function(e){e.preventDefault()});
			}, 5);
		} else {
			$('#amchart-line-graphic').height('auto');
			$('body').unbind('touchmove');
		}
		setTimeout(function(){
			dashboardCharts.overallLineChart.validateNow();
		}, 10);

	});

	$('#vector-map').parent().parent().find('.widget-maximize').click(function(e){
		var mapWidget = $(this).parent().parent().parent();
		if( !mapWidget.hasClass('maximized') ) {
			setTimeout(function () {
				$('#vector-map').height(mapWidget.height());
				$('body').bind('touchmove', function(e){e.preventDefault()});
			}, 5);
		} else {
			$('#vector-map').height(minHeight);
			$('body').unbind('touchmove');
		}
		setTimeout(function(){
			google.maps.event.trigger(dashboardCharts.maplace, "resize");
			dashboardCharts.maplace.panTo(new google.maps.LatLng(52.240496, -0.988263));
		}, 10);
	});
	dashboardCharts.mapInit();

	var mapFiltersNumber = $('#mapOptions').parent().find('ul li');

	// Filtering devices by installs number
	mapFiltersNumber.find('a').click(function(e){
		e.preventDefault();

		switch ($(this).attr('data-trigger')) {
			case 'ten':
				console.log('Show only more than ten');
				var tempMapData =
					dashboardCharts.dataForMap.filter(function(elem){
						if (elem.number >= 10) return true;
					});
				dashboardCharts.addDataToMap(tempMapData);
				break;
			default:
				dashboardCharts.addDataToMap(dashboardCharts.dataForMap)
		}

		mapFiltersNumber.removeClass('active');
		$(this).parent().addClass('active');
	});


	var overallButtons = $('#website-statistic').find('.btn-group button');
	overallButtons.click(function(e){
		switch ( $(this).attr('id') ) {
			case 'overall-installs':
				// your code for installs button
				break;
			case 'overall-sales':
				// your code for sales button
				break;
			case 'overall-affrevs':
				// your code for affrevs button
				break;
			case 'overall-activeusers':
				// your code for active users button
				break;
		}
	});

    //ReloadReports(moment().subtract('days', 29), moment());

});


function reload_charts(){
	dashboardCharts.overallLineChart.validateData(); // call this method after data in graphic changed
/*	dashboardCharts.appInstallsFrom.draw();
	dashboardCharts.extInstallsBrowser.draw();*/

	dashboardCharts.appInstallsFromIos.draw();
	dashboardCharts.appInstallsFromAndroid.draw();
//	dashboardCharts.appInstallsFromWin.draw();
	dashboardCharts.extInstallsBrowserChrome.draw();
	dashboardCharts.extInstallsBrowserFirefox.draw();
	dashboardCharts.extInstallsBrowserSafari.draw();
	dashboardCharts.extInstallsBrowserIe.draw();
}

function ReloadReports(start, end) {
	$.ajax({
		type: "POST",
		url: getReportsUrl,
		data: { From: start.format('YYYY-MM-DD'), To: end.format('YYYY-MM-DD') },
		dataType: "json",
		success: function (response) {
			if (response.status == "success") {
				if (response.widgets != null) {
					var sortableArea = $("#sortableArea");

					$.each(response.widgets, function (index, value) {
						$("#" + value).appendTo(sortableArea);
					});
				}

				setTotalValue("#totalInstalls", response.totals.TotalAppInstalls);
				setTotalValue("#totalSales", response.totals.TotalSales);
				setTotalValue("#totalAffiliateRevenue", response.totals.TotalAffiliateRevenue);
				setTotalValue("#totalActiveUsers", response.totals.TotalNewUsers);

				setPercentageDynamics(response.totalsPrev.TotalAppInstalls, response.totals.TotalAppInstalls, "traffic", $("#totalInstallsPercent"));
				setPercentageDynamics(response.totalsPrev.TotalSales, response.totals.TotalSales, "sales", $("#totalSalesPercent"));
				setPercentageDynamics(response.totalsPrev.TotalAffiliateRevenue, response.totals.TotalAffiliateRevenue, "income", $("#totalAffiliatePercent"));
				setPercentageDynamics(response.totalsPrev.TotalNewUsers, response.totals.TotalNewUsers, "users", $("#totalActiveUsersPercent"));

				$('.animate-number').each(function () {
					$(this).animateNumbers($(this).attr("data-value"), true, parseInt($(this).attr("data-duration")));
				});

				var iphone = findApp("IPhone", response.installs);
				var android = findApp("Android", response.installs);

				var chrome = findApp("Chrome", response.installs);
				var firefox = findApp("Firefox", response.installs);
				var safari = findApp("Safari", response.installs);
				var ie = findApp("Internet Explorer", response.installs);

				dashboardCharts.appInstallsFrom.setData([
					{ platform: 'iOS', facebook: iphone.FacebookRegistrations, emails: iphone.EmailRegistrations, annonymous: iphone.AnonymusRegistrations },
					{ platform: 'Android', facebook: android.FacebookRegistrations, emails: android.EmailRegistrations, annonymous: android.AnonymusRegistrations },
					{ platform: 'Windows', facebook: 0, emails: 0, annonymous: 0 }]);

				dashboardCharts.extInstallsBrowser.setData([
					{ browser: 'Chrome', facebook: chrome.FacebookRegistrations, emails: chrome.EmailRegistrations, annonymous: chrome.AnonymusRegistrations },
					{ browser: 'Firefox', facebook: firefox.FacebookRegistrations, emails: firefox.EmailRegistrations, annonymous: firefox.AnonymusRegistrations },
					{ browser: 'Safari', facebook: safari.FacebookRegistrations, emails: safari.EmailRegistrations, annonymous: safari.AnonymusRegistrations },
					{ browser: 'IE', facebook: ie.FacebookRegistrations, emails: ie.EmailRegistrations, annonymous: ie.AnonymusRegistrations }
				]);

				var totalMobiles = iphone.TotalInstalls + android.TotalInstalls;
				var totalExtensions = chrome.TotalInstalls + firefox.TotalInstalls + safari.TotalInstalls + ie.TotalInstalls;

				var iphonePercent = getPercentage(iphone.TotalInstalls, totalMobiles);
				var androidPercent = getPercentage(android.TotalInstalls, totalMobiles);

				var chromePercent = getPercentage(chrome.TotalInstalls, totalExtensions);
				var firefoxPercent = getPercentage(firefox.TotalInstalls, totalExtensions);
				var safariPercent = getPercentage(safari.TotalInstalls, totalExtensions);
				var iePercent = getPercentage(ie.TotalInstalls, totalExtensions);

				$("#progressIphone").css("width", iphonePercent).parent().siblings(".pull-right").text(iphonePercent);
				$("#progressAndroid").css("width", androidPercent).parent().siblings(".pull-right").text(androidPercent);

				$("#progressChrome").css("width", chromePercent).parent().siblings(".pull-right").text(chromePercent);
				$("#progressFirefox").css("width", firefoxPercent).parent().siblings(".pull-right").text(firefoxPercent);
				$("#progressSafari").css("width", safariPercent).parent().siblings(".pull-right").text(safariPercent);
				$("#progressIe").css("width", iePercent).parent().siblings(".pull-right").text(iePercent);

				var chartData = [];

				$.each(response.groupedInstalls, function (key, value) {
					var iosCount = findAppInstalls("iphone", value);
					var androidCount = findAppInstalls("android", value);

					chartData.push({
						"date": key,
						"ios": iosCount,
						"android": androidCount
					});
				});

				dashboardCharts.overallLineChartData = chartData;
				dashboardCharts.overallLineChart.dataProvider = dashboardCharts.overallLineChartData;

				dashboardCharts.addDataToMap(response.locations);
				dashboardCharts.dataForMap = response.locations; // so I could use it for filtering
				reload_charts();
			}
		},
		error: function (error) {
			console.log(error);
		}
	});
}

function findApp(appName, installsObjects) {
	var result = $.grep(installsObjects, function (item) {
		return item.HaveThisApp.toUpperCase().indexOf(appName.toUpperCase()) >= 0;
	});

	if (result.length > 0)
		return result[0];
	else
	{
		return { FacebookRegistrations: 0, EmailRegistrations: 0, AnonymusRegistrations: 0, TotalInstalls: 0 };
	}
}

function findAppInstalls(appName, installsObjects) {
	var result = $.grep(installsObjects, function (item) {
		return item.Title.toUpperCase().indexOf(appName.toUpperCase()) >= 0;
	});

	if (result.length > 0)
		return result[0].TotalInstalls;
	else {
		return null;
	}
}

function getPercentage(part, total) {
	if (total == null || part == null || total == 0)
		return "0%";

	return Math.round(part * 100 / total) + "%"
}

function setPercentageDynamics(prevNumber, currentNumber, text, span) {
	var i = span.siblings("i");

	if (prevNumber == null || currentNumber == null || prevNumber == 0 || currentNumber == 0)
	{
		span.hide();
		i.hide();
		return;
	}

	var percentage = Math.round(((currentNumber - prevNumber) / (prevNumber)) * 100);

	if (percentage == 0) {
		span.hide();
		i.hide();
		return;
	}
	else if (percentage > 0) {
		span.html("<b>" + percentage + "%</b> increase in " + text);
		i.removeClass("fa-caret-down").addClass("fa-caret-up");
	}
	else {
		span.html("<b>" + (-1 * percentage) + "%</b> decrease in " + text);
		i.removeClass("fa-caret-up").addClass("fa-caret-down");
	}

	i.show();
	span.show();
}

dashboardCharts.fillMobileVersion = function( chart, data ){
	chart.el.parent().find('.mobile-data-list .data.facebook').html( data.FacebookRegistrations + '%' );
	chart.el.parent().find('.mobile-data-list .data.emails').html( data.EmailRegistrations + '%' );
	chart.el.parent().find('.mobile-data-list .data.anonymous').html( data.AnonymusRegistrations + '%' );
};


dashboardCharts.overallLineChartData = [
	{
		"date": "2014-01-28",
		"ios": 8,
		"android": 5
	},
	{
		"date": "2014-01-29",
		"ios": 6,
		"android": 7
	},
	{
		"date": "2014-01-30",
		"ios": 2,
		"android": 3
	},
	{
		"date": "2014-02-01",
		"ios": 1,
		"android": 3
	},
	{
		"date": "2014-02-02",
		"ios": 2,
		"android": 1
	},
	{
		"date": "2014-02-03",
		"ios": 3,
		"android": 2
	},
	{
		"date": "2014-02-04",
		"ios": 6,
		"android": 8
	}
];

//dashboardCharts.overallLineChart.dataProvider = dashboardCharts.overallLineChartData;

// LINE BAR
function load_charts(){

	var chartColors = ["#679BDF","#edce8c","#afb3bf"];

	/*dashboardCharts.appInstallsFrom = Morris.Donut({
		element: 'app-installs-from',
		resize: true,
		data: [
			{ platform: 'iOS', facebook: 45,  emails: 25, annonymous: 40 },
			{ platform: 'Android', facebook: 17,  emails: 40, annonymous: 30 },
			{ platform: 'WinPhone', facebook: 75,  emails: 15, annonymous: 35 }
		],
		xkey: 'platform',
		ykeys: ['facebook', 'emails', 'annonymous'],
		labels: ['Facebook', 'Emails', 'Annonymous'],
		barColors: chartColors,
		xLabelxLabelMargin: 1,
		xLabelAngle: 45,
		hideHover: 'auto'
	});*/

	dashboardCharts.appInstallsFromIos = Morris.Donut({
		element: 'app-installs-from-ios',
		resize: true,
		data: [
			{ label: "Facebook", value: 45 },
			{ label: "Emails", value: 25 },
			{ label: "Annonymous", value: 40 }
		],
		barColors: chartColors,
		hideHover: 'auto'
	});

	dashboardCharts.appInstallsFromAndroid = Morris.Donut({
		element: 'app-installs-from-android',
		resize: true,
		data: [
			{ label: "Facebook", value: 17 },
			{ label: "Emails", value: 40 },
			{ label: "Annonymous", value: 30 }
		],
		barColors: chartColors,
		hideHover: 'auto'
	});

/*	dashboardCharts.appInstallsFromWin = Morris.Donut({
		element: 'app-installs-from-windows',
		resize: true,
		data: [
			{ label: "Facebook", value: 75 },
			{ label: "Emails", value: 15 },
			{ label: "Annonymous", value: 35 }
		],
		barColors: chartColors,
		hideHover: 'auto'
	});*/

/*	dashboardCharts.extInstallsBrowser = Morris.Bar({
		element: 'ext-installs-from-browser',
		resize: true,
		data: [
			{ browser: 'Chrome', facebook: 45,  emails: 25, annonymous: 40 },
			{ browser: 'Safari', facebook: 17,  emails: 40, annonymous: 30 },
			{ browser: 'Firefox', facebook: 75,  emails: 15, annonymous: 35 },
			{ browser: 'IE', facebook: 50,  emails: 36, annonymous: 24 }
		],
		xkey: 'browser',
		ykeys: ['facebook', 'emails', 'annonymous'],
		labels: ['Facebook', 'Emails', 'Annonymous'],
		barColors: chartColors,
		xLabelxLabelMargin: 1,
		xLabelAngle: 45,
		hideHover: 'auto'
	});*/

	dashboardCharts.extInstallsBrowserChrome = Morris.Donut({
		element: 'ext-installs-from-browser-chrome',
		resize: true,
		data: [
			{ label: "Facebook", value: 45 },
			{ label: "Emails", value: 25 },
			{ label: "Annonymous", value: 40 }
		],
		barColors: chartColors,
		hideHover: 'auto'
	});

	dashboardCharts.extInstallsBrowserSafari = Morris.Donut({
		element: 'ext-installs-from-browser-safari',
		resize: true,
		data: [
			{ label: "Facebook", value: 17 },
			{ label: "Emails", value: 40 },
			{ label: "Annonymous", value: 30 }
		],
		barColors: chartColors,
		hideHover: 'auto'
	});

	dashboardCharts.extInstallsBrowserFirefox = Morris.Donut({
		element: 'ext-installs-from-browser-firefox',
		resize: true,
		data: [
			{ label: "Facebook", value: 75 },
			{ label: "Emails", value: 15 },
			{ label: "Annonymous", value: 35 }
		],
		barColors: chartColors,
		hideHover: 'auto'
	});

	dashboardCharts.extInstallsBrowserIe = Morris.Donut({
		element: 'ext-installs-from-browser-ie',
		resize: true,
		data: [
			{ label: "Facebook", value: 50 },
			{ label: "Emails", value: 35 },
			{ label: "Annonymous", value: 25 }
		],
		barColors: chartColors,
		hideHover: 'auto'
	});

	dashboardCharts.overallLineChart = AmCharts.makeChart("amchart-line-graphic",
		{
			"type": "serial",
			"pathToImages": "http://cdn.amcharts.com/lib/3/images/",
			"categoryField": "date",
			"columnWidth": 1,
			"dataDateFormat": "YYYY-MM-DD",
			"mouseWheelScrollEnabled": false,
			"startDuration": 0.7,
			"startEffect": "easeOutSine",
			"theme": "light",
			"categoryAxis": {
				"minPeriod": "DD",
				"parseDates": true
			},
			"chartCursor": {
				"categoryBalloonDateFormat": "MMM YYYY",
				"fullWidth": true,
				"valueLineAlpha": 0,
				"valueLineBalloonEnabled": true,
				"color": "#ffffff",
				"cursorAlpha": 0.3,
				"cursorColor": "#00369c"
			},
			"chartScrollbar": {
				"backgroundAlpha": 0.6,
				"backgroundColor": "#00369c",
				"color": "#ffffff",
				"gridAlpha": 0.7,
				"gridCount": 4
			},
			"trendLines": [],
			"graphs": [
				{
					"balloonText": "[[value]] - IOS installs",
					"bullet": "round",
					"lineColor": "#008000",
					"balloonColor": "#008000",
					"id": "ios-graph",
					"title": "IOS",
					"valueField": "ios"
				},
				{
					"balloonText": "[[value]] - Android installs",
					"bullet": "square",
					"id": "android-graph",
					"title": "Android",
					"valueField": "android"
				}
			],
			"guides": [],
			"valueAxes": [
				{
					"id": "installs-axis",
					"title": "Installs"
				}
			],
			"allLabels": [],
			"balloon": {},
			"legend": {
				"useGraphSettings": true,
				"showEntries": true,
				"valueText": " " // issue FAN-1029, use empty String if problem is still there, but it mostly not the chart problem
			},
			"titles": [],
			"dataProvider": dashboardCharts.overallLineChartData
		}
	);

}

// dashboardCharts.overallLineChart.validateData(); // call this method after data in graphic changed
