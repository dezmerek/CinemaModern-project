import React from 'react';
import { Link } from 'react-router-dom';
import '../../../Styles/layout/_NotFound.scss';

const NotFound = () => {
  return (
    <div className="not-found">
      <h2 className="not-found__title">
        Błąd 404 - Podana strona nie istnieje
      </h2>
      <p className="not-found__message">
        Przepraszamy, ale strona, której szukasz, nie istnieje. Kliknij poniższy
        przycisk, aby wrócić na stronę główną.
      </p>
      <Link to="/" className="not-found__link">
        Powrót do strony głównej
      </Link>
    </div>
  );
};

export default NotFound;
