describe("Given a generic function", function () {
    var container = {
        myFunc: function (aNumber) {
            return aNumber + 1;
        }
    };
    it("when using a spy, then it tracks all the calls statistics", function () {
        spyOn(container, "myFunc");
        container.myFunc(10);
        container.myFunc(20);
        expect(container.myFunc).toHaveBeenCalled();
        expect(container.myFunc).toHaveBeenCalledWith(10);
        expect(container.myFunc).toHaveBeenCalledWith(20);
        expect(container.myFunc.calls.any()).toEqual(true);
        expect(container.myFunc.calls.count()).toEqual(2);
        expect(container.myFunc.calls.argsFor(0)).toEqual([10]);
        expect(container.myFunc.calls.argsFor(1)).toEqual([20]);
        expect(container.myFunc.calls.allArgs()).toEqual([
            [10],
            [20]
        ]);
        expect(container.myFunc.calls.all()).toEqual([
            {
                object: container,
                args: [10]
            },
            {
                object: container,
                args: [20]
            }
        ]);
        expect(container.myFunc.calls.mostRecent()).toEqual({
            object: container,
            args: [20]
        });
        expect(container.myFunc.calls.first()).toEqual({
            object: container,
            args: [10]
        });
        container.myFunc.calls.reset();
        expect(container.myFunc.calls.any()).toEqual(false);
    });
});