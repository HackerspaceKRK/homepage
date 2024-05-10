(() => {
  // hellpers
  const $$ = document.querySelectorAll.bind(document);
  const $ = document.querySelector.bind(document);
  const on = (elements, event, handler) => {
    if (!Array.isArray(elements) && !(elements instanceof NodeList)) {
      elements = [elements];
    }
    elements.forEach((element) => {
      element.addEventListener(event, handler);
    });
  };

  // hide scroll bar when scrolling down
  let lastScrollY = window.scrollY;
  const documentElement = document.documentElement;
  function storeScrollData() {
    var y = window.scrollY;

    documentElement.setAttribute("data-header-transparent", "");

    var scrollStatus = "";

    if (y <= 0) {
      scrollStatus = "top";
    } else if (window.innerHeight + y >= document.body.offsetHeight) {
      scrollStatus = "bottom";
    } else {
      var isScrollDown = y - lastScrollY > 0 ? true : false;
      scrollStatus = isScrollDown ? "down" : "up";
    }

    lastScrollY = y;
    documentElement.setAttribute("data-scroll-status", scrollStatus);
  }
  on(window, "scroll", storeScrollData);
  storeScrollData();

  // image popup
  let popupIdCounter = 0;
  $$(".img-popup-trigger").forEach((trigger) => {
    if (!trigger.id) {
      const srcId = trigger.src
        .split("/")
        .pop()
        .split(".")[0]
        .replace(/[^a-zA-Z0-9]/g, "");
      trigger.id = "img-" + srcId + "-" + popupIdCounter++;
    }
  });
  on($$(".img-popup-trigger"), "click", function (e) {
    const backdrop = document.createElement("div");
    const backdropStyle = backdrop.style;
    backdropStyle.position = "fixed";
    backdropStyle.top = "0";
    backdropStyle.left = "0";
    backdropStyle.right = "0";
    backdropStyle.bottom = "0";
    backdropStyle.backgroundColor = "rgba(0, 0, 0, 0)";
    backdropStyle.zIndex = "9999";
    backdropStyle.display = "flex";
    backdropStyle.justifyContent = "center";
    backdropStyle.alignItems = "center";
    backdropStyle.transition = "background-color 0.4s, opacity 0.4s";

    const enlargedImage = document.createElement("img");
    const enlargedImageStyle = enlargedImage.style;
    enlargedImageStyle.width = "90vw";
    enlargedImageStyle.height = "90vh";
    enlargedImageStyle.objectFit = "contain";

    enlargedImage.src = e.target.src;
    enlargedImage.alt = e.target.alt;
    enlargedImageStyle.opacity = "0";
    backdrop.appendChild(enlargedImage);

    const transitionImage = document.createElement("img");
    const transitionImageStyle = transitionImage.style;
    transitionImageStyle.position = "fixed";
    const setTransitionImageToRect = function (rect) {
      transitionImageStyle.top = rect.top + "px";
      transitionImageStyle.left = rect.left + "px";
      transitionImageStyle.width = rect.width + "px";
      transitionImageStyle.height = rect.height + "px";
    };
    setTransitionImageToRect(e.target.getBoundingClientRect());
    transitionImage.src = e.target.src;
    transitionImage.alt = e.target.alt;
    transitionImageStyle.transitionDuration = "0.4s";
    transitionImageStyle.transitionProperty = "top, left, width, height";
    transitionImageStyle.transitionTimingFunction = "ease-in-out";
    transitionImageStyle.objectFit = "contain";

    backdrop.appendChild(transitionImage);

    // hide original image
    e.target.style.opacity = "0";

    // watch the original image for src changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === "src") {
          enlargedImage.src = e.target.src;
          transitionImage.src = e.target.src;
        }
      });
    });
    observer.observe(e.target, { attributes: true });

    let windowEventListener = null;
    const hidePopup = function () {
      backdropStyle.backgroundColor = "rgba(0, 0, 0, 0)";
      setTransitionImageToRect(e.target.getBoundingClientRect());
      enlargedImageStyle.opacity = "0";
      transitionImageStyle.opacity = "1";
      setTimeout(() => {
        backdrop.remove();
        observer.disconnect();
        e.target.style.opacity = "1";
      }, 400);
      window.removeEventListener("keydown", windowEventListener);
    };
    on(backdrop, "click", hidePopup);
    windowEventListener = window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        hidePopup();
      }
    });
    document.body.appendChild(backdrop);

    setTimeout(() => {
      setTransitionImageToRect(enlargedImage.getBoundingClientRect());
      backdropStyle.backgroundColor = "rgba(0, 0, 0, 0.9)";
      setTimeout(() => {
        enlargedImageStyle.opacity = "1";
        transitionImageStyle.opacity = "0";
      }, 400);
    }, 1);
  });
})();
