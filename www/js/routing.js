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
        when('/about', {
            templateUrl: 'about.html',
            controller: 'AboutController'
        }).
        otherwise({
            redirectTo: '/manager'
        });
});
