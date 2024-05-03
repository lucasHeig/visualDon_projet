import dataBase from "../data/IMDB.csv";
import { select } from "d3-selection";
import { transition } from "d3-transition";
import { timer } from "d3-timer";
import { createTimeLine, createtimeLineDate } from "./timeline";
import { createCircle } from "./shows";
import { generateBubbleGraph } from "./bubbleGraph";
import { count } from "d3-array";

const currentYear = 2024;

const homeSection = document.querySelector("#home");
const startSection = document.querySelector("#ageInput");
const bubbleGraphSection = document.querySelector("#bubbleGraph");

const graphButton = document.querySelector("#bubblesButton");
const input = document.querySelector(".input");
const timeframeSection = document.querySelector("#timeFrame");

let animationId;
const nbCircles = 250;
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
    timeframeSection.appendChild(createCircle(200, 200, show, 200, x - 200));
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
  generateBubbleGraph(dataBase.slice(0, nbCircles));
  select("#backButton").style("visibility", "visible")
});
select("#backButton").on("click", () => {
  location.reload();

});

const circles = [
  {
    name: "circle1",
    circle: createCircle(200, 200, dataBase[0], 0, 0, false),
    newPosition: [],
  },
  {
    name: "circle2",
    circle: createCircle(180, 180, dataBase[1], 0, 0, false),
    newPosition: [],
  },
  {
    name: "circle3",
    circle: createCircle(150, 150, dataBase[2], 0, 0, false),

    newPosition: [],
  },
  {
    name: "circle4",
    circle: createCircle(100, 100, dataBase[3], 0, 0, false),
    newPosition: [],
  },
  {
    name: "circle5",
    circle: createCircle(80, 80, dataBase[4], 0, 0, false),
    newPosition: [],
  },
  {
    name: "circle6",
    circle: createCircle(50, 50, dataBase[5], 0, 0, false),
    newPosition: [],
  },
  {
    name: "circle7",
    circle: createCircle(120, 120, dataBase[6], 0, 0, false),
    newPosition: [],
  },
];

const windowWidth = window.innerWidth;
const windowHeight = window.innerHeight;

let topPosition = 0;
let leftPosition = 0;

circles.forEach((circle) => {
  const topDiff = windowHeight / 8;
  const leftDiff = windowWidth / 8;
  topPosition += topDiff;
  leftPosition += leftDiff;
circle.newPosition = [leftPosition, topPosition];
  homeSection.appendChild(circle.circle);
  select(circle.circle)
    .style("opacity", 0.0)
    .transition()
    .duration(2000)
    .style("opacity", 0.5)
    .style("top", `${circle.newPosition[1]}px`)
    .style("left", `${circle.newPosition[0]}px`);
});

