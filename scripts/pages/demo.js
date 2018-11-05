/* 
		You can modify its contents.
*/
const extend = require('js-base/core/extend');
const DemoDesign = require('ui/ui_demo');
const SwipeView = require("sf-core/ui/swipeview");
const SwipeViewPageFactory = require('pages/swipeViewPageFactory');

const Demo = extend(DemoDesign)(
  // Constructor
  function(_super) {
    // Initalizes super class for this page scope
    _super(this);
    // overrides super.onLoad method
    this.onLoad = onLoad.bind(this, this.onLoad.bind(this));
  });

const data = [{
  "image": "https://smartfacecdn.blob.core.windows.net/apps/ecommerce/images/product/D1145.png",
  "backgroundColor": "#00a1f1"
}, {
  "image": "https://smartfacecdn.blob.core.windows.net/apps/ecommerce/images/product/D1123.png",
  "backgroundColor": "#FFa1f1"
}, {
  "image": "https://smartfacecdn.blob.core.windows.net/apps/ecommerce/images/product/D1165.png",
  "backgroundColor": "#00FFf1"
}, {
  "image": "https://smartfacecdn.blob.core.windows.net/apps/ecommerce/images/product/D1147.png",
  "backgroundColor": "#FFa1FF"
}, {
  "image": "https://smartfacecdn.blob.core.windows.net/apps/ecommerce/images/product/D1188.png",
  "backgroundColor": "#00a1FF"
}];
/**
 * @event onLoad
 * This event is called once when page is created.
 * @param {function} superOnLoad super onLoad function
 */
function onLoad(superOnLoad) {
  superOnLoad();
  // set numbers of dot of dotIndicator
  this.dotIndicator.size = data.length;
  var swipeView = new SwipeView({
    page: this,
    flexGrow: 1,
    pages: data.map(d => SwipeViewPageFactory(d)),
    onPageSelected: onPageSelected.bind(this),
    onStateChanged: function(state) {
      if (SwipeView.State.DRAGGING === state)
        console.log("Dragging");
      else
        console.log("Idle");
    }
  });
  //add swipeView to swipeViewLayout
  this.swipeViewLayout.addChild(swipeView, "swipeView", ".yourClassNames", userStyle => {
    userStyle.flexGrow = 1;
    return userStyle;
  });
}

function onPageSelected(selectedIndex, pageInstance) {
  // change current index of dotIndicator 
  this.dotIndicator.currentIndex = selectedIndex;
  console.log("Selected Index: " + selectedIndex);
  // you can use pageInstance too.
}

module && (module.exports = Demo);
