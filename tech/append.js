$(window).on("load", function(){

// Dev mode
	$(".dev").css({ display: 'none' })
	if ($("body").hasClass("developer")) {
		$("*.dev").css({ display: '' });
		$("a#dev").css({ display: 'none' });
		$("body").prepend('<div id="console"><p></p><p style="border-top: 1px solid var(--c0)">Kliknij, żeby konsola przeszła w przeciwległy róg</p></div>');
	}
	
// Cards setting
	$(".cards > *").addClass("closed");
	for (i=0; i<$(".cards > figure").length; i++) {
		thisCard = $(".cards > figure").eq(i);

		// NavBar
		if (thisCard.children("nav").length == 0) thisCard.append('<nav class="card-nav swap"></nav>');
		if (thisCard.find("div.info").length == 1) thisCard.children("nav").append('<a class="card-info" name-svgkit="svg_info"></a>');
		thisCard.children("nav").addClass("card-nav swap").append('<a class="card-close" name-svgkit="svg_close"></a>');

		// Elements projecting for styling
		if (thisCard.hasClass("initiative")) {
			thisCard.children("h4").addClass("dewiza");
			thisCard.find("section").wrapAll('<div class="fable"></div>');
		}
		if (thisCard.find("header").children("h1").length == 0) thisCard.find("header").append('<h1>' + thisCard.find("header > h2").text() + '</h1>');
		thisCard.find("header, h4.dewiza").wrapAll('<div class="top"></div>');
	}

	
	$("body > header").children("nav").addClass("header-nav");
	
	function disableTransitions() {
		$(".cards > figure:not(.opened)").css({ transition: 'none' }).on("mouseenter", function() { $(this).css({ transition: '' }) });
	};
	
// Setting SVGs
	$(".cards > figure.initiative > nav > a.edit").attr("name-svgkit", "svg_edit");


// NavBar
	// Off - On switch
	$("body > header > nav > a").on("click", function() {
		if ($(this).hasClass("off")) $(this).toggleClass("on").toggleClass("off");
		else if ($(this).hasClass("on")) $(this).toggleClass("on").toggleClass("off");
	});
	

	// Theme
	$("a#theme").on("click", function() {
		$("body").removeClass(theme);
		time_theme = new Date();
		expires_theme = time_theme;
		document.cookie = "theme=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
		if (theme == 'light') {
			theme = 'dark';
			if ((time_theme.getHours() > 6 || (time_theme.getHours() == 6 && time_theme.getMinutes() >= 30)) && (time_theme.getHours() < 20 || (time_theme.getHours() == 20 && time_theme.getMinutes() < 30))) {
				// if h:m >= 6:30 & < 20:30 -> motyw ciemny zostaje do 6:30 następnego dnia
				expires_theme.setDate(expires_theme.getDate()+1); expires_theme.setHours(6); expires_theme.setMinutes(30); expires_theme.setSeconds(0);
				document.cookie = "theme=dark; expires=" + expires_theme.toUTCString() + ";path=/";
			}
		}
		else if (theme == 'dark') {
			theme = 'light';
			if ((time_theme.getHours() > 20 || (time_theme.getHours() == 20 && time_theme.getMinutes() >= 30)) && time_theme.getHours() <= 23) {
				// if h:m >= 20:30 & < 0:00 -> motyw jasny zostaje do 20:30 następnego dnia
				expires_theme.setDate(expires_theme.getDate()+1); expires_theme.setHours(20); expires_theme.setMinutes(30); expires_theme.setSeconds(0);
				document.cookie = "theme=light; expires=" + expires_theme.toUTCString() + ";path=/";
			}
			else if ((time_theme.getHours() < 6 || (time_theme.getHours() == 6 && time_theme.getMinutes() <= 30)) && time_theme.getHours() >= 0) {
				// if h:m >= 0:00 & < 6:30 -> motyw jasny zostaje do 20:30
				expires_theme.setHours(20); expires_theme.setMinutes(30); expires_theme.setSeconds(0);
				document.cookie = "theme=light; expires=" + expires_theme.toUTCString() + ";path=/";
			}
		}
		$("body").addClass(theme).css({ "transition": "background-color 300ms var(--easing)" }, 300);
	});

	//~ // Info
	//~ $("a.info").on("click", function() {
		//~ $(".cards > figure.opened > div.info").
	


// Gallery Component
{
	function gallery_zero() {
		for (i=0;i<gallery_length;i++) {
			gallery_scroll[i] = 1;
		}
	};	
	gallery_length = $(".gallery").length;
	gallery_scroll = [];
	gallery_zero();
	
	// settings
	for (i=0;i<$(".gallery").length;i++) {
		gal = $(".gallery").eq(i);
		gal.wrap('<div class="gallery-container"></div>');
		gal.after('<div class="control"><a class="prev"><div name-svgkit="svg_last"></div></a><a class="next"><div name-svgkit="svg_next"></div></a></div>');
		gal.children().eq(0).addClass("current");
		figury = gal.children("figure").length;
		if (gal.hasClass("pictures")) {
			gal.parent().addClass("pictures");
			for (i2=0;i2<figury;i2++) {
				gal.children().eq(i2).find("h4, p, ul, ol").wrapAll('<div><div></div></div>');
				//~ gal.children().eq(i2).find("div").prepend('<a class="picture_description_button"></a>');
				//~ gal.children().eq(i2).find("a").attr("name-svgkit", "svg_expand_more");
			}
		}
	}
	
	// prev button click
	$(".prev").on("click", function() {
		gal = $(this).parent().prev();
		gallery_i = gal.index(".gallery");
		gallery_scroll[gallery_i]--;
		gallery_size = gal.children("figure").length;

		// between
		if (gallery_scroll[gallery_i] >= 2) {
			gal.animate({ scrollLeft: (gallery_scroll[gallery_i]-1)*(gal.width() + 16) }, 350, bezier );
			// this
			$("div", this).children().remove();
			$("div", this).attr("name-svgkit", "svg_prev").removeClass("svg_set");
			// next
			$(this).next().find("div").children().remove();
			$(this).next().find("div").attr("name-svgkit", "svg_next").removeClass("svg_set");
		}
		// start
		else if (gallery_scroll[gallery_i] == 1) {
			gal.animate({ scrollLeft: (gallery_scroll[gallery_i]-1)*(gal.width() + 16) }, 350, bezier );
			// this
			$("div", this).children().remove();
			$("div", this).attr("name-svgkit", "svg_last").removeClass("svg_set");
			// next
			$(this).next().find("div").children().remove();
			$(this).next().find("div").attr("name-svgkit", "svg_next").removeClass("svg_set");
		}
		// finish
		else {
			gallery_scroll[gallery_i] = gallery_size;
			gal.animate({ scrollLeft: (gallery_size-1)*(gal.width() + 16) }, 350, bezier );
			// this
			$("div", this).children().remove();
			$("div", this).attr("name-svgkit", "svg_prev").removeClass("svg_set");
			// next
			$(this).next().find("div").children().remove();
			$(this).next().find("div").attr("name-svgkit", "svg_first").removeClass("svg_set");
		}
		
		gal.children().removeClass("current");
		gal.children().eq(gallery_scroll[gallery_i]-1).addClass("current");
		SVGKit();
	});
	
	// next button click
	$(".next").on("click", function() {
		gal = $(this).parent().prev();
		gallery_i = gal.index(".gallery");
		gallery_scroll[gallery_i]++;
		gallery_size = gal.children("figure").length;

		// finish
		if (gallery_scroll[gallery_i] == gallery_size) {
			gal.animate({ scrollLeft: (gallery_scroll[gallery_i]-1)*(gal.width() + 16) }, 350, bezier );
			// prev
			$(this).prev().find("div").children().remove();
			$(this).prev().find("div").attr("name-svgkit", "svg_prev").removeClass("svg_set");
			// this
			$("div", this).children().remove();
			$("div", this).attr("name-svgkit", "svg_first").removeClass("svg_set");
		}
		// between
		else if (gallery_scroll[gallery_i] < gallery_size) {
			gal.animate({ scrollLeft: (gallery_scroll[gallery_i]-1)*(gal.width() + 16) }, 350, bezier );
			// prev
			$(this).prev().find("div").children().remove();
			$(this).prev().find("div").attr("name-svgkit", "svg_prev").removeClass("svg_set");
			// this
			$("div", this).children().remove();
			$("div", this).attr("name-svgkit", "svg_next").removeClass("svg_set");
		}
		// start
		else {
			gallery_scroll[gallery_i] = 1;
			gal.animate({ scrollLeft: 0 }, 350, bezier );
			// prev
			$(this).prev().find("div").children().remove();
			$(this).prev().find("div").attr("name-svgkit", "svg_last").removeClass("svg_set");
			// this
			$("div", this).children().remove();
			$("div", this).attr("name-svgkit", "svg_next").removeClass("svg_set");
		}

		
		gal.children().removeClass("current");
		gal.children().eq(gallery_scroll[gallery_i]-1).addClass("current");
		SVGKit();
	});

	
	$(".gallery > figure").on("click", function() {
		var heightNotMin = $(this).find("div > div").height() + 120;
		if ($(this).parent().hasClass("min")) $(this).children("div").css({ height: heightNotMin });
		else {
			$(this).parent().find("figure > div").css({ height: '' });
			$(this).children("div").css({ height: heightNotMin }).css({ height: '' });
		}
		$(this).parent().toggleClass("min");
	});
}


// Table Component
{
	for (i=0;i<$(".table").length;i++) {
		tab = $(".table").eq(i);
		tab.wrap('<div class="table-container"></div>');
		tab.parent().prepend('<div class="column-1 current"></div>');
		taby = tab.children("div");
		for (i1=0; i1<taby.length; i1++) {
			taby.eq(i1).children().eq(0).appendTo("div.column-1.current");
		}
		$("div.column-1.current").removeClass("current");
	}
}


// Returnable Cards		 // Usunięcie zamykanej karty i pozostawienie kopii działa dużo płynniej
	
	// Open
	$("figure.closed").on("click", function(){
			
		if ( $(".cards > figure.opened").length == 0 ) {
		
			thisCard = $(this);
			
			thisCard.after(thisCard.clone(true).addClass("copy"));
			

			// Metamorphosis
			
				// Dimensions					
				closedCardWidth = thisCard.width();
				closedCardHeight = thisCard.height();
				thisLeft = thisCard.offset().left - 8;
				thisTop = thisCard.parent().offset().top - $(window).scrollTop() + thisCard.position().top;
				
				// From
				thisCard.addClass("opened").removeClass("closed").css({ left: thisLeft, top: thisTop, width: closedCardWidth });
				thisCard.children("div.top").clone().addClass("floating").css({ position: 'absolute', display: 'none', 'z-index': 100 }).prependTo(thisCard);
				thisCard.parent().after('<div id="fade"></div>');
				
				// To
				thisCard.css({ left: -8, top: 112-8, width: '100vw', height: 'calc(100vh - 112px)' });
				
				if (thisCard.hasClass("initiative")) {	
					thisCard.find("header").animate({ height: 450 }, butter, bezier);
					thisCard.children("div.top").css({ 'min-height': 'unset' });
				}
				thisCard.children(".fable").css({ width: $(window).width(), left: ($(window).width() - closedCardWidth) / -2 }).animate({ left: 0 }, butter, bezier);
				


			// Page header	
			pageHeader = $('body > header');

				// Adding tabs
					if (thisCard.hasClass("unpacked")) maxiHeader = thisCard.children("h1");
					else maxiHeader = thisCard.find("section > h3");
					
					$('<div class="tabs swap"><div class="indicator"></div></div>').appendTo(pageHeader);
					{
						if (thisCard.hasClass("unpacked")) $('<a>' + thisCard.find("header > h1").html() + '</a>').appendTo(pageHeader.children("div.tabs"));
						for (i=0; i<maxiHeader.length; i++) $('<a>' + maxiHeader.eq(i).text() + '</a>').appendTo(pageHeader.children("div.tabs"));
					}
					
					pageHeader.find("div.tabs > a").on("click", function() {
						maxiHeaderChangeOnDemand($(this).index("div.tabs > a"));
					});
					
					//~ $("div.tabs").scrollLeft(0);
					pageHeader.find("div.tabs > a:first-of-type").addClass("current");
					tabIndicator();	
	
					
				// Tabs engine
				currentHeaderCard = 0;
										
					// Changing h1/h3
					var numberOfHeadersCard = maxiHeader.length;
					var uFactor;
					if (thisCard.hasClass("unpacked")) uFactor = 1;
					else uFactor = 0;
									
					thisCard.on("scroll", function() {
						if (currentHeaderCard < numberOfHeadersCard-1+uFactor && thisCard.offset().top - maxiHeader.eq(currentHeaderCard+1-uFactor).offset().top > 0) {
							pageHeader.find("div.tabs > a").eq(currentHeaderCard).removeClass("current");
							pageHeader.find("div.tabs > a").eq(++currentHeaderCard).addClass("current");
						}
						if (currentHeaderCard !== 0 && thisCard.offset().top - maxiHeader.eq(currentHeaderCard-uFactor).offset().top < 0) {
							pageHeader.find("div.tabs > a").eq(currentHeaderCard).removeClass("current");
							pageHeader.find("div.tabs > a").eq(--currentHeaderCard).addClass("current");
						}
						tabIndicator();
					});	

	
					// Changing on demand
					function maxiHeaderChangeOnDemand(index) {
						var maxiHeaderIndex;
						if (thisCard.hasClass("unpacked")) maxiHeaderIndex = maxiHeader.eq(index-1).offset().top;
						else maxiHeaderIndex = maxiHeader.eq(index).offset().top;
						var scrollTo = (maxiHeaderIndex - thisCard.offset().top + thisCard.scrollTop()) + 1;
						
						if (index !== 0 && scrollTo > thisCard.prop('scrollHeight') - (window.innerHeight - 112)) thisCard.animate({ scrollTop: thisCard.prop('scrollHeight') - (window.innerHeight - 112) }, butter, bezier);
						else if (index !== 0 || (index == 0 && thisCard.hasClass("unpacked") == false)) thisCard.animate({ scrollTop: scrollTo }, butter, bezier);
						else thisCard.animate({ scrollTop: 0 }, butter, bezier);
					};	


					// Indicator
					function tabIndicator() {
						if (thisCard.hasClass("closed") == false && pageHeader.find("div.tabs > a.current").length > 0) {
							var href = pageHeader.find("div.tabs > a.current");
							pageHeader.find("div.indicator").css({ left: href.position().left, width: href.outerWidth() });
						}
					};
					

				thisCard.children("nav.card-nav").prependTo(pageHeader.children("nav.header-nav"));
					
				pageHeader.addClass("card-opened");
				setTimeout( function() {
					
					//~ setTimeout( function() {
					//~ }, 10);
				}, butter/2);		


			
			$("body").css({ 'overflow-y': 'hidden' });
				
			// Opened loaded
			setTimeout( function(){
				thisCard.addClass("opened_loaded");
				pageHeader.find("nav.card-nav, div.tabs").removeClass("swap");
			}, butter/2);
			
			

			// On resize
			copyCard = $("figure.copy");
			$(window).on("resize", function() {
				closedCardWidth = copyCard.width();
				closedCardHeight = copyCard.height();
				thisLeft = copyCard.offset().left - 8;
				thisTop = copyCard.parent().offset().top - $(window).scrollTop() + copyCard.position().top;
				thisCard.children(".fable").css({ width: $(window).width() });
				
			});
			
			// Close
			$("a.card-close").on("click", close_card);

			//~ var closingPadding = thisCard.children("*:nth-of-type(2)").css( 'padding-top' ).slice(0, -2);
			function close_card() {
				
				// closed_loading
				thisCard.removeClass("opened_loaded").addClass("closed_loading closed");
						
				// Inside		
				thisCard.css({ left: thisLeft, top: thisTop, width: closedCardWidth, height: closedCardHeight });
				thisCard.children(".fable").animate({ left: ($(window).width() - closedCardWidth) / -2 }, butter, bezier);

				if (thisCard.scrollTop() <= (thisCard.children().eq(0).outerHeight())) thisCard.animate({ scrollTop: 0 }, butter, bezier);

				else
					//~ setTimeout( function() {
						thisCard.children(".floating").css({ display: '', top: thisCard.scrollTop() - thisCard.children(".floating").outerHeight() }).animate({ top: thisCard.scrollTop(), height: closedCardHeight }, butter, bezier);
					//~ }, 100);
				
				if (thisCard.hasClass("unpacked") == false) thisCard.find("header").animate({ height: closedCardHeight }, butter, bezier);
				
	
				// Page header
				pageHeader.removeClass("card-opened").find("nav.card-nav, div.tabs").addClass("swap");
				setTimeout( function() {
					pageHeader.find("nav.card-nav").appendTo(thisCard);
					pageHeader.children("div.tabs").remove();
				}, butter/2);

				$("#fade").css({ animation: "disappear calc(var(--butter) + 100ms) var(--easing) forwards" });
				gallery_zero();
				
				// Closed
				setTimeout(function(){

					thisCard.removeClass("closed_loading").addClass("closed_loading_2");
					pageHeader.css({ height: '' });

					setTimeout(function(){
						thisCard.remove();
						$("#fade").remove();
						$("figure.copy").removeClass("copy");
						$("body").css({ 'overflow-y': '' });
					}, butter/2);
	
				}, 100 + butter/2);

			};
		}
	});
	



// hr i section > h2
	for (i = 0; i < $("body > section > hr").length; i++) {
		HrMargin = $("body > section > hr").eq(i).parent().css( 'padding-left' );
		HrSpaceTop1 = $("body > section > hr").eq(i).prev().css( 'padding-bottom' );
		HrSpaceTop2 = $("body > section > hr").eq(i).prev().css( 'margin-bottom' );
		HrSpaceBottom1 = $("body > section > hr").eq(i).next().css( 'padding-top' );
		HrSpaceBottom2 = $("body > section > hr").eq(i).next().css( 'margin-top' );
		$("body > section > hr").eq(i).css({ 'margin-left': '-' + HrMargin, 'margin-right': '-' + HrMargin , width: 'calc(100% + 2 *' + HrMargin }).append('<hr>');
		if ($("body > section > hr").eq(i).css( 'padding-top' ) == '0px') $("body > section > hr").eq(i).css({ 'padding-top': 'calc(24px - ' + HrSpaceTop1 + ' - ' + HrSpaceTop2 + ')' });
		if ($("body > section > hr").eq(i).css( 'padding-bottom' ) == '0px') $("body > section > hr").eq(i).css({ 'padding-bottom': 'calc(24px - ' + HrSpaceBottom1 + ' - ' + HrSpaceBottom2 + ')' });
	}
	for (i = 0; i < $("body > section > h2").length; i++) {
		H2MarginSide = $("body > section > h2").eq(i).parent().css( 'padding-left' );
		H2MarginTop = $("body > section > h2").eq(i).parent().css( 'padding-top' );
		$("body > section > h2").eq(i).css({ margin: '-' + H2MarginTop + ' -' + H2MarginSide + ' ' + H2MarginTop + ' -' + H2MarginSide, width: 'calc(100% + 2 *' + H2MarginSide });
	}



// Page Header
{
	// Start settings
	$("body > header").children("h2").append('<span></span>');
	pageHeader = $("body > header");
	pageHeaderTitle = pageHeader.find("h2 > span");
	var pageHeaderTitleText = pageHeaderTitle.text();

	if ( $("body").hasClass("home")) {
	// Changing title
	var namename1 = 0;
	$("body > section:not(.cards)").on("mouseenter", function() {
		namename2 = $(this).attr("name-name");
		if (namename2 != namename1 && namename2 != undefined) {
			pageHeaderTitle.addClass("swap");
			setTimeout( function() {
				pageHeaderTitle.html(namename2).removeClass("swap");
				namename1 = namename2;
			}, 150);
		}
	});
	$("body > section.cards > *").on("mouseenter", function() {
		if ( $(this).hasClass("opened") == false) {
			namename2 = $(this).find("h2").text();
			if (namename2 != namename1 && namename2 != undefined) {
				pageHeaderTitle.addClass("swap");
				setTimeout( function() {
					pageHeaderTitle.html(namename2).removeClass("swap");
					namename1 = namename2;
				}, 150);
			}
		}
	});
	}
}



// SVGKit implementing at start
	SVGKit();

	
// End of load window
});


// SVGKit engine
function SVGKit() {
	for (i=0;i<$("[name-svgkit]").length;i++) {
		if ($("[name-svgkit]").eq(i).hasClass("svg_set") == false) {
			var svg_var = $("[name-svgkit]").eq(i).attr("name-svgkit");
			$("#SVGKit > svg." + svg_var).clone().prependTo($("[name-svgkit]").eq(i));
			$("[name-svgkit]").eq(i).addClass("svg_set");
		}
	}
}

