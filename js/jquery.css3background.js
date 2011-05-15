/*
 * CSS3 Multiple Background Utilities v1.0
 * By Rob Garrison (aka Mottie & Fudgey)
 * licensed under the MIT license.
 */

(function($) {

	// css3 background attributes
	var bkgdAttrs = 'color image size position repeat origin clip attach'.split(' ');

	$.fn.appendBackground = function(bkgd) {
		return this.each(function() {
			if (typeof bkgd !== 'string') { return; }
			// need to add a div to the body, if not appended, it throws errors
			var t = $('<div id="css3backgroundstyle" style="display:none;background:' + bkgd + '"/>').appendTo('body');
			$.addBackground( $(this), $.getBackgrounds($(this)), $.getBackgrounds(t) );
			t.remove();
		});
	};

	$.fn.prependBackground = function(bkgd) {
		return this.each(function() {
			if (typeof bkgd !== 'string') { return; }
			var t = $('<div id="css3backgroundstyle" style="display:none;background:' + bkgd + '"/>').appendTo('body');
			$.addBackground( $(this), $.getBackgrounds(t), $.getBackgrounds($(this)) );
			t.remove();
		});
	};

	// bkgd only needs a unique/partial file name with extension to work
	$.fn.removeBackground = function(bkgd) {
		return this.each(function() {
			if ( typeof bkgd !== 'string' && !/\.(jpg|png|gif)/.test(bkgd) ) { return; }
			var i, indx = -1,
				$el = $(this),
				a = $.getBackgrounds($el),
				t = a.image;
			for (i=0; i<t.length; i++){
				if (t[i].match(bkgd)) { indx = i; }
			}
			if (indx >= 0) {
				$.each(bkgdAttrs, function(i,o){
					a[o].splice(indx,1);
					$el.css('background-' + o, a[o].join(','));
				});
			}
		});
	};

	// private functions definition
	$.getBackgrounds = function($el){
		var b = {};
		$.each(bkgdAttrs, function(i,o){
			b[o] = $el.css('background-' + o).split(',');
		});
		return b;
	};

	$.addBackground = function($el, a, b){
		$.each(bkgdAttrs, function(i,o){
			$el.css('background-' + o, a[o].concat( b[o] ).join(','));
		});
	};

})(jQuery);