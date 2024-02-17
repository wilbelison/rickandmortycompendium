let data = {};

data.characters = {};
data.episodes = {};
data.locations = {};

const urlParseInt = (str) => parseInt(str.split(/[/]+/).pop());

const dataCharacters = fetch("https://rickandmortyapi.com/api/character")
  .then((response) => response.json())
  .then((response) => {
    for (page = 1; page <= response.info.pages; page++) {
      const pageData = fetch(
        "https://rickandmortyapi.com/api/character?page=" + page
      )
        .then((response) => response.json())
        .then((response) => {
          response.results.forEach((result) => {
            result.episode = result.episode.map((episode) =>
              urlParseInt(episode)
            );
            data.characters[result.id] = result;
          });
        });
    }
  });

const dataEpisodes = fetch("https://rickandmortyapi.com/api/episode")
  .then((response) => response.json())
  .then((response) => {
    for (page = 1; page <= response.info.pages; page++) {
      const pageData = fetch(
        "https://rickandmortyapi.com/api/episode?page=" + page
      )
        .then((response) => response.json())
        .then((response) => {
          response.results.forEach((result) => {
            result.characters = result.characters.map((character) =>
              urlParseInt(character)
            );
            data.episodes[result.id] = result;
          });
        });
    }
  });

const dataLocations = fetch("https://rickandmortyapi.com/api/location")
  .then((response) => response.json())
  .then((response) => {
    for (page = 1; page <= response.info.pages; page++) {
      const pageData = fetch(
        "https://rickandmortyapi.com/api/location?page=" + page
      )
        .then((response) => response.json())
        .then((response) => {
          response.results.forEach((result) => {
            result.residents = result.residents.map((character) =>
              urlParseInt(character)
            );
            data.locations[result.id] = result;
          });
        });
    }
  });

console.log(data);
