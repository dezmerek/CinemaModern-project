import React, { useState } from 'react';
import '../../../Styles/layout/_FilmAdd.scss';

const FilmAdd = () => {
  const movieGenres = [
    'thriller',
    'romans',
    'przygodowy',
    'melodramat',
    'kryminał',
    'komedia',
    'horror',
    'fantasy',
    'musical',
    'dramat',
    'dokumentalny',
    'biograficzny',
    'akcja',
    'sci-fi',
  ];

  const [genresChecked, setGenresChecked] = useState(
    movieGenres.reduce((acc, genre) => {
      acc[genre] = false;
      return acc;
    }, {})
  );

  const handleGenreChange = (genre) => {
    setGenresChecked({
      ...genresChecked,
      [genre]: !genresChecked[genre],
    });
  };

  return (
    <>
      <h2>Dodaj nowy film</h2>

      <form className="film-add">
        <div className="film-add__container">
          <div className="film-add__banner">
            <input type="file" name="" accept="image/*" />
          </div>
          <div className="film-add__content">
            <input type="text" name="title" placeholder="Tytuł" required />
            <textarea
              type="text"
              name="description"
              placeholder="Opis"
              required
            ></textarea>
            <input
              type="number"
              name="duration"
              placeholder="Czas trwania (minuty)"
              required
            />
            <div className="film-add__director-writer">
              <div>
                <input
                  type="text"
                  name="director"
                  placeholder="reżyseria"
                  required
                />
              </div>
              <div>
                <input
                  type="text"
                  name="writer"
                  placeholder="scenariusz"
                  required
                />
              </div>
            </div>
            <div className="film-add__dates">
              <div>
                <label>Data premiery (świat)</label>
                <input
                  type="text"
                  pattern="\d{2}.\d{2}.\d{4}"
                  placeholder="dd.mm.rrrr"
                  name="releaseDateWorld"
                  required
                />
              </div>
              <div>
                <label>Data premiery (polska)</label>
                <input
                  type="text"
                  pattern="\d{2}.\d{2}.\d{4}"
                  placeholder="dd.mm.rrrr"
                  name="releaseDatePoland"
                  required
                />
              </div>
            </div>
          </div>
        </div>

        <div className="film-add__genre">
          {movieGenres.map((genre) => (
            <div key={genre}>
              <label>
                <input
                  type="checkbox"
                  checked={genresChecked[genre]}
                  onChange={() => handleGenreChange(genre)}
                />
                {genre}
              </label>
            </div>
          ))}
        </div>

        <label>
          <input type="radio" name="language" />
          Polski
        </label>
        <label>
          <input type="radio" name="language" />
          Napisy
        </label>
        <label>
          <input type="radio" name="language" />
          Dubbing
        </label>
        <input type="url" name="trailerLink" placeholder="https://" required />
        <input type="file" accept="image/*" name="trailerBanner" required />
        <button>Dodaj film</button>
      </form>
    </>
  );
};

export default FilmAdd;
