describe("Given a pure spy", function () {
    var mySpy = jasmine.createSpy("mySpy");
    it("when called, then it tracks all the calls", function () {
        mySpy(23, "an argument");
        expect(mySpy).toHaveBeenCalled();
        expect(mySpy).toHaveBeenCalledWith(23, "an argument");
    });
});
describe("Given a mock", function () {
    var myMock = jasmine.createSpyObj("myMock", ["aSpy", "anotherSpy"]);
    it("when the spies are called, then they tracks all the calls", function () {
        myMock.aSpy();
        myMock.anotherSpy(10);
        expect(myMock.aSpy).toHaveBeenCalled();
        expect(myMock.aSpy.calls.argsFor(0).length).toEqual(0);
        expect(myMock.anotherSpy).toHaveBeenCalled();
        expect(myMock.anotherSpy).toHaveBeenCalledWith(10);
    });
});