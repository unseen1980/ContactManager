var cmApp = angular.module('cmApp',['ui.router','ngResource']);

cmApp.factory('Contacts',function($resource){
	return $resource('http://localhost:8080/api/contacts/:id',{id:'@id'},{
        update: {
            method: 'PUT'
        }
    });
});

cmApp.config(function($stateProvider){
	$stateProvider.state('contacts', { // state for showing all movies
	    url: '/contacts',
	    templateUrl: 'partials/contacts.html',
	    controller: 'mainCtrl'
	  }).state('viewContact', { //state for showing single movie
	    url: '/contacts/:id/view',
	    templateUrl: 'partials/contact_viewSingle.html',
	    controller: 'mainCtrl'
	  }).state('newContact', { //state for adding a new movie
	    url: '/contacts/new',
	    templateUrl: 'partials/contact_add.html',
	    controller: 'mainCtrl'
	  }).state('editContact', { //state for updating a movie
	    url: '/contacts/:id/edit',
	    templateUrl: 'partials/contact_edit.html',
	    controller: 'mainCtrl'
	  });	
}).run(function($state){
	$state.go('contacts')
})

cmApp.controller('mainCtrl', function($scope, $state, $stateParams, $window, Contacts) {

    $scope.contacts = Contacts.query();

    $scope.contact = new Contacts(); 

    $scope.currentContact ={};
   
    $scope.addContact = function() { 
        $scope.contact.$save(function() {
            $state.go('contacts');
        });
    };

    $scope.deleteContact = function(contact) {
        contact.$delete(function() {
            $window.location.href = '';   
        });
    };

    $scope.getContact = function(){
    	$scope.contact.$get({ id: $stateParams.id });  
    }

	$scope.updateContact = function() {
	    $scope.contact.$update(function() {
	      $state.go('contacts'); 
	    });
	  };  
});


