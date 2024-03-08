# Projet Visualisation des données 🎬🍿
Elodie Perring, Robin Frossard, Lucas Tschaler

## Contexte
Nous avons choisi une base de données qui contient le top 250 des séries télévisées (selon les notes sur IMDB). La base de données provient du site [Kaggle](https://www.kaggle.com/datasets/khushipitroda/imdb-top-250-tv-shows), où elle a été publiée par Khushi Pitroda, avec comme collaborateurs "dima806" et "torikull". Les sources des données proviennent du site [IMDB](https://www.imdb.com/). La base de données est destinée à des fins d’apprentissage, de recherche et d’analyse. Elle a été mise à jour pour la dernière fois en août 2023.

## Description
Les données sont disponibles sous la forme d'un fichier CSV. Elles comprennent des informations sur des séries, telles que leur titre, l'année de début et de fin, le nombre d'épisodes, la classification d'âge, la note, l'image, une description et l'URL de la série sur IMDB. Cette base de données comprend donc 250 séries au total, avec des données quantitatives discrètes et continues.

## But
Dans un premier temps, nous allons proposer à l’utilisateur·rice de rentrer son année de naissance. Une fois rentrée, une timeline s'affiche depuis son année de naissance jusqu'à aujourd'hui avec, à chaque année, la meilleure série. Nous avons aussi voulu représenter le nombre d'épisodes de la série. Pour ce faire, nous utilisons la taille du rond représentant la série. Plus le rond est petit, moins la série a d'épisodes et plus elle en a, plus le rond sera grand. A la fin de la timeline, un bubble chart regroupe toutes les séries qui sont sorties après l'année de naissance de la personne. La taille de la forme représente la note de la série (plus la note est haute, plus la forme sera grande). Trop visualisation de données est sous forme de scrollitelling descriptif avec possibilité d'explorer. En effet, il sera possible de cliquer sur une série (dans la timeline) afin d'afficher plus d'informations (description, catégorie d'âge). Concernant le bubble chart, l'utilisateurs·rices est redirigé·e sur la page IMDB de la série sur laquelle il a cliqué.
 
## Références
Cette base de données peut aussi servir à suivre la tendance des meilleures séries d’années en années ou alimenter un algorithme de recommandation de série pour les utilisateurs·rices.
