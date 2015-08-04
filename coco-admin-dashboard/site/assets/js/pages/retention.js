var Churn = {};

$(document).ready(function () {

    var datePicker = $('#reportrange');
    var weekPicker = datePicker.find('[type="week"]');
    var monthPicker = datePicker.find('[type="month"]');
    var appsDropdown = $('.appchoser > button');
    var userAppsToggle = $('#user-group label');
    var datesToggle = $('#interval-group label');
    var reLaunchCohortBtn = $('.btn-update');
    var dateFrom;


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
            weekPicker.show();
            monthPicker.hide();
        } else {
            weekPicker.hide();
            monthPicker.show();
        }
    });

    //handling app dropdown
    $('.appchoser > ul li a').click(function(e){
        e.preventDefault();
        // do something
    });

    //picking starting date from picker
    //and converting it
    weekPicker.add(monthPicker).on('change', function(){
        dateFrom = moment($(this).val()).toString();
        console.log(dateFrom);
    });

    //click on update button
    reLaunchCohortBtn.click(function(e){

    });

    //showing picker on start
    datesToggle.each(function(ind, el){
        if ($(el).find('input').val() == 'w' && $(el).hasClass('active')) {
            weekPicker.show();
        } else if ( $(el).find('input').val() == 'm' && $(el).hasClass('active') ) {
            monthPicker.show();
        }
    });
    //checking for app needs on start
    userAppsToggle.each(function(ind, el){
        if ( $(el).val() != 'apps' ) appsDropdown.addClass('disabled');
    });
});