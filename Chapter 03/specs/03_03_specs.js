describe("Given a generic function", function () {
    var container = {
        myFunc: function (aNumber) {
            return aNumber + 1;
        }
    };
    it("when using a spy, then it tracks all the calls", function () {
        //create a spy on myFun
        spyOn(container, "myFunc");
        //call myFunc twice
        container.myFunc(10);
        container.myFunc(20);
        //verify calls to myFunc
        expect(container.myFunc).toHaveBeenCalled();
        expect(container.myFunc).toHaveBeenCalledWith(10);
        expect(container.myFunc).toHaveBeenCalledWith(20);
    });
});