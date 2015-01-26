describe("Bindings", function () {
  var testNode;

  beforeEach(prepareTestNode);

  it("should supply bindings with actual observable values", function() {
    var obj = { prop: 123 };

    ko.track(obj);

    // create a custom binding that expects an observable (rather than a raw value)
    ko.bindingHandlers.custombinding = {
      init: function(element, valueAccessor) {
        var value = valueAccessor();
        element.textContent = ko.isObservable(value) ? 'true' : 'false';
      }
    };

    testNode.innerHTML = "<div data-bind='custombinding: prop'></div>";

    ko.applyBindings(obj, testNode);

    assert.equal(testNode.innerText, 'true');
  });

  function prepareTestNode() {
    var existingNode = document.getElementById("testNode");
    if (existingNode != null)
      existingNode.parentNode.removeChild(existingNode);
    testNode = document.createElement("div");
    testNode.id = "testNode";
    document.body.appendChild(testNode);
  }

});