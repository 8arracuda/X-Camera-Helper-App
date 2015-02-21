sdApp.controller('SidebarController', function ($scope) {

    $scope.sidebar_main = [
        {
            labelText: 'Start',
            linkURL: 'start'
        },
        {
            labelText: 'Manager',
            linkURL: 'manager'
        },
        {
            labelText: 'About',
            linkURL: 'about'
        }
    ];



});