jQuery(document).ready(function ($) {
    'use strict';

    var fakeData = {
        'userReport': {
            'info': {
                'UserId': '32332bae-2cfe-4a93-9ea3-2564dc82ad6d',
                'Email': 'yury@loyalty-rewarded.com',
                'Username': 'Yury Prakapovich',
                'Facebook': 'https://www.facebook.com/profile.php?id=1541810632699975',
                'CreatedOn': '2014-10-29 12:54:55',
                'LastVisitDate': '2015-11-26 11:20:43',
                'InvitedByUserId': null,
                'IsBlocked': false
            },
            'applications': [{
                'ApplicationId': '67b26006-0d89-46b3-9441-9f20dbbd0a8f',
                'Title': 'Everton Chrome Extension',
                'CreatedOn': '2015-10-27 01:42:01',
                'LastVisitDate': '2015-10-27 03:07:47',
                'IsBlocked': false
            }],
            'activities': [{
                'Title': 'InviteToChallenge',
                'Date': '2015-11-26 11:26:28'
            },
                {
                    'Title': 'CreateAccount',
                    'Date': '2014-10-29 12:54:55'
                }],
            'wallet': {
                'MoneyPending': '53.00',
                'MoneyConfirmed': '-12.65',
                'DonationsPending': '21.20',
                'DonationsConfirmed': '52.94',
                'PurchasesCount': 68
            },
            'transactions': [{
                'Type': 'Redemption',
                'Direction': 'Outflow',
                'Status': 'Completed',
                'Amount': '5.00',
                'ApplicationId': null,
                'CreatedOn': '2015-02-19 09:08:12'
            },
                {
                    'Type': 'Redemption',
                    'Direction': 'Outflow',
                    'Status': 'Completed',
                    'Amount': '30.00',
                    'ApplicationId': null,
                    'CreatedOn': '2015-02-19 08:49:38'
                },
                {
                    'Type': 'Redemption',
                    'Direction': 'Outflow',
                    'Status': 'Completed',
                    'Amount': '100.00',
                    'ApplicationId': null,
                    'CreatedOn': '2015-02-19 08:49:20'
                },
                {
                    'Type': 'Commission',
                    'Direction': 'Inflow',
                    'Status': 'Completed',
                    'Amount': '0.50',
                    'ApplicationId': null,
                    'CreatedOn': '2015-02-03 12:36:42'
                },
                {
                    'Type': 'Commission',
                    'Direction': 'Inflow',
                    'Status': 'Completed',
                    'Amount': '1.00',
                    'ApplicationId': null,
                    'CreatedOn': '2015-01-27 11:48:37'
                }],
            'commissions': [{
                'AffiliateNetwork': 'AffiliateWindow',
                'UserId': '32332bae-2cfe-4a93-9ea3-2564dc82ad6d',
                'AplicationId': null,
                'ClickRef': '32332BAE-2CFE-4A93-9EA3-2564DC82AD6D',
                'PurchaseDate': '2015-02-19',
                'ImportDate': '2015-02-19',
                'ExtId': 73924,
                'Status': 'declined',
                'Amount': 10.00,
                'SaleAmount': 250.00,
                'PartnerId': null,
                'PartnerName': null
            },
                {
                    'AffiliateNetwork': 'AffiliateWindow',
                    'UserId': '32332bae-2cfe-4a93-9ea3-2564dc82ad6d',
                    'AplicationId': null,
                    'ClickRef': '32332BAE-2CFE-4A93-9EA3-2564DC82AD6D',
                    'PurchaseDate': '2015-02-03',
                    'ImportDate': '2015-02-03',
                    'ExtId': 34526,
                    'Status': 'closed',
                    'Amount': 1.00,
                    'SaleAmount': 25.00,
                    'PartnerId': null,
                    'PartnerName': null
                },
                {
                    'AffiliateNetwork': 'AffiliateWindow',
                    'UserId': '32332bae-2cfe-4a93-9ea3-2564dc82ad6d',
                    'AplicationId': null,
                    'ClickRef': '32332bae-2cfe-4a93-9ea3-2564dc82ad6d',
                    'PurchaseDate': '2015-01-27',
                    'ImportDate': '2015-01-27',
                    'ExtId': 74693,
                    'Status': 'closed',
                    'Amount': 1.00,
                    'SaleAmount': 25.00,
                    'PartnerId': null,
                    'PartnerName': null
                },
                {
                    'AffiliateNetwork': 'AffiliateWindow',
                    'UserId': '32332bae-2cfe-4a93-9ea3-2564dc82ad6d',
                    'AplicationId': null,
                    'ClickRef': '32332BAE-2CFE-4A93-9EA3-2564DC82AD6D',
                    'PurchaseDate': '2015-01-26',
                    'ImportDate': '2015-01-26',
                    'ExtId': 57708,
                    'Status': 'closed',
                    'Amount': 3.00,
                    'SaleAmount': 75.00,
                    'PartnerId': null,
                    'PartnerName': null
                },
                {
                    'AffiliateNetwork': 'AffiliateWindow',
                    'UserId': '32332bae-2cfe-4a93-9ea3-2564dc82ad6d',
                    'AplicationId': null,
                    'ClickRef': '32332BAE-2CFE-4A93-9EA3-2564DC82AD6D',
                    'PurchaseDate': '2014-11-14',
                    'ImportDate': '2014-11-14',
                    'ExtId': 57690,
                    'Status': 'closed',
                    'Amount': 3.10,
                    'SaleAmount': 77.50,
                    'PartnerId': null,
                    'PartnerName': null
                }],
            'redemptions': [{
                'Code': '5PAB-WM3TGY-DD662E',
                'Amount': 5.0000,
                'CreatedOn': '2015-02-02 10:57:24',
                'RedeemedOn': '2015-02-19 09:08:26'
            },
                {
                    'Code': '8O4G-X4YOOC-Y81199',
                    'Amount': 30.0000,
                    'CreatedOn': '2015-02-02 11:03:07',
                    'RedeemedOn': '2015-02-19 08:49:52'
                },
                {
                    'Code': 'AAA',
                    'Amount': 100.0000,
                    'CreatedOn': '2015-01-19 11:30:59',
                    'RedeemedOn': '2015-02-19 08:49:33'
                },
                {
                    'Code': '5ABC-WG3TOM-XX003A',
                    'Amount': 10.0000,
                    'CreatedOn': '2014-12-05 12:39:45',
                    'RedeemedOn': '2014-12-05 12:40:37'
                }],
            'draws': [
                {
                    'Prize': 'Exclusive Goodison Road Tee',
                    'StartDate': '2015-10-27 12:00:00',
                    'EndDate': '2015-10-31 12:00:00',
                    'IsDrawn': true,
                    'Tickets': 20,
                    'LastFacebookShareDate': '2015-10-27 01:55:49',
                    'LastTwitterShareDate': '2015-10-27 01:56:19',
                    'IsWinner': true
                },
                {
                    'Prize': 'an Everton Cap!',
                    'StartDate': '2015-09-01 12:00:00',
                    'EndDate': '2015-09-30 04:00:00',
                    'IsDrawn': true,
                    'Tickets': 25,
                    'LastFacebookShareDate': '2015-09-02 12:05:00',
                    'LastTwitterShareDate': '2015-09-02 12:06:50',
                    'IsWinner': true
                },
                {
                    'Prize': 'an Everton shirt signed by the team',
                    'StartDate': '2015-07-27 12:00:00',
                    'EndDate': '2015-08-22 12:00:00',
                    'IsDrawn': true,
                    'Tickets': 15,
                    'LastFacebookShareDate': null,
                    'LastTwitterShareDate': null,
                    'IsWinner': true
                }
            ]
        }
    };
    var typeButtons = $('.form-radio-buttons .form-inline .form-group > div');

    $('#idType label').on('click', function(e){

        if ($(this).find('input').val() == 'email') {
            typeButtons.removeClass('active');
            $('#emailInput').addClass('active');
        } else {
            typeButtons.removeClass('active');
            $('#idInput').addClass('active');
        }
    });

    function tableConstructor(key, value){

        var tableLayoutWidth;

        function getRows(value) {
            var rowHeading = '',
                rowValue = '';
            if (value.length) {
                // array
                tableLayoutWidth = 'array';
                value.forEach(function(el, ind){
                    tableLayoutWidth = Object.keys(el).length > 2 ? tableLayoutWidth : 'object';
                    rowValue += '<tr>';
                    if (ind === 0) {
                        rowHeading += '<thead><tr>';
                        $.each(el, function(heading, content){
                            rowHeading += '<th>' + heading + '</th>';
                            rowValue += '<td>' + content + '</td>';
                        });
                        rowHeading += '</tr></thead>';
                    } else {
                        $.each(el, function(heading, content){
                            rowValue += '<td>' + content + '</td>';
                        });
                    }
                    rowValue += '</tr>';
                });
                return rowHeading + rowValue;

            } else {
                //object
                tableLayoutWidth = 'object';
                $.each(value, function(ind, el){
                    rowValue += '<tr><th>' + ind + '</th>' + '<td>' + el + '</td></tr>';
                });
                return rowValue;
            }
        }

        var tableContent = getRows(value);

        return '<div class="col-md-' + (tableLayoutWidth === 'array' ? 12 : 6)  + '">' +
            '<div class="widget">' +
            '<div class="widget-header transparent">' +
            '<h2><strong>' + key + '</strong></h2>' +
            '<div class="additional-btn">' +
            '<a href="#" class="widget-toggle"><i class="icon-down-open-2"></i></a>' +
            '</div>' +
            '</div>' +
            '<div class="widget-content widget-content-unlimited">' +
            '<div class="table-responsive">' +
            '<table data-sortable class="table table-hover">' +
            tableContent +
            '</table>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>';
    }


    function fillTables(data) {

        var tablesArea = $('#userTables');
        tablesArea.html('');

        $.each(data.userReport, function(key, value){
            tablesArea.append(tableConstructor(key, value));
        });
        tablesArea.find('> div').not(':contains("' + Object.keys(data.userReport)[0] +
        '")').find('.widget-toggle').click();
    }

    fillTables(fakeData);

});