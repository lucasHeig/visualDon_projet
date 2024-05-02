import dataBase from "../data/IMDB.csv";
import { select } from "d3-selection";
import { transition } from "d3-transition";
import { scalePow } from "d3-scale";
import { hierarchy } from "d3-hierarchy";
import {
  createCircle,
  createShowCard,
} from "./timeline";
const width = window.innerWidth;
const height = window.innerHeight;

const showCard = select(".serie-card");

export const generateBubbleGraph = (data) => {
  const radiuScale = d3
    .scalePow()
    .exponent(0.2)
    .domain(d3.extent(data, (d) => parseFloat(d.Rating)))
    .range([0, 100]);

  const bubble = (data) =>
    d3
      .pack()
      .size([width, height]) // size of the graphic
      .padding(2)(
      d3
        .hierarchy({ children: data })
        .sum((d) => parseFloat(radiuScale(d.Rating)))
    );

  const svg = d3
    .select("#bubbleChart")
    .style("width", width)
    .style("height", height);

  const root = bubble(data);

  const node = svg
    .selectAll()
    .data(root.children)
    .enter()
    .append("g")
    .attr("transform", `translate(${width / 2}, ${height / 2})`);

  // Create div elements for circles with background images
  node.each(function (d) {
    const circleWidth = (d.r * 2 - 7.8) * 0.9;
    const circleElement = createCircle(
      circleWidth,
      circleWidth,
      d.data,
      d.y - circleWidth / 2,
      d.x - circleWidth / 2
    );
    svg.node().appendChild(circleElement);

    circleElement.addEventListener("click", () => {
      window.open(d.data.href);
    });
    select(circleElement).transition().duration(5000).style("opacity", 1.0);

    circleElement.addEventListener("mouseover", (e) => {
      createShowCard(d.data, e);
    });
    circleElement.addEventListener("mouseout", () => {
      // select(circleElement).style("width", `${(circleWidth - 7.8) * 0.9}px` ).style("height",  `${(circleWidth - 7.8) * 0.9}px`);
      return showCard.style("visibility", "hidden");
    });
  });
};
