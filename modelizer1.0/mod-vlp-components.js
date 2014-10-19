$(function() {

    var View360NS = (function() {

        var instantiated,
            vehelem = null,
            distance = 0,
            initialX, initialY, finalX, finalY, presentX, presentY = 0,
            isMouseDown = false,
            counter = 0,
            noOfImages = 36;

        var $vehelem = $('#vehelem');

        function handleMouseMove(event) {
            event.preventDefault();

            if (isMouseDown) {
                //presentX = event.pageX;
                //presentY = event.pageY;

                var orig = event.originalEvent;
                var presentX = orig.changedTouches[0].pageX;
                var presentY = orig.changedTouches[0].pageY;

                //alert(presentX + ", " + initialX)
                distance = parseInt((presentX - initialX));

                if (distance <= -1) {
                    //initialX = orig.changedTouches[0].pageX;
                    moveForward();
                } else if (distance >= 1) {
                    //initialX = orig.changedTouches[0].pageX;
                    moveBackward();
                }
            }
        }

        function moveForward() {

            ++counter;
            if (counter == noOfImages) {
                counter = 0;
            }
            $vehelem.css('backgroundPosition', "0px " + (-counter * 462) + "px")
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
            initialX = orig.changedTouches[0].pageX;
            //initialY = event.pageY;
        }

        function handleMouseUp(event) {
            event.preventDefault();
            var orig = event.originalEvent;

            if (isMouseDown) {
                isMouseDown = false;
            }
            finalX = orig.changedTouches[0].pageX;
            //finalY = event.pageY;
        }

        function init() {

            var $vehelem = $('#vehelem'),
                $vehwrap = $vehelem.parent(),
                $modal = $('.mod-threesixty-modal'),
                $modal_close = $('.btn-threesixty-close');

            var vlp = $('meta[name="vehicle"]').attr('content'),

                $prel = $('.modelizer-preloader').show(),
                bgURL = '/assets/images/mod-modelizer/360/' + vlp + '/360-Sprite_' + vlp + '.jpg';

            return {

                bindevents: function() {

                    $('.mod-threesixty-modal-container').css('height', '462px');
                    $($vehelem, $vehwrap).attr('onselectstart', 'return false');

                    $vehelem.css({
                        'opacity': 0.5,
                        'filter': 'alpha(opacity=50)'
                    })

                    $modal.show();

                    $('<img />')

                    .load(function() {

                        $prel.hide();
                        $vehelem.find('img').hide();
                        $vehelem.attr('class', vlp + '-vlp-modelizer')
                        $vehelem.css({
                            'opacity': 1,
                            'filter': 'alpha(opacity=100)'
                        })

                    }).attr('src', bgURL);

                    $vehelem.on({
                        "touchstart": handleMouseDown, 
                        "touchmove": handleMouseMove, 
                        "touchend": handleMouseUp
                    })

                    $modal_close.on('click', function() {
                        $modal.hide()
                    });

                } // end of bindevents

            } // end of return

        } // end of init

        return {
            getInstance: function() {

                if (!instantiated) {
                    instantiated = init();
                }
                return instantiated;

            }
        }

    })();

    $('.btn-360').on('click', View360NS.getInstance().bindevents)

})