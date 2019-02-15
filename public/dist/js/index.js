function updateValues(data) {
  const { _id, name, tagline, links } = data[0]; // destructuring

  var idTag = document.createElement("input");
  idTag.type = "hidden";
  idTag.value = _id;
  idTag.id = "dbid";
  idTag.name = "dbid";
  document.body.appendChild(idTag);

  var heading = document.querySelector(".lg-heading");
  var secondaryheading = document.createElement("span"); // <span></span>
  secondaryheading.classList.add("text-secondary"); // <span class="text-secondary"></span>
  secondaryheading.innerText = name.substring(
    name.lastIndexOf(" "),
    name.length
  ); // <span class="text-secondary">Williams</span>
  heading.innerHTML += name.substring(0, name.lastIndexOf(" ")); // <h1 class="lg-heading">Stephen</h1>
  heading.appendChild(secondaryheading); // <h1 class="lg-heading">Stephen<span class="text-secondary">Couch</span></h1>

  var heading = (document.querySelector(".sm-heading").innerHTML += tagline); // <h2 class="sm-heading">Full-Stack Developer, Software Development Instructor</h2>

  // links
  // sort the links by order using the array.sort method
  links.sort(function(a, b) {
    return a.order - b.order;
  });

  var iconlist = document.createElement("ul");

  links.forEach(function(e, i) {
    const { name, link, icon, order } = e; // destructuring
    var anchor = document.createElement("a"); // <a></a>
    anchor.href = link; // <a href="https://github.com/eric-couch"></a>
    var item = document.createElement("i"); // <i></i>

    icon.split(" ").forEach(function(e, i) {
      item.classList.add(e);
    }); // <i class="fab fa-github fa-3x"></i>

    var iconlistitem = document.createElement("li");

    for (var i = 0; i < 4; i++) {
      var emptyspan = document.createElement("span");
      anchor.appendChild(emptyspan);
    }
    anchor.appendChild(item);
    iconlistitem.appendChild(anchor);
    iconlist.appendChild(iconlistitem);
    // <div class="icons"><a href="https://github.com/eric-couch"><i class="fab fa-github fa-3x"></i></a></div>
  });
  document.querySelector(".icons").appendChild(iconlist);
}

document.addEventListener("DOMContentLoaded", function() {
  getData("/portfolio/", "").then(data => updateValues(data));
});

function getData(url, data) {
  // Default options are marked with *
  return fetch(url, {
    //body: JSON.stringify(data), // must match 'Content-Type' header
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, same-origin, *omit
    headers: {
      "user-agent": "Mozilla/4.0 MDN Example",
      "content-type": "application/json"
    },
    method: "GET", // *GET, POST, PUT, DELETE, etc.
    mode: "same-origin", // no-cors, cors, *same-origin
    redirect: "follow", // manual, *follow, error
    referrer: "no-referrer" // *client, no-referrer
  }).then(response => response.json()); // parses response to JSON
}
