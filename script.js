const urlParams = new URLSearchParams(window.location.search);
const filterCategory = urlParams.get("filter-category") || "character";
const filterPage = urlParams.get("filter-page") || 1;


setPage = function (info) {
  const menu = document.querySelector("#menu");
  menu.querySelector("a." + filterCategory).classList.add("active");

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

Handlebars.registerHelper('for', function(from, to, incr, block) {
  var accum = '';
  for(var i = from; i < to + 1; i += incr)
      accum += block.fn(i);
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
    setPage(content.info);
  });
