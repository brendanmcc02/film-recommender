# film-rec
Project that analyses a user's IMDb data, and then recommends a movie based on that.

## Initialising the database

1. Download title.basics.tsv & title.ratings.tsv from https://datasets.imdbws.com/ (refreshed daily)
2. update my-film-data.json
3. 1-filter-only-movies.py: filter out non-movies
4. 2-filter-post-1930.py: filter out pre-1930 films
5. 3-filter-over-60-min.py: filter out < 60 min films
6. 4-merge-with-ratings.py: merge with title.ratings.tsv
7. 5-filter-over-10k-votes.py: filter out films with < 10,000 votes
8. 6-change-json-order.py: change the order of the json attributes
9. 7-filter-unrated-films.py: filter out films that I have rated