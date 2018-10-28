
let photo= document.getElementById("photoid");
let review= document.getElementById("reviewid");
let img= document.createElement('img');
let par= document.createElement('p');

let globalPlaces = [];

function findLocation(x, y) {  /** replaced with getLocation() better "getter" representation **/
    // console.log(x, y);
    for (let i=0; i< globalPlaces.length;i++) {
        if (globalPlaces[i].location[0] === x && globalPlaces[i].location[1] === y) {
            return i;
        }
    }
    return -1;
}
function getLocation(x, y) {
    let location = {};  // empty location (JS Object)
    for(let p of globalPlaces) {
        if( p.location[0] === x && p.location[1] === y) {
            return p;  // return match location (JS Object)
        }
    }
    return location;
}
function showLocation(e) {  /** replaced with selectLocation(), data provide as response of getLocation() **/
    //console.log("you clicked " + e.latlng.lat + " dan "+ e.latlng.lng);
    let ix= findLocation(e.latlng.lat, e.latlng.lng);
    if (ix >=0) {
        img.src= globalPlaces[ix].image;
        par.textContent=globalPlaces[ix].review;
    }
}
function selectLocation(e) {
    let p = getLocation(e.latlng.lat, e.latlng.lng);  // return a place or empty JS object {} (which is falsey)
    if(p) {
        photo.innerText = '';  // reset text to empty, change with background image
        photo.style.backgroundImage = "url("+p.image+")";
        photo.style.backgroundSize = "100%";  // overwrite CSS
        photo.style.backgroundRepeat = "no-repeat";  // overwrite CSS
        review.innerHTML = p.review;
    }
}

function setGlobalPlaces(places) {
    for(let p of places) {
        let marker = L.marker(p.location).addTo(makassarmap).bindPopup(p.caption);
        marker.on('click', selectLocation);
    }
    globalPlaces = places;
}

const MAP_URL="data/map.json";
fetch(MAP_URL)
    .then(function(response){
        if (response.status !== 200) { //HTTP Status
            console.log('Ada masalah. Status Code: ' + response.status);
            throw response.statusText;
        }
        return response.json()
    })
    .then ( resp => {
        console.log(resp);
        setGlobalPlaces(resp.places);
    })
    .catch(function(err){
        console.log(err);
    });
