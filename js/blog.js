(function () {
  var POSTS_INDEX = "posts/index.json";

  function formatDate(iso) {
    var d = new Date(iso + "T00:00:00");
    if (isNaN(d.getTime())) return iso;
    return d.toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });
  }

  function renderList(posts) {
    var list = document.getElementById("post-list");
    if (!posts.length) {
      list.innerHTML = "<p>No posts yet — check back soon.</p>";
      return;
    }
    var sorted = posts.slice().sort(function (a, b) {
      return b.date.localeCompare(a.date);
    });
    list.innerHTML = sorted
      .map(function (post) {
        return (
          "<li>" +
          '<h3><a href="post.html?slug=' + encodeURIComponent(post.slug) + '">' + post.title + "</a></h3>" +
          '<p class="post-meta">' + formatDate(post.date) + "</p>" +
          '<p class="post-summary">' + post.summary + "</p>" +
          "</li>"
        );
      })
      .join("");
  }

  function renderPost(posts) {
    var params = new URLSearchParams(window.location.search);
    var slug = params.get("slug");
    var header = document.getElementById("post-header");
    var content = document.getElementById("post-content");

    var meta = posts.find(function (p) {
      return p.slug === slug;
    });

    if (!slug || !meta) {
      header.innerHTML = "<h1>Post not found</h1>";
      content.innerHTML = '<p><a href="blog.html">&larr; Back to blog</a></p>';
      return;
    }

    document.title = meta.title + " — Oscar Berntsson";
    var canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", "https://www.oscarberntsson.se/post.html?slug=" + encodeURIComponent(slug));
    header.innerHTML =
      "<h1>" + meta.title + "</h1>" +
      '<p class="post-meta">' + formatDate(meta.date) + "</p>";

    fetch("posts/" + slug + ".md")
      .then(function (res) {
        if (!res.ok) throw new Error("Failed to load post content");
        return res.text();
      })
      .then(function (markdown) {
        content.innerHTML = window.marked.parse(markdown);
      })
      .catch(function () {
        content.innerHTML = "<p>Sorry, this post could not be loaded.</p>";
      });
  }

  function init() {
    var isListPage = !!document.getElementById("post-list");
    var isPostPage = !!document.getElementById("post-content");
    if (!isListPage && !isPostPage) return;

    fetch(POSTS_INDEX)
      .then(function (res) {
        return res.json();
      })
      .then(function (posts) {
        if (isListPage) renderList(posts);
        if (isPostPage) renderPost(posts);
      })
      .catch(function () {
        var target = document.getElementById("post-list") || document.getElementById("post-content");
        if (target) target.innerHTML = "<p>Could not load posts.</p>";
      });
  }

  init();
})();
