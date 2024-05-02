import { select } from "d3-selection";
import { transition } from "d3-transition";
const showCard = select(".serie-card");

export function createShowCard(show, e) {
  showCard
    .select("img")
    .attr("src", show.ImageSrc)
    .style("borderRadius", "40%");
  showCard.select("h2").text(getTvShowName(show.Name));
  showCard.select("p").text(show.Description).text(show.Description);
  showCard
    .select(".serie-date")
    .text(`${getShowYear(show.Year)[0]} - ${getShowYear(show.Year)[1]}`);
  showCard.select(".serie-note").text(`${show.Rating}/10 ★`);
  showCard.style("visibility", "visible");
  showCard.style("top", `${e.pageY}px`).style("left", `${e.pageX + 10}px`);
}
export function getShowYear(showYear) {
  const tabYear = showYear.split("–");
  if (!tabYear[1]) {
    tabYear.splice(1, 0, "Aujourd'hui");
  }
  return tabYear;
}
export function getTvShowName(nameTvShow) {
  const tabNameId = nameTvShow.split(".");
  return tabNameId[1];
}
export function createCircle(
  circleWidth,
  cirleHeight,
  show,
  topPosition,
  leftPosition, card = true
) {
  const circleElement = document.createElement("div");

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
if (card) {
    circleElement.addEventListener("mouseover", (e) => {
        createShowCard(show, e);
      });
      circleElement.addEventListener("mouseout", () => {
        showCard.style("visibility", "hidden");
      });
}
  
  return circleElement;
}
