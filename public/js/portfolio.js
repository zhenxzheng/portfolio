'use strict';


$(document).ready(function(){
	initializePage();
})
function initializePage(){
	initializeClick();
	initializeTracking();
	$('#shortcutX').hide();
	$('#shortcutLeft').hide();
	$('#shortcutRight').hide();
	$('#contact').hide();
}
function initializeClick(){
	$('#Projects').click(showProjects);
	$('#About').click(showAbout);
	$('#shortcutX').click(showProjects);
	$('#shortcutLeft').click(projectDetail);
	$('#shortcutRight').click(projectDetail);
	$('#shortcutHome').click(function(e){
		window.location.href='/';
	});
}

// Show the list of Projects
function showProjects(e){
	e.preventDefault();
	transformPage();
	$('#shortcutX').hide();
	$('#shortcutLeft').hide();
	$('#shortcutRight').hide();
	$('#contact').hide();
	$('#Projects').css("background","#01b169");
	$('#Resume').css("background","transparent");
	// $('#Resume').hover(function(){
	// 	$('#Resume').css("background","#91d0b1");
	// 	}, function(){
	// 		$('#Resume').css("background","transparent")
	// 	}
	// );
	 $('#About').css("background","transparent");
	// $('#About').hover(function(e){
	// 	$('#About').css("background","#01b169");
	// 	$(this).off(e);
	// 	}, function(e){
	// 		$('#About').css("background","transparent");
	// 		$(this).on(e);
	// 	}
	// );
	// $('#nav').fadeIn("slow");
	// hides current content
	$('#content').fadeOut("slow", function(){
		// get Projects AJAX
		$.get("/projects", function(result){
			// callback function to show project 
			var projectHTML = '';
			for (var key in result){
				if (result.hasOwnProperty(key)){
					var project = result[key];
					projectHTML = projectHTML+
					'<section class="wrap-one-quarter" >'+
						'<a href="#" class="'+project['id']+'">'+
							'<figure class="projectLogos" id="logo'+project['id']+'">'+
								'<img src="images/'+project['logo']+'">'+
							'</figure>'+
						'</a>'+
					'</section>';
				}
			}
			$('#content').html(projectHTML).fadeIn("slow");
			trackProjects();
			$('#content a').click(projectDetail);
		});
	});
}

// Show About me
function showAbout(e){
	e.preventDefault();
	transformPage();
	$('#shortcutX').hide();
	$('#shortcutLeft').hide();
	$('#shortcutRight').hide();
	$('#contact').fadeIn(2000);
	$('#About').css("background","#3498db");
	$('#Resume').css("background","transparent");
	// $('#Resume').hover(function(){
	// 	$('#Resume').css("background","#91d0b1");
	// 	}, function(){
	// 		$('#Resume').css("background","transparent");
	// 	}
	// );
	 $('#Projects').css("background","transparent");
	// $('#Projects').hover(function(){
	// 	$('#Projects').css("background","#3498db");
	// 	}, function(){
	// 		$('#Projects').css("background","transparent");
	// 	}
	// );
	// $('#nav').fadeIn("slow");
	// hides current content
	$('#content').fadeOut("fast", function(){
		// get About AJAX
		$.get("/about", function(result){
			// callback function to display About 
			var bio = result['bio'];
			var location = bio['location'];
			var education = bio['education'];
			var pet = bio['pet'];
			var bioHTML = 	'<section id="photo" class="wrap-one-half">'+
								'<img src="images/'+bio['photo']+'">'+
							'</section>'+
							'<section id="bio" class="wrap-one-half">'+
								'<h2>'+bio['headline']+'</h2>'+
								'<p>'+bio['content']+'</p>'+
								'<p>'+bio['content2']+'</p>'+
								'<p>'+bio['content3']+'</p>'+
							'</section>'+
							'<div class="clear"></div>'+
							'<figure id="instagramPhoto" class="wrap-one-half">';
			for (var key in pet){
				if (pet.hasOwnProperty(key)){
					var temp = pet[key];
					bioHTML = bioHTML +
							'<img id="'+temp['name']+'" src="images/'+temp['photo']+'">';
				}
			}
			bioHTML = bioHTML + '</figure><div id="instagramText" class="wrap-one-half">Follow me on <a href="http://instagram.com/zhenito" target="_blank">Instagram</a></div>'

			var aboutHTML = bioHTML + '<div class="clear"></div>';
			$('#content').html(aboutHTML).fadeIn("fast");
			trackAbout();
			$('#checkProjects').click(showProjects);
		});
	});
}

// Show specific project
function projectDetail(e){
	e.preventDefault();
	$('#shortcutX').fadeIn(2000);
	$('#shortcutLeft').fadeIn(2000);
	$('#shortcutRight').fadeIn(2000);

	// Track project ID number for arrows
	var projectID = $(this).attr('class');
	var intID = parseInt(projectID);
	var nextID,prevID;
	if (intID ==4){
		nextID = 1;
		prevID = intID-1;
	}
	else if (intID == 1){
		nextID = intID+1;
		prevID = 4;
	}
	else{
		nextID = intID+1;
		prevID = intID-1;
	}
	nextID = nextID.toString();
	prevID = prevID.toString();
	// update project ID on arrows
	$('#shortcutRight').removeClass().addClass(nextID);
	$('#shortcutLeft').removeClass().addClass(prevID);
	
	$('#content').fadeOut("slow", function(){
		// get Projects AJAX
		$.get("/projects/"+projectID, function(result){
			var detailHTML =
							'<header><h1>'+result['title']+'</h1>'+
							'<img src="images/'+result['logo']+'" id="projectLogo">'+
							'<div class="clear"></div>'+
							'<p>'+result['summary']+'</p></header>'+
							'<div class="clear"></div>';

			var All = result['images'];

			var tempHTML='<section id="project">';
			for (var x in All){
				if (All.hasOwnProperty(x)){
					var temp = All[x];
					tempHTML= tempHTML+
							'<div class="clear"></div>'+
							'<h2>'+temp['type']+'</h2>';

					if (temp['type'] == 'Project Images'){
						temp = temp['img'];
						for (var key in temp){
							if(temp.hasOwnProperty(key)){
								var img = temp[key]
								tempHTML = tempHTML+
											'<figure>'+
											'<img src="images/'+img['path']+'" class="projectImages">'+
											'</figure>'+
											'<aside>'+img['text']+'</aside>';
							}
						}
						tempHTML=tempHTML+'<div class="clear"></div>';
					}
					else
					{
						tempHTML = tempHTML + '<figure>';
						temp = temp['img'];
						var path = temp['path'];
						for (var key in path){
							if(path.hasOwnProperty(key)){
								tempHTML = tempHTML+
											'<img src="images/'+path[key]+'" class="projectImages">';
							}
						}
						tempHTML=tempHTML+
										'</figure><aside>'+
										temp['text']+
										'</aside><div class="clear"></div>';
					}
					
				}
			};
			// var imagesHTML = '';
			// for (var key in temp){
			// 	if (temp.hasOwnProperty(key)){
			// 		var project = temp[key];
			// 		imagesHTML = imagesHTML+
			// 					'<img src="images/'+temp[key]+'">';
			// 	};
			// };

			// var temp = result['icons'];
			// var iconsHTML = '';
			// for (var key in temp){
			// 	if (temp.hasOwnProperty(key)){
			// 		var project = temp[key];
			// 		iconsHTML = iconsHTML+
			// 					'<img src="images/'+temp[key]+'">';
			// 	};
			// };

			// detailHTML = detailHTML + '<figure>'+imagesHTML+'</figure>'+'<figure>'+iconsHTML+'</figure>';
			detailHTML= detailHTML + tempHTML + '<a href="#top"><div id="backToTop">Back to Top ^</div></a></section>';
			$('#content').html(detailHTML).fadeIn();

			trackProjectDetails();

			// Scroll fade in effect
			$('#backToTop').click(function(e){
				e.preventDefault();
				$("html, body").animate({scrollTop:0},1000);
			});

			var block = $("#project figure, #project aside").fadeTo(0, 0);
			$(window).scroll(function(d,h) {
			    block.each(function(i) {
			        var a = $(this).offset().top + $(this).height()/3;
			        var b = $(window).scrollTop() + $(window).height();
			        if (a < b) $(this).fadeTo(500,1);
			    });
			});
		});
	})
}
function addCSS(){
}

function transformPage(){
	$('header').animate({padding:0});
	$('header h1 span').hide();
	$('#x').show();

	// $('#nav h4').hide();
	$('#nav').animate({paddingTop:0});
	// $('#nav').fadeOut();
}

function initializeTracking()
{
	$('#mainLogo').on('click',function(){
		ga('send','event','button','click','Home-Name');
	});
	$('#Resume').on('click',function(){
		ga('send','event','button','click','Resume-Buttons');
	});
	$('#Projects').on('click',function(){
		ga('send','event','button','click','Projects-Buttons');
	});
	$('#About').on('click',function(){
		ga('send','event','button','click','About-Buttons');
	});
	$('#shortcutLeft').on('click',function(){
		ga('send','event','button','click','Left-Arrow');
	});
	$('#shortcutRight').on('click',function(){
		ga('send','event','button','click','Right-Arrow');
	});
	$('#shortcutHome').on('click',function(){
		ga('send','event','button','click','Home-Icon');
	});
	$('#shortcutX').on('click',function(){
		ga('send','event','button','click','Close-Button');
	});
	trackProjects();
}
function trackProjects(){
	$('.1').on('click',function(){
		ga('send','event','button','click','Project1');
	});
	$('.2').on('click',function(){
		ga('send','event','button','click','Project2');
	});
	$('.3').on('click',function(){
		ga('send','event','button','click','Project3');
	});
	$('.4').on('click',function(){
		ga('send','event','button','click','Project4');
	});
}
function trackProjectDetails(){
	$('#ActivityVizFinalPaper').on('click',function(){
		ga('send','event','document','click','ActivityVizFinalPaper');
	});
	$('#ActivityVizLiveDemo').on('click',function(){
		ga('send','event','demo','click','ActivityLiveDemo');
	});
	$('#ActivityVizTechnicalPaper').on('click',function(){
		ga('send','event','document','click','ActivityVizTechnicalPaper');
	});
	$('#UCSDMapLiveDemo').on('click',function(){
		ga('send','event','demo','click','UCSDMapLiveDemo');
	});
	$('#CalStateFullerton').on('click',function(){
		ga('send','event','link','click','CalStateFullerton');
	});
	$('#SocialFitnessFinalPaper').on('click',function(){
		ga('send','event','document','click','SocialFitnessFinalPaper');
	});
	$('#backToTop').on('click',function(){
		ga('send','event','button','click','backToTop');
	});
}
function trackAbout(){
		$('#checkProjects').on('click',function(){
		ga('send','event','button','click','Checkout-Project');
	});	
		$('#checkResume').on('click',function(){
		ga('send','event','button','click','Checkout-Resume');
	});	
		$('#instagramText a').on('click',function(){
		ga('send','event','button','click','Checkout-Instagram');
	});
}