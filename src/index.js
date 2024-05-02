import dataBase from "../data/IMDB.csv";
import { select } from "d3-selection";
import { transition } from "d3-transition";
import { timer } from "d3-timer";
import { createCircle, createTimeLine, createtimeLineDate } from "./timeline";
import { generateBubbleGraph } from "./bubbleGraph";

const currentYear = 2024;

const homeSection = document.querySelector("#home");
const startSection = document.querySelector("#ageInput");
const bubbleGraphSection = document.querySelector("#bubbleGraph");

const graphButton = document.querySelector("#bubblesButton");
const input = document.querySelector(".input");
const timeframeSection = document.querySelector("#timeFrame");

let animationId;
// createCircle(
//   50,
//   50,
//   dataBase[0].ImageSrc,
//   150,
//   250,
//   200,
//   350,
//   500,
//   getTvShowName(dataBase[0].Name)
// );
// createCircle(
//   250,
//   250,
//   dataBase[4].ImageSrc,
//   300,
//   250,
//   200,
//   1250,
//   900,
//   getTvShowName(dataBase[4].Name)
// );
// createCircle(
//   50,
//   50,
//   dataBase[5].ImageSrc,
//   800,
//   150,
//   100,
//   950,
//   900,
//   getTvShowName(dataBase[25].Name)
// );

// function createCircle(
//   circleWidth,
//   cirleHeight,
//   imageSrc,
//   topPositionStart,
//   leftPositionStart,
//   topPositionEnd,
//   leftPositionEnd,
//   animationDuration
// ) {
//   const circleElement = document.createElement("div");

//   // Appliquez les styles CSS pour créer un cercle
//   select(circleElement)
//     .style("width", `${circleWidth}px`)
//     .style("height", `${cirleHeight}px`)
//     .style("border-radius", "50%")
//     .style("background", `url(${imageSrc})`)
//     .style("background-size", "cover")
//     .style("background-position", "center")
//     .style("position", `absolute`)
//     .style("top", `${topPositionStart}px`)
//     .style("left", `${leftPositionStart}px`)
//     .style("opacity", "0")
//     .transition()
//     .duration(animationDuration)
//     .style("opacity", 1.0)
//     .style("top", `${topPositionEnd}px`)
//     .style("left", `${leftPositionEnd}px`);
//   // Ajoutez l'élément au corps du document
//   homeSection.appendChild(circleElement);
// }
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
function startScroll(distance) {
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
function stopScroll() {
  if (animationId) {
    cancelAnimationFrame(animationId);
    animationId = null;
  }
}
select("#getStarted").on("click", () => {
  homeSection.classList.remove("active");
  timeframeSection.classList.remove("active");
  startSection.classList.add("active");
  bubbleGraphSection.classList.remove("active");
});

select("#start").on("click", () => {
  const age = input.value;
  const birthYear = currentYear - age;
  bubbleGraphSection.classList.remove("active");
  homeSection.classList.remove("active");
  timeframeSection.classList.add("active");
  startSection.classList.remove("active");

  const newTab = sortShows(birthYear);
  let x = 0;

  for (const year in newTab) {
    x = x + 400;
    const show = newTab[year];
   ;
    timeframeSection.appendChild( createCircle(200, 200, show, 200, x - 200));
    createtimeLineDate(show, 200, x - 200);
  }
  select(graphButton).style("left", `${x + 400}px`);
  createTimeLine(x);

  startScroll(x + 400);

  select("#playButton").style("visibility", "hidden");
  select("#stopButton").on("click", () => {
    stopScroll();
    select("#playButton").style("visibility", "visible");
    select("#stopButton").style("visibility", "hidden");
  });
  select("#playButton").on("click", () => {
    startScroll(x + 400);
    select("#stopButton").style("visibility", "visible");
    select("#playButton").style("visibility", "hidden");
  });
});
select("#bubblesButton").on("click", () => {
  timeframeSection.classList.remove("active");
  bubbleGraphSection.classList.add("active");
  const nbCircles = 250;
  generateBubbleGraph(dataBase.slice(0, nbCircles));
});
