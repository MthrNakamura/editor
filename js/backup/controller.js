var slideSetArray = [];
var nextSlideType = 0;
var preHighlighted = null;
var numSlide = 0;

var clickedPagePreview = function(evt) {
							if (preHighlighted!=null) {
								dishighlightPreview(preHighlighted);
							}
							preHighlighted = evt.target.id;
							highlightPreview(evt.target.id);
		
							/* show slide which was selected now */
							var idx = $('.pagePreview').index($("#"+evt.target.id));
							showSlide(slideSetArray[idx]);
						};

$(function(){
	/* add an initial slide */
	addSlide();
	appendPreview(slideSetArray[numSlide-1].slidePreview);
	showSlide(slideSetArray[numSlide-1]);

	/* click the Add button */
	$('.addPage').click(function(){
		/* add new slide */
		addSlide();
		appendPreview(slideSetArray[numSlide-1].slidePreview);
		showSlide(slideSetArray[numSlide-1]);		
		$('.pagePreview').click(clickedPagePreview);
	});
	
	$('.rmPage').click(function(){
		if (preHighlighted == null) return;
		var idx = preHighlighted.substr(2) - 0;
		rmSlide(idx);	
		numSlide = numSlide - 1;
	});
	
	$('.pagePreview').click(clickedPagePreview);
});

/* Preview Functions */
/* add a slide preview into preview area */
function addPreview() {
	/* create a new Slide object */
	var slidePreview = new SlidePreview(validID, nextSlideType);
	previewArray[numSlide-1] = slidePreview;
}


/* Slide Functions */
/* add a new slide */
function addSlide() {
	/* create a new slide object */
	var slide = new SlideSet(nextSlideType);
	slideSetArray[numSlide] = slide;
	numSlide = numSlide + 1;
}

/* delete a slide */
function rmSlide(idx) {
	for (var i = idx; i < numSlide-1; i = i+ 1) {
		slideSetArray[i] = slideSetArray[i+1];
		slideSetArray[i].resetID();
	}
	slideSetArray[i].deleteSlide();
	clearPreviews();
	for (var i = 0; i < numSlide-1; i = i + 1) {
		appendPreview(slideSetArray[i].slidePreview);
	}
	$('.pagePreview').click(clickedPagePreview);
	showSlide(slideSetArray[idx]);
}