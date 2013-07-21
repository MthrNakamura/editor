var slideNum = 0;

function getValidID() {
	slideNum = slideNum + 1;
	return slideNum - 1;
}

/* Slide Data */
var SlideSet = function(slideType) {
	this.slideType = slideType;
	this.slideNo = getValidID();
	this.slide = new Slide(this.slideNo, this.slideType);
	this.slidePreview = new SlidePreview(this.slideNo, slideType);
}

SlideSet.prototype = {
	resetID: function() {
		this.slideNo = this.slideNo - 1;
		this.slide = new Slide(this.slideNo, this.slideType);
		this.slidePreview = new SlidePreview(this.slideNo, this.slideType);
	},
	deleteSlide: function() {
		slideNum = slideNum - 1;
	}
};

var Slide = function(slideNo, slideType) {
	var slideData;
	switch (slideType) {
		case 0:
		slideData = '<div class="slide" id="s'+slideNo+'"><div class="slideObj titleLabel" id="obj" contenteditable="true">title'+slideNo+'</div><div class="slideObj itemArea" id="obj2"><ul class="itemList" contenteditable="true"><li class="itemListElem" contenteditable="true">list</li></ul></div></div>';
		break;
		case 1:
		window.alert("type 1");
		break;
	}
	this.data = slideData;
}

/* Slide Preview */
var SlidePreview = function(slideNo, slideType) {
	var slideData;
	switch (slideType) {
		case 0:
		slideData = '<div class="pagePreview" id="sp'+slideNo+'"></div>';
		break;
		case 1:
		break;
	}
	this.data = slideData;
}