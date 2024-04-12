import dataBase from "../data/IMDB.csv";
import { select } from "d3-selection";
import { transition } from "d3-transition";

console.log(dataBase);

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
  document.body.appendChild(circleElement);

  select(circleElement)
    .transition()
    .duration(animationDuration)
    .style("opacity", 0)
    .transition()
    .duration(animationDuration)
    .style("opacity", 1.0)
    .style("top", `${topPositionEnd}px`)
    .style("left", `${leftPositionEnd}px`);

  // select(circleElement)
  //   .transition()
  //   .duration(1000)
}
createCircle(50, 50,dataBase[3].ImageSrc,  150, 250, 200, 350, 500)