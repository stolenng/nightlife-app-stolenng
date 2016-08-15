(function() {
	'use strict';

	angular
		.module('myApp')
		.service('$places', placesService);

	placesService.$inject = ['$rootScope', '$http'];

	function placesService($rootScope, $http) {
		
		var baseUrl = window.location.origin;
		
		var apiKey = "AIzaSyDArid2ZZxQAHLF3XnU8JqF-DQvx-5vUr0";
	    
	    function findPlaces(lat, lang) {
	        return $http.jsonp(
	        	"https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + lat + "," + lang + "&radius=3000&type=bar&language=iw&key=" + apiKey + "&callback=JSON_CALLBACK"
	        );
	    }
	    
	 
        
		
		return { 
		    findPlaces : findPlaces
		}
	}
})();