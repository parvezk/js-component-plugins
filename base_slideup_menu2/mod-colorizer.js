/* Dodge (our namespace name) and undefined are passed here
 * to ensure 1. namespace can be modified locally and isn't
 * overwritten outside of our function context
 * 2. the value of undefined is guaranteed as being truly
 * undefined. This is to avoid issues with undefined being
 * mutable pre-ES5.
 */
(function (Dodge, $, undefined) {

  // hide 360 button for tablets
  (function(){
    
    /*var UA = navigator.userAgent;
    if (UA.indexOf("iPad") != -1) {
      $('.btn-360').hide().css('display', 'none')
    }*/

  /*if (navigator.userAgent.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini/i)){
    $('.btn-360').hide().css('display', 'none');
  }*/
  
  /*
  $("#vehelem").bind("touchstart touchmove", function(e) {
  //Disable scrolling by preventing default touch behaviour
  e.preventDefault();
  var orig = e.originalEvent;
  var x = orig.changedTouches[0].pageX;
  var y = orig.changedTouches[0].pageY;
  // Move a div with id "rect"
  alert(x)
  });
  */


  })()
  
 
  $.fn.slideupmenu = function(options){

    var opts = jQuery.extend({ slideUpSpeed: 150, slideDownSpeed: 100, ease: "easeOutQuad", stopQueue: true }, options);

    var len = $('.palette').find('li').size()

    var finheight = (len * 25)  + 5 + 12;

    $('.palette').parent().css('height', finheight + 'px');

    var finwidth = $('.palette-wrap').width() / 2

    finwidth = finwidth - 55

    $('.palette-wrap').css('left', '-' + finwidth + 'px')

      
    $(this).find('.top-menu-main').hover(function(){
    $(this).addClass('hover');
      var $o = $(this).find('.palette-wrap');
      if (opts.stopQueue) $o = $o.stop(true, true).slideDown(opts.slideUpSpeed, opts.ease);
    
    }, function() {
    $(this).removeClass('hover');
      var $o = $(this).find('.palette-wrap');
      if (opts.stopQueue) $o = $o.stop(true, true).fadeOut(100)
    });
  }
    
$(document).ready(function(){

  var opts = {};
  $(".top-menu").slideupmenu(opts);
  var hub = $('.palette li');    

  $('<img>', {
                'class': 'mod-preloader',
                'src' : '/assets/styles/images/mod-colorizer/spinner.gif'

            }).prependTo('.mod-colorizer');

  $('.top-menu .palette li').on('click', function(e){
        e.preventDefault();

        var _this = $(this)
        var collist = $('.mod-colorizer ul');
        var $current = $(this).attr('class');
            $current = $current.split(" ");
            $current = $current[0];
            $current = "li" + "[data-colz='" + $current +"']";
        var sel_item = collist.find($current)

        if($(sel_item).find('img').size() == 0){

            $('.mod-colorizer .mod-preloader').show();
            
            var cpath = collist.children('li').eq(0).find('img').attr('src');

            //cpath = cpath.slice(0, cpath.lastIndexOf('/'));
            //var newpath = cpath + '/' + $(sel_item).data('path');

            $('.top-menu-main .palette-wrap').stop(true, true).delay(100).fadeOut(100)

            var newpath = $(sel_item).data('path');

               $('<img />')

                    .load(function() {
                        $('.mod-colorizer .mod-preloader').hide();
                        exhibit();
                       

                }).attr('src', newpath).appendTo($current);

        } else { 

            exhibit();
           
        }

        function exhibit(){
            collist.children('li').not($current).fadeOut(100);
            collist.find($current).fadeIn(100);
        }

  })

});


}(window.Dodge = window.Dodge || {}, jQuery));
