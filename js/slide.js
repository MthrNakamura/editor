/* 現在選択中のスライド */
var currentSelected = null;

/* スライドクラス */
var Slide = Backbone.Model.extend();
/* スライドのサムネイルクラス */
var Thumbnail = Backbone.Model.extend();
	
/* スライドのコレクション */
var Slides = Backbone.Collection.extend({
	model: Slide,
});
	
/* サムネイルのコレクション */
var Thumbnails = Backbone.Collection.extend({
	model: Thumbnail
});
	
/* スライドのビュー */
var SlideView = Backbone.View.extend({
	tagName: "div",
	id: this.cid,
	template: _.template( $('#slide-template-1').html() ),
	render: function() {
		//var template = this.template( this.model.toJSON() );
		this.$el.html(this.template);
		return this;
	}
});
	
/* スライドのコレクションビュー */
var SlidesView = Backbone.View.extend({
	tagName: "div",
	className: "slideBase",
	render: function(idx) {
		if (idx >= this.collection.length) return ;
		var slide = new SlideView({model: this.collection.at(idx)});
		this.$el.html(slide.render().el);
		return this;
	}
});
		
/* サムネイルのビュー */
var ThumbnailView = Backbone.View.extend({
	tagName: "li",
	className: "pagePreview",
	events: {
		'click': 'focus'
	},
	/* サムネイルを選択したときにフォーカスする */
	focus: function(e) {
		$(currentSelected).removeClass('focused');
		$(e.target).addClass('focused');
		currentSelected = e.target;
	},
	render: function() {
		return this;
	}
});	
	
/* サムネイルのコレクションのビュー */
var ThumbnailsView = Backbone.View.extend({
	tagName: "ul",
	className: "previewArea",
	initialize: function() {
		this.collection.on("add", this.renderAll, this);
		this.collection.on("remove", this.removeSlide, this);
	},
	/* 全てのサムネイルを表示 */
	renderAll: function() {
		this.$el.empty();
		this.collection.each(function(thumbnail){
			var thumbnailView = new ThumbnailView({model: thumbnail});
			this.$el.append(thumbnailView.render().el);
		}, this);
		return this;
	},
	removeSlide: function(model, collection, option) {
		this.renderAll();
	}
});