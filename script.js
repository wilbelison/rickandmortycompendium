const urlParams = new URLSearchParams(window.location.search);
const filterCategory = urlParams.get("category") || "character";
const filterPage = urlParams.get("page") || 1;

Handlebars.registerHelper("repeat", function (n, block) {
  var accum = "";
  for (var i = 1; i < n + 1; ++i) accum += block.fn(i);
  return accum;
});

const data = fetch(
  "https://rickandmortyapi.com/api/" + filterCategory + "?page=" + filterPage
)
  .then((response) => response.json())
  .then((response) => (content = response))
  .then(function () {
    console.log(content);

    const contentTemplate = Handlebars.compile(
      document.querySelector("#template-" + filterCategory).innerHTML
    );

    const paginationTemplate = Handlebars.compile(
      document.querySelector("#template-pagination").innerHTML
    );

    const container = document.querySelector("#contents");
    const pagination = document.querySelector("#pagination");

    container.innerHTML = contentTemplate(content);
    pagination.innerHTML = paginationTemplate(content);

    const menu = document.querySelector("#menu");
    menu.querySelector("a." + filterCategory).classList.add("active");

    const nextButton = pagination.querySelector(".next");
    const prevButton = pagination.querySelector(".prev");

    const selectPage = pagination.querySelector("#page");

    selectPage.addEventListener("change", () => {
      alert(selectPage.value);
    });

    selectPage
      .querySelector("option:nth-child(" + filterPage + ")")
      .setAttribute('selected', 'selected');

    nextButton.addEventListener("click", () => {
      alert("next");
    });

    prevButton.addEventListener("click", () => {
      alert("prev");
    });
  });
