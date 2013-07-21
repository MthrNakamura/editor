/*********************/
/*   スライドクラス   */
/*********************/
var Slide = function(index, slideType) {
	this.index = index;
	this.slideType = slideType;
	switch(this.slideType) {
		case 0: /* タイトルと箇条書き */
			this.data = '<div class="slide"><div class="slideObj titleLabel" contenteditable="true">title'+index+'</div><div class="slideObj itemArea"><ul class="itemList" contenteditable="true"><li class="itemListElem" contenteditable="true">list</li></ul></div></div>';
			break;
		default:
			this.data = '<div class="slide"></div>';
			break;		
	}
}

/*********************/
/*  プレビュークラス  */
/*********************/
var Preview = function(index) {
	this.index = index;
	this.data = '<li class="pagePreview sortable"></li>';
}


/*************************************/
/*   スライドとプレビューの管理クラス   */
/*************************************/
var SlideSet = function(index, slideType) {
	this.index = index;
	this.slideType = slideType;
	this.slide = new Slide(index, slideType);
	this.preview = new Preview(index);
}

SlideSet.prototype = {
	/* スライドの保存 */
	save: function(data) {
		this.slide.data = data;
	}
}



/*********************/
/* スライド管理クラス */
/*********************/
var SlideManager = function() {
	/* スライド枚数 */
	this.numSlide = 1;
	this.slideArray = [new SlideSet(0, 0)];
}

SlideManager.prototype = {
	/* 新規スライドを追加 */
	/* insertIndex : 新規スライドを追加する場所のインデックス */
	/* slideType : スライドの種類 */
	addNewSlide : function(insertIndex, slideType) {
		/* insertIndexの位置に新規スライドを挿入 */
		for (var i = this.numSlide; i > insertIndex; i = i -1) {
			this.slideArray[i] = this.slideArray[i-1];
		}
		this.slideArray[insertIndex] = new SlideSet(insertIndex, slideType);
		/* スライドの枚数を+1 */
		this.numSlide = this.numSlide + 1;
	},
	/* スライドの削除 */
	/* slideIndex : 削除するスライドのインデックス */
	removeSlide : function(slideIndex) {
		/* slideIndexの位置のスライドを削除 */
		var numLoop = this.numSlide - 1;
		for (var i = slideIndex; i < numLoop; i = i + 1) {
			this.slideArray[i] = this.slideArray[i+1];
		}
		/* スライド枚数を1枚減らす */
		this.numSlide = this.numSlide - 1;
		/* 必要なくなったところをnullに */
		this.slideArray[this.numSlide] = null;
	},
	/* スライドの並べ替え */
	sortSlides: function(index, insertPos) {
		var temp = $.extend(true, {}, this.slideArray[index]);
		for (var i = index; i < insertPos; i = i + 1) {
			this.slideArray[i] = $.extend(true, {}, this.slideArray[i+1]);
		}
		this.slideArray[insertPos] = temp;
	}
	
}