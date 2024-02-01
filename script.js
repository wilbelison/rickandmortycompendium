const urlParams = new URLSearchParams(window.location.search);
const category = urlParams.get("category") || "characters";
const page = urlParams.get("page") || 1;

setPage = function (info) {
  console.log(info);

  const pagination = document.querySelector("#pagination");

  const nextButton = pagination.querySelector(".next");
  const prevButton = pagination.querySelector(".prev");

  const selectPage = pagination.querySelector("#page");

  selectPage.addEventListener('change', () => {
    alert(selectPage.value);
  });

  nextButton.addEventListener('click', () => {
    alert("next");
  });
  prevButton.addEventListener('click', () => {
    alert("prev");
  });
};

if (category == "locations") {
  const data = fetch("https://rickandmortyapi.com/api/location?page=" + page)
    .then((response) => response.json())
    .then((response) => (content = response))
    .then(function () {
      const template = document.querySelector("#template-location").innerHTML;
      const container = document.querySelector("#content");

      contentHtml = Mustache.render(template, content.results);

      container.innerHTML = contentHtml;

      setPage(content.info);
    });
} else if (category == "episodes") {
  const data = fetch("https://rickandmortyapi.com/api/episode?page=" + page)
    .then((response) => response.json())
    .then((response) => (content = response))
    .then(function () {
      const template = document.querySelector("#template-episode").innerHTML;
      const container = document.querySelector("#content");

      contentHtml = Mustache.render(template, content.results);

      container.innerHTML = contentHtml;

      setPage(content.info);
    });
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
