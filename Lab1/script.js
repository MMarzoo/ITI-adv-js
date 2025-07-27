//add buttons to the navbar
var navbar = document.querySelector(".navbar");
var cardContainer = document.querySelector("#card-container");

var categories = ["salad", "pasta", "beef", "pizza"];
categories.forEach((cat) => {
  var btn = document.createElement("button");
  btn.textContent = cat.charAt(0).toUpperCase() + cat.slice(1);
  btn.setAttribute("data-type", cat);
  btn.addEventListener("click", () => {
    getMeal(cat);
  });
  navbar.appendChild(btn);
});

//get meal data from the API and display it on the page
function getMeal(type) {
  showLoader();

  var myRequest = new XMLHttpRequest();
  myRequest.open(
    "GET",
    `https://forkify-api.herokuapp.com/api/v2/recipes?search=${type}`
  );
  myRequest.send();

  myRequest.addEventListener("readystatechange", function () {
    if (myRequest.readyState === 4) {
      hideLoader();

      if (myRequest.status === 200) {
        var data = JSON.parse(myRequest.response).data.recipes;
        display(data);
      } else if (myRequest.status === 404) {
        document.querySelector(
          "#card-container"
        ).innerHTML = `<p>No meals found for "${type}".</p>`;
      }
    }
  });
}

// Function to display the meal data in cards
function display(list) {
  var container = "";
  for (var i = 0; i < list.length; i++) {
    container += `
      <div class="card">
        <img src="${list[i].image_url}" alt="Meal Image" />
        <h3>${list[i].title}</h3>
        <p>Publisher: ${list[i].publisher}</p>
      </div>`;
  }

  document.querySelector("#card-container").innerHTML = container;
}

window.onload = function () {
  getMeal("pasta");
};

//function to show and hide the loader(spinner)
function showLoader() {
  document.getElementById("loader").style.display = "block";
}

function hideLoader() {
  document.getElementById("loader").style.display = "none";
}
