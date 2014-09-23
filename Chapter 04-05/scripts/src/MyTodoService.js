/*global jQuery,JSON*/

this.mytodo = (function (mytodo) {
    var callRestService = function (url, data, successCallback, errorCallback) {
        //in a real world-application this function invokes a remote service using jQuery.ajax
        //in this example we simply invoke the success callback function
        successCallback();
    };

    mytodo.MyTodoService = function () {
        var self = this;

        self.getTodoList = function (successCallback, errorCallback) {
            successCallback([
                {
                    title: "a passed item",
                    description: "due date is passed",
                    dueDate: new Date(2014, 4, 15)
                }, {
                    title: "an item",
                    description: "something to do",
                    dueDate: new Date(2014, 5, 15)
                }, {
                    title: "another item",
                    description: "something to say",
                    dueDate: new Date(2014, 5, 16)
                }
            ]);
        };

        self.insertTodoItem = function (todoItem, successCallback, errorCallback) {
            callRestService("SERVICE_URL", todoItem, successCallback, errorCallback);
        };
    };

    return mytodo;
}(this.mytodo || {}));