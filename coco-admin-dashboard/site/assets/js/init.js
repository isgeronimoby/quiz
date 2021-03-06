var w;
var h;
var dw;
var dh;


function executeFunctionByName(functionName, context /*, args */) {
  var args = [].slice.call(arguments).splice(2);
  var namespaces = functionName.split(".");
  var func = namespaces.pop();
  for(var i = 0; i < namespaces.length; i++) {
    context = context[namespaces[i]];
  }
  return context[func].apply(this, args);
}

var changeptype = function(){
    w = $(window).width();
    h = $(window).height();
    dw = $(document).width();
    dh = $(document).height();

    if(jQuery.browser.mobile === true){
      	$("body").addClass("mobile").removeClass("fixed-left");
    }

    if(!$("#wrapper").hasClass("forced")){
	    if(w > 990){
	    	$("body").removeClass("smallscreen").addClass("widescreen");
	        $("#wrapper").removeClass("enlarged");
	    }else{
	    	$("body").removeClass("widescreen").addClass("smallscreen");
	    	$("#wrapper").addClass("enlarged");
	    	$(".left ul").removeAttr("style");
	    }
	    if($("#wrapper").hasClass("enlarged") && $("body").hasClass("fixed-left")){
	    	$("body").removeClass("fixed-left").addClass("fixed-left-void");
	    }else if(!$("#wrapper").hasClass("enlarged") && $("body").hasClass("fixed-left-void")){
	    	$("body").removeClass("fixed-left-void").addClass("fixed-left");
	    }

	}
	toggle_slimscroll(".slimscrollleft");
};

$(document).ready(function(){
	FastClick.attach(document.body);
	resizefunc.push("initscrolls");
	resizefunc.push("changeptype");
	$('.sparkline').sparkline('html', { enableTagOptions: true });
    
//TOOLTIP
	$('body').tooltip({
		selector: "[data-toggle=tooltip]",
		container: "body"
	});

	var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
	if(isSafari) {
		$('body').addClass('safari');
		$('.md-just-me').removeClass('md-just-me');
	}


$(".open-left").click(function(e){
	e.stopPropagation();
	$("#wrapper").toggleClass("enlarged");
	$("#wrapper").addClass("forced");

	if($("#wrapper").hasClass("enlarged") && $("body").hasClass("fixed-left")){
		$("body").removeClass("fixed-left").addClass("fixed-left-void");
	}else if(!$("#wrapper").hasClass("enlarged") && $("body").hasClass("fixed-left-void")){
		$("body").removeClass("fixed-left-void").addClass("fixed-left");
	}
	if($("#wrapper").hasClass("enlarged")){
		$(".left ul").removeAttr("style");
	}else{
		$(".subdrop").siblings("ul:first").show();
	}
	toggle_slimscroll(".slimscrollleft");
	$("body").trigger("resize");
});

// LEFT SIDE MAIN NAVIGATION
	$("#sidebar-menu a").on('click',function(e){
		if(!$("#wrapper").hasClass("enlarged")){

			if($(this).parent().hasClass("has_sub")) {
				e.preventDefault();
			}

			if (!$(this).hasClass("subdrop")) {
				// hide any open menus and remove all other classes
				/*
				$("ul", $(this).parents("ul:first")).slideUp(350);
				$("a", $(this).parents("ul:first")).removeClass("subdrop");
				$("#sidebar-menu .pull-right i").removeClass("fa-angle-up").addClass("fa-angle-down");
				*/

				// open our new menu and add the open class
				$(this).next("ul").slideDown(350);
				$(this).addClass("subdrop");
				$(".pull-right i", $(this).parents(".has_sub:last")).removeClass("fa-angle-down").addClass("fa-angle-up");
				$(".pull-right i", $(this).siblings("ul")).removeClass("fa-angle-up").addClass("fa-angle-down");
			} else if ($(this).hasClass("subdrop")) {
				$(this).removeClass("subdrop");
				$(this).next("ul").slideUp(350);
				$(".pull-right i", $(this).parent()).removeClass("fa-angle-up").addClass("fa-angle-down");
				//$(".pull-right i",$(this).parents("ul:eq(1)")).removeClass("fa-chevron-down").addClass("fa-chevron-left");
			}
		}
	});



// NAVIGATION HIGHLIGHT & OPEN PARENT
	$("#sidebar-menu ul li.has_sub a.active").parents("li:last").children("a:first").addClass("active").trigger("click");

//WIDGET ACTIONS
	$(".widget-header .widget-close").on("click",function(event){
		event.preventDefault();
		$item = $(this).parents(".widget:first");
		bootbox.confirm("Are you sure to remove this widget?", function(result) {
			if(result === true){
				$item.addClass("animated bounceOutUp");
				window.setTimeout(function () {
					if($item.data("is-app")){
            
						$item.removeClass("animated bounceOutUp");
						if($item.hasClass("ui-draggable")){
							$item.find(".widget-popout").click();
						}
						$item.hide();
						$("a[data-app='"+$item.attr("id")+"']").addClass("clickable");
					}else{
						$item.remove();
					}
				}, 300);
			}
		});
	});

	$(document).on("click", ".widget-header .widget-toggle", function(event){
		event.preventDefault();
		$(this).toggleClass("closed").parents(".widget:first").find(".widget-content").slideToggle();
		$(this).parent().find('a:not(:last-of-type)').toggle();
	});

	$(document).on("click", ".widget-header .widget-popout", function(event){
		event.preventDefault();
		var widget = $(this).parents(".widget:first");
		if(widget.hasClass("modal-widget")){
			$("i",this).removeClass("icon-window").addClass("icon-publish");
			widget.removeAttr("style").removeClass("modal-widget");
			widget.find(".widget-maximize,.widget-toggle").removeClass("nevershow");
			widget.draggable("destroy").resizable("destroy");
		}else{
			widget.removeClass("maximized");
			widget.find(".widget-maximize,.widget-toggle").addClass("nevershow");
			$("i",this).removeClass("icon-publish").addClass("icon-window");
			var w = widget.width();
			var h = widget.height();
			widget.addClass("modal-widget").removeAttr("style").width(w).height(h);
			$(widget).draggable({ handle: ".widget-header",containment: ".content-page" }).css({"left":widget.position().left-2,"top":widget.position().top-2}).resizable({minHeight: 150,minWidth: 200});
		}
		window.setTimeout(function () {
			$("body").trigger("resize");
		},300);
	});


$(document).on("click", ".widget", function(){
	if($(this).hasClass("modal-widget")){
		$(".modal-widget").css("z-index",5);
		$(this).css("z-index",6);
	}
});

	$(document).on("click", '.widget .reload', function (event) {
		event.preventDefault();
		var el = $(this).parents(".widget:first");
		blockUI(el);
		window.setTimeout(function () {
			unblockUI(el);
		}, 1000);
	});

	$(document).on("click", ".widget-header .widget-maximize", function(event){
		event.preventDefault();
		$(this).parents(".widget:first").removeAttr("style").toggleClass("maximized");
		$("i",this).toggleClass("icon-resize-full-1").toggleClass("icon-resize-small-1");
		$(this).parents(".widget:first").find(".widget-toggle").toggleClass("nevershow");
		$("body").trigger("resize");
		return false;
	});


//RUN RESIZE ITEMS
	$(window).resize(debounce(resizeitems,100));
	$("body").trigger("resize");

//SELECT
	$('.selectpicker').selectpicker();

// SIDE-BAR menu on minimized interface
	var sideBarSections = $('#sidebar-menu > ul > li');
	sideBarSections.on('click', function () {
		if ($(this).hasClass('mouseHover')) {
			// menu is opened
			sideBarSections.removeClass('mouseHover');
		} else {
			// menu is closed
			sideBarSections.removeClass('mouseHover');
			$(this).addClass('mouseHover');
		}
	});
	$('button.button-menu-mobile.open-left').click(function(){
		$('#sidebar-menu ul > li').removeClass('mouseHover');
	});

// HIDING FULLSCREEN BUTTON IF IT IS NOT AVAILABLE
	if ( screenfull ) {
		if (screenfull.enabled) {
			$('.icon-resize-full-2').parent().show();
		} else $('.icon-resize-full-2').parent().hide();
	}

	// on androids lower than 4.4 no popup on logout, just simple logout
	var uag = window.navigator.userAgent.toLowerCase();
	if (uag.indexOf("android") > 0) {
		var androidversion = parseFloat(uag.slice(uag.indexOf("android") + 8));
		if (androidversion <= 4.4) {
			$('a[data-modal="logout-modal"]').click(function(e){
				window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + $('#logout-modal a.btn.btn-success.md-close').attr('href');
			});

		}
	}

	$('.dropdown > ul li a').click(function(e){
		$(this).parent().parent().parent().find('button').html( $(this).html() );
	});

	var overallButtons = $('.btn-group button');
	overallButtons.click(function(e){
		overallButtons.removeClass('active');
		$(this).addClass('active');
	});

});

var debounce = function(func, wait, immediate) {
	var timeout, result;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) result = func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) result = func.apply(context, args);
		return result;
	};
};

function resizeitems(){
	if($.isArray(resizefunc)){
		for (i = 0; i < resizefunc.length; i++) {
			window[resizefunc[i]]();
		}
	}
}

function initscrolls(){
	if(jQuery.browser.mobile !== true){
		//SLIM SCROLL
		$('.slimscroller').slimscroll({
			height: 'auto',
			size: "5px"
		});

		$('.slimscrollleft').slimScroll({
			height: 'auto',
			position: 'left',
			size: "5px",
			color: '#7A868F'
		});
	}
}
function toggle_slimscroll(item){
	if($("#wrapper").hasClass("enlarged")){
		$(item).css("overflow","inherit").parent().css("overflow","inherit");
		$(item). siblings(".slimScrollBar").css("visibility","hidden");
	}else{
		$(item).css("overflow","hidden").parent().css("overflow","hidden");
		$(item). siblings(".slimScrollBar").css("visibility","visible");
	}
}

function nifty_modal_alert(effect,header,text){
    
	var randLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
	var uniqid = randLetter + Date.now();

	$modal =  '<div class="md-modal md-effect-'+effect+'" id="'+uniqid+'">';
	$modal +=    '<div class="md-content">';
	$modal +=      '<h3>'+header+'</h3>';
	$modal +=      '<div class="md-modal-body">'+text;
	$modal +=      '</div>';
	$modal +=    '</div>';
	$modal +=  '</div>';

	$("body").prepend($modal);

	window.setTimeout(function () {
		$("#"+uniqid).addClass("md-show");
		$(".md-overlay,.md-close").click(function(){
          $("#"+uniqid).removeClass("md-show");
          window.setTimeout(function () {$("#"+uniqid).remove();},500);
        });
    },100);

    return false;
}

function blockUI(item) {    
    $(item).block({
      message: '<div class="loading"></div>',
      css: {
          border: 'none',
          width: '14px',
          backgroundColor: 'none'
      },
      overlayCSS: {
          backgroundColor: '#fff',
          opacity: 0.4,
          cursor: 'wait'
      }
    });
}

function unblockUI(item) {
    $(item).unblock();
}

function toggle_fullscreen(){
	if (screenfull.enabled) {
		if (!screenfull.isFullscreen) screenfull.request();
		else screenfull.exit();
	}
}
function setTotalValue(id, totalCount) {
	if (totalCount == null)
		totalCount = 0;

	$(id).attr("data-value", totalCount);
}