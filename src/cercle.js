// Pour importer les données vous pouvez soit importer directement les csv (@rollup/plugin-dsv), soit utiliser la méthode csv de d3-fetch
import { select } from "d3-selection";
// @rollup/plugin-dsv
import imdb from "../data/IMDB.csv";

// console.log(imdb);

// console.log(imdb[0].Description);
// console.log(imdb[0].Episodes);
// console.log(imdb[0].ImageSrc);
// console.log(imdb[0].href);
// console.log(imdb[0].Type);

// console.log(imdb[0].Name);

// Fonction pour créer un cercle avec une image en arrière-plan
function createCircleWithBackgroundImage(svg, cx, cy, radius, imageUrl) {
    // Créer un motif pour l'image
    svg.append("defs")
        .append("pattern")
        .attr("id", "image-pattern")
        .attr("patternUnits", "userSpaceOnUse")
        .attr("width", radius*2)
        .attr("height", radius*2 )
        .append("image")
        .attr("xlink:href", imageUrl)
        .attr("width", radius * 2)
        .attr("height", radius * 2);

    // Ajouter le cercle avec le motif d'image en arrière-plan
    svg.append("circle")
    .attr("opacity", "50%")
        .attr("cx", cx)
        .attr("cy", cy)
        .attr("r", radius)
        .style("fill", "url(#image-pattern)");
}

// Créer un élément SVG avec D3.js
const svg = select("body")
    .append("svg")
    .attr("width", 400)
    .attr("height", 400);

// Utilisation de la fonction pour créer un cercle avec une image en arrière-plan
createCircleWithBackgroundImage(svg, 200, 200, 50, imdb[0].ImageSrc);

