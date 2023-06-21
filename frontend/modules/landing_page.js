
import config from "../conf/index.js";

async function init() {
  console.log(config.backendEndpoint+"/cities")

  
  //Fetches list of all cities along with their images and description

  let cities = await fetchCities();
  console.log(cities)

  //Updates the DOM with the cities
  cities.forEach((key) => {
    addCityToDOM(key.id, key.city, key.description, key.image);
  });
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
  try{
    let result=fetch(config.backendEndpoint+"/cities")
    const data= (await result).json();
    console.log(data)
    return data;
  }catch(err){
    return null;
  }
}


//Implementation of DOM manipulation to add cities


function addCityToDOM(id, city, description, image){


  let divElement = document.createElement("div");
  divElement.className = "col-6 col-md-4 col-lg-3 mb-4";
  divElement.innerHTML = `
    <a href="pages/adventures/?city=${id}" id="${id}">
      <div class="tile">
        <div class="tile-text text-center">
          <h5>${city}</h5>
          <p>${description}</p>
        </div>
      <img class="img-responsive" src="${image}">
      </div>
    </a>
  `;
  document.getElementById("data").appendChild(divElement);




}

  
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
  /*
  let container=document.getElementById("data")
  

  let div=document.createElement("div");
    div.setAttribute("class","col-6 col-md-6 col-lg-3")
    

  let anchordiv=document.createElement("div")
  let redirection=document.createElement("a")
    redirection.href="pages/adventures/?city="+id 
  anchordiv.appendChild(redirection)
  div.appendChild(anchordiv)
  
  let div1=document.createElement("div")
    div1.setAttribute("class","card")
    div1.setAttribute("id",id)
  redirection.appendChild(div1)

  



  let title=document.createElement("title")
  title.innerHTML=id
  div1.appendChild(title)
  
  let imageItem=document.createElement("img");
    imageItem.src=image
  div1.appendChild(imageItem)

  //let div2=document.createElement("div")
  //div2.setAttribute("class","card-body")
  //div1.appendChild(div2)




  let cityItem=document.createElement("h5")
    cityItem.setAttribute("class","card-title")
    cityItem.innerHTML=city
  div1.appendChild(cityItem)

  let desc=document.createElement("p")
    desc.setAttribute("class","card-text")
    desc.innerHTML=description
  div1.appendChild(desc)

  

  

  container.appendChild(div)


}
*/

export { init, fetchCities, addCityToDOM };
