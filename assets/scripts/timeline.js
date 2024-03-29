let data = {};

data.characters = {};
data.episodes = {};
data.locations = {};

const urlParseInt = (str) => parseInt(str.split(/[/]+/).pop());

const fetchRickAndMorty = async () => {
  const dataCharacters = await fetch(
    "https://rickandmortyapi.com/api/character"
  )
    .then((response) => response.json())
    .then((response) => {
      for (page = 1; page <= response.info.pages; page++) {
        const pageData = fetch(
          "https://rickandmortyapi.com/api/character?page=" + page
        )
          .then((response) => response.json())
          .then((response) => {
            data.characters.total = response.info.count;

            response.results.forEach((result) => {
              result.episode = result.episode.map((episode) =>
                urlParseInt(episode)
              );

              delete result.created;
              delete result.image;
              delete result.url;

              result.location =
                result.location.url != ""
                  ? urlParseInt(result.location.url)
                  : null;
              result.origin =
                result.origin.url != "" ? urlParseInt(result.origin.url) : null;

              data.characters[result.id] = result;
            });
          });
      }
    });

  const dataEpisodes = await fetch("https://rickandmortyapi.com/api/episode")
    .then((response) => response.json())
    .then((response) => {
      for (page = 1; page <= response.info.pages; page++) {
        const pageData = fetch(
          "https://rickandmortyapi.com/api/episode?page=" + page
        )
          .then((response) => response.json())
          .then((response) => {
            data.episodes.total = response.info.count;

            response.results.forEach((result) => {
              result.characters = result.characters.map((character) =>
                urlParseInt(character)
              );

              delete result.created;
              delete result.url;

              data.episodes[result.id] = result;
            });
          });
      }
    });

  const dataLocations = await fetch("https://rickandmortyapi.com/api/location")
    .then((response) => response.json())
    .then((response) => {
      for (page = 1; page <= response.info.pages; page++) {
        const pageData = fetch(
          "https://rickandmortyapi.com/api/location?page=" + page
        )
          .then((response) => response.json())
          .then((response) => {
            data.locations.total = response.info.count;

            response.results.forEach((result) => {
              result.residents = result.residents.map((character) =>
                urlParseInt(character)
              );

              delete result.created;
              delete result.url;

              data.locations[result.id] = result;
            });
          });
      }
    });
};

fetchRickAndMorty().then(() => {
  console.log("terminou");
  console.log("characters: ", data.characters.total);
  console.log("episodes: ", data.episodes.total);
  console.log("locations: ", data.locations.total);
  console.log(data);

  let charactersList = "";

  for (i = 1; i <= data.characters.total; i++) {
    charactersList +=
    `
    <div>
      ${data.characters[i].id}
      ${data.characters[i].name}
    </div>
    `;
  }

  let contentHTML = `
  <h2>Characters (${data.characters.total})</h2>

  <div>
    ${charactersList}
  <div>

  <h2>Episodes (${data.episodes.total})</h2>

  <h2>Locations (${data.locations.total})</h2>

  `;

  document.querySelector("#content").innerHTML = contentHTML;
});

console.log("nao terminou");
