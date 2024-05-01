import dataBase from "../data/IMDB.csv";
import { select } from "d3-selection";
import { transition } from "d3-transition";
const width = window.innerWidth;
const height = window.innerHeight;
const nbCircles = 250;
const tooltip = select(".tooltip");

const generateChart = (data) => {
  console.log("génération du graphique à bulles");

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
    // console.log("salut");
    const circleElement = document.createElement("div");

    const circleWidth = d.r * 2; // Assuming 'd.r' is the radius of the circle
    const imageSrc = d.data.ImageSrc; // Assuming 'd.data.ImageSrc' is the image source

    circleElement.style.width = `${(circleWidth - 7.8) * 0.9}px`;
    circleElement.style.height = `${(circleWidth - 7.8) * 0.9}px`;
    circleElement.style.borderRadius = "50%";
    circleElement.style.background = `url(${imageSrc})`;
    circleElement.style.backgroundSize = "cover";
    circleElement.style.backgroundPosition = "center";
    circleElement.style.position = `absolute`;
    circleElement.style.left = `${d.x - circleWidth / 2}px`; // Adjust the left position
    circleElement.style.top = `${d.y - circleWidth / 2}px`; // Adjust the top position
    circleElement.style.opacity = "0";


    //   circleElement.style.margin = "10px";
    console.log(circleElement);
    // Append the circleElement to the SVG container
    // Note: This might need adjustment depending on how your SVG container is set up
    svg.node().appendChild(circleElement);
    console.log(d.data.href);

    circleElement.addEventListener("click", () => {
      window.open(d.data.href);
    });
    select(circleElement)
      .transition()
      .duration(5000)
      .style("opacity", 1.0)


    circleElement.addEventListener("mouseover", (e) => {
      tooltip.select("img").attr("src", d.data.ImageSrc);
      tooltip.select("a").attr("href", d.data.href).text(d.data.Name);
      // select(circleElement).style("width", "100px").style("height", "100px");
      tooltip
        .select("span")
        .attr("class", d.data.Description)
        .text(d.data.Description);
      tooltip.style("visibility", "visible");
      tooltip.style("top", `${e.pageY}px`).style("left", `${e.pageX + 10}px`);
    });
    circleElement.addEventListener("mouseout", () => {
      // select(circleElement).style("width", `${(circleWidth - 7.8) * 0.9}px` ).style("height",  `${(circleWidth - 7.8) * 0.9}px`);
      return tooltip.style("visibility", "hidden");
    });
  });


};

generateChart(dataBase.slice(0, nbCircles));
