/* 
		You can modify its contents.
*/
const extend = require('js-base/core/extend');
const SwipeViewTemplatePageDesign = require('ui/ui_swipeViewTemplatePage');

function SwipeViewPageFactory(props) {
    return extend(SwipeViewTemplatePageDesign)(
        // Constructor
        function(_super) {
            // Initalizes super class for this page scope
            _super(this);
            // overrides super.onLoad method
            this.onLoad = onLoad.bind(this, this.onLoad.bind(this), props);
        });
}

function onLoad(superOnLoad, props) {
    superOnLoad();
    //load image from url.
    this.img.loadFromUrl(props.image);
    this.dispatch({
        type: "updateUserStyle",
        userStyle: {
            backgroundColor: props.backgroundColor
        }
    });
}

module && (module.exports = SwipeViewPageFactory);
