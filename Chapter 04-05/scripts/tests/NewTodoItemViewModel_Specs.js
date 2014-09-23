/*global mytodo */

describe("Given a TodoListViewModel instance", function () {
    var newTodoItemViewModel, eventBus, myTodoService;
    beforeEach(function () {
        eventBus = jasmine.createSpyObj("eventBus", ["postNewTodoItemInserted", "postError"]);
        myTodoService = {};
        newTodoItemViewModel = new mytodo.NewTodoItemViewModel(eventBus, myTodoService);
        newTodoItemViewModel.title("Title");
        newTodoItemViewModel.description("Description");
        newTodoItemViewModel.dueDate("04/06/20014");
    });
    it("when a new item is inserted, then it resets the form and triggers the event", function () {
        var dueDate;
        myTodoService.insertTodoItem =
            jasmine.createSpy("insertTodoItem").and.callFake(function (item, successCallback, errorCallback) {
                successCallback();
            });
        dueDate = new Date(newTodoItemViewModel.dueDate());
        newTodoItemViewModel.insertNewTodoItem();
        expect(newTodoItemViewModel.title()).toEqual("");
        expect(newTodoItemViewModel.description()).toEqual("");
        expect(newTodoItemViewModel.dueDate()).toEqual("");
        expect(myTodoService.insertTodoItem).toHaveBeenCalled();
        expect(myTodoService.insertTodoItem.calls.count()).toEqual(1);
        expect(myTodoService.insertTodoItem.calls.argsFor(0).length).toEqual(3);
        expect(myTodoService.insertTodoItem.calls.argsFor(0)[0]).toEqual({
            title: "Title",
            description: "Description",
            dueDate: dueDate
        });
        expect(eventBus.postError).not.toHaveBeenCalled();
        expect(eventBus.postNewTodoItemInserted).toHaveBeenCalled();
        expect(eventBus.postNewTodoItemInserted.calls.count()).toEqual(1);
    });
    it("when a new item is inserted with error, then it triggers the error", function () {
        var dueDate;
        myTodoService.insertTodoItem =
            jasmine.createSpy("insertTodoItem").and.callFake(function (item, successCallback, errorCallback) {
                errorCallback("Error");
            });
        dueDate = new Date(newTodoItemViewModel.dueDate());
        newTodoItemViewModel.insertNewTodoItem();
        expect(newTodoItemViewModel.title()).toEqual("Title");
        expect(newTodoItemViewModel.description()).toEqual("Description");
        expect(newTodoItemViewModel.dueDate()).toEqual("04/06/20014");
        expect(myTodoService.insertTodoItem).toHaveBeenCalled();
        expect(myTodoService.insertTodoItem.calls.count()).toEqual(1);
        expect(myTodoService.insertTodoItem.calls.argsFor(0).length).toEqual(3);
        expect(myTodoService.insertTodoItem.calls.argsFor(0)[0]).toEqual({
            title: "Title",
            description: "Description",
            dueDate: dueDate
        });
        expect(eventBus.postNewTodoItemInserted).not.toHaveBeenCalled();
        expect(eventBus.postError).toHaveBeenCalled();
        expect(eventBus.postError.calls.count()).toEqual(1);
    });
});