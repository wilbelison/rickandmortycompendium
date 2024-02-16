Handlebars.registerHelper("repeat", function (n, options) {
  var out = "";
  for (var i = 1; i < n + 1; ++i) out += options.fn(i);
  return out;
});

let characters = {};
let episodes = {};

const apiCharacters = fetch("https://rickandmortyapi.com/api/character?page=1")
  .then((response) => response.json())
  .then((response) => (content = response))
  .then(function () {
    for (page = 1; page < content.info.pages + 1; page++) {
      const data = fetch("https://rickandmortyapi.com/api/character?page=" + page)
        .then((response) => response.json())
        .then((response) => (content = response))
        .then(function () {
            for (i = 0; i < content.results.length; i++) {
                characters[content.results[i].id] = content.results[i];
            }
        });
    }
  }).then(function () {
    console.log(characters);
});

const apiEpisodes = fetch("https://rickandmortyapi.com/api/episode?page=1")
  .then((response) => response.json())
  .then((response) => (content = response))
  .then(function () {
    for (page = 1; page < content.info.pages + 1; page++) {
      const data = fetch("https://rickandmortyapi.com/api/episode?page=" + page)
        .then((response) => response.json())
        .then((response) => (content = response))
        .then(function () {
            for (i = 0; i < content.results.length; i++) {
                episodes[content.results[i].id] = content.results[i];
            }
        });
    }
  }).then(function () {
    console.log(episodes);
});