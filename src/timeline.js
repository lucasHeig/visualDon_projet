import { select } from "d3-selection";
import { transition } from "d3-transition";
const timeframeSection = document.querySelector("#timeFrame");
const showCard = select(".serie-card");
const lastBlock = document.querySelector("div");
export function createShowCard(show, e) {
  showCard.select("img").attr("src", show.ImageSrc).style("borderRadius", "40%");
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
  leftPosition
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
  circleElement.addEventListener("mouseover", (e) => {
    createShowCard(show, e);
  });
  circleElement.addEventListener("mouseout", () => {
    showCard.style("visibility", "hidden");
  });
  return circleElement;

}

export function createtimeLineDate(show, topPosition, leftPosition) {
  const showYear = document.createElement("div");
  select(showYear)
    .text(getShowYear(show.Year)[0])
    .style("font-family", "Bebas Neue")
    .style("color", "white")
    .style("position", "absolute")
    .style("top", `${topPosition + 300}px`)
    .style("left", `${leftPosition + 80}px`)
    .style("font-size", "30px");

  timeframeSection.appendChild(showYear);
}
export function createTimeLine(timeLineWidth) {
  const timelineElement = document.createElement("div");
  select(timelineElement)
    .style("width", `${timeLineWidth + 100}px`)
    .style("height", "10px")
    .style("background-color", "red")
    .style("position", "absolute")
    .style("top", "450px")
    .style("left", "200px");
  timeframeSection.appendChild(timelineElement);
  const arrow = document.createElement("div");
  select(arrow)
    .style("position", "absolute")
    .style("left", `${timeLineWidth + 300}px`)
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
    .style("left", `${timeLineWidth + 600}px`);
  timeframeSection.appendChild(lastBlock);
}
