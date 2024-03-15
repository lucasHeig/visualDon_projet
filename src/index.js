// Pour importer les données vous pouvez soit importer directement les csv (@rollup/plugin-dsv), soit utiliser la méthode csv de d3-fetch

// @rollup/plugin-dsv
import imdb from "../data/IMDB.csv";

console.log(imdb);

console.log(imdb[0].Description);
console.log(imdb[0].Episodes);
console.log(imdb[0].ImageSrc);
console.log(imdb[0].href);
console.log(imdb[0].Type);
console.log(imdb[0].Year);
console.log(imdb[0]['"Name"']);
