import dataBase from "../data/IMDB.csv";
import { select } from "d3-selection";
import { transition } from "d3-transition";
import { timer } from "d3-timer";

const currentYear = 2024;
const tooltip = select(".serie-card");
// const startButton = select("#start");
// const homeSection = select("#home");
// const timeFrame = select("#timeFrame");
// const graphButton = select("#bubblesButton");
// const startSection = select("#ageInput");
const homeButton = document.querySelector("#getStarted");
const startButton = document.querySelector("#start");
const homeSection = document.querySelector("#home");
const startSection = document.querySelector("#ageInput");
const lastBlock = document.querySelector("div");

const graphButton = document.querySelector("#bubblesButton");
const input = document.querySelector(".input");
const timeframeSection = document.querySelector("#timeFrame");

let animationId;
createCircle(
  50,
  50,
  dataBase[0].ImageSrc,
  150,
  250,
  200,
  350,
  500,
  getTvShowName(dataBase[0].Name)
);
createCircle(
  250,
  250,
  dataBase[4].ImageSrc,
  300,
  250,
  200,
  1250,
  900,
  getTvShowName(dataBase[4].Name)
);
createCircle(
  50,
  50,
  dataBase[5].ImageSrc,
  800,
  150,
  100,
  950,
  900,
  getTvShowName(dataBase[25].Name)
);
function getTvShowName(nameTvShow) {
  const tabNameId = nameTvShow.split(".");
  return tabNameId[1];
}
function getShowYear(showYear) {
  const tabYear = showYear.split("–");
  if (!tabYear[1]) {
    tabYear.splice(1, 0, "Aujourd'hui");
  }
  return tabYear;
}
function newCircle(circleWidth, cirleHeight, show, topPosition, leftPosition) {
  const circleElement = document.createElement("div");
  const showYear = document.createElement("div");

  // Appliquez les styles CSS pour créer un cercle
  select(circleElement)
    .style("width", `${circleWidth}px`)
    .style("height", `${cirleHeight}px`)
    .style("border-radius", "50%")
    .style("background", `url(${show.ImageSrc})`)
    .style("background-size", "cover")
    .style("background-position", "center")
    .style("position", `absolute`)
    .style("top", `${topPosition}px`)
    .style("left", `${leftPosition}px`)
    .style("opacity", "1");

  select(showYear)
    .text(getShowYear(show.Year)[0])
    .style("font-family", "Bebas Neue")
    .style("color", "white")
    .style("position", "absolute")
    .style("top", `${topPosition + 300}px`)
    .style("left", `${leftPosition + 80}px`)
    .style("font-size", "30px");

  timeframeSection.appendChild(showYear);
  timeframeSection.appendChild(circleElement);

  circleElement.addEventListener("mouseover", (e) => {
    tooltip
      .select("img")
      .attr("src", show.ImageSrc)
      .style("borderRadius", "40%");
    tooltip.select("h2").text(getTvShowName(show.Name));
    tooltip.select("p").text(show.Description).text(show.Description);
    tooltip
      .select(".serie-date")
      .text(`${getShowYear(show.Year)[0]} - ${getShowYear(show.Year)[1]}`);
    tooltip.select(".serie-note").text(`${show.Rating}/10 ★`);
    tooltip.style("visibility", "visible");
    console.log(e.pageX);
    tooltip.style("top", `${e.pageY}px`).style("left", `${e.pageX + 10}px`);
  });
  circleElement.addEventListener("mouseout", () => {
    return tooltip.style("visibility", "hidden");
  });
}
function createCircle(
  circleWidth,
  cirleHeight,
  imageSrc,
  topPositionStart,
  leftPositionStart,
  topPositionEnd,
  leftPositionEnd,
  animationDuration
) {
  const circleElement = document.createElement("div");

  // Appliquez les styles CSS pour créer un cercle
  select(circleElement)
    .style("width", `${circleWidth}px`)
    .style("height", `${cirleHeight}px`)
    .style("border-radius", "50%")
    .style("background", `url(${imageSrc})`)
    .style("background-size", "cover")
    .style("background-position", "center")
    .style("position", `absolute`)
    .style("top", `${topPositionStart}px`)
    .style("left", `${leftPositionStart}px`)
    .style("opacity", "0")
    .transition()
    .duration(animationDuration)
    .style("opacity", 1.0)
    .style("top", `${topPositionEnd}px`)
    .style("left", `${leftPositionEnd}px`);
  // Ajoutez l'élément au corps du document
  homeSection.appendChild(circleElement);
}
const sortShows = (year) => {
  const filteredSeries = dataBase.filter(
    (serie) => parseInt(serie.Year.split("-")[0]) >= year
  );

  // Trier les séries par note en ordre décroissant
  const sortedSeries = filteredSeries.sort((a, b) => b.Rating - a.Rating);

  // Créer un objet pour stocker la meilleure série par année
  const bestSeriesByYear = {};

  // Parcourir les séries triées pour identifier la meilleure de chaque année
  sortedSeries.forEach((serie) => {
    const year = parseInt(serie.Year.split("-")[0]);
    if (
      !bestSeriesByYear[year] ||
      serie.Rating > bestSeriesByYear[year].Rating
    ) {
      bestSeriesByYear[year] = serie;
    }
  });
  // console.log(bestSeriesByYear);
  return bestSeriesByYear;
};
function startAnimation(distance) {
  const start = window.scrollX;
  const end = start + distance;
  const duration = 50000; // Durée de l'animation en millisecondes
  const startTime = performance.now();

  function animateScroll(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const scrollPosition = start + (end - start) * progress;

    window.scrollTo(scrollPosition, 0);

    if (progress < 1) {
      animationId = requestAnimationFrame(animateScroll);
    }
  }

  animationId = requestAnimationFrame(animateScroll);
}
function stopAnimation() {
  if (animationId) {
    cancelAnimationFrame(animationId);
    animationId = null;
  }
}
select("#getStarted").on("click", () => {
  homeSection.classList.remove("active");
  timeFrame.classList.remove("active");
  startSection.classList.add("active");
});

select("#start").on("click", () => {
  const age = input.value;
  const birthYear = currentYear - age;

  homeSection.classList.remove("active");
  timeframeSection.classList.add("active");
  startSection.classList.remove("active");

  const newTab = sortShows(birthYear);
  let x = 0;

  for (const year in newTab) {
    x = x + 400;
    const serie = newTab[year];
    newCircle(200, 200, serie, 200, x - 200);
  }
  select(graphButton).style("left", `${x + 400}px`);
  const timelineElement = document.createElement("div");
  select(timelineElement)
    .style("width", `${x + 100}px`)
    .style("height", "10px")
    .style("background-color", "red")
    .style("position", "absolute")
    .style("top", "450px")
    .style("left", "200px");
  timeframeSection.appendChild(timelineElement);
  const arrow = document.createElement("div");
  select(arrow)
    .style("position", "absolute")
    .style("left", `${x + 300}px`)
    .style("top", "440px")
    .style("width", "20px")
    .style("height", "32px")
    .style("background-color", "red")
    .style("clip-path", "polygon(0 0, 0 100%, 100% 50%)");
  timeframeSection.appendChild(arrow);

  select(lastBlock)
    .style("width", "300px")
    .style("height", "50px")
    .style("background-color", "black")
    .style("position", "absolute")
    .style("left", `${x + 600}px`);
  timeframeSection.appendChild(lastBlock);
select("#stopButton").style("visibility", "hidden");
select("#stopButton").on("click", () => {
  stopAnimation();
  select("#playButton").style("visibility", "visible");
  select("#stopButton").style("visibility", "hidden");
})
select("#playButton").on("click", () => {
  startAnimation(x + 400);
  select("#stopButton").style("visibility", "visible");
  select("#playButton").style("visibility", "hidden");
});

});
