	$(window).on('load', function () {
		if ($('#preloader').length) {
				$('#preloader').delay(1000).fadeOut('slow', function () {
				$(this).remove();
			});
		}
	});

	
	$('#submit1').click(function() {
		
		let query = $('#wikiSearch').val();
		
		$.ajax({
			url: "libs/php/getWikipediaSearch.php",
			type: 'POST',
			dataType: 'json',
			data: {
				query: query
			},
			success: function(result) {

				console.log(JSON.stringify(result));

				if (result.status.name == "ok") {
					$('#results').html("");
					for (i = 0; i <= result['data'].length-1; i++){
						$('#results').append(`
						<h2>About ${result['data'][i]['title']}</h2>
						<button onclick="copyFunc()" class="copy" data-lat="${result['data'][i]['lat']}" data-lng="${result['data'][i]['lng']}">Copy coordinates</button>
						<br><br>
						${result['data'][i]['summary']} <br><br>
						<a href="https://${result['data'][i]['wikipediaUrl']}" target="_blank" >Click here to read more</a><hr>
						`)
					};
				}
			
			},
			error: function(jqXHR, textStatus, errorThrown) {
				console.log("no success\n" + errorThrown + "\n" + textStatus + "\n" + jqXHR);
			}
		}); 
	
	});
	
	$('#submit2').click(function() {

		$.ajax({
			url: "libs/php/getWeatherObservation.php",
			type: 'POST',
			dataType: 'json',
			data: {
				lat: $('#lat').val(),
				lng: $('#lng').val()
			},
			success: function(result) {

				console.log(JSON.stringify(result));

				if (result.status.name == "ok") {

					$('#results').html(`
					<h2>Most recent weather observation</h2> <br><br>
					Observation station's name: ${result['data']['weatherObservation']['stationName']} <br>
					Temperature: ${result['data']['weatherObservation']['temperature']}\u2103 <br>
					Clouds: ${result['data']['weatherObservation']['clouds']} <br>
					Humidity: ${result['data']['weatherObservation']['humidity']}% <br>
					Wind speed: ${result['data']['weatherObservation']['windSpeed']} mph <br>
					Time of observation: ${result['data']['weatherObservation']['datetime']}
					`);
				}
			
			},
			error: function(jqXHR, textStatus, errorThrown) {
				console.log("no success\n" + errorThrown + "\n" + textStatus + "\n" + jqXHR);
			}
		}); 
	
	});
	
	$('#submit3').click(function() {
			
		let lat = $('#lat-2').val();
		let lng = $('#lng-2').val();
		let radius = $('#radius').val();

		$.ajax({
			url: "libs/php/getOceanName.php",
			type: 'POST',
			dataType: 'json',
			data: {
				lat: lat,
				lng: lng,
				radius: radius
			},
			success: function(result) {

				console.log(JSON.stringify(result));

				if (result.status.name == "ok") {

					if (result['data']['ocean']){
						
					$('#results').html(`
						<h2>Ocean near within given radius</h2> <br><br>
						The ${result['data']['ocean']['name']} is<br>
						${result['data']['ocean']['distance']} miles away from the above location.
					`);
						
					} else {
						
					$('#results').html("We are afraid we could not find an ocean in the area.");
					
					}
					

				}
			
			},
			error: function(jqXHR, textStatus, errorThrown) {
				console.log("no success\n" + errorThrown + "\n" + textStatus + "\n" + jqXHR);
			}
		}); 
	
	});
	
	copyFunc = () => {
		$('#lat').val($(event.target).data('lat'));
		$('#lng').val($(event.target).data('lng'));
		$('#lat-2').val($(event.target).data('lat'));
		$('#lng-2').val($(event.target).data('lng'));
	};
	
	
	
	$('#radius').change(function() {
		$('#radiusLabel').html($('#radius').val());
	});