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

      <form>
        <input type="file" name="" accept="image/*" />
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
        <input type="text" name="director" placeholder="reżyseria" required />
        <input type="text" name="writer" placeholder="scenariusz" required />
        <label>Data premiery (świat)</label>
        <input type="date" name="releaseDateWorld" required />
        <label>Data premiery (polska)</label>
        <input type="date" name="releaseDatePoland" required />

        <label>
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
        </label>

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
