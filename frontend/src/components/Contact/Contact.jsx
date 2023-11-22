import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';
import '../../Styles/components/_Contact.scss';

const Contact = () => {
  return (
    <div className="contact">
      <div className="contact__container">
        <h2>Kontakt</h2>
        <div className="contact__info">
          <div>
            <h3>Adres</h3>
            31-150 Kraków, Świętego Filipa 17
          </div>
          <div>
            <h3>Telefon</h3>
            +48 555 444 888
          </div>
          <div>
            <h3>Email</h3>
            mail@cinema.com
          </div>

          <div className="contact__social">
            <FaFacebook />
            <FaTwitter />
            <FaInstagram />
            <FaYoutube />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
