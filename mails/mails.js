
angular.module('myApp.mails', ['myApp.contacts']).controller('MailController', function ($routeParams, $scope, Contact) {
    $scope.contact = Contact.get($routeParams.id);
});
