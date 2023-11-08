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

  const handleMainBannerChange = (event) => {
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
        console.log('Film added:', responseData);
      } else {
        console.error('Error adding film:', await response.text());
      }
    } catch (error) {
      console.error('Network Error:', error);
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
              name="mainBannerImage"
              accept="image/*"
              onChange={handleMainBannerChange}
            />
            {selectedImage && <img src={selectedImage} alt="Podgląd obrazu" />}
            {!selectedImage && (
              <label>
                Dodaj baner<br></br>(255 x 420)
              </label>
            )}
          </div>

          <div className="film-add__content">
            <input type="text" name="title" placeholder="Tytuł" />
            <textarea
              type="text"
              name="description"
              placeholder="Opis"
            ></textarea>
            <input
              type="number"
              name="duration"
              placeholder="Czas trwania (minuty)"
            />
            <div className="film-add__director-writer">
              <div>
                <input type="text" name="director" placeholder="reżyseria" />
              </div>
              <div>
                <input type="text" name="writer" placeholder="scenariusz" />
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
                />
              </div>
              <div>
                <label>Data premiery (polska)</label>
                <input
                  type="text"
                  pattern="\d{2}.\d{2}.\d{4}"
                  placeholder="dd.mm.rrrr"
                  name="releaseDatePoland"
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
                <input
                  type="radio"
                  name="language"
                  value="polski"
                  defaultChecked
                />
                <label>Polski</label>
              </div>
              <div>
                <input type="radio" name="language" value="napisy" />
                <label>Napisy</label>
              </div>
              <div>
                <input type="radio" name="language" value="dubbing" />
                <label>Dubbing</label>
              </div>
            </div>
          </div>

          <div className="film-add__trailer">
            <div>
              <label>Link do trailer</label>
              <input type="url" name="trailerLink" placeholder="https://" />
            </div>
            <div>
              <label>Wybierz banner trailer (255 x 170)</label>
              <input type="file" accept="image/*" name="trailerBannerImage" />
            </div>
          </div>
        </div>
        <button className="film-add__btn-save">Dodaj film</button>
      </form>
    </>
  );
};

export default FilmAdd;
