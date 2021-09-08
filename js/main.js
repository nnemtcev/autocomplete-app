const search = document.getElementById("search");
const matchList = document.getElementById("match-list");

const outputHtml = (matches) => {
  if (matches.length > 0) {
    const html = matches
      .map(
        (match) => `
      <div class="card card-body mb-1">
        <h4>${match.name} (${match.abbr}) <span class="text-primary">${match.capital}<span></h4>
        <small>Lat: ${match.lat} / Long: ${match.long}</small>
      </div>
    `
      )
      .join("");

    matchList.innerHTML = html;
  }
};

const searchStates = async (searchText) => {
  const res = await fetch("../data/states.json");
  const states = await res.json();

  let matches = states.filter((state) => {
    const stateName = state.name.toLowerCase();
    const stateAbbreviation = state.abbr.toLowerCase();

    return (
      stateName.startsWith(searchText) ||
      stateAbbreviation.startsWith(searchText)
    );
  });

  if (searchText.length === 0) {
    matches = [];
    matchList.innerHTML = "";
  }

  outputHtml(matches);
};

search.addEventListener("input", () => searchStates(search.value));
