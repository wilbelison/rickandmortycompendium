const urlParams = new URLSearchParams(window.location.search);
const category = urlParams.get("category") || "characters";
const page = urlParams.get("page") || 1;

setPage = function (info) {
  console.log(info);

  const pagination = document.querySelector("#pagination");

  const nextButton = pagination.querySelector(".next");
  const prevButton = pagination.querySelector(".prev");

  const selectPage = pagination.querySelector("#page");

  selectPage.addEventListener("change", () => {
    alert(selectPage.value);
  });

  nextButton.addEventListener("click", () => {
    alert("next");
  });
  prevButton.addEventListener("click", () => {
    alert("prev");
  });
};

const data = fetch("https://rickandmortyapi.com/api/character?page=" + page)
  .then((response) => response.json())
  .then((response) => (content = response))
  .then(function () {
    const template = Handlebars.compile(
      document.querySelector("#template-character").innerHTML
    );
    const container = document.querySelector("#content");
    container.innerHTML = template(content);
    setPage(content.info);
  });
