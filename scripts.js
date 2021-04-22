// JavaScript for TP8

// generic AJAX function to load fromFile into object with ID whereTo
function loadFileInto(fromIdentifier, fromList) {

	// creating a new XMLHttpRequest object
	ajax = new XMLHttpRequest();
	
	// define the fromFile value based on the PHP URL
	fromFile = "recipes.php?id=" + fromIdentifier + "&list=" + fromList;
	console.log("fromFile: " + fromFile);

	// defines the GET/POST method, source, and async value of the AJAX object
	ajax.open("GET", fromFile, true);

	// prepares code to do something in response to the AJAX request
	ajax.onreadystatechange = function() {
		
			if ((this.readyState == 4) && (this.status == 200)) {
				
				console.log("AJAX JSON response: " + this.responseText);
				
				// convert received JSON from PHP into a JavaScript array
				responseArray = JSON.parse(this.responseText);
				responseHTML = "";
				
				if (this.responseText != "0") {
					for (x = 0; x < responseArray.length; x++) {
						responseHTML += "<li>" + responseArray[x] + "</li>";
					}
				}
				
				// figure out querySelector target
				whereTo = "#" + fromList + " ul";
				if (fromList == "directions") whereTo = "#" + fromList + " ol";
				document.querySelector(whereTo).innerHTML = responseHTML;
				
			} else if ((this.readyState == 4) && (this.status != 200)) {
				console.log("Error: " + this.responseText);
				
			}
		
	} // end ajax.onreadystatechange

	// now that everything is set, initiate request
	ajax.send();
}
// object constructor for recipe prototype
function Recipe(recipeName, imageURL, contributorName, recipeIdentifier) {
  this.name = recipeName;
  this.imgsrc = imageURL;
  this.contributor = contributorName;
  this.identifier = recipeIdentifier;
  
  //update the screen with this object's recipe information
  this.displayRecipe = function() {
    
    //update the recipe title
    document.querySelector("#titleBanner h1").innerHTML = this.name;
    
    //update the recipe contributor
    document.querySelector("#titleBanner h3").innerHTML = "Contributed By: " + this.contributor;
    
    //update image
    document.querySelector("#photo").style.backgroundImage = "url(" + this.imgsrc +")";
    
    //update the 3 columns of information
    loadFileInto(this.identifier, "ingredients");
    loadFileInto(this.identifier, "equipment");
    loadFileInto(this.identifier, "directions");
  }
}

LemonChickenPiccata = new Recipe(
  "Lemon Chicken Piccata",
  "https://images.unsplash.com/photo-1558574869-8c0caa518dd4?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1651&q=80",
  "Sophie Dutton",
  "LemonChickenPiccata",
  
);

Lasagna = new Recipe(
  "World's Best Lasagna",
  "https://cdn.pixabay.com/photo/2017/02/15/15/17/meal-2069021_1280.jpg",
  "Madison Roby",
  "Lasagna",
);

Tofu = new Recipe(
  "Breaded, Fried, Softly Spiced Tofu",
  "https://images.unsplash.com/photo-1546069901-d5bfd2cbfb1f?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1100&q=80",
  "Rae Kolke",
  "Tofu",
);


headerClick = document.querySelector("#titleBanner h1");

headerClick.onclick = function () {
  headerClick.classList.toggle("click");
};

liClick = document.querySelector("div#ingredients");
liClick.onclick = function () {
  liClick.classList.toggle("ingClicked");
};

liClick2 = document.querySelector("div#equipment");
liClick2.onclick = function () {
  liClick2.classList.toggle("equipClicked");
};

liClick3 = document.querySelector("div#directions");
liClick3.onclick = function () {
  liClick3.classList.toggle("dirClicked");
};



