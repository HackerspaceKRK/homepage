var lastScrollY = window.scrollY;
var documentElement = document.documentElement;

function storeScrollData() {
  var y = window.scrollY;


  documentElement.setAttribute("data-header-transparent", "");


  var scrollStatus = "";

  if (y <= 0) {
    scrollStatus = "top";
  } else if ((window.innerHeight + y) >= document.body.offsetHeight) {
    scrollStatus = "bottom";
  } else {
    var isScrollDown = (y - lastScrollY > 0) ? true : false;
    scrollStatus = isScrollDown ? "down" : "up";
  }

  lastScrollY = y;
  documentElement.setAttribute("data-scroll-status", scrollStatus);
}

window.addEventListener('scroll', function(e) {
  storeScrollData();
});

storeScrollData();
