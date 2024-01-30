const urlParams = new URLSearchParams(window.location.search);
const category = urlParams.get("category") || "characters";
const page = urlParams.get("page") || 1;

setPage = function (info) {
  console.log(info);
};

if (category == "locations") {
    
} else if (category == "episodes") {

} else {
  const data = fetch("https://rickandmortyapi.com/api/character/?page=" + page)
    .then((response) => response.json())
    .then((response) => (content = response))
    .then(function () {
      const template = document.querySelector("#template-character").innerHTML;
      const container = document.querySelector("#content");

      contentHtml = Mustache.render(template, content.results);

      container.innerHTML = contentHtml;

      setPage(content.info);
    });
}
