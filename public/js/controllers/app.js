var app		=	angular.module('myapp', []);

app.controller('userController', function($scope, $http){


	var refresh	=	function(){
		$http.get('/userslist').then(function(response){
			//console.log('i got the data I requested');
			$scope.users 			= 	response.data;
			$scope.user.name 		=	"";
			$scope.user.email 		=	"";
			$scope.user.phone 		=	"";
		});
	};

	refresh();

	$scope.addUser = function(){
		//console.log($scope.employee);
		$http.post('/userslist', $scope.user).then(function(response){
			//console.log(response);
			refresh();
		});
	};

	$scope.removeUser = function(id){
		//console.log(id);
		$http.delete('/userslist/'+id).then(function(response){
			refresh();
		});	
	}

	//Edit

	$scope.editUser = function(id)
	{
		//console.log(id);
		$http.get('/userslist/'+id).then(function(response){
			$scope.user = response.data;
		});
	}

	// Update-record

	$scope.updateUser = function(){
		//console.log($scope.employee._id);
		$http.put('/userslist/'+$scope.user._id, $scope.user).then(function(response){
			refresh();
		});
	}


	// reset-fields

	$scope.resetFields = function(){
		$scope.user.name = "";
		$scope.user.email = "";
		$scope.user.phone = "";
	}

});