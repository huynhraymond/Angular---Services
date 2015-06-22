
angular.module('myApp.contacts', []).controller('ContactsController', function ($scope, Contact) {

    $scope.contact = {};

    $scope.saveContact = function () {
        if ( $scope.contact.name !== undefined && $scope.contact.email !== undefined && $scope.contact.tel !== undefined ) {
            Contact.save($scope.contact);
        }

        $('#contactModal').modal('hide');
        $scope.contact = {};
    };

    $scope.printList = function () {
        $scope.contacts = Contact.getAll();
    };

    $scope.updateContact = function(contact) {
        $scope.contact = contact;
        $('#contactModal').modal('show');
    };

    $scope.removeContact = function(id) {
        Contact.remove(id);
    };

}).factory('Contact', function () {
    // This is a factory function that will return a service (singleton object)

    // a private container to store the contacts array
    var contacts = JSON.parse(localStorage.getItem('contacts')) || {};

    function uuid() {
        // a v4 compliant way of generating a uuid
        // refer: http://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
            return v.toString(16);
        });
    }

    return  {
        save: function (contact) {
            var id = contact._id || uuid();
            contact._id = id;
            //contacts.push(contact);
            contacts[id] = contact;

            // use localStorage
            localStorage.setItem('contacts', JSON.stringify(contacts));
        },

        get: function(id) {
            return contacts[id];
        },

        getAll: function () {
            /*
            var _contacts = [];

            for (var prop in contacts) {
                _contacts.push(contacts[prop]);
            }

            return _contacts;  */
            return contacts;
        },

        update: function(contact) {
            for (var prop in contacts) {
                if ( prop === contact._id ) {
                    contacts[prop] = contact;
                }
            }
        },

        remove: function(id) {
            delete contacts[id];
            // use localStorage
            localStorage.setItem('contacts', JSON.stringify(contacts));
        }
    }

}).controller('ListContactsController', function () {

});
