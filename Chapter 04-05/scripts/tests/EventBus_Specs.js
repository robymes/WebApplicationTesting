/*global mytodo,postal */

describe("Given an EventBus instance", function () {
    var eventBus;
    beforeEach(function () {
        eventBus = new mytodo.EventBus();
    });
    it("when a newTodoItemInsertedEvent is triggered, then the handler is called", function () {
        var newTodoItem, handler;
        spyOn(eventBus, "onNewTodoItemInserted").and.callThrough();
        handler = jasmine.createSpy("handler");
        eventBus.onNewTodoItemInserted(handler);
        newTodoItem = {
            title: "Title",
            description: "Description",
            dueDate: new Date("04/06/2014")
        };
        eventBus.postNewTodoItemInserted(newTodoItem);
        expect(handler).toHaveBeenCalled();
        expect(handler.calls.count()).toEqual(1);
        expect(handler.calls.argsFor(0).length).toEqual(2);
        expect(handler.calls.argsFor(0)[0]).toEqual(newTodoItem);
    });
});
