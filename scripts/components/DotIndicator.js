/* 
		You can modify its contents.
*/
const extend = require('js-base/core/extend');
const FlexLayout = require('sf-core/ui/flexlayout');
const DotIndicatorDesign = require('library/DotIndicator');

const pushClassNames = require("@smartface/contx/lib/styling/action/pushClassNames");
const removeClassName = require("@smartface/contx/lib/styling/action/removeClassName");

const PREFIX = "dot";
const dotIndicatorActiveClassName = ".dotIndicator-item.active";
const dotIndicatorInActiveClassName = ".dotIndicator-item.inactive";

const DotIndicator = extend(DotIndicatorDesign)(
	//constructor
	function(_super, props, pageName) {
		// initalizes super class for this scope
		_super(this, props);
		this.pageName = pageName;

		var _currentIndex = 0;
		this.lastActiveIndex = 0;
		var _size = 3; // default size

		Object.defineProperties(this, {
			'currentIndex': {
				get: function() {
					return _currentIndex;
				},
				set: function(value) {
					if (typeof value !== "number") {
						throw new TypeError("currentIndex should be number");
					}
					if (value >= _size || value < 0) {
						throw new Error("currentIndex is out of range");
					}
					// add active classname to new item
					this.children[PREFIX + value]
						.dispatch(pushClassNames(dotIndicatorActiveClassName));
					//remove active classname of old item 
					value !== _currentIndex &&
						this.children[PREFIX + _currentIndex]
						.dispatch(removeClassName(dotIndicatorActiveClassName));
					this.lastActiveIndex = _currentIndex;
					_currentIndex = value;
				}
			},
			'size': {
				get: function() {
					return _size;
				},
				set: function(value) {
					if (typeof value !== "number") {
						throw new TypeError("size should be number");
					}
					_size = value;
					setSize.call(this, _size);
				}
			}
		});
	}
);

function setSize(newSize) {
	this.removeAll();
	this.children = {};
	for (var i = 0; i < newSize; i++) {
		this.children[PREFIX + i] = new FlexLayout();
		this.addChild(this.children[PREFIX + i], PREFIX + i, `.flexLayout ${dotIndicatorInActiveClassName}`);
	}
	this.currentIndex = 0;
	this.applyLayout();
}

module && (module.exports = DotIndicator);
