var app = angular.module('CGPA', []);

app.controller('subjectController', function($scope) {

    $scope.subjects = subjects_Object;
    $scope.branch = 'ET';
    $scope.count = [];
    $scope.uid = 0;
    
    $scope.sections = Object.getOwnPropertyNames($scope.subjects);
    
    $scope.subjectName = function(obj) {
        if($scope.branch=='ET') {
            if(obj.hasOwnProperty('name')) return obj.name;
            else return obj.name_ET;
        }
        else if($scope.branch=='CS') {
            if(obj.hasOwnProperty('name')) return obj.name;
            else if(obj.hasOwnProperty('name_CI')) return obj.name_CI;
            else return obj.name_CS;
        }
        else if($scope.branch=='IT') {
            if(obj.hasOwnProperty('name')) return obj.name;
            else if(obj.hasOwnProperty('name_CI')) return obj.name_CI;
            else return obj.name_IT;
        }
    };
    
    $scope.reset = function(){
        $scope.CGPA = NaN;
        $scope.perc = 0;
        $scope.count = [];
        for(var j=0; j<$scope.sections.length; j++)
        for(var i=0; i<$scope.subjects[$scope.sections[j]].length; i++)
                $scope.subjects[$scope.sections[j]][i].grade=0;
        
        $('input').parent().removeClass("btn-success");
        $('input').attr('disabled', false);
        $('.animated').addClass('anime');
        setTimeout(function(){ $('.animated').removeClass('anime'); }, 1000);
        
    };
    
   $scope.monitor = function(){
        $scope.count = [];
        var c = 0;

        for(var j=0; j<$scope.sections.length; j++) {
            for(var i=0; i<$scope.subjects[$scope.sections[j]].length; i++) 
                if($scope.subjects[$scope.sections[j]][i].grade!=0) c++;

            $scope.count[j] = c;
            c = 0;
        }
       
      $scope.limit($scope.count[1]);
    };

    $scope.limit = function (elect){
        if(elect>1) {
            for(var i=0; i<$scope.subjects.Electives.length; i++)
                if($scope.subjects.Electives[i].grade==0) {
                    var list = $scope.subjects.Electives[i]['code_'+$scope.branch];
                    $('.'+list+' :input').attr('disabled', true);
                }
        }
        else {
            for(var i=0; i<$scope.subjects.Electives.length; i++)
                if($scope.subjects.Electives[i].grade==0) {
                    var list = $scope.subjects.Electives[i]['code_'+$scope.branch];
                    $('.'+list+' :input').attr('disabled', false);
                }
        }
    };       
    
    $scope.calculate = function() {
        var num = 0, den = 0;
        
        for(var j=0; j<$scope.sections.length; j++)
            for(var i=0; i<$scope.subjects[$scope.sections[j]].length; i++)
                if($scope.subjects[$scope.sections[j]][i].grade!=0) {
                    num = num + (Number($scope.subjects[$scope.sections[j]][i].grade)*4);
                    den = den + 4;
                }
        
        $scope.CGPA = Math.round((num/den) * 100) / 100;
        $scope.perc = Math.round(($scope.CGPA*9.5) * 100) / 100;
        
        if($scope.CGPA>=9) $scope.division = 'Distiction';
        else if($scope.CGPA>=6.5 && $scope.CGPA<9) $scope.division = '1st Division';
        else if($scope.CGPA>=5 && $scope.CGPA<6.5) $scope.division = '2nd Division';
        else $scope.division = 'Fail';
    };    
});