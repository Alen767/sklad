(function($) {
  "use strict"
  /*-------------------------------------------------------------------------------
 Search Trigger
 -------------------------------------------------------------------------------*/
 $(".search-trigger").on('click', function(e) {
   $(".search-form-wrapper").toggleClass('open');
 });
  /*-------------------------------------------------------------------------------
  Preloader
  -------------------------------------------------------------------------------*/
  // Name preloader
  var preloaderLetters = $('#letters'),
  letterItems = preloaderLetters.find('span');
  function doLetterAnim(){

    var delay = 200;
    letterItems.each(function(e, i) {
      var $this = $(this);
      setTimeout(function() {
        $this.addClass('appeared');
        if(e == letterItems.length - 1){
          $(".preloader-name").addClass('done');
        }
      }, 50 + e * delay)
    })

  }
  if(preloaderLetters.length){
    doLetterAnim();
  }

  $(window).on('load', function() {
    $('.sigma_preloader').addClass('hidden');
  });

  /*-------------------------------------------------------------------------------
  Jump To
  -------------------------------------------------------------------------------*/
  $('body').on('click', '.sigma-go-to', function(e){
    e.preventDefault();

    var jumpTo = $(this).data('to');

    $("html, body").animate({
      scrollTop: $(jumpTo).offset().top
    }, 600);
    return false;

  });

  /*-------------------------------------------------------------------------------
  Mobile Navigation and Aside panels
  -------------------------------------------------------------------------------*/
  $(".aside-trigger").on('click', function() {
    $("body").toggleClass('aside-open');
  });

  $(".aside-trigger-right").on('click', function() {
    $("body").toggleClass('aside-right-open');
  });

  $(".sigma_aside .menu-item-has-children > a").on('click', function(e) {
    var submenu = $(this).next(".sub-menu");
    e.preventDefault();

    submenu.slideToggle(200);
  });


  /*-------------------------------------------------------------------------------
  Sticky Header
	-------------------------------------------------------------------------------*/
  var header = $(".can-sticky");
  var headerHeight = header.innerHeight();
  function doSticky() {
    if (window.pageYOffset > headerHeight + 120) {
      header.addClass("sticky");
    } else {
      header.removeClass("sticky");
    }
  }
  doSticky();


  /*-------------------------------------------------------------------------------
  on scroll functions
  -------------------------------------------------------------------------------*/
  $(window).on('scroll', function() {

    // Sticky header
    doSticky();

    // Back to top
    stickBackToTop();

  });


  /*-------------------------------------------------------------------------------
  Back to top
  -------------------------------------------------------------------------------*/
  function stickBackToTop(){
    if (window.pageYOffset > 400) {
      $('.sigma_to-top').addClass('active');
    }else{
      $('.sigma_to-top').removeClass('active');
    }
  }
  stickBackToTop();

  $('body').on('click', '.sigma_to-top', function() {
    $("html, body").animate({
      scrollTop: 0
    }, 600);
    return false;
  });

  /*-------------------------------------------------------------------------------
  Masonry
  -------------------------------------------------------------------------------*/
  $('.masonry').imagesLoaded(function() {
    var isotopeContainer = $('.masonry');
    isotopeContainer.isotope({
      itemSelector: '.masonry-item',
    });
  });


  /*-------------------------------------------------------------------------------
  Countdown
  -------------------------------------------------------------------------------*/
  $(".sigma_countdown-timer").each(function(){
    var $this = $(this);
    $this.countdown($this.data('countdown'), function(event) {
      $(this).text(
        event.strftime('%D days %H:%M:%S')
      );
    });
  });

  /*-------------------------------------------------------------------------------
  Tooltips
  -------------------------------------------------------------------------------*/

  $('.popup-sigma a').magnificPopup({
    disableOn: 700,
    type: 'iframe',
    mainClass: 'mfp-fade',
    removalDelay: 160,
    preloader: false,
    fixedContentPos: false
  });

  //On scroll events
  $(window).on('scroll', function() {

    doSticky();
    stickBackToTop();

  });
  /*-------------------------------------------------------------------------------
  Gallery Format Slider
  -------------------------------------------------------------------------------*/
  $(".sigma_post.format-gallery .sigma_post-thumb.has-slider").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    dots: true,
    autoplay: false,
    centerMode: true,
    centerPadding: 0,
    responsive: [
      {
        breakpoint: 767,
        settings: {
          arrows: false
        }
      }
    ]
  });
  /*-------------------------------------------------------------------------------
    Ajax Search
  -------------------------------------------------------------------------------*/
  /* Perform a delay before executing a function (callback) */
  function delay(callback, ms) {
    var timer = 0;
    return function() {
      var context = this, args = arguments;
      clearTimeout(timer);
      timer = setTimeout(function () {
        callback.apply(context, args);
      }, ms || 0);
    };
  }

  $(".sigma-ajax-search-wrap .search-field").on('keyup', delay(function(){

    var val = $(this).val();

    doAjaxProductSearch(val);

  }, 500));

  $(document).on('mouseup', function(e){
    var container = $(".wrapo-product-search-results");

    if (!container.is(e.target) && container.has(e.target).length === 0){
      container.hide();
    }

  });


  function doAjaxProductSearch(val){

    $(".sigma-ajax-search-wrap .woocommerce-product-search button").html('<i class="fa fa-spin fa-spinner"></i>');

    $.ajax({
      url: ajax_woocommerce_object.ajaxurl,
      type: "post",
      data: {
        action: 'wrapo_ajax_search_content',
        keyword: val,
      },
      success: function (response) {
        $(".wrapo-product-search-results").show();
        $(".sigma-ajax-search-wrap .woocommerce-product-search button").html('<i class="flaticon-search"></i>');
        $(".wrapo-product-search-results").html(response);
      }
    });
  }

  /*-------------------------------------------------------------------------------
    Infinite Scroll
    -------------------------------------------------------------------------------*/
    if($('.scroller-status').length){
      $('.wrapo_product-infinite-scroll #main div.products').infiniteScroll({
        path: '.woocommerce-pagination a.next',
        append: '.sigma_product',
        status: '.scroller-status',
        hideNav: '.woocommerce-pagination',
        history: false,
      });
    }

})(jQuery);
