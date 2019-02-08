function updateValues(data) {
  var skillscontainer = document.querySelector("#skills");
  data[0].skill.forEach(function(e, i) {
    skillname = document.createElement("div");
    skillname.classList.add("skilldetail");
    skillname.innerText = e.skillname;
    skillUL = document.createElement("ul");
    e.skilllist.forEach(function(e, i) {
      skill = document.createElement("li");
      skill.innerHTML = e;
      skillUL.appendChild(skill);
    });
    skillname.appendChild(skillUL);
    skillscontainer.appendChild(skillname);
  });
}

document.addEventListener("DOMContentLoaded", function() {
  postData("/skills/", "").then(data => updateValues(data));
});

function postData(url, data) {
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
