const formElement = document.querySelector("#term-form");
const formQueryElement = document.querySelector("#term-form-query");
const songsErrorElement = document.querySelector("#songs-error");
const songsResult = document.querySelector("#songs-result");

function showError(message) {
  songsErrorElement.innerHTML = message;
}

function showSongs(songs) {
  songsResult.innerHTML = "";

  if (songs == null) {
    return;
  }

  const tableElement = document.createElement("table");

  const headerElement = document.createElement("tr");
  const trackNameElement = document.createElement("th");
  const artistNameElement = document.createElement("th");

  trackNameElement.innerHTML = "Track name";
  artistNameElement.innerHTML = "Artist Name";

  headerElement.append(trackNameElement);
  headerElement.append(artistNameElement);

  tableElement.append(headerElement);

  for (let i = 0; i < songs.length; i++) {
    const song = songs[i];
    const rowElement = document.createElement("tr");
    const trackNameElement = document.createElement("td");
    const artistNameElement = document.createElement("td");

    trackNameElement.innerHTML = song.trackName;
    artistNameElement.innerHTML = song.artistName;

    rowElement.append(trackNameElement);
    rowElement.append(artistNameElement);

    tableElement.append(rowElement);
  }
  songsResult.append(tableElement);
}

formElement.addEventListener("submit", function (event) {
  event.preventDefault();

  const value = (formQueryElement.value || "").trim().toLocaleLowerCase();
  if (value === "") {
    showError("Please enter term");
    showSongs(null);

    return;
  }

  document.getElementById("loader").style.display = "block";
  fetch(`https://itunes.apple.com/search?term=${value}&entity=song`)
  //fetch('itunes.json')
    .then((response) => {
      if (response.ok) {
        document.getElementById("loader").style.display = "none";
        return response.json();
      } else {
        throw new Error("Could not find songs");
      }
    })
    .then((json) => {
      showError("");
      showSongs(json.results);
    })
    .catch((error) => {
      document.getElementById("loader").style.display = "none";
      showError(error.message);
      showSongs(null);
    });
});
