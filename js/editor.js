$(function(){
	var thumbnails = new Thumbnails([
		new Thumbnail()
	]);
	var thumbnailsView = new ThumbnailsView({collection: thumbnails});
	$('.allSlides').html(thumbnailsView.renderAll().el);
	
	var slides = new Slides([
		new Slide()	
	]);
	var slidesView = new SlidesView({collection: slides});
	$('.slidePanel').html(slidesView.render(0).el);

	/* スライドの追加 */
	$('.addPage').click(function() {
		if (currentSelected==null) {
			thumbnails.add(new Thumbnail());
		} else {
			thumbnails.add(new Thumbnail(), {at: $(currentSelected).index()+1});
		}
	});
	/* スライドの削除 */
	$('.rmPage').click(function() {
		if (currentSelected==null) {
			thumbnails.remove(thumbnails.at(0));
		} else {
			thumbnails.remove(thumbnails.at($(currentSelected).index()));
		}
	});
});