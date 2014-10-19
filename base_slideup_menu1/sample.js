(function($){

    $.fn.blacktopPopup = function(Options){
 
        var Defaults = {
            distance:10,
			time:250
        },
 
        blacktopSettings = $.extend({}, Defaults, Options);	

		$(this).each(function(){
			$(this).hover(function(){
         
            var trigger = $(this);
            var info = $('.popup').css('opacity', 0);

                    info.css({
                        top: -90,
                        left: -33,
                        display: 'block'
                    }).animate({
                        top: '-=' + blacktopSettings.distance + 'px',
                        opacity: 1
                    }, blacktopSettings.time);
                
                return false;
            }, function () {

                    info.animate({
                        top: '-=' + blacktopSettings.distance + 'px',
                        opacity: 0
                    }, blacktopSettings.time, function () {

                        info.css('display', 'none');
                    });

                return false;
            }); // end of hover
        
				

		}); // end of each

		
	} // end of plugin
	
	
})(jQuery);

$(function(){
$('a').blacktopPopup();
});