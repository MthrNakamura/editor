/* 選択中のページ */
var focusedPage = 0;
/* 選択中のページオブジェクト */
var focusedObject = -1;
/* 次に追加するスライドのタイプ */
var nextSlideType = 0;

/* スライドのビューを管理するインスタンスを作成 */
var slideView = new SlideView();
/* スライドを管理するインスタンスを作成 */
var slideManager = new SlideManager();

/* ページを選択 */
var selectPage = function() {
	/* 選択したスライドのインデックスを記憶 */
	var preFocused = focusedPage;
	focusedPage = $(this).index();
	/* 別のスライドを表示するときには、現在表示中のスライドを保存 */
	if (slideView.nowShowing != focusedPage) {
		slideManager.slideArray[preFocused].save($('.slideBase').html());
		slideView.switchSlide(slideManager, focusedPage);
		/* ページオブジェクトの選択 */
		$('.slideObj').click(selectSlideObj);
		/* ページオブジェクトを非選択状態にする */
		focusedObject = -1;
	}
}


/* キーボードイベントハンドラ */
var keyboardFunc = function(evt) {
	switch (evt.keyCode) {
		case 46: /* delete */
			if (focusedObject != -1) {
				$('.slideObj:eq('+focusedObject+')').remove();
				focusedObject = -1;
			}
			break;
		default: /* others */
			break;
	}
}

/* ページオブジェクト選択ハンドラ */
var selectSlideObj = function() {
	focusedObject = $(this).index();
}

/* プレビュードラッグ後ハンドラ */
var beforeSorting = function(evt, ui) {
	ui.item.startPos = $(evt.target).index();
	/* スライドが1枚のときには何もしない */
	if (slideManager.numSlide == 1) return ;
	/* 表示中のスライドとは別のスライドを移動するときには表示中のスイライドを保存 */
	slideManager.slideArray[focusedPage].save($('.slideBase').html());
	/* プレビューを非選択状態にする */
	slideView.switchSlide(slideManager, -1);
	
}

/* プレビュードロップ後ハンドラ */
var afterSorting = function(evt, ui) {
	
}

/* ソート終了後ハンドラ */
var stopSorting = function(evt, ui) {
	slideView.switchSlide(slideManager, ui.item.index());
	/* 移動後のデータを適切に保存 */
	slideManager.sortSlides(ui.item.startPos, ui.item.index());
}

$(function(){
		
	/* 新規ページの追加 */
	$('.addPage').click(function(){
		if (focusedPage >= 0) { /* 有効なスライドを選択しているなら */
			/* 現在表示中のスライドを保存 */
			slideManager.slideArray[focusedPage].save($('.slideBase').html());		
		}
		/* 新規スライドを選択状態にする */
		focusedPage = focusedPage + 1;
		/* 新規スライドの追加 */
		slideManager.addNewSlide(focusedPage, nextSlideType);
		/* 新規スライドの表示 */
		slideView.showSlideSet(slideManager, focusedPage);
		/* 新規スライドに選択時のイベントを追加 */
		$('.pagePreview:eq('+focusedPage+')').click(selectPage);
		/* ページオブジェクトの選択イベントを追加 */
		$('.slideObj').click(selectSlideObj);
		/* ページオブジェクトを非選択状態にする */
		focusedObject = -1;
	});
	
	/* 選択ページの削除 */
	$('.rmPage').click(function() {
		if (focusedPage == -1) {
			return ;  /* 有効なスライドを選択していないときには終了 */
		}

		/* 選択中のスライドを削除する */
		slideManager.removeSlide(focusedPage);
		/* プレビューを削除 */
		slideView.deletePreviewIndexAt(focusedPage);
		/* スライドを削除 */
		slideView.deleteSlide();
		
		/* 別のスライドを選択・表示 */
		focusedPage = focusedPage - 1; /* 1つ前のスライドを選択 */
		if (focusedPage == -1) {
			if (slideManager.numSlide < 1) { /* もうスライドが無いとき */
				return ; /* 終了 */
			}
			focusedPage = 0;
		} 
		/* 選択 */
		/* プレビューを選択 */
		slideView.focusPreview(focusedPage);
		/* スライドを表示 */
		slideView.showSlide(slideManager, focusedPage);
	});
	
	/* ページを選択 */
	$('.pagePreview').click(selectPage);
	$('.pagePreview').addClass('focused');
	/* プレビューのソート */
	$('.sortable').sortable({
		start: beforeSorting,
		opacity: 0.5,
		placeholder: 'ui-state-highlight',
		stop: stopSorting,
		update: afterSorting
	});
	/* ページオブジェクトの選択 */
	$('.slideObj').click(selectSlideObj);
	$('.slideObj').dblclick(function() {
		
	});
	$(window).keydown(keyboardFunc);
});