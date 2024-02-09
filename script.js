let urlParams = new URLSearchParams(window.location.search);
const filterCategory = urlParams.get("category") || "character";
const filterPage = urlParams.get("page") || 1;
urlParams.set("category", filterCategory);
urlParams.set("page", filterPage);

Handlebars.registerHelper("repeat", function (n, options) {
  var out = "";
  for (var i = 1; i < n + 1; ++i) out += options.fn(i);
  return out;
});

const data = fetch(
  "https://rickandmortyapi.com/api/" +
    filterCategory +
    "?" +
    urlParams.toString()
)
  .then((response) => response.json())
  .then((response) => (content = response))
  .then(function () {
    console.log(content);

    const menu = document.querySelector("#menu");
    menu.querySelector("a." + filterCategory).classList.add("active");

    const contentTemplate = Handlebars.compile(
      document.querySelector("#template-" + filterCategory).innerHTML
    );

    const paginationTemplate = Handlebars.compile(
      document.querySelector("#template-pagination").innerHTML
    );

    const container = document.querySelector("#contents");
    const pagination = document.querySelector("#pagination");
    const filters = document.querySelector("#filters");

    container.innerHTML = contentTemplate(content);
    pagination.innerHTML = paginationTemplate(content);

    const selectPage = pagination.querySelector("#page");

    if (selectPage) {
      selectPage.addEventListener("change", () => {
        urlParams.set("page", selectPage.value);
        window.location.href = "/?" + urlParams.toString();
      });

      selectPage
        .querySelector("option:nth-child(" + filterPage + ")")
        .setAttribute("selected", "selected");

      const nextButton = pagination.querySelector(".next");

      if (nextButton) {
        nextButton.addEventListener("click", () => {
          urlParams.set("page", parseInt(filterPage) + 1);
          window.location.href = "/?" + urlParams.toString();
        });
      }

      const prevButton = pagination.querySelector(".prev");

      if (prevButton) {
        prevButton.addEventListener("click", () => {
          urlParams.set("page", parseInt(filterPage) - 1);
          window.location.href = "/?" + urlParams.toString();
        });
      }
    }
  });
