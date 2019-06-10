(function ($, Drupal) {

  'use strict';

  var initialized;
  var likeitId = '';

  function init() {
    if (!initialized) {
      initialized = true;
      // Add your one-time only code here

      likeitId = $('a.use-ajax.likeit-wrapper').attr('id');


      /* main header menu */
      /*

        Provides logic for collapsing child menu area when
        clicking on active element

      */
      // console.log("init");


      // Italicise `hhc`

      $("#views-bootstrap-event-calendar-event-calendar-block li div h2 a:contains('hhc'), " +
        "ol.breadcrumb li:contains('hhc'), " +
        ".carousel-caption h3 a:contains('hhc')").html(function (_, html) {
        return html.replace(/(hhc)/g, '<span class="hhc-italic">$1</span>');
      });


      /* tooltips */
      $('[data-toggle="tooltip"]').tooltip();

      //$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
      $('body').on('shown.bs.tab', 'a[data-toggle="tab"]', function (e) {
        console.log("SHOW")
        var target = $(e.target).attr("href") // activated tab
        $('#mainmenuchildrenarea').collapse("show");
      });

      $('body').on('click', '#btnSearch', function (e) {

        $('#search-overlay').slideDown();

      });

      $('body').on('click', '#btnCloseSearch', function (e) {

        $('#search-overlay').fadeOut();

      });


      $('body').on('click', '.menu--main li.active a[data-toggle="tab"]', function (e) {
        console.log("HIDE")
        $(this).parent().removeClass("active");
        $('#mainmenuchildrenarea').collapse("hide");
        e.preventDefault();
        e.stopPropagation();
      });

      //console.log("location: "+location.pathname);

      /* adds class to current link element in side menu */
      /* Now redundant as it's replaced by a preprocess function in `eisai_intranet_theme.theme`. */
      // $('.content-sibling-link a[href="' + location.pathname + '"]').parent().addClass('current');


      $('body').on('click', '#btnAddShortcut, #btnSideAddShortcut', function (e) {

        //alert("add shortcut: "+drupalSettings.path.currentPath);

        $('#btnAddShortcut, #btnSideAddShortcut').addClass("hasshortcut");

        var pageTitle = document.title;
        var pagePath = drupalSettings.path.currentPath;

        //replace all slashes otherwise breaks endpoint!
        var pagePath = pagePath.replace(/[/]/g, 'ForwardSlash');

        var endpoint = Drupal.url('addshortcut-callback/' + pageTitle + '/' + pagePath);
        Drupal.ajax({url: endpoint}).execute().done(
          function (commands, statusString, ajaxObject) {

            //window.setTimeout(function(){
            console.log("ajax call complete: " + ajaxObject.message);
            //$('.js-view-dom-id-7d297aa1b3fcc37eacf9c199e6bd76c332a92e0805f3f9d82e72ceeb00f12185').trigger('RefreshView')
            if (Drupal.views) {
              jQuery.each(Drupal.views.instances, function (i, view) {
                var selector = '.js-view-dom-id-' + view.settings.view_dom_id;
                if (view.settings.view_name == "my_shortcuts") {
                  //$(".product--default").removeClass("highlight");
                  jQuery(selector).triggerHandler('RefreshView');
                }
                jQuery(selector).unbind();
              });
            }
            //}, 2000);
          });

      });
    }
  }


  Drupal.behaviors.initStuffEveryPage = {
    attach: function () {
      init();


    }
  };

  // Override the title on the 'LikeIt' button.
  Drupal.behaviors.LikeItOverride = {
    attach: function(context, settings) {
      $(document).ajaxComplete(function(event, xhr, settings) {
        if(xhr.responseJSON !== undefined && xhr.responseJSON.length > 0) {
          if (xhr.responseJSON[0].selector === '#' + likeitId) {
            likeitId = $('a.use-ajax.likeit-wrapper').attr('id');
            var likeitNumber = $.trim($('#' + likeitId + ' .likeit-count').text()) * 1;
            var likeitLike = '';
            var likeitActions = $('#' + likeitId).attr('href').split('/');
            var likeitAction = likeitActions[2];
            var likeitTitle = '';
            var $likeitTitle = $('#' + likeitId + ' .likeit-title');
            $likeitTitle.insertAfter('#' + likeitId + ' .likeit-count');
            if (likeitNumber === 1) {
              likeitLike = ' like';
            }
            else {
              likeitLike = ' likes';
            }
            if (likeitAction === 'like') {
              likeitTitle = likeitLike + ' - click to like';
            }
            else {
              likeitTitle = likeitLike + ' - click to unlike'
            }
            $likeitTitle.html(likeitTitle);
          }
        }

      });
    }
  }


})(jQuery, Drupal);


/*
Drupal.behaviors.myBehavior = {
  attach: function (context, settings) {
    // Using once() to apply the myCustomBehaviour effect when you want to run just one function.
    $('input.myCustomBehavior', context).once('myCustomBehavior').addClass('processed');

    // Using once() with more complexity.
    $('input.myCustom', context).once('mySecondBehavior').each(function () {
      if ($(this).visible()) {
        $(this).css('background', 'green');
      }
      else {
        $(this).css('background', 'yellow').show();
      }
    });
  }
};
*/