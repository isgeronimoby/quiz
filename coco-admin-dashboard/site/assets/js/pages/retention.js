var Churn = {};

$(document).ready(function () {

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
        function (start, end) {
            datePicker.find('span').html('<span class="hidden-xs">From: </span>' + '<span class="startDate">' + start.format('MMMM D, YYYY') + '</span>'
            + ' to ' + '<span class="endDate">' + end.format('MMMM D, YYYY') + '</span>');
//			ReloadReports(start, end);
        }
    );

    function getRandVal() {
        return Math.round(Math.random() * 1000);
    }

    Churn.fakeData = [
        [1000, 700, 600, 500, 400, 70, 20],
        [1200, 549, 336, 221, 122, 115],
        [900, 882, 250, 32, 18],
        [500, 379, 254, 314],
        [400, 256, 120],
        [600, 340],
        [400]
    ];

    Cornelius.draw({
        initialDate: new Date(2014, 0),
        container: document.getElementById('cohort-table'),
        cohort: Churn.fakeData,
        timeInterval: 'monthly',
        drawEmptyCells: false,
        labels: {
            time: 'Time',
            people: 'Users',
            weekOf: 'Week of'
        }
    });

});