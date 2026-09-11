// Marks the current page's nav link as active based on the URL path.
(function () {
  var path = window.location.pathname.replace(/\/$/, "") || "/";
  var page = path.split("/").pop() || "index.html";
  document.querySelectorAll("nav.site-nav a").forEach(function (link) {
    var href = link.getAttribute("href");
    if (href === page || (page === "" && href === "index.html")) {
      link.classList.add("active");
    }
  });
})();
