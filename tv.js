const form = document.querySelector("#form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const q = form.elements.query.value;
  const data = await axios.get(`https://api.tvmaze.com/search/shows?q=${q}`);

  displayImgs(data.data);
  form.elements.query.value = "";
});
const displayImgs = (show) => {
  const addme = document.getElementById("addme");
  addme.innerHTML = "";
  // Create a row div to contain the cards
  const row = document.createElement("div");
  row.className = "row justify-content-around";

  for (let res of show) {
    if (res.show.image && res.show.summary) {
      // Create elements for the card
      let ig = document.createElement("img");
      let div = document.createElement("div");
      let div1 = document.createElement("div");
      let para = document.createElement("p");

      // Set class names
      div.className = "col-md-3 mb-3"; // Use Bootstrap grid system for 3 columns
      div.className += " card"; // Add card class
      div1.className = "card-body d-flex flex-column justify-content-between"; // Flex styles
      para.className = "card-text";

      // Set content
      ig.src = res.show.image.medium;
      para.innerHTML = res.show.summary;

      // Append elements to the card

      div.appendChild(ig);
      div1.appendChild(para);
      div.appendChild(div1);

      // Append the card to the row
      row.appendChild(div);
    }
  }

  // Append the row to the container
  addme.appendChild(row);
};
