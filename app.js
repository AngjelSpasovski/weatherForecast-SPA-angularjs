// MODULE
var weatherApp = angular.module('weatherApp', ['ngRoute', 'ngResource']);

// ROUTES
weatherApp.config(function ($routeProvider) {
   
    $routeProvider
    
    .when('/', {
        templateUrl: 'pages/home.htm',
        controller: 'homeController'
    })
    
    .when('/forecast', {
        templateUrl: 'pages/forecast.htm',
        controller: 'forecastController'
    })
    
    .when('/forecast/:days', {
        templateUrl: 'pages/forecast.htm',
        controller: 'forecastController'
    })
    
});

// ***************************************** SERVICES ***

weatherApp.service('cityService', function(){
		
		// default value
		this.city = "New York,NY";
});


// ***************************************** CONTROLLERS ***

// Home Controller
weatherApp.controller('homeController', ['$scope','cityService' 
	, function($scope, cityService) {
    	
    	// took the value 'city' from the custom service default value
		$scope.city = cityService.city;

		// watcher that watches if the value 'city' on the scope has changed!
		$scope.watch('city', function(){
			
			// when the value is changed 
			// it goin to update the cityService value of 'city' with the current value
			cityService.city = $scope.city;
		});

		
}]);


// Forecast Controller
weatherApp.controller('forecastController', ['$scope', '$resource', '$routeParams', 'cityService' 
	, function($scope, $resource, $routeParams, cityService) {
    
    	// took the value 'city' from the custom service default value
		$scope.city = cityService.city;
    
    $scope.days = $routeParams.days || 2;
    
    $scope.weatherAPI = $resource("http://api.openweathermap.org/data/2.5/forecast/daily", { callback: "JSON_CALLBACK" }, { get: { method: "JSONP" }});
    
    $scope.weatherResult = $scope.weatherAPI.get({ q: $scope.city, cnt: $scope.days });
    
    $scope.convertToFahrenheit = function(degK) {
        
        return Math.round((1.8 * (degK - 273)) + 32);
        
    }
    
    $scope.convertToDate = function(dt) { 
      
        return new Date(dt * 1000);
        
    };
	    
}]);