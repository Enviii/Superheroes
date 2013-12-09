/* 
	By Darshan Karkar
	12/8/2013
	CSIT 570
	
	Created using Jquery and a JSON feed of superheroes
	
	Feel free to borrow.
*/

$(document).ready(function() {
	
	/*
	  ______   ______   ______   _____  
	 |  ____| |  ____| |  ____| |  __ \ 
	 | |__    | |__    | |__    | |  | |
	 |  __|   |  __|   |  __|   | |  | |
	 | |      | |____  | |____  | |__| |
	 |_|      |______| |______| |_____/ 
	
	*/
	$.getJSON("superheroes.json", function(data) {
		$.each(data.superheroes, function(k, v) {
			var list = data.superheroes[k];
			//console.log(k);
			//console.log(data.superheroes[k].superhero);
			$("#superheroes").append("<div class='hero' name='superhero' id="+list.superhero+">"+
									 "<div class='details'>"+
									 "<h1>"+list.superhero+"</h1>"+
									 "<br>"+
									 "<span id='publisher'>Publisher: </span>"+list.publisher+
									 "<br>"+
									 "<span id='alterEgo'>Alter ego: </span>"+list.alter_ego+
									 "<br>"+
									 "<span id='firstAppearance'>First Appearance: </span>"+list.first_appearance+
									 "<br>"+
									 "<span id='characters'>Portrayed by: </span>"+list.characters+
									 "<br></div><div class='img'>"+
									 "<img src='"+list.artURL+"'>"+
									 "</div></div>");
		});
	});
	
	
	/*
	   _____   ______              _____     _____   _    _ 
	  / ____| |  ____|     /\     |  __ \   / ____| | |  | |
	 | (___   | |__       /  \    | |__) | | |      | |__| |
	  \___ \  |  __|     / /\ \   |  _  /  | |      |  __  |
	  ____) | | |____   / ____ \  | | \ \  | |____  | |  | |
	 |_____/  |______| /_/    \_\ |_|  \_\  \_____| |_|  |_|
	 
	*/
	$("#form").submit(function(){
		
		//2 vars from form input
		var term = $("#search").val();
		var attribute = $("#attr").val();
		
		$.getJSON("superheroes.json", function(result) {
			
			//remove previous search term text if it exist before appending new search
			$("#searchTerm").remove();
			$("#superheroes").append("<div class='hero' id='searchTerm'>Results for: <span id='search'>"+term+"</span> in <span id='search'>"+attribute+"</span></div>");
			//remove all superhero divs with name superhero before adding new ones from search loop
			$("div[name='superhero']").remove();
			
			//use term and attribute vars from form input. Buggy at the moment, doesn't except wildcard searches.
			$.each(result.superheroes, function(a, b) {
				if (b[attribute] == term) {
					
					//sry for the messiness. Add divs that match the search term
					$("#superheroes").append("<div class='hero' name='superhero' id="+b.superhero+">"+
											 "<div class='details'>"+
											 "<h1>"+b.superhero+"</h1>"+
											 "<br>"+
											 "<span id='publisher'>Publisher: </span>"+b.publisher+
											 "<br>"+
											 "Alter ego: "+b.alter_ego+
											 "<br>"+
											 "First Appearance: "+b.first_appearance+
											 "<br>"+
											 "Portrayed by: "+b.characters+
											 "<br></div><div class='img'>"+
											 "<img src='"+b.artURL+"'>"+
											 "</div></div>");
					return;
				} else {
					//console.log("Nothing found");
					//$("#superheroes").append("<div class='hero' id='searchTerm'>Didn't find anything, sry.</div>");
				}
			});
		});
		return false;
	});
});