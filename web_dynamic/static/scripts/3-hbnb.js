// Request http://0.0.0.0:5001/api/v1/places_search/:
// Description of this endpoint here. If this endpoint is not available, you will have to add it to the API (you can work all together for creating this endpoint)
// Send a POST request with Content-Type: application/json and an empty dictionary in the body - cURL version: curl "http://0.0.0.0:5001/api/v1/places_search" -XPOST -H "Content-Type: application/json" -d '{}'
// Loop into the result of the request and create an article tag representing a Place in the section.places. (you can remove the Owner tag in the place description)

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

const search = (filters = {}) => {
    $.ajax({
        url: 'http://localhost:5001/api/v1/places_search',
        type: 'POST',
        data: JSON.stringify({ 'amenities': Object.keys(amenityDict) }),
        dataType: 'json',
        contentType: 'application/json',
        success: function (data) {
            $('section.places').empty();
            $('section.places').append('<h1>Places</h1>');
            for (const place of data) {
                const template = `<article>
                                    <div class="title_box">
                                        <h2>${place.name}</h2>
                                        <div class="price_by_night">$${place.price_by_night}</div>
                                    </div>
                                    <div class="information">
                                        <div class="max_guest">${place.max_guest} Guest${place.max_guest !== 1 ? 's' : ''}</div>
                                        <div class="number_rooms">${place.number_rooms} Bedroom${place.number_rooms !== 1 ? 's' : ''}</div>
                                        <div class="number_bathrooms">${place.number_bathrooms} Bathroom${place.number_bathrooms !== 1 ? 's' : ''}</div>
                                    </div>
                                    <div class="description">
                                        ${place.description}
                                    </div>
                                </article>`;
                $('section.places').append(template);
            }
        }
    });
}

