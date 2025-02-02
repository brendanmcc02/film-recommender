import './App.css';
import React, { useState, useEffect } from 'react';
import { IoIosStarOutline } from "react-icons/io";
import { FaRegThumbsUp, FaRegThumbsDown } from "react-icons/fa";

const App = () => {
    const [rowsOfRecommendations, setRowsOfRecommendations] = useState([]);
    const [rowsOfRecommendationButtonVisibility, setRowsOfRecommendationButtonVisibility] = useState([]);

    useEffect(() => {
        fetch('/initRowsOfRecommendations')
            .then((response) => response.json())
            .then((jsonData) => {
                setRowsOfRecommendations(jsonData);
                const initialButtonVisibility = jsonData.map((row) => 
                    row.recommendedFilms.map((film) => ({ 
                        filmID: film.id, 
                        isFilmButtonVisible: true
                    }))
                );
    
                setRowsOfRecommendationButtonVisibility(initialButtonVisibility);
            })
            .catch((error) => {
                console.error('Error fetching database:', error);
            });
    }, []); // Empty dependency array ensures this effect runs once on component mount

    function isFilmButtonVisible(filmID) {
        for (const row of rowsOfRecommendationButtonVisibility) {
          for (const film of row) {
            if (film.filmID === filmID) {
              return film.isFilmButtonVisible;
            }
          }
        }

        return false;
    }

    function setFilmButtonInvisible(filmID) {
        setRowsOfRecommendationButtonVisibility((previousVisibility) => 
            previousVisibility.map((row) => 
                row.map((film) => 
                    film.filmID === filmID ? { ...film, isFilmButtonVisible: false } : film
                )
            )
        );
      }

    async function handleUpButton(filmId) {
        await reviewRecommendation(filmId, true);
        setFilmButtonInvisible(filmId);
    }

    async function handleDownButton(filmId) {
        await reviewRecommendation(filmId, false);
        setFilmButtonInvisible(filmId);
    }

    async function reviewRecommendation(filmId, isThumbsUp) {
        try {
            const fetchUrl = "/reviewRecommendation?filmId=" + filmId.toString() + "&isThumbsUp=" + isThumbsUp
            const response = await fetch(fetchUrl);

            if (!response.ok) {
                console.log('reviewRecommendation response not ok. filmID: ' + filmId);
            } else {
                console.log(await response.text());
            }
        } catch (error) {
            console.log('error with reviewRecommendation. filmID: ' + filmId);
        }
    }

    function hasUserReviewedAnyRecommendations() {
        for (const row of rowsOfRecommendationButtonVisibility) {
            for (const film of row) {
              if (film.isFilmButtonVisible === false) {
                return true;
              }
            }
          }
  
          return false;
    }

    async function handleRegenerateRecommendationsButton() {
        if (hasUserReviewedAnyRecommendations()) {
            const response = await fetch('/regenerateRecommendations');
            const jsonData = await response.json();
            setRowsOfRecommendations(jsonData);
            const initialButtonVisibility = jsonData.map((row) => 
                row.recommendedFilms.map((film) => ({ 
                    filmID: film.id, 
                    isFilmButtonVisible: true
                }))
            );

            setRowsOfRecommendationButtonVisibility(initialButtonVisibility);
            console.log("Regenerated film recommendations.")
        } else {
            console.log("No film recommendations were reviewed by the user, so films were not regenerated.");
        }
    }

    function getFilms(recommendedFilms) {
        return recommendedFilms.map((film, i) => (
            <div className="recommendedFilm" key={i}>
                <img src={`${film.mainPoster}`} alt={film.title} className="mainPosterImg" />
                <div className='film-details'>
                    <div className='film-title-and-year'>
                        <h2 className='film-title'>{film.title}&nbsp;</h2>
                        <h2 className='film-year'>({film.year})</h2>
                    </div>
                    <div className='film-rating-runtime'>
                        <h3><IoIosStarOutline className='star' /></h3>
                        <h3 className='film-rating-runtime-text'>{film.imdbRating} |&nbsp;</h3>
                        <h3 className='film-rating-runtime-text'>{film.runtimeHoursMinutes}</h3>
                    </div>
                    <p className='film-summary'>
                        {film.summary}
                    </p>

                    {isFilmButtonVisible(film.id) && 
                        <div className="buttons">
                            <button className="up-button" onClick={() => handleUpButton(film.id)}>
                                <FaRegThumbsUp />
                            </button>
                            <button className="down-button" onClick={() => handleDownButton(film.id)}>
                                <FaRegThumbsDown />
                            </button>
                            <p>{film.similarityScore}%</p>
                        </div>
                    }
                </div>
            </div>
        ));
    }
    
    let rows = rowsOfRecommendations.map((row, i) => (
        <div key={i} className='recommendedRow'>
            <h1 style={{color:'black'}}>{row.recommendedRowText}</h1>
            <div className="rowOfFilms">{getFilms(row.recommendedFilms)}</div>
        </div>
    ));

    return (
        <>
            <button className="regen-button" onClick={() => handleRegenerateRecommendationsButton()}>
                    Regenerate
            </button>
            <div className='rows'>
                {rows}
            </div>
        </>
    );
    
}

export default App;
