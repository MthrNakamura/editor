/* Preview Functions */


/* Show Previews */
/* delete all of slide previews */
function clearPreviews() {
	$('.previewArea').empty();
}

/* delete one of slide previews */
function removePreview(id) {
	$('.pagePreview').remove("#sp"+id);
}

function appendPreview(preview) {
	$('.previewArea').append(preview.data);
}

/* select and highlight a slide preview */
function highlightPreview(idOfPreview) {
	$("#"+idOfPreview).css("background-color", "#69b3e1");
}

/* select and dishighlight a slide preview */
function dishighlightPreview(idOfPreview) {
	$("#"+idOfPreview).css("background-color", "#fff");
}

/* Slide Functions */
/* show selected Slide */
function showSlide(slideset) {
	/* show a new slide */
	$('.slide').remove();
	$('.slideBase').append(slideset.slide.data);
}