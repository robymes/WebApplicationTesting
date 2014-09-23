/*global require,console,phantom */

console.log("Given the user that wants to insert a new todo item, when a new todo item is inserted, " +
    "then the form resets, and the item is remotely inserted, and the item list is updated.");
var page = require("webpage").create();
page.viewportSize = {
    width: 1280,
    height: 720
};
page.open("http://localhost:63342/Examples/Chapter%2004/index.html", function(status) {
    if (status !== "success") {
        console.log("Unable to access network");
    } else {
        //page.render("page_01.png");
        var ua = page.evaluate(function() {
            var initialTodoItemsCount = jQuery("#todoListView tbody tr").toArray().length;
            jQuery("#todoItemTitle").val("Title").change();
            jQuery("#todoItemDescription").val("Description").change();
            jQuery("#todoItemDueDate").datepicker("setDate", "06/06/2014").change();
            if (jQuery("#newItemView button").is(":disabled")) {
                return "ERROR: new item button is disabled";
            }
            jQuery("#newItemView button").click();
            if (jQuery("#todoItemTitle").val() || jQuery("#todoItemDescription").val() ||
                jQuery("#todoItemDueDate").datepicker("getDate")) {
                return "ERROR: form not reset, " + jQuery("#todoItemTitle").text();
            }
            if (!jQuery("#newItemView button").is(":disabled")) {
                return "ERROR: new item button is still enabled";
            }
            if (jQuery("#todoListView tbody tr").toArray().length !== (initialTodoItemsCount + 1)) {
                return "ERROR: new item not in list";
            }
            return "SUCCESS";
        });
        //page.render("page_02.png");
        console.log(ua);
    }
    phantom.exit();
});