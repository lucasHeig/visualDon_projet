import dataBase from "../data/IMDB.csv";
import { select } from "d3-selection";
import { transition } from "d3-transition";
import {timer} from "d3-timer";
const tooltip = select(".serie-card");
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
function getTvShowId(nameTvShow) {
  const tabNameId = nameTvShow.split(".");

  return tabNameId[1];
}
function getTvShowName(nameTvShow) {
  const tabNameId = nameTvShow.split(".");
  return tabNameId[1];
}
function getShowYear(showYear) {
  const tabYear = showYear.split("–");
  if (!tabYear[1]) {
    tabYear.splice(1, 0,"Aujourd'hui")
  } 
  return tabYear;
}
function newCircle(circleWidth, cirleHeight, show, topPosition, leftPosition) {
  const homeSection = document.querySelector("#timeFrame");
  const circleElement = document.createElement("div");
  const showYear = document.createElement("div");
  const timelineElement = document.createElement("div");
  // Appliquez les styles CSS pour créer un cercle
  circleElement.style.width = `${circleWidth}px`;
  circleElement.style.height = `${cirleHeight}px`;
  circleElement.style.borderRadius = "50%";
  circleElement.style.background = `url(${show.ImageSrc})`;
  circleElement.style.backgroundSize = "cover"; // Ajuste la taille de l'image pour couvrir tout le cercle
  circleElement.style.backgroundPosition = "center"; // Centre l'image horizontalement et verticalement
  circleElement.style.position = `absolute`;
  circleElement.style.top = `${topPosition}px`;
  circleElement.style.left = `${leftPosition}px`;
  circleElement.style.opacity = "1";

  showYear.textContent = getShowYear(show.Year)[0];
  showYear.style.fontFamily = "Bebas Neue";
  showYear.style.color = "white";
  showYear.style.position = "absolute";
  showYear.style.top = `${topPosition + 300}px`;
  showYear.style.left = `${leftPosition + 80}px`;
  showYear.style.fontSize = "30px";
  homeSection.appendChild(showYear);
  homeSection.appendChild(circleElement);

  circleElement.addEventListener("mouseover", (e) => {
    // stopAnimation();
    tooltip.select("img").attr("src", show.ImageSrc).style("borderRadius", "40%");
    tooltip.select("h2").text(getTvShowName(show.Name));
    tooltip
      .select("p").text(show.Description)
      .text(show.Description);
    tooltip.select(".serie-date").text(`${getShowYear(show.Year)[0]} - ${getShowYear(show.Year)[1]}`);
    tooltip.select(".serie-note").text(`${show.Rating}/10 ★`)
    tooltip.style("visibility", "visible");
    console.log(e.pageX);
    tooltip.style("top", `${e.pageY}px`).style("left", `${e.pageX + 10}px`);
  });
  circleElement.addEventListener("mouseout", () => {
    // deplacerFenetre()
    
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
  animationDuration,
  id
) {
  const homeSection = document.querySelector("#home");
  const circleElement = document.createElement("div");

  circleElement.classList.add("cercle");
  circleElement.id = id;

  // Appliquez les styles CSS pour créer un cercle

  circleElement.style.width = `${circleWidth}px`;
  circleElement.style.height = `${cirleHeight}px`;
  circleElement.style.borderRadius = "50%";
  circleElement.style.background = `url(${imageSrc})`;
  circleElement.style.backgroundSize = "cover"; // Ajuste la taille de l'image pour couvrir tout le cercle
  circleElement.style.backgroundPosition = "center"; // Centre l'image horizontalement et verticalement
  circleElement.style.position = `absolute`;
  circleElement.style.top = `${topPositionStart}px`;
  circleElement.style.left = `${leftPositionStart}px`;
  circleElement.style.opacity = "0";

  // Ajoutez l'élément au corps du document
  homeSection.appendChild(circleElement);

  select(circleElement)
    .transition()
    .duration(animationDuration)
    .style("opacity", 1.0)
    .style("top", `${topPositionEnd}px`)
    .style("left", `${leftPositionEnd}px`);
  circleElement.addEventListener("click", () => {
    select(circleElement)
      .transition()
      .duration(500) // Durée de l'animation
      .style("borderRadius", "0") // Supprimer le borderRadius pour rendre l'élément rectangulaire
      .style("background", "red")

      .style("width", `100px`) // Ajuster la largeur pour un rectangle
      .style("height", `100px`);
  });
}
const homeButton = document.querySelector("#getStarted");
const startButton = document.querySelector("#start");
const homeSection = document.querySelector("#home");
const startSection = document.querySelector("#ageInput");
const timeFrame = document.querySelector("#timeFrame");
const graphButton = document.querySelector("#bubblesButton");
const currentYear = 2024;
homeButton.addEventListener("click", (e) => {
  homeSection.classList.remove("active");
  timeFrame.classList.remove("active");
  startSection.classList.add("active");
});

const input = document.querySelector(".input");
startButton.addEventListener("click", (e) => {
  const age = input.value;
  const birthYear = currentYear - age;
  console.log(birthYear);
  homeSection.classList.remove("active");
  timeFrame.classList.add("active");
  startSection.classList.remove("active");
  console.log(dataBase);
  const newTab = sortShows(birthYear);
  var x = 0;
  for (const year in newTab) {
    x = x + 400;

    const serie = newTab[year];

    newCircle(200, 200, serie, 200, x - 200);
  }
  graphButton.style.border = "none";
  graphButton.style.borderRadius = "40px";
  graphButton.style.padding = "20px";
  graphButton.style.marginRight = "200px"
  graphButton.style.color = "white";
  graphButton.style.top = "280px"; // Ajustez cette valeur selon vos besoins
  graphButton.style.left = `${x + 400}px`; // Positionnez le bouton après les cercles
  graphButton.style.position = "absolute";
  graphButton.style.fontSize = "20px";
  const timeframeSection = document.querySelector("#timeFrame");
  const timelineElement = document.createElement("div");
  console.log(x);
  timelineElement.style.width = `${x + 100}px`;
  timelineElement.style.height = `10px`;
  timelineElement.style.backgroundColor = "red";
  timelineElement.style.position = "absolute";
  timelineElement.style.top = `${450}px`;
  timelineElement.style.left = `${200}px`;
  const arrow = document.createElement("div");
  arrow.style.position = "absolute";
  arrow.style.left = `${x + 300}px`;
  arrow.style.top = "440px";
  arrow.style.width = "20px";
  arrow.style.height = "32px";
  arrow.style.backgroundColor = "red";
  arrow.style.clipPath = "polygon(0 0, 0 100%, 100% 50%)";
  timeframeSection.appendChild(arrow);
  timeframeSection.appendChild(timelineElement);

  const lastBlock = document.querySelector("div");
  lastBlock.style.width = "300px"
  lastBlock.style.height="50px"
  lastBlock.style.backgroundColor="black"
  lastBlock.style.position ="absolute"
  lastBlock.style.left = `${x+600}px`;
  timeframeSection.appendChild(lastBlock)

  // });
  const distance = x+400;
  let animationId; // Variable pour stocker l'ID de l'animation

function deplacerFenetre() {
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
 document.getElementById('stopButton').style.visibility =  "hidden";
 document.getElementById('stopButton').addEventListener('click', function(){
  stopAnimation();
  document.getElementById('stopButton').style.visibility =  "hidden";
  document.getElementById('playButton').style.visibility =  "visible";
 });
 document.getElementById('playButton').addEventListener('click', function() {
  
  // Démarrer le défilement
  deplacerFenetre();
  document.getElementById('stopButton').style.visibility =  "visible";
  document.getElementById('playButton').style.visibility =  "hidden";
 });
});

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
