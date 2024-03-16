// Handle Image Gallery
const galleryMask = document.querySelector(".gallery-mask");
const maskImage = document.querySelector(".mask-image");
const galleryImgs = document.querySelectorAll(".image-item");

galleryMask.addEventListener("click", () => {
  galleryMask.classList.add("mask-off");
});

galleryImgs.forEach((item) => {
  item.addEventListener("click", () => {
    let styleValue = item.style.backgroundImage;
    let urlMatch = styleValue.match(/url\(["']?(.*?)["']?\)/);
    if (urlMatch && urlMatch[1]) {
      maskImage.setAttribute("src", urlMatch[1]);
      galleryMask.classList.remove("mask-off");
    }
  });
});

// Handle Publish Date
const dateData = document.getElementById("dateData");
const sinceData = document.getElementById("sinceData");
let publishDate = "2024-02-16";

dateData.innerHTML = moment(publishDate).format("LL");
sinceData.innerHTML = moment(publishDate).fromNow();

//Switch light/dark

// On page load, set the theme from localStorage or default to 'light'
$(document).ready(function () {
  var theme = localStorage.getItem("theme") || "light";
  $(":root").attr("data-theme", theme);
  if (theme === "dark") {
    $(".switch").removeClass("switched");
  } else {
    $(".switch").addClass("switched");
  }
});

// On switch click, toggle the theme and store it in localStorage
$(".switch").on("click", function () {
  if ($(":root").attr("data-theme") === "light") {
    $(":root").attr("data-theme", "dark");
    $(".switch").removeClass("switched");
    localStorage.setItem("theme", "dark");
  } else {
    $(":root").attr("data-theme", "light");
    $(".switch").addClass("switched");
    localStorage.setItem("theme", "light");
  }
});

// Menu

const menuIcon = document.querySelector(".menu-icon");
const bottomRight = document.querySelector(".bottom-right");

function toggleBottomRight() {
  if (menuIcon.checked) {
    setTimeout(() => {
      bottomRight.classList.add("show");
    }, 1400);
  } else {
    bottomRight.classList.remove("show");
  }
}

menuIcon.addEventListener("click", toggleBottomRight);

// Copy buton

function copyToClipboard() {
  const textToCopy = window.location.href;
  navigator.clipboard.writeText(textToCopy);
}

// navbar -----------------------------------------------------------------------------------------

// === Vars ===

const elementsToObserve = document.querySelectorAll("section[id]"),
  visibleClass = "visible",
  nav = document.querySelector(".nav"),
  navPath = nav.querySelector("svg path"),
  navListItems = [...nav.querySelectorAll("li")],
  navItems = navListItems
    .map((listItem) => {
      const anchor = listItem.querySelector("a"),
        targetID = anchor && anchor.getAttribute("href").slice(1),
        target = document.getElementById(targetID);

      return { listItem, anchor, target };
    })
    .filter((item) => item.target);

// === Functions ===

function drawPath() {
  let path = [],
    pathIndent;

  navItems.forEach((item, i) => {
    const x = item.anchor.offsetLeft - 5,
      y = item.anchor.offsetTop,
      height = item.anchor.offsetHeight;

    if (i === 0) {
      path.push("M", x, y, "L", x, y + height);
      item.pathStart = 0;
    } else {
      if (pathIndent !== x) path.push("L", pathIndent, y);

      path.push("L", x, y);

      navPath.setAttribute("d", path.join(" "));
      item.pathStart = navPath.getTotalLength() || 0;
      path.push("L", x, y + height);
    }

    pathIndent = x;
    navPath.setAttribute("d", path.join(" "));
    item.pathEnd = navPath.getTotalLength();
  });
}

function syncPath() {
  const someElsAreVisible = () =>
      nav.querySelectorAll(`.${visibleClass}`).length > 0,
    thisElIsVisible = (el) => el.classList.contains(visibleClass),
    pathLength = navPath.getTotalLength();

  let pathStart = pathLength,
    pathEnd = 0,
    lastPathStart,
    lastPathEnd;

  navItems.forEach((item) => {
    if (thisElIsVisible(item.listItem)) {
      pathStart = Math.min(item.pathStart, pathStart);
      pathEnd = Math.max(item.pathEnd, pathEnd);
    }
  });

  if (someElsAreVisible() && pathStart < pathEnd) {
    if (pathStart !== lastPathStart || pathEnd !== lastPathEnd) {
      const dashArray = `1 ${pathStart} ${pathEnd - pathStart} ${pathLength}`;

      navPath.style.setProperty("stroke-dashoffset", "1");
      navPath.style.setProperty("stroke-dasharray", dashArray);
      navPath.style.setProperty("opacity", 1);
    }
  } else {
    navPath.style.setProperty("opacity", 0);
  }

  lastPathStart = pathStart;
  lastPathEnd = pathEnd;
}

function markVisibleSection(observedEls) {
  observedEls.forEach((observedEl) => {
    const id = observedEl.target.getAttribute("id"),
      anchor = document.querySelector(`nav li a[href="#${id}"]`);

    if (!anchor) return false;

    const listItem = anchor.parentElement;

    if (observedEl.isIntersecting) {
      listItem.classList.add(visibleClass);
    } else {
      listItem.classList.remove(visibleClass);
    }
    syncPath();
  });
}

// === Draw path and observe ===

drawPath();

const observer = new IntersectionObserver(markVisibleSection);
elementsToObserve.forEach((thisEl) => observer.observe(thisEl));

// Progress Scroll

const ProgressScroll = (() => {
  let s;

  function updateSettings() {
    s.windowHeight = $(window).height();
    s.windowWidth = $(window).width();
    s.scrollHeight = $(document).height() - $(window).height();
    s.progressTotal = s.windowHeight * 2 + s.windowWidth * 2;
  }

  function onScroll() {
    s.scrollPosition = $(document).scrollTop();
    requestTick();
  }

  function onResize() {
    updateSettings();
    if (s.windowWidth < 1000) {
      requestTick();
    } else {
      s.top.css("width", `0%`);
      s.right.css("height", `0%`);
      s.bottom.css("width", `0%`);
      s.left.css("height", `0%`);
    }
  }

  function requestTick() {
    requestAnimationFrame(progress);
  }

  function progress() {
    if (s.windowWidth >= 1000) return;

    const percentage = s.scrollPosition / s.scrollHeight;
    const width = s.windowWidth / s.progressTotal;
    const height = s.windowHeight / s.progressTotal;

    s.top.css("width", `${(percentage / width) * 100}%`);
    s.right.css("height", `${((percentage - width) / height) * 100}%`);
    s.bottom.css("width", `${((percentage - width - height) / width) * 100}%`);
    s.left.css(
      "height",
      `${((percentage - width - height - width) / height) * 100}%`
    );
  }

  return {
    settings() {
      return {
        top: $(".progress-top"),
        right: $(".progress-right"),
        bottom: $(".progress-bottom"),
        left: $(".progress-left"),
        windowHeight: $(window).height(),
        windowWidth: $(window).width(),
        scrollHeight: $(document).height() - $(window).height(),
        progressTotal: $(window).height() * 2 + $(window).width() * 2,
        scrollPosition: $(document).scrollTop(),
      };
    },

    init() {
      s = this.settings();
      if (s.windowWidth < 1000) {
        $(window).on("scroll", onScroll.bind(this));
        $(window).on("resize", onResize.bind(this));
      }
      onResize();
    },
  };
})();

// Init
$(document).ready(() => {
  ProgressScroll.init();
});
