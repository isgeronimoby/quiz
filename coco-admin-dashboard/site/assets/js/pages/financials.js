var Financials = {};

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
	Financials.tableJSON = [
		{
			appname: 'Firefox',
			installs: 1000,
			active: 300,
			purchasers: 1,
			purchases: 450,
			purchasedAmount: 301,
			afRevenue: 15,
			installRevenue: 1.45
		},
		{
			appname: 'Chrome',
			installs: 1300,
			active: 350,
			purchasers: 12,
			purchases: 420,
			purchasedAmount: 256,
			afRevenue: 18,
			installRevenue: 156.68
		},
		{
			appname: 'Safari',
			installs: 1300,
			active: 350,
			purchasers: 150,
			purchases: 420,
			purchasedAmount: 256,
			afRevenue: 18,
			installRevenue: 3.37
		},
		{
			appname: 'Internet Explorer',
			installs: 1300,
			active: 350,
			purchasers: 8,
			purchases: 420,
			purchasedAmount: 256,
			afRevenue: 18,
			installRevenue: 4.71
		}
	];

	Financials.formatTableData = function(data) {
		var tempArray = $.extend(true, [], data);
		$.each(tempArray, function(index, value){
			value.purchasedAmount = '&pound;' + value.purchasedAmount;
			value.afRevenue = '&pound;' + value.afRevenue;
			value.installRevenue = '&pound;' + value.installRevenue.toFixed(2);
		});

		return tempArray;
	};

	// initializing table with default data
	var tableExportButtonsArray = !($.browser.mobile) ? ["copy", "csv", "xls", "pdf"] : [];
	Financials.tableRows = $('#export-table-apps').DataTable({
		dom: 'T<"clear">lfrtip',
		tableTools: {
			"sSwfPath": "./assets/libs/jquery-datatables/extensions/TableTools/swf/copy_csv_xls_pdf.swf",
			aButtons: tableExportButtonsArray
		},
		paging: false,
		info: false,
		data: Financials.formatTableData(Financials.tableJSON),
		searching: false,
		"columns": [
			{ "data": "appname", type: 'natural' },
			{ "data": "installs", type: 'natural' },
			{ "data": "active", type: 'natural' },
			{ "data": "purchasers", type: 'natural' },
			{ "data": "purchases", type: 'natural' },
			{ "data": "purchasedAmount", type: 'natural' },
			{ "data": "afRevenue", type: 'natural' },
			{ "data": "installRevenue", type: 'natural' }
		]
	});

	//update table with your data
	Financials.updateTableRows = function(data){
		if(data) {
			Financials.tableRows.clear().draw();
			Financials.tableRows.rows.add(Financials.formatTableData(data)).draw();
		}
	};

	ReloadReports(moment().subtract('days', 29), moment());
});

function ReloadReports(start, end) {
	$.ajax({
		type: "POST",
		url: getFinancialsUrl,
		data: { From: start.format("YYYY-MM-DD"), To: end.format("YYYY-MM-DD") },
		dataType: "json",
		success: function (response) {
			if (response.status == "success") {
				setTotalValue("#totalUsersEarned", response.totals.UsersEarned);
				setTotalValue("#totalDonations", response.totals.Donations);
				setTotalValue("#totalLRProfit", response.totals.LRProfit);
				setTotalValue("#totalAffiliateRevenue", response.totals.TotalAffiliateRevenue);

				$('.animate-number').each(function () {
					$(this).animateNumbers($(this).attr("data-value"), true, parseInt($(this).attr("data-duration")));
				});

				Financials.updateTableRows(response.tableData);
			}
		},
		error: function (error) {
			console.log(error);
		}
	});
}