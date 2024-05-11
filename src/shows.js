import { select } from "d3-selection";
import { transition } from "d3-transition";
const showCard = select(".serie-card");
function getTop(eventY){
    if(eventY>window.innerHeight-380){
        showCard.style("top", `${eventY - 300}px`);
    } else{
        showCard.style("top", `${eventY}px`);
    
    }
}
export function createShowCard(show, e) {

  showCard
    .select("img")
    .attr("src", show.ImageSrc)
    .style("borderRadius", "40%");
  showCard.select("h2").text(getTvShowName(show.Name));
  showCard.select(".serie-description").text(show.Description);
  showCard.select(".serie-episode").text(`${getTvShowEpisodes(show.Episodes)[0]} ${getTvShowEpisodes(show.Episodes)[1]} `);
  showCard
    .select(".serie-date")
    .text(`${getShowYear(show.Year)[0]} - ${getShowYear(show.Year)[1]}`);
  showCard.select(".serie-note").text(`${show.Rating}/10 ★`);
  showCard.style("visibility", "visible");
  showCard.style("top", `${getTop(e.pageY)}px`).style("left", `${e.pageX + 10}px`);
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
export function getTvShowEpisodes(epsiodes) {
const tabEpsiodes = epsiodes.split(" ");
if (tabEpsiodes[0] === "1" ) {
  tabEpsiodes[1] = "épisode";
} else { tabEpsiodes[1] = "épisodes";}
return tabEpsiodes;
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
    .style("opacity", "1")
    .style("z-index", "1");
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
