

(function($, window) {

    var SafetySlider;
    SafetySlider = (function () {

        function SafetySlider(input, options) {

            var ratio,
                _this = this;

            this.input = input;
            this.defaultOptions = {
                animate: true,
                theme: null,
                highlight: false
            };



            this.settings = $.extend({}, this.defaultOptions, options);
            this.input.hide();

            this.slider = $("<div>").addClass("slider" + ("-" + this.settings.theme || ""))
                .css({
                    position: "relative",
                    userSelect: "none",
                    boxSizing: "border-box"
                }).insertAfter(this.input);

            this.bullet = $("#slider-bullet");
            this.slider.after(this.bullet);
            this.track = this.createDivElement("track").css({width: "100%"});
            this.bullets = this.createListItem(this.slider, this.bullet);

            if (this.settings.highlight) {
                this.highlightTrack = this.createDivElement("highlight-track").css({width: "0"});
            }

            this.dragger = this.createDivElement("dragger")

            this.dragger.css({
                marginTop: this.dragger.outerWidth() / -3,
                marginLeft: this.dragger.outerWidth() / -2,
                "z-index": 100
            })

            this.slider.css({
                minHeight: this.dragger.outerHeight(),
                marginLeft: this.dragger.outerWidth() / 2,
                marginRight: this.dragger.outerWidth() / 2
            });

            this.track.css({
                marginTop: this.track.outerHeight() / -2
            });

            if (this.settings.highlight) {
                this.highlightTrack.css({
                    marginTop: this.track.outerHeight() / -2
                });
            }

            this.bullet.children("li").each(function () {
                $(this).find("a").on('click', function (e) {
                    e.preventDefault;
                    var clicked = $(this).parent('li').index();
                    var pos = $(".itemwrap").children("li").eq(clicked).position().left;
                    _this.setSliderPosition(pos + 5)
                });
            })

            this.track.mousedown(function (e) {
                return _this.trackEvent(e);
            });
            if (this.settings.highlight) {
                this.highlightTrack.mousedown(function (e) {
                    return _this.trackEvent(e);
                });
            }

            this.dragger.mousedown(function (e) {
                if (e.which !== 1) {
                    return;
                }
                _this.dragging = true;
                _this.dragger.addClass("dragging");
                _this.domDrag(e.pageX, e.pageY);
                return false;
            });

            $("body").mousemove(function (e) {
                if (_this.dragging) {
                    _this.domDrag(e.pageX, e.pageY);
                    return $("body").css({
                        cursor: "pointer"
                    });
                }
            }).mouseup(function (e) {
                    if (_this.dragging) {
                        _this.dragging = false;
                        _this.dragger.removeClass("dragging");
                        return $("body").css({
                            cursor: "auto"
                        });
                    }
                });

            this.pagePos = 0;
            this.setSliderPosition(this.value);
        }


        SafetySlider.prototype.createDivElement = function (classname) {
            var item;
            item = $("<div>").addClass(classname).css({
                position: "absolute",
                top: "50%",
                userSelect: "none",
                cursor: "pointer"
            }).appendTo(this.slider);
            return item;
        };

        SafetySlider.prototype.createListItem = function (slider, bullet) {

            $("<ul>").addClass("itemwrap").appendTo(this.track)

            var sliderlength = parseInt(slider.width()),
                itemcount = bullet.children("li").size() - 1,
                blocwidth = sliderlength / itemcount,
                itemwidth = -blocwidth,
                itemwrap = this.track.find("ul")

            for (i = 0; i < itemcount + 1; i++) {

                $("<li>").each(function () {
                    return itemwidth += blocwidth;
                }).addClass("Sbullet")
                    .css({
                        left: itemwidth,
                    }).appendTo(itemwrap)
            }

            $(".itemwrap li:first").css("left", "-5px");
            $(".itemwrap li:last").css("left", "835px");
        }

        SafetySlider.prototype.trackEvent = function (e) {
            if (e.which !== 1) {
                return;
            }
            this.domDrag(e.pageX, e.pageY, true);
            this.dragging = true;
            return false;
        };

        SafetySlider.prototype.domDrag = function (pageX, pageY, animate) {
            var pagePos, ratio, value;
            if (animate == null) {
                animate = false;
            }

            pagePos = pageX - this.slider.offset().left;
            pagePos = Math.min(this.slider.outerWidth(), pagePos);
            pagePos = Math.max(0, pagePos);

            if (this.pagePos !== pagePos) {
                this.pagePos = pagePos;
                return this.setSliderPosition(pagePos, animate);
            }
        };

        SafetySlider.prototype.setSliderPosition = function (position, animate) {
            if (animate == null) {
                animate = false;
            }
            this.setCurrentSection(position);

            if (animate && this.settings.animate) {
                this.dragger.animate({
                    left: position
                }, 200);
                if (this.settings.highlight) {
                    return this.highlightTrack.animate({
                        width: position
                    }, 200);
                }
            } else {
                this.dragger.css({
                    left: position
                });
                if (this.settings.highlight) {
                    return this.highlightTrack.css({
                        width: position
                    });
                }
            }
        };

        jQuery.extend(SafetySlider, {
            view: function (index) {

                var $displ = $(".sideview li"),
                    $vid = $("#vid-window");

                $displ.not("li:eq(" + index + ")").fadeOut("fast", function () {
                    $displ.eq(index).fadeIn("fast")
                })
                var coords = $("#slider-bullet li").eq(index).data('coord');

                if (coords == "") {
                    $vid.animate({opacity: 0})
                } else {
                    coords = coords.split("&")

                    $vid.stop().animate({
                        opacity: 1,
                        left: coords[0],
                        top: coords[1]
                    }, {
                        duration: 500,
                        step: function () {
                        }
                    })
                }
            }
        });

        SafetySlider.prototype.setCurrentSection = function (value) {

            switch (true) {
                case (value >= 0 && value < 120):
                    SafetySlider.view(0);
                    break;
                case (value >= 120 && value < 240):
                    SafetySlider.view(1);
                    break;
                case (value >= 240 && value < 360):
                    SafetySlider.view(2);
                    break;
                case (value >= 360 && value < 480):
                    SafetySlider.view(3);
                    break;
                case (value >= 480 && value < 600):
                    SafetySlider.view(4);
                    break;
                case (value >= 600 && value < 720):
                    SafetySlider.view(5);
                    break;
                case (value >= 720 && value < 840):
                    SafetySlider.view(6);
                    break;
                case (value >= 800):
                    SafetySlider.view(7);
                    break;
            }

        }

        return SafetySlider;

    })();
  
	// Pluginize
    $.fn.safetySlider = function() {		 
			var safetySliderNew = new SafetySlider($(this), arguments[0]);	
	}
	
 $(function() {
   
    $("[data-slider]").each(function() {

      var $el = $(this),
      settings = {};

      if ($el.data("slider-theme"))	settings.theme = $el.data("slider-theme");     
      if ($el.attr("data-slider-highlight")) settings.highlight = $el.data("slider-highlight");

      $el.safetySlider(settings);
	  
    });
  });
  
})(this.jQuery || this.Zepto, this);
