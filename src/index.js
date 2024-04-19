import dataBase from "../data/IMDB.csv";
import { select } from "d3-selection";
import { transition } from "d3-transition";

console.log(dataBase);
console.log(dataBase[0].Name);
console.log(dataBase[0].Name[0]);

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

  return tabNameId[0];
}
function getTvShowName(nameTvShow) {
  const tabNameId = nameTvShow.split(".");
  return tabNameId[1];
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

  // select(circleElement)
  //   .transition()
  //   .duration(1000)
}
const homeButton = document.querySelector("#getStarted");
const startButton = document.querySelector("#start");
const homeSection = document.querySelector("#home");
const startSection = document.querySelector("#ageInput");
homeButton.addEventListener("click", (e) => {
  console.log("lfjijsoio");
  homeSection.classList.remove("active");
  startSection.classList.add("active");
});
// const cercles = document.querySelectorAll(".cercle");
// cercles.forEach((cercle) => {
//   cercle.addEventListener("mouseover", (e) => {
//     console.log(e.target);
//     for (const tvshow of dataBase) {
//       if (getTvShowName(tvshow.Name) == e.target.id) {
//         console.log(getTvShowName(tvshow.Name));
//         // const tvShowHover = document.createElement("div");
//         // tvShowHover.style.width = `100px`;
//         // tvShowHover.style.height = `100px`;
//         // tvShowHover.style.backgroundColor="red";
//       }
//     }
//   });
// });
