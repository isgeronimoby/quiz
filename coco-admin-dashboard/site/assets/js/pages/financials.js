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

	// example of the JSON
	var tableJSON = [
		{
			appname: 'Firefox',
			installs: 1000,
			active: 300,
			purchasers: 122,
			purchases: 450,
			purchasedAmount: 301,
			afRevenue: 15,
			installRevenue: 1.5
		},
		{
			appname: 'Chrome',
			installs: 1300,
			active: 350,
			purchasers: 162,
			purchases: 420,
			purchasedAmount: 256,
			afRevenue: 18,
			installRevenue: 1.2
		}
	];

	// updating data in the table
	function addRowsToTable(data){

		$.each(data, function(index, value){
			value.purchasedAmount = '&pound;' + value.purchasedAmount;
			value.afRevenue = '&pound;' + value.afRevenue;
			value.installRevenue = '&pound;' + value.installRevenue.toFixed(2);
		});

		$('#export-table-apps').DataTable( {
			dom: 'T<"clear">lfrtip',
			tableTools: {
				"sSwfPath": "./assets/libs/jquery-datatables/extensions/TableTools/swf/copy_csv_xls_pdf.swf"
			},
			paging: false,
			info: false,
			data: data,
			searching: false,
			"columns": [
				{ "data": "appname" },
				{ "data": "installs" },
				{ "data": "active" },
				{ "data": "purchasers" },
				{ "data": "purchases" },
				{ "data": "purchasedAmount" },
				{ "data": "afRevenue" },
				{ "data": "installRevenue" }
			]
		});
	}

	addRowsToTable(tableJSON);

});