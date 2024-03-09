// detect browser and laod supported stylecheet

const parser = new UAParser(navigator.userAgent);
const parserResults = parser.getResult();

const browserName = parserResults.browser.name;
const browserVersion = parserResults.browser.version;

const style = document.getElementById("style");
const newStyle = () => style.setAttribute("href", "./assets/styles/new.css");

browserName == "Chrome" && browserVersion > "121" && newStyle();
browserName == "Edge" && browserVersion > "121" && newStyle();
browserName == "Safari" && browserVersion > "17.3" && newStyle();
browserName == "Firefox" && browserVersion > "122" && newStyle();
browserName == "Opera" && browserVersion > "106" && newStyle();

// get url parameters

let urlParams = new URLSearchParams(window.location.search);

// default params

const filterCategory = urlParams.get("category") || "character";
const filterPage = urlParams.get("page") || 1;
const filterContent = urlParams.get("content") || "";

urlParams.set("category", filterCategory);
urlParams.set("page", filterPage);
urlParams.delete("content");

// handlebars reapeat function

Handlebars.registerHelper("repeat", function (n, options) {
  var out = "";
  for (var i = 1; i < n + 1; ++i) out += options.fn(i);
  return out;
});

// init app

const apiURL =
  "https://rickandmortyapi.com/api/" +
  filterCategory +
  "/" +
  filterContent +
  "?" +
  urlParams.toString();

const data = fetch(apiURL)
  .then((response) => response.json())
  .then((response) => (content = response))
  .then(function () {
    const menu = document.querySelector("#menu");
    menu.querySelector("a." + filterCategory).classList.add("active");

    const contentTemplate = Handlebars.compile(
      document.querySelector("#template-" + filterCategory).innerHTML
    );

    const filtersTemplate = Handlebars.compile(
      document.querySelector("#template-filters-" + filterCategory).innerHTML
    );

    const paginationTemplate = Handlebars.compile(
      document.querySelector("#template-pagination").innerHTML
    );

    const container = document.querySelector("#contents");
    const filtersContainer = document.querySelector("#filters .templates");
    const pagination = document.querySelector("#pagination");

    container.innerHTML = contentTemplate(content);
    filtersContainer.innerHTML = filtersTemplate(content);
    pagination.innerHTML = paginationTemplate(content);

    const selectPage = pagination.querySelector("#page");

    if (selectPage) {
      selectPage.addEventListener("change", () => {
        urlParams.set("page", selectPage.value);
        window.location.href = "./?" + urlParams.toString();
      });

      selectPage
        .querySelector("option:nth-child(" + filterPage + ")")
        .setAttribute("selected", "selected");

      const resultsPage = document.querySelector(".results .page");
      resultsPage.innerHTML = filterPage;

      const nextButton = pagination.querySelector(".next");

      if (nextButton) {
        nextButton.addEventListener("click", () => {
          urlParams.set("page", parseInt(filterPage) + 1);
          window.location.href = "./?" + urlParams.toString();
        });
      }

      const prevButton = pagination.querySelector(".prev");

      if (prevButton) {
        prevButton.addEventListener("click", () => {
          urlParams.set("page", parseInt(filterPage) - 1);
          window.location.href = "./?" + urlParams.toString();
        });
      }
    }
  });
