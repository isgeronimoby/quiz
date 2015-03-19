var dashboardCharts = {};

var maplace = new Maplace({
	map_div: '#vector-map',
	type: 'circle'
});

$(document).ready(function(){

	var dataForMap = [
		{
			lat: 51.51386,
			lon: -0.09559,
			number: 8000
		},
		{
			lat: 51.51420,
			lon: -0.09303,
			number: 5000
		}
	];

	dataForMap = getMaplaceRadius(dataForMap);

		maplace.Load();

	changeMapData(dataForMap);

	var datePicker = $('#reportrange');
	datePicker.daterangepicker(
		{
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
			datePicker.find('span').html('From: ' + '<span class="startDate">' + start.format('MMMM D, YYYY') + '</span>'
			+ ' to ' + '<span class="endDate">' + end.format('MMMM D, YYYY') + '</span>');
//			ReloadReports(start, end);
		}
	);

	// SORTABLE ELEMENTS -> UNCOMMENT AJAX TO SEND POSITIONS
	$( "#sortableArea" ).sortable({
		handle: ".widget-header",
		cancel: ".modal-widget",
		opacity: 0.5,
		revert: 300,
		dropOnEmpty: false,
		tolerance: "pointer",
		forcePlaceholderSize: true,
		helper: 'clone',
		receive: function(event, ui) {$("body").trigger("resize")},
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

  load_charts();

	$(window).resize(function(){
		dashboardCharts.overallLineChart.validateNow();
	});

	var minHeight = $('#amchart-line-graphic').css('min-height');
	$('#website-statistic').parent().parent().find('.widget-maximize').click(function(e){
		if( !$('.widget-line-statistic').hasClass('maximized') ) {
			setTimeout(function () {
				$('#amchart-line-graphic').height($('.widget-line-statistic').height() - 50);
			}, 5);
		} else {
			$('#amchart-line-graphic').height('auto');
		}
		setTimeout(function(){
			dashboardCharts.overallLineChart.validateNow();
		}, 10);

	});

});

function getMaplaceRadius(locData) {
	var maximumRadius = 1000;
	var max = 0;

	for (var i = 0; i < locData.length; i++) {
		if (locData[i].number > max) max = locData[i].number;
	}
	for (var i = 0; i < locData.length; i++) {
		locData[i].radius = locData[i].number / max * maximumRadius;
	}
	return locData;
}

function fillMapLocations(locData) {
	var locations = [];

	for (var i = 0; i < locData.length; i++) {
		locations.push({
			lat: locData[i].lat,
			lon: locData[i].lon,
			title: String(locData[i].number),
			html: '<h4>' + locData[i].number + '</h4>',
			icon: 'http://maps.google.com/mapfiles/markerA.png',
			animation: google.maps.Animation.DROP,
			circle_options: {
				radius: locData[i].radius
			},
			stroke_options: {
				strokeColor: '#aaaa00',
				fillColor: '#eeee00'
			},
			draggable: false
		});
	}
	return locations;
}

function changeMapData(data) {
	maplace.RemoveLocations();
	maplace.AddLocations(fillMapLocations(data));
	maplace.Load();
}


function reload_charts(){
	dashboardCharts.overallLineChart.validateData(); // call this method after data in graphic changed
	dashboardCharts.appInstallsFrom.draw();
	dashboardCharts.extInstallsBrowser.draw();
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

				dashboardCharts.appInstallsFrom.setData([
					{ platform: 'iOS', facebook: iphone.FacebookRegistrations, emails: iphone.EmailRegistrations, annonymous: iphone.AnonymusRegistrations },
					{ platform: 'Android', facebook: android.FacebookRegistrations, emails: android.EmailRegistrations, annonymous: android.AnonymusRegistrations },
					{ platform: 'Windows', facebook: 0, emails: 0, annonymous: 0 }]);

				dashboardCharts.extInstallsBrowser.setData([
					{ browser: 'Chrome', facebook: chrome.FacebookRegistrations, emails: chrome.EmailRegistrations, annonymous: chrome.AnonymusRegistrations },
					{ browser: 'Safari', facebook: safari.FacebookRegistrations, emails: safari.EmailRegistrations, annonymous: safari.AnonymusRegistrations },
					{ browser: 'Firefox', facebook: firefox.FacebookRegistrations, emails: firefox.EmailRegistrations, annonymous: firefox.AnonymusRegistrations },
					{ browser: 'IE', facebook: 0, emails: 0, annonymous: 0 }
				]);

				var totalMobiles = iphone.TotalInstalls + android.TotalInstalls;
				var totalExtensions = chrome.TotalInstalls + firefox.TotalInstalls + safari.TotalInstalls;

				var iphonePercent = getPercentage(iphone.TotalInstalls, totalMobiles);
				var androidPercent = getPercentage(android.TotalInstalls, totalMobiles);

				var chromePercent = getPercentage(chrome.TotalInstalls, totalExtensions);
				var firefoxPercent = getPercentage(firefox.TotalInstalls, totalExtensions);
				var safariPercent = getPercentage(safari.TotalInstalls, totalExtensions);

				$("#progressIphone").css("width", iphonePercent).parent().siblings(".pull-right").text(iphonePercent);
				$("#progressAndroid").css("width", androidPercent).parent().siblings(".pull-right").text(androidPercent);

				$("#progressChrome").css("width", chromePercent).parent().siblings(".pull-right").text(chromePercent);
				$("#progressFirefox").css("width", firefoxPercent).parent().siblings(".pull-right").text(firefoxPercent);
				$("#progressSafari").css("width", safariPercent).parent().siblings(".pull-right").text(safariPercent);

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

				var dataForMap = getMaplaceRadius(response.locations);

				changeMapData(dataForMap);

				reload_charts();
			}
		},
		error: function (error) {
			console.log(error);
		}
	});

	
}

function setTotalValue(id, totalCount) {
	if (totalCount == null)
		totalCount = 0;

	$(id).attr("data-value", totalCount);
}

function findApp(appName, installsObjects) {
	var result = $.grep(installsObjects, function (item) {
		return item.HaveThisApp.toUpperCase().indexOf(appName.toUpperCase()) >= 0;
	});

	if (result.length > 0)
		return result[0];
	else
	{
		return { FacebookRegistrations: 0, EmailRegistrations: 0, AnonymusRegistrations: 0 };
	}
};

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

	var percentage = Math.round(((currentNumber - prevNumber) / (currentNumber)) * 100);

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

	dashboardCharts.appInstallsFrom = Morris.Bar({
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
		xLabelAngle: 45
	});

	dashboardCharts.extInstallsBrowser = Morris.Bar({
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
		xLabelAngle: 45
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
				"useGraphSettings": true
			},
			"titles": [],
			"dataProvider": dashboardCharts.overallLineChartData
		}
	);

}

// dashboardCharts.overallLineChart.validateData(); // call this method after data in graphic changed