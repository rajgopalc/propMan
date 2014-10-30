'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  controller('AppCtrl', function ($scope, $http) {

    $http({
      method: 'GET',
      url: '/api/name'
    }).
    success(function (data, status, headers, config) {
      $scope.name = data.name;
    }).
    error(function (data, status, headers, config) {
      $scope.name = 'Error!';
    });

  }).
  controller('ShowPropertyCntrl', function($scope, $http, $window){
    $scope.editorStatus = "editor-off";
    $http({
        method : 'GET',
        url : '/showPropertyFilePaths'
    }).
    success(function (data, status, headers, config) {
      $scope.configFilesArray = data;
    }).
    error(function (data, status, headers, config) {
      $scope.configFilesArray = [];
    });
      
    $scope.showHello = function(){
         $window.alert("Hello");
    }
    
    $scope.readFile = function(FileId){
        $scope.divShow = false;
        $scope.editorStatus = "editor-on";
        $scope.configFilesArray.forEach(function(conf_file){
            if(conf_file.Id == FileId){
                 $scope.fileChosen = conf_file.File;
                 $scope.chosenFileId = conf_file.Id;
                 $http({
                    method: 'GET',
                    url: '/readFile/'+conf_file.File
                 }).
                 success(function(fileContent,status,headers,config){
                    $scope.FileContent = fileContent
                 }).
                 error(function(errData,status,headers,config){
                    $scope.FileContent = undefined;
                 })
            }
        });
        $scope.divShow = true;
    };
      
    $scope.commitChanges = function(){
        $http.post('/commitFile', {filename: $scope.fileChosen, data: $scope.FileContent}).
          success(function(data, status, headers, config) {
                if(data == "Success"){
                    $window.alert("Changes are written");
                }
                else{
                    $window.alert("Failed to write changes.");
                }
          }).
          error(function(data, status, headers, config) {
               $window.alert("Failed to write changes.");
        });
    };
        
  });
