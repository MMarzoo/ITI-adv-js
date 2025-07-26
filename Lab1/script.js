//get meal data from the API and display it on the page
function getMeal(type) {
  showLoader();

  var xhttp = new XMLHttpRequest();
  xhttp.open(
    "GET",
    `https://forkify-api.herokuapp.com/api/v2/recipes?search=${type}`
  );
  xhttp.send();

  xhttp.addEventListener("readystatechange", function () {
    if (xhttp.readyState === 4) {
      hideLoader();

      if (xhttp.status === 200) {
        var data = JSON.parse(xhttp.response).data.recipes;
        display(data);
      } else if (xhttp.status === 404) {
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

// Add event listeners to buttons in the navbar
var btns = document.querySelectorAll(".navbar button");

btns.forEach((btn) => {
  btn.addEventListener("click", function () {
    var type = btn.getAttribute("data-type");
    getMeal(type);
  });
});

//function to show and hide the loader(spinner)
function showLoader() {
  document.getElementById("loader").style.display = "block";
}

function hideLoader() {
  document.getElementById("loader").style.display = "none";
}
