import { select } from "d3-selection";
import { transition } from "d3-transition";
import { scalePow } from "d3-scale";
import { hierarchy } from "d3-hierarchy";
import { createCircle } from "./shows";
const width = window.innerWidth;
const height = window.innerHeight;
let timer = 0;

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

  const svg = select("#bubbleChart")
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
    timer += 100; // Increment timer for each circle
    const circleElement = createCircle(
      circleWidth,
      circleWidth,
      d.data,
      -100,
      -100
    );
    console.log(d.y - circleWidth / 2, d.x - circleWidth / 2);
    select(circleElement).style("opacity", 1);
    svg.node().appendChild(circleElement);

    setTimeout(() => {
      select(circleElement)
        .transition()
        .style("left", `${d.x - circleWidth / 2}px`)
        .style("top", `${d.y - circleWidth / 2}px`);
    }, timer);

    circleElement.addEventListener("click", () => {
      window.open(d.data.href);
    });
  });
};
