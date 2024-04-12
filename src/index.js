import dataBase from "../data/IMDB.csv";
import { select } from "d3-selection";
import { transition } from "d3-transition";

console.log(dataBase);
createCircle(50, 50,dataBase[3].ImageSrc,  150, 250, 200, 350, 500)
createCircle(250, 250,dataBase[4].ImageSrc,  300, 250, 200, 1250, 900)
createCircle(50, 50,dataBase[5].ImageSrc,  800, 150, 100, 950, 900)
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
  const homeSection = document.querySelector("#home");
  const circleElement = document.createElement("div");
  circleElement.classList.add("imageCercle");

  // Appliquez les styles CSS pour créer un cercle
  // circleElement.classList.add("image");
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

  // select(circleElement)
  //   .transition()
  //   .duration(1000)
}
const homeButton = document.querySelector("#getStarted")
const startButton = document.querySelector("#start");
const homeSection =document.querySelector("#home");
const startSection = document.querySelector("#ageInput");
homeButton.addEventListener("click", (e)=>{
  console.log("lfjijsoio");
  homeSection.classList.remove("active");
  startSection.classList.add("active");
})