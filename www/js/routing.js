sdApp.config(function ($routeProvider) {

    $routeProvider.
        //when('/overview', {
        //    templateUrl: 'overview.html',
        //    controller: 'OverviewCtrl'
        //}).
        when('/start', {
            templateUrl: 'start.html',
            controller: 'StartController'
        }).
        when('/manager', {
            templateUrl: 'manager.html',
            controller: 'ManagerController'
        }).
        otherwise({
            redirectTo: '/start'
        });
});
