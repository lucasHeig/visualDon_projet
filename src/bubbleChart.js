import dataBase from "../data/IMDB.csv";
import { select } from "d3-selection";
// const dataBase = 'data.json';
const width = window.innerWidth;
const height = window.innerHeight;
// définir le nombre de cercles à afficher
const nbCircles = 50;
// const colors = {
//     html: '#F16529',
//     css: '#1C88C7',
//     js: '#FCC700'
// };
console.log(dataBase);

const generateChart = data => {
    console.log("génération du graphique à bulles");

    const bubble = data => d3.pack()
        .size([width, height]) // taille du graphique
        .padding(2)(d3.hierarchy({ children: data })
        .sum(d => d.Rating))
        // padding -> espace entre les cercles 
        // hierarchy -> crée une hiérarchie de données à partir de la liste des enfants
        // sum -> calcule la valeur de chaque nœud (mettre de + pour rond plus grand)

    const svg = d3.select('#bubble-chart')
        .style('width', width)
        .style('height', height);
    
    const root = bubble(data);
    const tooltip = d3.select('.tooltip');

    const node = svg.selectAll()
        .data(root.children)
        .enter().append('g')
        .attr('transform', `translate(${width / 2}, ${height / 2})`);
    
    const circle = node.append('circle')
        .style('fill', 'black') // ici qu'on gère la couleur des cercles
        //.attr("r", d => d.Rating)
        
    
    const image = node.append("svg:image")                  
        //taille image
        .attr('width', d => d.r * 2)
        .attr('height', d => d.r * 2)
        .attr("xlink:href", d => d.data.ImageSrc)
        .attr("x", d => -d.r)
        .attr("y", d => -d.r)
        // gestion des événements (mouseover, mousemove, mouseout, click)
        .on('mouseover', function (e, d) {
            tooltip.select('img').attr('src', d.data.ImageSrc);
            tooltip.select('a').attr('href', d.data.href).text(d.data.Name);
            tooltip.select('span').attr('class', d.data.Description).text(d.data.Description);
            tooltip.style('visibility', 'visible');

            d3.select(this).style('stroke', 'black'); // couleur du contour du cercle au survol
        })
        .on('mousemove', e => tooltip.style('top', `${e.pageY}px`)
                                     .style('left', `${e.pageX + 10}px`))
        .on('mouseout', function () {
            d3.select(this).style('stroke', 'none');
            return tooltip.style('visibility', 'hidden');
        })
        .on('click', (e, d) => window.open(d.data.href));

    // garde que nombres dans string
    // function keepNumber(aString){
    //     return aString.slice(1).aString.replace(/[^\d]/g, '');
    // }
    
    // label des cercles (que pour les x premiers)
    const label = node.append('text')
        .attr('dy', 2)
        .text((d, i) => i < 0 ? d.data.Name : '');

    node.transition()
        .ease(d3.easeExpInOut)
        .duration(1000)
        .attr('transform', d => `translate(${d.x}, ${d.y})`);
    
    circle.transition()
        .ease(d3.easeExpInOut)
        .duration(1000)
        .attr('r', d => d.r);
    
    label.transition()
        .delay(700)
        .ease(d3.easeExpInOut)
        .duration(1000)
        .style('opacity', 1)
};

generateChart(dataBase.slice(0, nbCircles));