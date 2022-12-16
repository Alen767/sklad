(function($) {
  "use strict"

  $(window).on('load', function(){

/*
*  counter progress round circle
*/
$('.chart-two').each(function(){
      var $this = $(this);
$this.bind('inview', function(
       event,
       visible,
       visiblePartX,
       visiblePartY
   ) {
       if (visible) {
           $(this)
               .find('.countup')
               .each(function() {
                   var $this = $(this);
                   $({ Counter: 0 }).animate({ Counter: $this.text() }, {
                       duration: 2000,
                       easing: 'swing',
                       step: function() {
                           $this.text(Math.ceil(this.Counter));
                       },
                   });
               });
           $(this).unbind('inview');
       }
   })
 });

 $('.chart-two').each(function(){
       var $this = $(this);
 $this.bind('inview', function (
       event,
       visible,
       visiblePartX,
       visiblePartY
   ) {
       if (visible) {
           $('.chart-two').easyPieChart({
               //your configuration goes here
               easing: 'easeOut',
               delay: 3000,
               barColor: '#ffaa17',
               trackColor: '#e2e8ee',
               scaleColor: false,
               lineWidth: 5,
               trackWidth: 3,
               size: 90,
               animate: 2000,
           });
           $(this).unbind('inview');
       }
   });
   });
    /*
     * Run Progress Bar
     */
    var progressbar = function() {
      var window_position = $(window).scrollTop();
      window_position = window_position + $(window).height();
      $('.sigma-progress-bar-inner').each(function(index) {
        var element_position = $(this).offset().top;
        if (element_position < window_position) {
          if (!$(this).parent('.sigma-progress-bar').hasClass('bar-is-animated')) {
            $(this).parent('.sigma-progress-bar').addClass('bar-is-animated');
            var $this = this;
            var max_value = $(this).attr('data-bar-value');
            var width = 1;
            var id = setInterval(frame, 14);
            function frame() {
              if (width >= 100) {
                clearInterval(id);
              } else {
                if (max_value >= width) {
                  width++;
                  $($this).css('width', width + "%");
                }
              }
            }
          }
        }
      });
    }

    $('.chart').easyPieChart({
      easing: 'easeOut',
      delay: 3000,
      scaleColor: false,
      animate: 2000
    });

    progressbar();

    $(window).on('scroll', function() {
      progressbar();
    });

    /*
     * slick slider
     */
    $('.shortcode_slider').slick();

    // porfolio masonary
    var $grid = $('.masonry-items').isotope({
      itemSelector: '.masonry-item',
      percentPosition: true,
      masonry: {
        columnWidth: '.masonry-item'
      }
    });

    // items on button click
    $('.masonry-filter ul').on('click', 'li', function() {
      var filterValue = $(this).attr('data-filter');
      $grid.isotope({filter: filterValue});
    });

    // menu active class
    $('.masonry-filter ul li').on('click', function(event) {
      $(this).siblings('.active').removeClass('active');
      $(this).addClass('active');
      event.preventDefault();
    });

    /*
     * Magnific Popup
     */
    $('.gallery-loop .popup-image, .gallery-thumb').magnificPopup({
      type: 'image',
      gallery: {
        enabled: true
      },
      mainClass: 'mfp-fade'
    });

    /*
  	* popup video
  	*/
    $('.popup-video').magnificPopup({type: 'iframe'});

    /*
  	* counter
  	*/
    $('.counter-box').each(function(){
    var $this = $(this);
    $this.bind('inview', function ( event, visible, visiblePartX, visiblePartY ) {
    if (visible) { $(this)
        .find('.counter')
        .each(function () {
          var $this = $(this);
          $({ Counter: 0 }).animate(
            { Counter: $this.text() },
            {
              duration: 2000,
              easing: 'swing',
              step: function () {
                $this.text(Math.ceil(this.Counter));
              },
              complete: function(){
                $this.text(this.Counter)
              }
                }
              );
            });
          $(this).unbind('inview');
        }
      }
    )
  });


    /*
  	* Isotope Tabs
  	*/
    $(".sigma_post-filter-items").each(function(i, filterDynamicIds){
      var $filterDaynamicId = $( filterDynamicIds );
      $filterDaynamicId.isotope({
        filter: $filterDaynamicId.prev().find('.sigma_filter-first-item').data('filter'),
        animationOptions: {
          duration: 750,
          easing: 'linear',
          queue: false
        }
      });
    });

    $('body').on('click', '.sigma_post-filter a', function() {
      var wrapper = $(this).closest('.sigma-shortcode-wrapper');

      wrapper.find('.sigma_post-filter .active').removeClass('active');
      $(this).addClass('active');

      var selector = $(this).attr('data-filter');

      wrapper.find('.sigma_post-filter-items').isotope({
        filter: selector,
        animationOptions: {
          duration: 750,
          easing: 'linear',
          queue: false
        }
      });
      // try it
      return false;
    });

        /*
      	* Post Slider 1 and 2
      	*/
        var sliderImg = $('.posts-slider-one'),
          sliderContent = $('.post-content-slider'),
          countStatus = $('.slider-count'),
          countBig = $('.slider-count-big');

        sliderImg.slick({
          slidesToShow: 3,
          slidesToScroll: 1,
          fade: false,
          infinite: true,
          autoplay: true,
          autoplaySpeed: 4000,
          arrows: false,
          dots: false,
          centerMode: true,
          centerPadding: '6%',
          asNavFor: sliderContent,
          responsive: [
            {
              breakpoint: 1600,
              settings: {
                slidesToShow: 2
              }
            }, {
              breakpoint: 992,
              settings: {
                slidesToShow: 1,
                centerPadding: '15%'
              }
            }
          ]
        });

        sliderContent.slick({
          slidesToShow: 1,
          slidesToScroll: 1,
          fade: false,
          infinite: true,
          autoplay: true,
          autoplaySpeed: 4000,
          arrows: false,
          dots: true,
          asNavFor: sliderImg
        });

        sliderContent.on('init reInit afterChange', function(event, slick, currentSlide, nextSlide) {
          if (!slick.$dots) {
            return;
          }
          var i = (
            currentSlide
            ? currentSlide
            : 0) + 1;
          var statusText = i > 10
            ? i
            : '0' + i;
          countStatus.html('<span class="current">' + statusText + '</span>/' + slick.$dots[0].children.length);
          countBig.html('<span >' + statusText + '</span> ');
        });

        var sliderTwo = $('.posts-slider-two');
        sliderTwo.slick({
          slidesToShow: 1,
          slidesToScroll: 1,
          fade: false,
          infinite: true,
          autoplay: false,
          autoplaySpeed: 4000,
          arrows: true,
          dots: false,
          centerMode: true,
          centerPadding: '28%',
          prevArrow: '<div class="slick-arrow prev-arrow"><i class="fal fa-arrow-left"></i></div>',
          nextArrow: '<div class="slick-arrow next-arrow"><i class="fal fa-arrow-right"></i></div>',
          responsive: [
            {
              breakpoint: 1600,
              settings: {
                centerPadding: '20%'
              }
            }, {
              breakpoint: 992,
              settings: {
                centerPadding: '15%'
              }
            }, {
              breakpoint: 768,
              settings: {
                centerPadding: '10%'
              }
            }, {
              breakpoint: 576,
              settings: {
                centerPadding: '5%'
              }
            }
          ]
        });
  });


  /*-------------------------------------------------------------------------------
  Filter faq
  -------------------------------------------------------------------------------*/
  $("#faq-search-form").keyup(function(){

      // Retrieve the input field text and reset the count to zero
      var filter = $(this).val(), count = 0;

      // Loop through the comment list
      $(".faq_box-filter").each(function(){

          // If the list item does not contain the text phrase fade it out
          if ($(this).text().search(new RegExp(filter, "i")) < 0) {
              $(this).fadeOut();

              // Show the list item if the phrase matches and increase the count by 1
          } else {
              $(this).show();
              count++;
          }
      });
  });

/*-------------------------------------------------------------------------------
Search Trigger
-------------------------------------------------------------------------------*/
  $(".header-search-trigger").on('click', function(e) {
   $(".header-search-form-wrapper").toggleClass('open');
  });
/*-------------------------------------------------------------------------------
 Cart Trigger
 -------------------------------------------------------------------------------*/
 $("body").on('click', '.sigma_header-cart-trigger', function(e) {
    e.preventDefault();
    $(this).next(".cart-dropdown-menu").toggleClass("show");
  });

  /*-------------------------------------------------------------------------------
   Cart Trigger
   -------------------------------------------------------------------------------*/
  $(".collapse-trigger-right").on('click', function() {
    $("body").toggleClass('collapse-right-open');
  });

})(jQuery);
