'use strict';


$(document).ready(function(){
	initializePage();
})
function initializePage(){
	$('#Projects').click(showProjects);
	$('#About').click(showAbout);
	$('#shortcutX').click(showProjects);
	$('#shortcutLeft').click(projectDetail);
	$('#shortcutRight').click(projectDetail);
	$('#shortcutX').hide();
	$('#shortcutLeft').hide();
	$('#shortcutRight').hide();
	console.log('test');
}
// Show the list of Projects
function showProjects(e){
	e.preventDefault();
	transformPage();
	$('#shortcutX').hide();
	$('#shortcutLeft').hide();
	$('#shortcutRight').hide();
	$('#Projects').css("background","#3498db");
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
					'<a href="#" class="'+project['id']+'"><div class="projectLogos">'+
					'<img src="images/'+project['logo']+'">'+
					'</div></a>'
				}
			}
			$('#content').html(projectHTML).fadeIn("slow");
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
	$('#About').css("background","#01b169");
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
			var bioHTML = '<section id="photo"><img src="images/'+bio['photo']+'"></section>'+
						'<section id="bio">'+
							'<h2>'+bio['headline']+'</h2>'+
							'<p>'+bio['content']+'</p>'+
							'<p>'+bio['content2']+'</p>'+
							'<p>'+bio['content3']+'</p>'+
						'</section>'+
						'<div class="clean"></div><section id="social">';
			for (var key in pet){
				if (pet.hasOwnProperty(key)){
					var temp = pet[key];
					bioHTML = bioHTML +
							'<figure id="'+temp['name']+'"><img src="images/'+temp['photo']+'"></figure>';
				}
			}
			bioHTML = bioHTML + '<div id="instagram">Follow me on <a href="http://instagram.com/zhenito" target="_blank">Instagram</a></div></section>'

			var aboutHTML = bioHTML + '<div class="clean"></div>';
			$('#content').html(aboutHTML).fadeIn("fast");
		});
	});
}

// Show specific project
function projectDetail(e){
	e.preventDefault();
	$('#shortcutX').fadeIn(2000);
	$('#shortcutLeft').fadeIn(2000);
	$('#shortcutRight').fadeIn(2000);
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
console.log(nextID+' '+prevID);

	$('#shortcutRight').removeClass().addClass(nextID);
	$('#shortcutLeft').removeClass().addClass(prevID);
	
	$('#content').fadeOut("slow", function(){
		// get Projects AJAX
		$.get("/projects/"+projectID, function(result){
			var detailHTML ='<header><h1>'+result['title']+'</h1>'+
							'<p>'+result['summary']+'</p></header>'+
							'<img src="images/'+result['logo']+'" id="projectLogo">'+
							'<div class="clean"></div>';

			var All = result['images'];

			var tempHTML='<section id="project">';
			for (var x in All){
				if (All.hasOwnProperty(x)){
					var temp = All[x];
					tempHTML= tempHTML+
							'<div class="clean"></div>'+
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
						tempHTML=tempHTML+'<div class="clean"></div>';
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
										'</aside><div class="clean"></div>';
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
			detailHTML= detailHTML + tempHTML + '</section>';
			$('#content').html(detailHTML).fadeIn();
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