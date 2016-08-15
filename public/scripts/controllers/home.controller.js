(function() {
	'use strict';

	angular
		.module('myApp')
		.controller('homeController', homeController);

	homeController.$inject = ['$rootScope', '$scope', '$state', '$places'];

	function homeController($rootScope, $scope, $state, $places) {
		
		init();

		function init() {
			
		$scope.autocompleteOptions = {
			componentRestrictions: { country: 'il' },
			types: ['geocode'],
			language: 'he-IL'
		};
		
		$scope.$watch('location', function(newValue, oldValue) {
			if(isObject($scope.location)) {
				var lat = $scope.location.geometry.location.lat();
				var lang =$scope.location.geometry.location.lng();
				$places.findPlaces(lat, lang).then(function (data) {
					console.log(data);	
				});
			}
		});

		}
		
		function isObject(a) {
		    return (!!a) && (a.constructor === Object);
		};
	}
	
})();