/* globals require */
console.log("Hello, Airtable");

// load the airtable library, call it "Airtable"
var Airtable = require("airtable");

// use the airtable library to get a variable that represents one of our bases
// We needed to put in the right apiKey and
// base ID here!
var base = new Airtable({ apiKey: "keyam67l6qKyeDk5M" }).base(
  "appyu4WrFnOumXk8H"
);

// Get the "songs" table from the base,
// specify the view (which should be SORTED by rating),
// and specify the callback functions that will receive each page of data
base("songs").select({
  view: "Grid"
}).eachPage(gotPageOfData, gotAllData);

// an empty array to hold our songs data
const songs = [];

// callback function that receives each page of data (considered here as records) and adds them to our list of songs
function gotPageOfData(records, fetchNextPage) {
  console.log("gotPageOfData()");
  console.log("There are "+records.length+" items in records");
  // This takes the list of records and add them to the songs array
  songs.push(...records);
  // request more pages
  fetchNextPage();
}

// call back function that is called when ALL pages are loaded
function gotAllData(err) {
  console.log("gotAllData()");

  // report an error, you'd want to do something better than this in production
  if (err) {
    console.log("error loading data");
    console.error(err);
    return;
  }

  // call function to show the data
  showData();
}

// show the data on the page
function showData() {
  console.log("showData()");

  // find the shelf element
  const songsContainer = document.querySelector("#container");

  // loop through all the people listed in the Airtable data.
  // Inside is the code we are applying for EACH song in the list of songs.
  songs.forEach((song) => {

    // Print out what a single songs's data feidls looks like
    console.log("SHOWING THE SONG")
    console.log(song.fields);


    /** CREATE CONTAINER */
    const songContainer = document.createElement("div");
    songContainer.classList.add("songContainer");

    /*******************
    ADD THE TITLE
    *******************/

    const titleElement = document.createElement("h2");
    titleElement.innerText = song.fields.title;
    songContainer.appendChild(titleElement);
    
    /*******************
    ADD ARTIST TITLE
    *******************/

    const artistElement = document.createElement("p");
    artistElement.innerText = song.fields.artist;
    songContainer.appendChild(artistElement);

    /*******************
    ADD SONG RATING
    *******************/

    let ratingElement = document.createElement("p");
    ratingElement.innerText = "Rating: "+ song.fields.rating;
    
    songContainer.appendChild(ratingElement);


    /*******************
    ADD GENRES
    *******************/

    let genreList = song.fields.genre;

    genreList.forEach(function(genre){
      const genreElement = document.createElement("span");
      genreElement.classList.add("genreTag");
      genreElement.innerText = genre;
      songContainer.appendChild(genreElement);

      // TODO: Add this genre name as a class to the songContainer
      var songGenre = song.fields.genre;
      songGenre.forEach(function(genre){
        songContainer.classList.add(genre)
      })

      var filterIndie = document.querySelector("#indie");
      filterIndie.addEventListener("click", function(){

        if (songContainer.classList.contains("indie")) {
          songContainer.style.display = "block";
        } else {
          songContainer.style.display = "none";
        }
      })

      var filterAlternative = document.querySelector("#alternative");
      filterAlternative.addEventListener("click", function(){

        if (songContainer.classList.contains("alternative")) {
          songContainer.style.display = "block";
        } else {
          songContainer.style.display = "none";
        }
      })

      var filterPop = document.querySelector("#pop");
      filterPop.addEventListener("click", function(){

        if (songContainer.classList.contains("pop")) {
          songContainer.style.display = "block";
        } else {
          songContainer.style.display = "none";
        }
      })

      var filterRock = document.querySelector("#rock");
      filterRock.addEventListener("click", function(){

        if (songContainer.classList.contains("rock")) {
          songContainer.style.display = "block";
        } else {
          songContainer.style.display = "none";
        }
      })
    
    var filterDisco = document.querySelector("#disco");
      filterDisco.addEventListener("click", function(){

        if (songContainer.classList.contains("disco")) {
          songContainer.style.display = "block";
        } else {
          songContainer.style.display = "none";
        }
      })

      var filterDance = document.querySelector("#dance");
      filterDance.addEventListener("click", function(){

        if (songContainer.classList.contains("dance")) {
          songContainer.style.display = "block";
        } else {
          songContainer.style.display = "none";
        }
      })

      var filterMusical = document.querySelector("#musical");
      filterMusical.addEventListener("click", function(){

        if (songContainer.classList.contains("musical")) {
          songContainer.style.display = "block";
        } else {
          songContainer.style.display = "none";
        }
      })

      var filterCover = document.querySelector("#cover");
      filterCover.addEventListener("click", function(){

        if (songContainer.classList.contains("cover")) {
          songContainer.style.display = "block";
        } else {
          songContainer.style.display = "none";
        }
      })

      var filterReset = document.querySelector("#reset");
      filterReset.addEventListener("click", function(){
        songContainer.style.display = "block";
      })

    });

    /***********
     TODO: CREATE FILTER-BY-GENRE FUNCTIONALITY
     **********/
     

    songsContainer.appendChild(songContainer);

  });
}