/* 
	By Darshan Karkar
	12/8/2013
	CSIT 570
	
	Created using Jquery and a JSON feed of superheroes
	Autocomplete was done with Typeahead.js. 
	
	Feel free to borrow.
*/
$(document).ready(function () {

    //check for select field change, redo typeahead autocomplete if detected.
    $("#attr").change(function () {
        var selected = $("#attr").val();

        //destroy previous autocomplete values
        $('#search').typeahead('destroy');

        //readd relevent typeahead autocomplete values depending on selected value
        $('#search').typeahead({
            name: [selected],
            prefetch: {
                url: 'js/superheroes.json',
                filter: function (parsedResponse) {
                    var dataset = [];
                    for (i = 0; i < parsedResponse.superheroes.length; i++) {
                        dataset.push({
                            select: parsedResponse.superheroes[i][selected],
                            value: parsedResponse.superheroes[i][selected],
                            tokens: [parsedResponse.superheroes[i][selected]]
                        });
                    }
                    return dataset;
                }
            }
        });
    });
	
    //onload prefetch superhero names.
     $('#search').typeahead({
        name: "heroes",
        prefetch: {
            url: 'js/superheroes.json',
            filter: function (parsedResponse) {
                var dataset = [];
                for (i = 0; i < parsedResponse.superheroes.length; i++) {
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
    $.getJSON("js/superheroes.json", function (data) {
		
        //loop for the main feed. 
        $.each(data.superheroes, function (k, v) {
            var list = data.superheroes[k];
			var template = "<div class='hero' name='superhero' id=" + v.superhero + ">" + "<div class='details'>" + "<h1>" + v.superhero + "</h1>" + "<br>" + "<span id='publisher'>Publisher: </span>" + v.publisher + "<br>" + "<span id='alterEgo'>Alter ego: </span>" + v.alter_ego + "<br>" + "<span id='firstAppearance'>First Appearance: </span>" + v.first_appearance + "<br>" + "<span id='characters'>Portrayed by: </span>" + v.characters + "<br>" + "</div>" + "<div class='img'>" + "<img src='" + v.artURL + "'>" + "</div>" + "</div>" ;
            $("#superheroes").append(template);
        });
		
		//function that runs when form is submit
        $("form").submit(function () {
            var term = $("#search").val();
            var attribute = $("#attr").val();

            $("#searchTerm").remove();
            $("#superheroes").append("<div class='hero' id='searchTerm'>Results for: <span id='search'>" + term + "</span> in <span id='search'>" + attribute + "</span></div>");
            //remove all superhero divs with name superhero before adding new ones from search loop
            $("div[name='superhero']").remove();

            //use term and attribute vars from form input. Doesn't except wildcard searches.
            $.each(data.superheroes, function (k, v) {
				//if option all is selected search for anything
				if (attribute == "all"){
					$.each(["superhero","publisher","alter_ego","first_appearance","characters"], function(index,value){
						if (v[value] == term){
							var searchTemplate = "<div class='hero' name='superhero' id=" + v.superhero + ">" + "<div class='details'>" + "<h1>" + v.superhero + "</h1>" + "<br>" + "<span id='publisher'>Publisher: </span>" + v.publisher + "<br>" + "<span id='alterEgo'>Alter ego: </span>" + v.alter_ego + "<br>" + "<span id='firstAppearance'>First Appearance: </span>" + v.first_appearance + "<br>" + "<span id='characters'>Portrayed by: </span>" + v.characters + "<br>" + "</div>" + "<div class='img'>" + "<img src='" + v.artURL + "'>" + "</div>" + "</div>";
							$("#superheroes").append(searchTemplate);
						}
					});
				} else {
					//search only specified attribute
					if (v[attribute] == term) {
						//sry for the messiness. Add divs that match the search term
						var searchTemplate = "<div class='hero' name='superhero' id=" + v.superhero + ">" + "<div class='details'>" + "<h1>" + v.superhero + "</h1>" + "<br>" + "<span id='publisher'>Publisher: </span>" + v.publisher + "<br>" + "<span id='alterEgo'>Alter ego: </span>" + v.alter_ego + "<br>" + "<span id='firstAppearance'>First Appearance: </span>" + v.first_appearance + "<br>" + "<span id='characters'>Portrayed by: </span>" + v.characters + "<br>" + "</div>" + "<div class='img'>" + "<img src='" + v.artURL + "'>" + "</div>" + "</div>";
						$("#superheroes").append(searchTemplate);
						return;
					}
				}
            });
            return false;
        });
		
		//onclick of marvel logo on left
		$(".marvel").click(function() {
			$("#searchTerm").remove();
            $("#superheroes").append("<div class='hero' id='searchTerm'>Results for: <span id='search'>Marvel Comics</span> in <span id='search'>Publisher</span></div>");
            //remove all superhero divs with name superhero before adding new ones from search loop
            $("div[name='superhero']").remove();
			
			$.each(data.superheroes, function (k, v) {
                if (v.publisher == "Marvel Comics") {
					var searchTemplate = "<div class='hero' name='superhero' id=" + v.superhero + ">" + "<div class='details'>" + "<h1>" + v.superhero + "</h1>" + "<br>" + "<span id='publisher'>Publisher: </span>" + v.publisher + "<br>" + "<span id='alterEgo'>Alter ego: </span>" + v.alter_ego + "<br>" + "<span id='firstAppearance'>First Appearance: </span>" + v.first_appearance + "<br>" + "<span id='characters'>Portrayed by: </span>" + v.characters + "<br>" + "</div>" + "<div class='img'>" + "<img src='" + v.artURL + "'>" + "</div>" + "</div>";
            		$("#superheroes").append(searchTemplate);
				}
			});
		});
		
		//onclick of dc logo on right
		$(".dc").click(function() {
			$("#searchTerm").remove();
            $("#superheroes").append("<div class='hero' id='searchTerm'>Results for: <span id='search'>DC Comics</span> in <span id='search'>Publisher</span></div>");
            //remove all superhero divs with name superhero before adding new ones from search loop
            $("div[name='superhero']").remove();
			
			$.each(data.superheroes, function(k, v){
				if (v.publisher == "DC Comics"){
					var searchTemplate = "<div class='hero' name='superhero' id=" + v.superhero + ">" + "<div class='details'>" + "<h1>" + v.superhero + "</h1>" + "<br>" + "<span id='publisher'>Publisher: </span>" + v.publisher + "<br>" + "<span id='alterEgo'>Alter ego: </span>" + v.alter_ego + "<br>" + "<span id='firstAppearance'>First Appearance: </span>" + v.first_appearance + "<br>" + "<span id='characters'>Portrayed by: </span>" + v.characters + "<br>" + "</div>" + "<div class='img'>" + "<img src='" + v.artURL + "'>" + "</div>" + "</div>";
					$("#superheroes").append(searchTemplate);
				}
			});
		});
    });
});