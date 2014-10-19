// Utility
if ( typeof Object.create !== 'function' ) {
	Object.create = function( obj ) {
		function F() {};
		F.prototype = obj;
		return new F();
	};
}


(function( $, window, document, undefined ) {
	
	var pageScroll = {
		
		init: function( options, elem ) {

			var self = this;
			self.options = $.extend( {}, $.fn.scrollPlugin.options, options );
			
			self.elem = elem;
			self.$elem = $( elem );
			
			$('section').height(self.options.height);
			//----------------------
			
			self.userCheck();

			self.$elem.off().on("click", function(e){
				e.preventDefault();
				var slide = self.getSlide(self.options);
				var goslide = slide;

				if(self.$elem.hasClass('top')){
				if(slide > 0)
					goslide = slide - 1;
				} else {
				if(slide < self.options.slides - 1)
					goslide = slide + 1;
				}
				
				self.scrollT((goslide * self.options.height + 1));
	
    		});
			
			
		},
		
		userCheck: function(){
		
			if((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i))) {
				if (document.cookie.indexOf("iphone_redirect=false") == -1) {
					
				}
			}
		
		},
		
		getSlide: function(options){
			var self = this;
			self.options = options;
			
			if($(window).height() + $(window).scrollTop() >= $(document).height())
            return (self.options.slides - 1);
			
        	var slide = Math.ceil(($(window).scrollTop() / self.options.height) - 1);
			
			return (slide < 0) ? 0 : slide;
			
		},
		
		scrollT: function(y){
			$('html,body').animate({
            	scrollTop: y
        	}, 1500, 'easeInOutExpo');
			
		}
		
	};
	
	$.fn.scrollPlugin = function( options ) {
		return this.each(function() {
			var pagescroll = Object.create( pageScroll );
	
			pagescroll.init( options, this );
			$(window).resize(pagescroll.init(options, this));
			
		});
	};
	
	$.fn.scrollPlugin.options = {

		height: window.screen.height,
		slides: $('section').length
		
	};
	
})( jQuery, window, document );


$('div.menu a').scrollPlugin({});