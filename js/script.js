/* 
	By Darshan Karkar
	12/18/2013
	CSIT 570
	
	Created using Jquery and a JSON feed of superheroes
	Autocomplete was done with Typeahead.js. 
	
	Feel free to borrow.
*/

$(document).ready(function() {

	//check for select field change, redo typeahead autocomplete if detected.
 	$( "#attr" ).change(function() {
		var select = $( "#attr" ).val();
		
		//destroy previous autocomplete values
		$('#search').typeahead('destroy');
		
		//readd relevent typeahead autocomplete values depending on selected value
		$('#search').typeahead({                                
			name: [select],
			prefetch: 
			{
				url: 'js/superheroes.json',
				filter: function(parsedResponse){
					var dataset = [];
					for(i = 0; i < parsedResponse.superheroes.length; i++) {
						dataset.push({
							select: parsedResponse.superheroes[i][select],
							value: parsedResponse.superheroes[i][select],
							tokens: [parsedResponse.superheroes[i][select]]
						});
					}
					return dataset;
				}
			}
		});		
	});

	//onload prefetch superhero names.
 	$('#search').typeahead({                                
		name: "heroes3",
		prefetch: 
		{
			url: 'js/superheroes.json',
			filter: function(parsedResponse){
				var dataset = [];
				for(i = 0; i < parsedResponse.superheroes.length; i++) {
					dataset.push({
						superhero: parsedResponse.superheroes[i].superhero,
						value: parsedResponse.superheroes[i].superhero,
						tokens: [parsedResponse.superheroes[i].superhero]
					});
				}
				return dataset;
			}
		}
	});
	
	//jquery get json feed
	$.getJSON("js/superheroes.json", function(data) {
		//loop for the main feed. 
		$.each(data.superheroes, function(k, v) {
			var list = data.superheroes[k];
			$("#superheroes").append("<div class='hero' name='superhero' id="+list.superhero+">"+
										"<div class='details'>"+
											"<h1>"+list.superhero+"</h1>"+"<br>"+
											"<span id='publisher'>Publisher: </span>"+list.publisher+"<br>"+
											"<span id='alterEgo'>Alter ego: </span>"+list.alter_ego+"<br>"+
											"<span id='firstAppearance'>First Appearance: </span>"+list.first_appearance+"<br>"+
											"<span id='characters'>Portrayed by: </span>"+list.characters+"<br>"+
										"</div>"+
										"<div class='img'>"+
											"<img src='"+list.artURL+"'>"+
										"</div>"+
									 "</div>");
		});
		//function that runs when form is submit
		$("form").submit(function(){
			var term = $("#search").val();
			var attribute = $("#attr").val();
			
			$("#searchTerm").remove();
			$("#superheroes").append("<div class='hero' id='searchTerm'>Results for: <span id='search'>"+term+"</span> in <span id='search'>"+attribute+"</span></div>");
			//remove all superhero divs with name superhero before adding new ones from search loop
			$("div[name='superhero']").remove();
			
			//use term and attribute vars from form input. Doesn't except wildcard searches.
			$.each(data.superheroes, function(k, v) {
				if (v[attribute] == term) {
					//sry for the messiness. Add divs that match the search term
					$("#superheroes").append("<div class='hero' name='superhero' id="+v.superhero+">"+
												 "<div class='details'>"+
													 "<h1>"+v.superhero+"</h1>"+"<br>"+
													 "<span id='publisher'>Publisher: </span>"+v.publisher+"<br>"+
													 "<span id='alterEgo'>Alter ego: </span>"+v.alter_ego+"<br>"+
													 "<span id='firstAppearance'>First Appearance: </span>"+v.first_appearance+"<br>"+
													 "<span id='characters'>Portrayed by: </span>"+v.characters+"<br>"+
												 "</div>"+
											 	 "<div class='img'>"+
												 	"<img src='"+v.artURL+"'>"+
												 "</div>"+
											 "</div>");
					return;
				} else {
					//console.log("Nothing found");
				}
			});
			return false;
		});
	});
});

