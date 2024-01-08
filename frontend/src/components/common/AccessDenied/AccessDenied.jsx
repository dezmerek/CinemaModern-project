import React from 'react';
import { Link } from 'react-router-dom';
import '../../../Styles/layout/_AccessDenied.scss';

const AccessDenied = () => {
  return (
    <div className="access-denied">
      <h2 className="access-denied__title">
        Brak dostępu - Nie masz uprawnień do tej strony
      </h2>
      <p className="access-denied__message">
        Przepraszamy, ale nie masz wystarczających uprawnień do przeglądania tej
        strony. Kliknij poniższy przycisk, aby wrócić na stronę główną.
      </p>
      <Link to="/" className="access-denied__link">
        Powrót do strony głównej
      </Link>
    </div>
  );
};

export default AccessDenied;
