import React from 'react';
import header from '../../../assets/images/header_4.png';
import '../../../Styles/layout/_LoyaltyProgram.scss';
import bannerLoyalty from '../../../assets/images/loyalty-program.png';

const loyaltyProgram = () => {
  return (
    <div className="loyalty-program">
      <div className="loyalty-program__container">
        <div className="loyalty-program__header">
          <img src={header} alt="polityka prywatnosci" />
          <h2>Program lojalnościowy</h2>
        </div>
        <div className="loyalty-program__content">
          <div>
            <img src={bannerLoyalty} alt="banner program lojalnościowy" />
          </div>
          <div>
            <p>
              Jako posiadacz naszej karty lojalnościowej kina, możesz cieszyć
              się wieloma nagrodami i korzyściami. Oferujemy zniżki na bilety do
              wybranych seansów, darmowe wejścia na specjalne pokazy
              przedpremierowe, dodatkowe punkty lojalnościowe za zakup biletów
              oraz możliwość uczestniczenia w ekskluzywnych konkursach i
              promocjach tylko dla posiadaczy karty
            </p>
            <p>
              Aby uzyskać naszą kartę lojalnościową, wystarczy wypełnić prosty
              formularz rejestracyjny online lub zarejestrować się osobiście w
              naszej kasie kina. Karta jest bezpłatna i nie wymaga żadnych
              opłat. Po rejestracji otrzymasz unikalny numer karty, który
              pozwoli Ci korzystać z naszych korzyści i zbierać punkty
              lojalnościowe.
            </p>
            <p>
              Regularnie oferujemy promocje i oferty specjalne dla posiadaczy
              karty lojalnościowej kina. Mogą to być limitowane zniżki na
              wybrane filmy, specjalne wydarzenia tylko dla posiadaczy karty,
              czy też dodatkowe punkty lojalnościowe za zakup biletów w
              określonym okresie czasowym. Sprawdzaj naszą stronę internetową
              lub nasze profile w mediach społecznościowych, aby być na bieżąco
              z naszymi aktualnymi promocjami
            </p>
            <p>
              Możesz w łatwy sposób śledzić stan swojego konta lojalnościowego.
              Możesz zobaczyć aktualne saldo swoich punktów oraz przejrzeć
              historię ich zdobywania i wykorzystania. To pozwoli Ci na
              kontrolowanie swojego postępu w naszym programie lojalnościowym i
              na wykorzystywanie zgromadzonych punktów do otrzymywania nagród.
            </p>
            <p>
              Zapoznaj się z naszymi warunkami korzystania z karty
              lojalnościowej kina, które określają jej ważność, ograniczenia
              wiekowe, regulamin programu lojalnościowego oraz inne zasady,
              których użytkownik powinien przestrzegać. Dzięki temu unikniesz
              nieporozumień i będziesz dobrze zorientowany w naszym programie
              lojalnościowym.
            </p>
            <p>
              Jeśli masz pytania, wątpliwości lub potrzebujesz pomocy związanej
              z kartą lojalnościową kina, skontaktuj się z nami za pośrednictwem
              naszej zakładki "Kontakt". Możesz napisać do nas e-mail, zadzwonić
              na nasz numer telefonu lub skorzystać z formularza kontaktowego.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default loyaltyProgram;
