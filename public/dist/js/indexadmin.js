function postData(url, data) {
  // Default options are marked with *
  return fetch(url, {
    body: JSON.stringify(data), // must match 'Content-Type' header
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, same-origin, *omit
    headers: {
      "user-agent": "Mozilla/4.0 MDN Example",
      "content-type": "application/json"
    },
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "same-origin", // no-cors, cors, *same-origin
    redirect: "follow", // manual, *follow, error
    referrer: "no-referrer" // *client, no-referrer
  }).then(response => response.json()); // parses response to JSON
}

document.addEventListener("DOMContentLoaded", function() {
  var heading = document.querySelector(".lg-heading");
  var tagline = document.querySelector(".sm-heading");
  var icons = document.querySelector(".icons");

  heading.contentEditable = "true";
  tagline.contentEditable = "true";
  //icons.contentEditable = "true";
  icons.addEventListener("click", function() {
    //console.log("go to icons screen");
    modal.style.display = "block";
  });

  heading.addEventListener("blur", function() {
    data = new Object();
    data.id = document.getElementById("dbid").value;
    data.name = this.innerText;
    postData("/portfolio/saveName", data);
  });

  tagline.addEventListener("blur", function() {
    data = new Object();
    data.id = document.getElementById("dbid").value;
    data.tagline = this.innerText;
    postData("/portfolio/saveTagline", data);
  });
});

// Get the modal
var modal = document.getElementById("myModal");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
