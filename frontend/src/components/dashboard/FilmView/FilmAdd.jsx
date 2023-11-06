import React, { useState } from 'react';
import '../../../Styles/layout/_FilmAdd.scss';

const FilmAdd = () => {
  const [selectedImage, setSelectedImage] = useState(null);

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

  const handleImageChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setSelectedImage(event.target.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const selectedGenres = Object.keys(genresChecked).filter(
      (genre) => genresChecked[genre]
    );

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    data.genres = selectedGenres;

    try {
      const response = await fetch('http://localhost:3001/api/movies', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log('Film został dodany:', responseData);
        // Tutaj możesz dodać logikę do obsługi sukcesu
      } else {
        console.error('Błąd dodawania filmu:', await response.text());

        // Tutaj możesz dodać logikę do obsługi błędów
      }
    } catch (error) {
      console.error('Błąd sieci:', error);
      // Obsługa błędów związanych z siecią
    }
  };

  return (
    <>
      <h2>Dodaj nowy film</h2>

      <form className="film-add" onSubmit={handleSubmit}>
        <div className="film-add__container">
          <div className="film-add__banner">
            <input
              type="file"
              name=""
              accept="image/*"
              onChange={handleImageChange}
            />
            {selectedImage && <img src={selectedImage} alt="Podgląd obrazu" />}
            {!selectedImage && (
              <label>
                Dodaj baner<br></br>(255 x 420)
              </label>
            )}
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

        <div className="film-add__content-down">
          <div className="film-add__genre">
            <div className="film-add__genre--title">Wybierz gatunek</div>
            <div className="film-add__genre--content">
              {movieGenres.map((genre) => (
                <div key={genre}>
                  <input
                    type="checkbox"
                    checked={genresChecked[genre]}
                    onChange={() => handleGenreChange(genre)}
                  />
                  <label>{genre}</label>
                </div>
              ))}
            </div>
          </div>

          <div className="film-add__languages">
            <div className="film-add__languages--title">Język</div>
            <div className="film-add__languages--content">
              <div>
                <input type="radio" name="language" value="polski" required />
                <label>Polski</label>
              </div>
              <div>
                <input type="radio" name="language" value="napisy" required />
                <label>Napisy</label>
              </div>
              <div>
                <input type="radio" name="language" value="dubbing" required />
                <label>Dubbing</label>
              </div>
            </div>
          </div>

          <div className="film-add__trailer">
            <div>
              <label>Link do trailer</label>
              <input
                type="url"
                name="trailerLink"
                placeholder="https://"
                required
              />
            </div>
            <div>
              <label>Wybierz banner trailer (255 x 170)</label>
              <input
                type="file"
                accept="image/*"
                name="trailerBanner"
                required
              />
            </div>
          </div>
        </div>
        <button className="film-add__btn-save">Dodaj film</button>
      </form>
    </>
  );
};

export default FilmAdd;
