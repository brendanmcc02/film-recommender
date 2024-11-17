expectedLetterboxdFileFilmAttributes = ["Date", "Name", "Year", "Letterboxd URI", "Rating"]


def convertLetterboxdFormatToImdbFormat(letterboxdUserFilmData, allFilmData, cachedLetterboxdTitles):
    imdbUserFilmData = []

    # we want to work with latest entries first
    letterboxdUserFilmData = reversed(letterboxdUserFilmData)

    for letterboxdFilm in letterboxdUserFilmData:
        letterboxdTitle = letterboxdFilm["Name"]
        letterboxdYear = int(letterboxdFilm["Year"])
        if (letterboxdTitle in cachedLetterboxdTitles and
                (letterboxdYear == cachedLetterboxdTitles[letterboxdTitle]['letterboxdYear'] or
                 letterboxdYear == cachedLetterboxdTitles[letterboxdTitle]['imdbYear'])):
            imdbFilmId = cachedLetterboxdTitles[letterboxdTitle]['imdbFilmId']
            imdbUserFilmData.append({
                "Const": imdbFilmId,
                # for consistency, use the imdb title instead of the letterboxd one
                "Title": allFilmData[imdbFilmId]['title'],
                "Title Type": "Movie",
                # for consistency, use the imbd year instead of the letterboxd one. sometimes there is a difference
                "Year": allFilmData[imdbFilmId]['year'],
                "Your Rating": round(float(letterboxdFilm['Rating']) * 2.0, 1),
                "Date Rated": letterboxdFilm['Date'],
                "IMDb Rating": allFilmData[imdbFilmId]['imdbRating'],
                "Num Votes": allFilmData[imdbFilmId]['numberOfVotes'],
                "Runtime (mins)": allFilmData[imdbFilmId]['runtime'],
                "Genres": allFilmData[imdbFilmId]['genres']
            })
        else:
            print(f"Film not found {letterboxdTitle}")

    return imdbUserFilmData
