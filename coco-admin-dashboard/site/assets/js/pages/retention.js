var Churn = {};

$(document).ready(function () {

    var datepicker = $('.datepicker');
    var corTable = $('.cornelius-table');
    var appsDropdown = $('.appchoser > button');
    var userAppsToggle = $('#user-group label');
    var datesToggle = $('#interval-group label');
    var reLaunchCohortBtn = $('.btn-update');
    var dateFrom, weekNumber, weekMonth, allRows;
    var allDataCells;

    datepicker.datepicker({
        calendarWeeks: true,
        format: 'yyyy-mm-dd',
        weekStart: 1
    }).on('changeDate', function(e){
        fullDate = e.date;
        if (weekMonth == 'w') {
            weekNumber = $('td.day.active').parent().find('.cw').html();
            dateFrom = moment(e.date.getFullYear() + '-W' + weekNumber)._d;
        } else {
            dateFrom = e.date.getFullYear() + '/' + e.date.getMonth();
        }
    });

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
    allRows = $(corTable.find('tr td')['selector']).parent();
    allDataCells = $('.cornelius-percentage');

    //Clicking on user/app switch
    //Disabling/enabling app changing
    userAppsToggle.click(function(e){
        if ($(this).find('input').val() != 'apps') {
            appsDropdown.addClass('disabled');
        } else {
            appsDropdown.removeClass('disabled');
        }
    });

    //Clicking on month/week switch
    //And showing appropriate picker
    datesToggle.click(function(){
        if ($(this).find('input').val() == 'w') {
            weekMonth = 'w';
        } else {
            weekMonth = 'm';
        }
    });

    //handling app dropdown
    $('.appchoser > ul li a').click(function(e){
        e.preventDefault();
        // do something
    });


    //click on update button
    reLaunchCohortBtn.click(function(e){

    });

    //showing picker on start
    datesToggle.each(function(ind, el){
        if ($(el).find('input').val() == 'w' && $(el).hasClass('active')) {
            weekMonth = 'w';
        } else if ( $(el).find('input').val() == 'm' && $(el).hasClass('active') ) {
            weekMonth = 'm';
        }
    });
    //checking for app needs on start
    userAppsToggle.each(function(ind, el){
        if ( $(el).val() != 'apps' ) appsDropdown.addClass('disabled');
    });

    allDataCells.each(function(ind, elem){
        $(elem).attr('data-toggle', 'tooltip');
    });

    allDataCells.on('mouseover', function(e){
        var shift = +$(corTable.find('tr th:nth-child(' + ($(this).index() + 1) + ')')['selector']).html();
        var currentRowLabel = $(this).parent().find('.cornelius-label').html();
        var currentRowNumber = $(this).parent().index() - 2;
        var shiftedRowLabel = $(allRows.toArray()[shift + currentRowNumber]).find('.cornelius-label').html();
        var currentPercent = e.currentTarget.innerHTML + '%';
        var tooltip = currentPercent + ' of ' + currentRowLabel + ' registered users last visited in ' + shiftedRowLabel;

        $(this).attr('title', tooltip);
    });

});