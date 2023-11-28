import React, { useEffect, useState } from 'react';
import header from '../../../assets/images/header_2.png';
import '../../../Styles/layout/_About.scss';

const apiUrl = process.env.REACT_APP_API_URL;

const About = () => {
  const [halls, setHalls] = useState([]);

  useEffect(() => {
    const fetchHalls = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/halls`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setHalls(data);
      } catch (error) {
        console.error('Error fetching halls data:', error.message);
      }
    };

    fetchHalls();
  }, []);
  return (
    <div className="about">
      <div className="about__container">
        <div className="about__header">
          <img src={header} alt="polityka prywatnosci" />
          <h2>O nas</h2>
        </div>
        <div className="about__text">
          <p>
            Jesteśmy kinem, które zostało założone z pasji do kina i miłości do
            dobrych filmów. Nasza historia sięga daleko wstecz, kiedy to
            zaczęliśmy jako mała lokalna sala kinowa. Dzięki zaangażowaniu
            naszego zespołu oraz wsparciu naszych lojalnych widzów, urosliśmy w
            jedno z najważniejszych kin w regionie.
          </p>
          <p>
            Jako kino, stawiamy sobie za cel dostarczanie naszym widzom
            najwyższej jakości doświadczenia filmowego. Nasze sale kinowe są
            wyposażone w najnowocześniejsze technologie dźwięku i obrazu, co
            sprawia, że oglądanie filmów u nas to niezapomniane przeżycie dla
            zmysłów. Dbałość o komfort naszych widzów jest dla nas priorytetem,
            dlatego oferujemy wygodne miejsca siedzące, przestronne foyer i
            klimatyzowane sale.
          </p>
          <p>
            Nasza oferta filmowa jest różnorodna i dopasowana do różnych gustów
            i preferencji. Pokazujemy najnowsze hity kinowe z różnych gatunków,
            takie jak filmy akcji, komedie, dramaty, filmy familijne, science
            fiction, filmy animowane i wiele innych. Staramy się także promować
            filmy niezależne oraz klasyczne dzieła kina, aby zapewnić naszym
            widzom różnorodność wyboru.
          </p>
          <p>
            Jesteśmy miejscem, gdzie ludzie o różnym wieku, zainteresowaniach i
            z różnych społeczności spotykają się, by razem cieszyć się magią
            kina. Nasze kino jest miejscem, gdzie można się zrelaksować, oderwać
            od rzeczywistości i w pełni oddać się emocjom, które niesie ze sobą
            sztuka filmowa.
          </p>
          <p>
            Dziękujemy naszym widzom za wsparcie i zaufanie, które nam okazują.
            Cieszymy się, że możemy być częścią lokalnej społeczności i
            dostarczać rozrywki oraz inspiracji przez filmy. Serdecznie
            zapraszamy do odwiedzenia naszego kina i przeżycia wyjątkowych chwil
            związanych z kinem w naszym przyjaznym i profesjonalnym otoczeniu.
            Zapraszamy do naszego kina i życzymy wspaniałych wrażeń filmowych!
          </p>
          <p>Zespół Kina.</p>
        </div>
        <h2>Sale kinowe</h2>
        <div className="about__hall">
          {halls.length > 0 ? (
            halls.map((hall) => (
              <div key={hall._id} className="about__hall__item">
                <h2>{hall.name}</h2>
                <p>{hall.description}</p>
                <img
                  src={`${apiUrl}/images/hallBanners/${hall.bannerName}`}
                  alt="Banner sali kinowej"
                />
              </div>
            ))
          ) : (
            <p>Brak dostępnych sal kinowych</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default About;
