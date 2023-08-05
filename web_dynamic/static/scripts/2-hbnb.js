// Request http://0.0.0.0:5001/api/v1/status/:
// If in the status is “OK”, add the class available to the div#api_status
// Otherwise, remove the class available to the div#api_status

$(document).ready(function () {
    const amenityDict = {};
    $('input[type="checkbox"]').click(function () {
        if ($(this).is(':checked')) {
            amenityDict[$(this).attr('data-id')] = $(this).attr('data-name');
        } else {
            delete amenityDict[$(this).attr('data-id')];
        }
        const amenityList = Object.values(amenityDict);
        if (amenityList.length === 0) {
            $('.amenities h4').html('&nbsp;');
        } else {
            $('.amenities h4').text(Object.values(amenityDict).join(', '));
        }
    });
})

$.get('http://0.0.0.0:5001/api/v1/status/', function (data, status) {
    if (status === 'success') {
        $('DIV#api_status').addClass('available');
    } else {
        $('DIV#api_status').removeClass('available');
    }
})
