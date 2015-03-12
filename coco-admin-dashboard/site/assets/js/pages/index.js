var timer;

$(document).ready(function(){
      var cityAreaData = [
        500.70,
        410.16,
        210.69,
        120.17,
        64.31,
        150.35,
        130.22,
        120.71,
        300.32
    ];

    $('#vector-map').vectorMap({
        map: 'world_mill_en',
        normalizeFunction: 'polynomial',
        zoomOnScroll:true,
        focusOn:{
            x: 0,
            y: 0,
            scale: 0.9
        },
        zoomMin:0.9,
        hoverColor: false,
        regionStyle:{
            initial: {
                fill: '#bbbbbb',
                "fill-opacity": 1,
                stroke: '#a5ded9',
                "stroke-width": 0,
                "stroke-opacity": 0
            },
            hover: {
                "fill-opacity": 0.8
            }
        },
        markerStyle: {
            initial: {
                fill: '#F57A82',
                stroke: 'rgba(230,140,110,.8)',
                "fill-opacity": 1,
                "stroke-width": 9,
                "stroke-opacity": 0.5,
                r: 3
            },
            hover: {
                stroke: 'black',
                "stroke-width": 2
            },
            selected: {
                fill: 'blue'
            },
            selectedHover: {
            }
        },
        backgroundColor: '#ffffff',
        markers :[

            {latLng: [35.85, -77.88], name: 'Rocky Mt,NC'},
            {latLng: [32.90, -97.03], name: 'Dallas/FW,TX'},
            {latLng: [41.00, 28.96], name: 'Istanbul, TR'},
            {latLng: [39.37, -75.07], name: 'Millville,NJ'}

        ],
        series: {
            markers: [{
                attribute: 'r',
                scale: [3, 7],
                values: cityAreaData
            }]
        }
    });

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
		}
	);
	datePicker.on('apply.daterangepicker', function(ev, picker) {
		console.log(picker.startDate.format('YYYY-MM-DD'));
		console.log(picker.endDate.format('YYYY-MM-DD'));
	});

	// SORTABLE ELEMENTS -> UNCOMMENT AJAX TO SEND POSITIONS
	$( ".portlets" ).sortable({
		connectWith: ".portlets",
		handle: ".widget-header",
		cancel: ".modal-widget",
		opacity: 0.5,
		dropOnEmpty: true,
		forcePlaceholderSize: true,
		receive: function(event, ui) {$("body").trigger("resize")},
		update: function (event, ui) {
			var data = $(this).sortable('serialize');
			console.log(data);
			// POST to server using $.post or $.ajax
			/*		$.ajax({
			 data: data,
			 type: 'POST',
			 url: '/your/url/here'
			 });*/
		}
	});

  load_charts();
});


function reload_charts(){
  	window.morrisLineGraphic.redraw();
}


// LINE BAR
function load_charts(){
    //MORRIS
    window.morrisLineGraphic = Morris.Line({
        element: 'morris-home',
        padding: 20,
        behaveLikeLine: true,
        gridEnabled: false,
        gridLineColor: '#dddddd',
        axes: true,
        resize: true,
        smooth: false,
        pointSize: 3,
        lineWidth: 2,
        fillOpacity:0.85,
        data: [
          {period: '2012-02-11', iphone: 4666, ipad: 3666, itouch: 2666},
          {period: '2012-02-12', iphone: 4441, ipad: 3441, itouch: 2441},
          {period: '2012-02-13', iphone: 16501, ipad: 14501, itouch: 3501},
          {period: '2012-02-14', iphone: 7689, ipad: 6689, itouch: 5689},
          {period: '2012-02-15', iphone: 4666, ipad: 3666, itouch: 2666},
          {period: '2012-02-16', iphone: 4441, ipad: 3441, itouch: 2441},
          {period: '2012-02-17', iphone: 6501, ipad: 4501, itouch: 2501},
          {period: '2012-02-18', iphone: 7689, ipad: 6689, itouch: 5689},
          {period: '2012-02-19', iphone: 2293, ipad: 1293, itouch: 293},
          {period: '2012-02-20', iphone: 5881, ipad: 3881, itouch: 1881},
          {period: '2012-02-21', iphone: 5588, ipad: 3588, itouch: 1588},
          {period: '2012-02-22', iphone: 15073, ipad: 8967, itouch: 5175},
          {period: '2012-02-23', iphone: 10687, ipad: 4460, itouch: 2028},
          {period: '2012-02-24', iphone: 12432, ipad: 5713, itouch: 3791}
        ],
        lineColors:['#abb7b7','#ABC8E2','#183152'],
        xkey: 'period',
        redraw: true,
        ykeys: ['iphone', 'ipad', 'itouch'],
        labels: ['All Visitors', 'Returning Visitors'],
        hideHover: 'auto'
    });


	var chartColors = ["#679BDF","#edce8c","#afb3bf"];

	window.appInstallsFrom = Morris.Bar({
		element: 'app-installs-from',
		resize: true,
		data: [
			{ platform: 'iOS', facebook: 45,  emails: 25, annonymous: 40 },
			{ platform: 'Android', facebook: 17,  emails: 40, annonymous: 30 },
			{ platform: 'WinPhone', facebook: 75,  emails: 15, annonymous: 35 },
			{ platform: 'BlackBerry', facebook: 50,  emails: 36, annonymous: 24 }
		],
		xkey: 'platform',
		ykeys: ['facebook', 'emails', 'annonymous'],
		labels: ['Facebook', 'Emails', 'Annon'],
		barColors: chartColors
	});

	window.extInstallsBrowser = Morris.Bar({
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
		labels: ['Facebook', 'Emails', 'Annon'],
		barColors: chartColors
	});
}
//http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20csv%20where%20url%3D%27http%3A%2F%2Fdownload.finance.yahoo.com%2Fd%2Fquotes.csv%3Fs%3dDOW%2CNASDAQ%2CSP%26f%3Dsl1d1t1c1ohgv%26e%3D.csv%27%20and%20columns%3D%27symbol%2Cprice%2Cdate%2Ctime%2Cchange%2Ccol1%2Chigh%2Clow%2Ccol2%27&format=json&diagnostics=true&callback=