
import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  var param=new URLSearchParams(search)
  var cityname=param.get("city")
  return cityname

}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  console.log(config.backendEndpoint+"/adventures?city="+city)
  try{
    let result=fetch(config.backendEndpoint+"/adventures?city="+city)
    const data= (await result).json();
    return data;
  }catch(err){
    return null;
  }
  

}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  for (let adventure of adventures) {
    createAdventureCard(
      adventure.name,
      adventure.id,
      adventure.category,
      adventure.image,
      adventure.costPerHead,
      adventure.duration
    );
  }
  
  }
  function createAdventureCard(name, id, category, image, costPerHead, duration) {
    let divSection = document.createElement("div");
    divSection.setAttribute("class", "col-lg-3 col-6 mb-3 position-relative");
  
    let aSection = document.createElement("a");
    aSection.setAttribute("href", "detail/?adventure=" + id);
    aSection.setAttribute("id", id);
  
    let cardSection = document.createElement("div");
    cardSection.setAttribute("class", "activity-card");
  
    let cardImg = document.createElement("img");
    cardImg.setAttribute("class", "activity-card-image");
    cardImg.setAttribute("src", image);
    cardImg.setAttribute("alt", name);
  
    //category banner
    let categoryBanner = document.createElement("span");
    categoryBanner.setAttribute("class", "category-banner");
    categoryBanner.textContent = category;
  
    let cardText = document.createElement("div");
    cardText.setAttribute("class", "d-flex flex-column w-100 px-2");
  
    let textSection1 = document.createElement("div");
    textSection1.setAttribute(
      "class",
      "text-black mt-3 d-flex justify-content-between p-1"
    );
    let h5Heading1 = document.createElement("h5");
    h5Heading1.textContent = name;
    let para1 = document.createElement("p");
    para1.textContent = "₹" + " " + costPerHead;
  
    textSection1.appendChild(h5Heading1);
    textSection1.appendChild(para1);
  
    let textSection2 = document.createElement("div");
    textSection2.setAttribute(
      "class",
      "text-black d-flex justify-content-between p-1"
    );
    let h5Heading2 = document.createElement("h5");
    h5Heading2.textContent = "Duration";
    let para2 = document.createElement("p");
    para2.textContent = duration + " " + "Hours";
  
    textSection2.appendChild(h5Heading2);
    textSection2.appendChild(para2);
  
    cardText.appendChild(textSection1);
    cardText.appendChild(textSection2);
  
    divSection.appendChild(aSection);
    aSection.appendChild(cardSection);
    cardSection.appendChild(cardImg);
    divSection.append(categoryBanner);
    cardSection.appendChild(cardText);
  
    let dataSection = document.getElementById("data");
    dataSection.appendChild(divSection);
  }

  




//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  let newlist = list.filter(
    (element) => low <= element.duration && element.duration <= high
  );
  console.log(newlist);
  return newlist;

}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  let newlist = list.filter((element) =>
    categoryList.includes(element.category)
  );
  return newlist;

}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
  if (filters.category.length > 0)
    list = filterByCategory(list, filters.category);
  if (filters.duration.length > 0) {
    list = filterByDuration(
      list,
      filters.duration.split("-")[0],
      filters.duration.split("-")[1]
    );
  }


  // Place holder for functionality to work in the Stubs
  return list;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  window.localStorage.setItem("filters", JSON.stringify(filters));
  return true;


}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object
  let localfilters = JSON.parse(window.localStorage.getItem("filters"));


  // Place holder for functionality to work in the Stubs
  return localfilters;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  if(filters.category.length > 0){
    let parent = document.getElementById("category-list")

    for(let category of filters.category){
      let pill = document.createElement("div");
      pill.setAttribute("class", "category-filter");
      pill.innerHTML = `
            ${category}<button type="button" class="btn-close" aria-label="Close" onclick="handelRemoveButton('${category}')"></button>
      `
      parent.append(pill)
    }
  }

}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
