import dataBase from "../data/IMDB.csv";
import { select } from "d3-selection";
import { transition } from "d3-transition";
import { timer } from "d3-timer";
import { createTimeLine, createtimeLineDate } from "./timeline";
import { createCircle } from "./shows";
import { generateBubbleGraph } from "./bubbleGraph";
import { count } from "d3-array";

const windowWidth = window.innerWidth;
const windowHeight = window.innerHeight;
const currentYear = 2024;

const homeSection = document.querySelector("#home");
const startSection = document.querySelector("#ageInput");
const bubbleGraphSection = document.querySelector("#bubbleGraph");
const animationSection = document.querySelector("#animationIntroduction");

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
function getCenterPosition(element) {
  element.style("bottom", `50px`).style("left", `680px`);
}
function startScroll(distance, start = window.scrollX, speed = 1) {
  // const start = window.scrollX;
  const end = distance;
  const duration = (distance * 15000) / windowWidth / speed; // Durée de l'animation en millisecondes
  const startTime = performance.now();
  function animateScroll(currentTime) {
    const elapsed = currentTime - startTime;

    const progress = Math.min(elapsed / duration, 1);
    const scrollPosition = start + (end - start) * progress;

    window.scrollTo(scrollPosition, 0);

    if (progress < 1) {
      animationId = requestAnimationFrame(animateScroll);
    } else {
      select("#replayButton").style("visibility", "visible");
      getCenterPosition(select("#replayButton"));
      select("#stopButton").style("visibility", "hidden");
      select("#playButton").style("visibility", "hidden");
      select("#speedButton")
        .style("visibility", "hidden")
        .style("background-color", "red");
      select("#renderEnd").style("visibility", "hidden");
    }
  }

  animationId = requestAnimationFrame(animateScroll);
}
function stopScroll() {
  if (animationId) {
    cancelAnimationFrame(animationId);
    animationId = null;
    select("#stopButton").style("visibility", "hidden");
    select("#playButton").style("visibility", "visible");
  }
}
select("#backButton").style("visibility", "hidden");
select("#getStarted").on("click", () => {
  select("#backButton").style("visibility", "visible");
  console.log("click");
  homeSection.classList.remove("active");
  timeframeSection.classList.remove("active");
  startSection.classList.add("active");
  bubbleGraphSection.classList.remove("active");
  circles.forEach((circle) => {
    const [x, y] = circle.newPosition;
    select(circle.circle)
      .transition()
      .duration(1000)
      .style("top", `${y * 1.2}px`)
      .style("left", `${x * 3}px`)
      .style("opacity", 0.5)
      .on("end", () => {
        // circle.circle.remove();
        homeSection.classList.remove("active");
        timeframeSection.classList.remove("active");
        startSection.classList.add("active");
        bubbleGraphSection.classList.remove("active");
      });
  });
});

select("#start").on("click", () => {
  const age = input.value;

  if (age<1 || age>100 || isNaN(age)) {
    console.log("Please enter a valid age");
select(".error-message").text("veuillez entrer un âge valide, entre 1 et 100 ans. Merci!");
  } else {
    circles.forEach((circle) => {
      select(circle.circle).transition().duration(3000).style("opacity", 0);
    });
    console.log(input.value);
  
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
      const circle = createCircle(200, 200, show, 200, x - 200);
      circle.style.opacity = 0;
      select(circle)
        .transition()
        .duration(x + 1000)
        .style("opacity", 1);
      timeframeSection.appendChild(circle);
      createtimeLineDate(show, 200, x - 200, x);
      // select(timeframeSection).transition().duration(1500).style("opacity", 1);
    }
    select(graphButton).style("left", `${x + 400}px`);
    createTimeLine(x);
      
  let isToggle; 
  if (age > 2) {
    startScroll(x - 700);
    select("#playButton").style("visibility", "hidden");
    select("#replayButton").style("visibility", "hidden");
    select("#stopButton").style("visibility", "visible");
    select("#speedButton").style("visibility", "visible");
    select("#renderEnd").style("visibility", "visible");
    isToggle = false;
  } else {
    select("#renderEnd").style("visibility", "hidden");
    select("#playButton").style("visibility", "hidden");
    select("#replayButton").style("visibility", "hidden");
    select("#stopButton").style("visibility", "hidden");
    select("#speedButton").style("visibility", "hidden");
  }

  select("#stopButton").on("click", () => {
    stopScroll();
    isToggle = false;
    select("#speedButton").style("visibility", "hidden");
    // select("#playButton").style("visibility", "visible");
    // select("#stopButton").style("visibility", "hidden");
  });
  select("#playButton").on("click", () => {
    startScroll(x - 700);
    isToggle = false;

    select("#stopButton").style("visibility", "visible");
    select("#playButton").style("visibility", "hidden");
    select("#speedButton")
      .style("visibility", "visible")
      .style("background-color", "red");
  });
  select("#replayButton").on("click", () => {
    startScroll(x - 700, 0);
    select("#replayButton").style("visibility", "hidden");
    select("#stopButton").style("visibility", "visible");
    select("#renderEnd").style("visibility", "visible");
    select("#playButton").style("visibility", "hidden");
    select("#speedButton").style("visibility", "visible");
    select("#speedButton").style("background-color", "red");
    isToggle = false;
  });

  select("#speedButton").on("click", () => {
    stopScroll();
    select("#playButton").style("visibility", "hidden");
    select("#stopButton").style("visibility", "visible");


    if (isToggle) {
      select("#speedButton").style("background-color", "red");
      startScroll(x - 700);
      isToggle = false;
    } else {
      select("#speedButton").style("background-color", "blue");
      startScroll(x - 700, undefined, 4);
      isToggle = true;
    }
  });
  select("#renderEnd").on("click", () => {
    stopScroll();
    window.scrollTo(x - 700, 0);
    select("#speedButton").style("visibility", "hidden");
    select("#playButton").style("visibility", "hidden");
    select("#stopButton").style("visibility", "hidden");
    select("#replayButton").style("visibility", "visible");
    select("#renderEnd").style("visibility", "hidden");
  });
  }

});

select("#bubblesButton").on("click", () => {
  stopScroll();
  window.scrollTo(0, 0);
  animationSection.classList.remove("active");
  timeframeSection.classList.remove("active");
  bubbleGraphSection.classList.add("active");
  generateBubbleGraph(dataBase.slice(0, nbCircles));
  select("#backButton").style("visibility", "visible");
});
select("#backButton").on("click", () => {
  location.reload();
});

// --- animation cercles ---
function getRandomInt(max, min = 0) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const circles = [];
dataBase.slice(0, 100).forEach((data, index) => {
  const taille = getRandomInt(90, 20);
  const circle = createCircle(
    taille,
    taille,
    data,
    getRandomInt(innerWidth, 10),
    getRandomInt(innerHeight, 10),
    false
  );
  const newCircle = {
    name: `circle${index + 1}`,
    circle: circle,
    newPosition: [],
  };
  circles.push(newCircle);
});

circles.forEach((circle) => {
  animationSection.appendChild(circle.circle);
  const x = getRandomInt(windowWidth - 1 * 2, 5);
  const y = getRandomInt(windowHeight - 5 * 2, 5);
  circle.newPosition = [x, y];
});

function animateCircles() {
  circles.forEach((circle) => {
    const [x, y] = circle.newPosition;
    select(circle.circle)
      .style("opacity", 0.0)
      .transition()
      .duration(2000)
      .style("opacity", 0.5)
      .style("top", `${y}px`)
      .style("left", `${x}px`);
  });
}

animateCircles();
