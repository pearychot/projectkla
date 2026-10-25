// Maps the page's resource ids (and the React CDN URLs the runtime asks for)
// to the local files, so the site runs with no external dependencies.
// Paths resolve against this script's own URL, so any page at any depth can load it.
(function () {
  var base = document.currentScript.src.replace(/js\/resources\.js(\?.*)?$/, '');
  var files = {
    "res0": "images/img0.jpg",
    "res3": "images/img3.jpg",
    "res4": "images/img4.jpg",
    "res6": "images/img6.jpg",
    "res8": "images/img8.jpg",
    "res13": "images/img13.jpg",
    "res15": "images/img15.jpg",
    "res16": "images/img16.jpg",
    "res11": "images/img11.jpg",
    "res17": "images/img17.jpg",
    "res1": "images/img1.jpg",
    "res10": "images/img10.jpg",
    "res9": "images/img9.jpg",
    "res5": "images/img5.jpg",
    "res12": "images/img12.jpg",
    "res19": "images/img19.jpg",
    "res2": "images/img2.jpg",
    "res18": "images/img18.jpg",
    "res14": "images/img14.jpg",
    "res7": "images/img7.jpg",
    "https://unpkg.com/react@18.3.1/umd/react.production.min.js": "js/react.production.min.js",
    "https://unpkg.com/react-dom@18.3.1/umd/react-dom.production.min.js": "js/react-dom.production.min.js"
  };
  window.__resources = {};
  for (var id in files) window.__resources[id] = base + files[id];
})();
