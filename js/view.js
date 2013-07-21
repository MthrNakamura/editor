/**************************/
/* スライドの表示管理クラス */
/**************************/
var SlideView = function() {
	/* 現在表示しているスライドのインデックス */
	this.nowShowing = 0;
}

SlideView.prototype = {
	/********   表示関連の関数    *********/
	/* 指定したプレビューを削除する */
	deletePreviewIndexAt: function(index) {
		$('.pagePreview:eq('+index+')').remove();
	},
	/* 指定したスライドを削除する */
	deleteSlide: function() {
		$('.slideBase').empty();
	},
	/* スライド本体を表示 */
	showSlide: function(slide) {
		/* 現在表示しているスライドを消す */
		this.deleteSlide();
		if (slide == null) return ;
		/* 新しいスライドを表示 */
		$('.slideBase').append(slide.data);
	},
	/* プレビューを表示 */
	showPreview: function(slideManager, showIndex) {
		
		if (showIndex == 0) { /* 1枚目のスライドを追加するとき */
			$('.previewArea').append(slideManager.slideArray[showIndex].preview.data);
		} else {
			/* 指定した位置に新しいプレビューを挿入 */
			$('.pagePreview:eq('+(showIndex-1)+')').after(slideManager.slideArray[showIndex].preview.data);
		}
		/* 新規表示したプレビューを選択状態にする */
		this.focusPreview(showIndex);
		/* これまで選択状態だったプレビューを解除する */
		if (this.nowShowing >= 0) {
			this.blurPreview(this.nowShowing);
		}
	},
	/* 選択したプレビューを選択状態にする */
	focusPreview: function(previewIndex) {
		$('.pagePreview:eq('+previewIndex+')').addClass('focused');
	},
	/* プレビューを選択解除する */
	blurPreview: function(previewIndex) {
		$('.pagePreview:eq('+previewIndex+')').removeClass('focused');	
	},
	
	/* スライド本体とプレビューを表示する */
	showSlideSet: function(slideManager, showIndex) {
		/* スライド本体の表示 */
		this.showSlide(slideManager.slideArray[showIndex].slide);
		
		/* プレビューの表示 */
		this.showPreview(slideManager, showIndex);
		
		/* 現在表示中のスライドの情報を更新 */
		this.nowShowing = showIndex;
	},
	
	/* 表示するスライドを切り替える */
	switchSlide: function(slideManager, showIndex) {
		//window.alert("now: "+this.nowShowing+" , idx: "+showIndex);
		/* 表示中のスライドを選択しても何もしない */
		if (this.nowShowing == showIndex) return ;
		/* 無効なインデックスが指定されたときには */
		if (showIndex == -1) {
			/* すべてのスライドを非選択状態にする */
			/* プレビューを非選択状態に */
			this.blurPreview(this.nowShowing);
			this.nowShowing = -1;
			this.showSlide(null);
		} else {
			/* スライド本体の表示 */
			this.showSlide(slideManager.slideArray[showIndex].slide);
			/* プレビューの表示 */
			this.focusPreview(showIndex);
			this.blurPreview(this.nowShowing);
			/* 現在表示中のスライドの情報を更新 */
			this.nowShowing = showIndex;
		}
	}
	
	
}