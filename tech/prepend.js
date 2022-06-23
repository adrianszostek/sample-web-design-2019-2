// Start settings
$(window).on("load", function(){

	$("#PageLoading").css({ opacity: 0 });
	setTimeout( function() { $("#PageLoading").remove(); }, 300);
		
	bezier = $.bez([.4,0,.2,1]);
	butter = 440;
	$("body").append('<section style="padding-bottom: calc((100vh - 64px) / 2); margin-bottom: 0; border-bottom: none; border-radius: var(--rounding) var(--rounding) 0 0"></section><div class="corner" style="top: 0; left: 0;"></div><div class="corner" style="top: 0; right: 0; transform: rotate(90deg);"></div>');

// Return Button
	function return_button() {
		$("body > header > h2").prepend('<a id="return" name-svgkit="svg_back"></a>');
		setTimeout( function() {
			$("a#return").addClass("ready");
		}, 300);
	};
	if ($("body").hasClass("home") == false || $("body").hasClass("developer") == true) return_button();
	
	$("a#return").on("click", function() {
		window.history.back();
	});
		
// Theme
	time = new Date();
	theme = document.cookie.replace(/(?:(?:^|.*;\s*)theme\s*\=\s*([^;]*).*$)|^.*$/, "$1");
	if (theme == '') {
		if ((time.getHours() == 20 && time.getMinutes() >= 30) || time.getHours() > 20 || time.getHours() < 6 || (time.getHours() == 6 && time.getMinutes() <= 30)) theme = 'dark';
		else theme = 'light';
	}
	if (theme == 'light') $("a#theme").addClass("off");
	else $("a#theme").addClass("on");
	$("body").addClass(theme);

// Basic ON RESIZE operations
	$(window).on("resize", function() {
		disableTransitions();
	});

	function disableTransitions() {
		$(".cards > figure:not(.opened)").css({ transition: 'none' }).on("mouseenter", function() { $(this).css({ transition: '' }) });
	}; 


// Web Center - Smart Folders 3
{
	folders_index = $("#launcher > div > div").length;
	for (i=0; i<folders_index; i++) {
		eq_folder = $("#launcher > div > div").eq(i);
		if (eq_folder.children("a").length > 1) {
			eq_folder.addClass("folder");
			eq_folder.children("a").wrapAll('<div class="checker"></div>');
			// find long
			if (eq_folder.children(".checker").height() > 32) {
				eq_folder.addClass("long");
				eq_folder_links = eq_folder.children(".checker").children("a");
				for (hidden_link_i=0; hidden_link_i <eq_folder_links.length; hidden_link_i++) if (eq_folder_links.eq(hidden_link_i).position().top >= 32) eq_folder_links.eq(hidden_link_i).addClass("hidden_link");
				eq_folder.children("p").append('<div name-svgkit="svg_expand_more"></div>');	
			}
			// if long hasn't got img	
			if (eq_folder.children("img").length == 0)
				eq_folder.prepend('<figure name-svgkit="svg_folder"></figure>');
		}
	}
	// if link hasn't got img	
	links_index = $("#launcher > div > a").length;
	for (i=0; i<links_index; i++) {
		eq_link = $("#launcher > div > a").eq(i);
		if (eq_link.children("img").length == 0) eq_link.prepend('<figure name-svgkit="svg_link"></figure>');
	}
	
	$(window).on("resize", function() {
		for (i=0; i<$("#launcher > div > div.folder").length; i++) {
			eq_folder2 = $("#launcher > div > div.folder").eq(i);
			// now long
			if (eq_folder2.children(".checker").height() > 32 && eq_folder2.hasClass("long") == false) {
				eq_folder2.addClass("long");
				eq_folder2.children("p").append('<div name-svgkit="svg_expand_more"></div>'); SVGKit();	
			}
			// not long anymore
			else if (eq_folder2.children(".checker").height() <= 32 && eq_folder2.hasClass("long") == true)
				eq_folder2.removeClass("long").find("p > div").remove();
				eq_folder2.children(".checker").children("a").removeClass("hidden_link");
			// changing hidden links
			if (eq_folder2.hasClass("long") == true) {
				eq_folder_links = eq_folder2.children(".checker").children("a");
				for (hidden_link_i=0; hidden_link_i <eq_folder_links.length; hidden_link_i++) if (eq_folder_links.eq(hidden_link_i).position().top >= 32) eq_folder_links.eq(hidden_link_i).addClass("hidden_link");
			}
		}
	});


	$(".long").on("mouseenter", function() {
		$(this).css({ zIndex: 91, height: $(this).children(".checker").height() + 48, marginBottom: -($(this).children(".checker").height() - 36) });	
		$(this).on("mouseleave", function() {
			$(this).css({ zIndex: 90, height: '', marginBottom: '' });
			setTimeout(function() {
				$(this).css({zIndex: ''});
			}, 200);
		});
	});
}

	
//
});
