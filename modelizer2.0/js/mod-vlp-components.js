$(function() {

    $('.btn-360').show();

    var View360NS = (function(obj) {

        var instantiated,
            $vehelem = obj.vehelem,
            $vehwrap = $vehelem.parent(),
            $modal = obj.modal,
            $modalClose = obj.modalclose,
            distance = 0,
            initialX, initialY, finalX, finalY, presentX, presentY = 0,
            isMouseDown = false,
            counter = 0,
            noOfImages = 36,
            eventType = null;

        function handleMouseMove(event) {
			
            event.preventDefault();

            if (isMouseDown) {

                if (eventType == "touchstart") {

                    var orig = event.originalEvent;
                    presentX = orig.changedTouches[0].pageX;
                    presentY = orig.changedTouches[0].pageY;

                } else {

                    presentX = event.pageX;
                    //presentY = event.pageY;

                }

                distance = parseInt((presentX - initialX));

                if (distance <= -1) {
                    moveForward();
                } else if (distance >= 1) {
                    moveBackward();
                }
            }
        }

        function moveForward() {
            ++counter;
            if (counter == noOfImages) {
                counter = 0;
            }
            $vehelem.css('backgroundPosition', "0px " + (-counter * 462) + "px");
        }

        function moveBackward() {
            counter--;
            if (counter == -1) {
                counter = noOfImages - 1;
            }
            $vehelem.css('backgroundPosition', "0px " + (-counter * 462) + "px");
        }

        function handleMouseDown(event) {

            event.preventDefault();
            var orig = event.originalEvent;

            isMouseDown = true;
            if (eventType == "touchstart") {
                initialX = orig.changedTouches[0].pageX;
            } else {
                initialX = event.pageX;
            }
        }

        function handleMouseUp(event) {
            event.preventDefault();
            var orig = event.originalEvent;

            if (isMouseDown) {
                isMouseDown = false;
            }

            if (eventType == "touchstart") {
                finalX = orig.changedTouches[0].pageX;
            } else {
                finalX = event.pageX;
            }
        }

        function init() {
			
            var vlp = "avenger";

                $prel = $('.modelizer-preloader').show(),
                bgURL = 'assets/images/360-Sprite_' + vlp + '.jpg';

            return {

                bindevents: function(event) {
					
                    eventType = event.type;

                    $vehelem.parent().parent().css('height', '462px');
                    $($vehelem, $vehwrap).attr('onselectstart', 'return false');

                    $vehelem.css({
                        'opacity': 0.5,
                        'filter': 'alpha(opacity=50)'
                    });

                    //$modal.show();
					$(".mod-threesixty-modal").fadeIn();

                    $('<img />')
                        .load(function() {

                            $prel.hide();
                            $vehelem.find('img').hide();
                            $vehelem.attr('class', vlp + '-vlp-modelizer');
                            $vehelem.css({
                                'opacity': 1,
                                'filter': 'alpha(opacity=100)'
                            });

                        }).attr('src', bgURL);

                    if (eventType == "touchstart") {
						
                        $vehelem.on({
                            "touchstart": handleMouseDown,
                            "touchmove" : handleMouseMove,
                            "touchend"  : handleMouseUp
                        });
                    } else {
                        $vehelem.on({
                            "mousedown": handleMouseDown,
                            "mousemove": handleMouseMove,
                            "mouseup"  : handleMouseUp
                        });
                    }

                    $modalClose.on('click touchstart', function() {
                        $modal.hide();
                    });

                } // end of bindevents

            }; // end of return

        } // end of init

        return {
            getInstance: function() {
				
                if (!instantiated) {
                    instantiated = init();
                }
                return instantiated;
            }
        };

    })({
        vehelem   : $('#vehelem'),
        modal     : $('.mod-threesixty-modal'),
        modalclose: $('.btn-threesixty-close')
    });

    $('.btn-360').on('click touchstart', View360NS.getInstance().bindevents);

});