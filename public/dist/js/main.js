document.querySelector(".menu-btn").addEventListener("click", function() {
  document
    .querySelectorAll('*[class^="menu"]')
    .forEach(item => item.classList.toggle("show"));
});

document.body.addEventListener("load", startTime());

function startTime() {
  var cards = document.querySelectorAll(".card");
  cards.forEach(function(card, i) {
    card.classList.toggle("is-flipped");
  });
  var t = setTimeout(function() {
    startTime();
  }, 4000);
}

document.querySelectorAll(".skilldetail").forEach(item =>
  item.addEventListener("click", function() {
    document.querySelectorAll(".skilldetail").forEach(item => {
      if (item != this) {
        item.classList.remove("show");
      }
    });
    this.classList.toggle("show");
  })
);
