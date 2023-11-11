import React, { useState } from 'react';
import '../../../Styles/layout/_FilmAdd.scss';
import AddConfirmation from './FilmAddConfirmation';

const FilmAdd = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [genreError, setGenreError] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

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

  const handleMainBannerChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const reader = new FileReader();

      const image = new Image();
      image.src = URL.createObjectURL(selectedFile);
      image.onload = () => {
        if (image.width === 255 && image.height === 420) {
          reader.onload = (event) => {
            setSelectedImage(event.target.result);
          };
          reader.readAsDataURL(selectedFile);
        } else {
          alert('Obraz baneru głównego musi mieć wymiary 255x420 pikseli.');
          event.target.value = '';
        }
      };
    }
  };

  const handleTrailerBannerChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const reader = new FileReader();

      const image = new Image();
      image.src = URL.createObjectURL(selectedFile);
      image.onload = () => {
        if (image.width === 255 && image.height === 170) {
          reader.readAsDataURL(selectedFile);
        } else {
          alert('Obraz baneru zwiastuna musi mieć wymiary 255x170 pikseli.');
          event.target.value = '';
        }
      };
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const selectedGenres = Object.keys(genresChecked).filter(
      (genre) => genresChecked[genre]
    );

    if (selectedGenres.length === 0) {
      setGenreError(true);
      return;
    } else {
      setGenreError(false);
    }

    const formData = new FormData();
    formData.append('title', event.target.title.value);
    formData.append('description', event.target.description.value);
    formData.append('duration', event.target.duration.value);
    formData.append('director', event.target.director.value);
    formData.append('writer', event.target.writer.value);
    formData.append('releaseDateWorld', event.target.releaseDateWorld.value);
    formData.append('releaseDatePoland', event.target.releaseDatePoland.value);
    formData.append('language', event.target.language.value);
    formData.append('trailerLink', event.target.trailerLink.value);

    if (
      event.target.mainBannerImage &&
      event.target.mainBannerImage.files.length > 0
    ) {
      formData.append('mainBannerImage', event.target.mainBannerImage.files[0]);
    }

    if (
      event.target.trailerBannerImage &&
      event.target.trailerBannerImage.files.length > 0
    ) {
      formData.append(
        'trailerBannerImage',
        event.target.trailerBannerImage.files[0]
      );
    }

    formData.append('genres', JSON.stringify(selectedGenres));

    try {
      const response = await fetch('http://localhost:3001/api/movies', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const responseData = await response.json();
        setShowConfirmation(true);
        console.log('Film added:', responseData);
      } else {
        console.error('Error adding film:', await response.text());
      }
    } catch (error) {
      console.error('Network Error:', error);
    }
  };

  const handleConfirmationClose = () => {
    setShowConfirmation(false);
  };
  return (
    <>
      <h2>Dodaj nowy film</h2>

      <form className="film-add" onSubmit={handleSubmit}>
        <div className="film-add__container">
          <div className="film-add__banner">
            <input
              type="file"
              name="mainBannerImage"
              accept="image/*"
              onChange={handleMainBannerChange}
              required
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
                  type="date"
                  placeholder="dd.mm.rrrr"
                  name="releaseDateWorld"
                  required
                />
              </div>
              <div>
                <label>Data premiery (polska)</label>
                <input
                  type="date"
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
            <div className="film-add__genre--title">Wybierz gatunek *</div>
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
              {genreError && (
                <p style={{ color: 'red', marginTop: '0.5rem' }}>
                  Proszę wybrać przynajmniej jeden gatunek filmu.
                </p>
              )}
            </div>
          </div>

          <div className="film-add__languages">
            <div className="film-add__languages--title">Język</div>
            <div className="film-add__languages--content">
              <div>
                <input
                  type="radio"
                  name="language"
                  value="polski"
                  defaultCheckedrequired
                />
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
              <label>Link do trailer (youtube)</label>
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
                name="trailerBannerImage"
                onChange={handleTrailerBannerChange}
                required
              />
            </div>
          </div>
        </div>
        <button className="film-add__btn-save">Dodaj film</button>
      </form>
      {showConfirmation && (
        <AddConfirmation onClose={handleConfirmationClose} />
      )}
    </>
  );
};

export default FilmAdd;
