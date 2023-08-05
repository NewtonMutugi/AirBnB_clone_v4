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

$.ajax({
    url: 'http://0.0.0.0:5001/api/v1/places_search/',
    type: 'POST',
    contentType: 'application/json',
    dataType: 'json',
    data: '{}',
    success: function (data) {
        for (const place of data) {
            $('SECTION.places').append(
                `<article>
                    <div class="title_box">
                        <h2>${place.name}</h2>
                        <div class="price_by_night">$${place.price_by_night}</div>
                    </div>
                    <div class="information">
                        <div class="max_guest">${place.max_guest} Guest${place.max_guest !== 1 ? 's' : ''}</div>
                        <div class="number_rooms">${place.number_rooms} Bedroom${place.number_rooms !== 1 ? 's' : ''}</div>
                        <div class="number_bathrooms">${place.number_bathrooms} Bathroom${place.number_bathrooms !== 1 ? 's' : ''}</div>
                    </div>
                    <div class="description">${place.description}</div>
                </article>`
            );
        }
    }
})
