var selectedItem = null;
var selectedSlide = null;
var numPages = 1;

var clickPP = function clickPagePreview(evt) {
	if (selectedSlide != evt.target.id) {
		$("#"+selectedSlide).css("background-color", "#fff");
		selectedSlide = evt.target.id;
		$(this).css("background-color", "#67d5f6");
	}
}


$(function() {
	$(".slideObj")
	.resizable({autoHide: true})
	.draggable()
	.click(function(){
    	if ( $(this).is('.ui-draggable-dragging') ) {
        	return;
		}
		$(this).draggable( "option", "disabled", true );
		$(this).attr('contenteditable','true');
	})
	.blur(function(){
    	$(this).draggable( 'option', 'disabled', false);
		$(this).attr('contenteditable','false');
	});
	
	$(document).click(function(evt) {
		selectedItem = evt.target.id;
	});
	
	$(window).keydown(function(e) {
		if (e.keyCode == 46 && selectedItem != null) {
			$("#"+selectedItem).remove();
		}
	});
	
	$('.addPage').click(function() {
		addPage();
	});
	
	$('.pagePreview').click(clickPP);
	
	$('.rmPage').click(function() {
		rmPage();
	});
});


function addPage() {
	numPages = numPages + 1;
	$('.previewArea').append('<div class="pagePreview" id="sp'+numPages+'"></div>');
	$('.pagePreview').click(clickPP);
	
}

function rmPage() {
	$("#"+selectedSlide).remove();
}