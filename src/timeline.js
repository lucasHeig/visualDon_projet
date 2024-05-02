import { getShowYear, getTvShowName } from "./shows";
import { select } from "d3-selection";
import { transition } from "d3-transition";
const timeframeSection = document.querySelector("#timeFrame");
const lastBlock = document.querySelector("div");
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
