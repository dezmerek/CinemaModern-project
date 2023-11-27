import React from 'react';
import header from '../../../assets/images/header_1.png';
import '../../../Styles/layout/_PrivacyPolicy.scss';

const PrivacyPolicy = () => {
  return (
    <div className="privacy-policy">
      <div className="privacy-policy__container">
        <div className="privacy-policy__header">
          <img src={header} alt="polityka prywatnosci" />
          <h2>Polityka Prywatności</h2>
        </div>
        <div className="privacy-policy__text">
          <h3>Jakie informacje zbieramy i w jaki sposób są wykorzystywane?</h3>
          <p>
            Zbieramy informacje, takie jak adresy IP, dane przeglądarki i
            informacje o urządzeniu, które przesyłane są automatycznie, gdy
            użytkownik odwiedza naszą stronę. Te informacje są wykorzystywane do
            analizowania ruchu na stronie, poprawiania funkcjonalności oraz
            dostarczania spersonalizowanych treści.
          </p>
          <p>
            Użytkownicy, którzy dokonują zakupu biletów online, muszą podać
            swoje imię, nazwisko, adres e-mail i numer telefonu. Te dane są
            wykorzystywane w celu realizacji zamówienia, kontaktowania się z
            użytkownikami w razie problemów z zamówieniem oraz do celów
            marketingowych.
          </p>
          <h3>Czy korzystamy z plików cookie?</h3>
          <p>
            Tak, korzystamy z plików cookie w celu ułatwienia korzystania z
            naszej strony oraz dostarczania spersonalizowanych treści.
            Informacje pobierane z plików cookie są anonimowe i nie pozwalają na
            identyfikację użytkownika. Użytkownicy mogą wyłączyć pliki cookie w
            ustawieniach swojej przeglądarki. Jakie prawa przysługują
            użytkownikom w odniesieniu do swoich danych osobowych? Użytkownicy
            mają prawo dostępu do swoich danych osobowych, ich poprawiania lub
            usunięcia z naszego systemu. Mogą również wycofać zgodę na
            przetwarzanie swoich danych w dowolnym momencie. Prosimy o kontakt z
            nami w celu realizacji tych żądań
          </p>
          <h3>Jak chronimy dane użytkowników?</h3>
          <p>
            Zapewniamy, że dane użytkowników są przechowywane w bezpieczny
            sposób i że nie są udostępniane osobom nieuprawnionym. Korzystamy z
            odpowiednich środków bezpieczeństwa, takich jak szyfrowanie danych,
            w celu ochrony prywatności użytkowników.
          </p>
          <h3>Jak uzyskać więcej informacji?</h3>
          <p>
            Jeśli mają Państwo jakiekolwiek pytania dotyczące naszej polityki
            prywatności, prosimy o kontakt z nami za pomocą formularza na naszej
            stronie lub poprzez adres e-mail: [adres e-mail strony kina].
          </p>
          <h3>Czy udostępniamy dane użytkowników osobom trzecim?</h3>
          <p>
            Nie udostępniamy danych użytkowników osobom trzecim bez ich wyraźnej
            zgody, chyba że jest to wymagane przez prawo lub jest to niezbędne w
            celu realizacji zamówienia.
          </p>
          <h3>
            Jakie są zasady dotyczące ochrony prywatności osób niepełnoletnich?
          </h3>
          pNasza strona nie jest przeznaczona dla osób poniżej 16 roku życia.
          Nie zbieramy celowo informacji od osób niepełnoletnich bez zgody ich
          rodziców lub opiekunów prawnych.
          <h3>Czy ta polityka prywatności podlega zmianom?</h3>
          <p>
            Tak, ta polityka prywatności może być czasami aktualizowana.
            Wszelkie zmiany będą publikowane na naszej stronie. Użytkownicy
            powinni regularnie sprawdzać tę stronę, aby być na bieżąco z naszą
            polityką prywatności.
          </p>
          <h3>Podsumowanie</h3>
          <p>
            Nasza polityka prywatności zapewnia, że dbamy o prywatność
            użytkowników naszej strony. Zbieramy tylko te informacje, które są
            potrzebne do świadczenia naszych usług, a dane użytkowników są
            przechowywane w bezpieczny sposób. Użytkownicy mają prawo dostępu do
            swoich danych oraz mogą wycofać zgodę na ich przetwarzanie w
            dowolnym momencie.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
