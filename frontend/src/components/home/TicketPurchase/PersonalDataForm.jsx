import React, { useState } from 'react';
import '../../../Styles/components/_PersonalDataForm.scss';

const PersonalDataForm = ({ onSubmit, onBackToSeatsClick }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    confirmEmail: '',
    phone: '',
  });

  const [consentMarketing, setConsentMarketing] = useState(false);
  const [consentEmail, setConsentEmail] = useState(false);

  const handleChange = (field, value) => {
    setFormData((prevData) => ({ ...prevData, [field]: value }));
  };

  const handleCheckboxChange = (field) => {
    if (field === 'consentMarketing') {
      setConsentMarketing((prevValue) => !prevValue);
    } else if (field === 'consentEmail') {
      setConsentEmail((prevValue) => !prevValue);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateFormData()) {
      onSubmit(formData, consentMarketing, consentEmail);
    }
  };

  const validateFormData = () => {
    return true;
  };

  return (
    <div className="personal-data-form">
      <form onSubmit={handleSubmit}>
        <div className="personal-data-form__content">
          <div className="personal-data-form__content--name">
            <div>
              <label>
                Imię<span className="personal-data-form--red">*</span>
              </label>
              <input
                type="text"
                value={formData.firstName}
                onChange={(e) => handleChange('firstName', e.target.value)}
                required
              />
            </div>

            <div>
              <label>
                Nazwisko<span className="personal-data-form--red">*</span>
              </label>
              <input
                type="text"
                value={formData.lastName}
                onChange={(e) => handleChange('lastName', e.target.value)}
                required
              />
            </div>
          </div>

          <div className="personal-data-form__content--mail">
            <div>
              <label>
                E-mail<span className="personal-data-form--red">*</span>
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                required
              />
            </div>

            <div>
              <label>
                Powtórz E-mail<span className="personal-data-form--red">*</span>
              </label>
              <input
                type="email"
                value={formData.confirmEmail}
                onChange={(e) => handleChange('confirmEmail', e.target.value)}
                required
              />
            </div>
          </div>

          <div className="personal-data-form__content--phone">
            <div>
              <label>
                Telefon:<span className="personal-data-form--red">*</span>
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                required
              />
            </div>
            <div></div>
          </div>
        </div>
        <div className="personal-data-form__consent-checkboxes">
          <p>
            <span className="personal-data-form--red">*</span>Dane wymagane
          </p>
          <label>
            <input
              type="checkbox"
              checked={consentMarketing}
              onChange={() => handleCheckboxChange('consentMarketing')}
              required
            />
            Wyrażam zgodę na przetwarzanie danych w celach marketingowych i
            reklamowych.
          </label>

          <label>
            <input
              type="checkbox"
              checked={consentEmail}
              onChange={() => handleCheckboxChange('consentEmail')}
              required
            />
            Wyrażam zgodę na otrzymywanie informacji handlowych drogą
            elektroniczną.
          </label>
        </div>
        <div className="personal-data-form__btn">
          <button onClick={onBackToSeatsClick}>Powrót do wyboru miejsc</button>
          <button type="submit">Przejdź do płatności</button>
        </div>
      </form>
    </div>
  );
};

export default PersonalDataForm;