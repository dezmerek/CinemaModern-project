const filmsData = [
    {
        id: 1,
        title: 'Incepcja',
        rating: 9.5,
        language: 'napisy',
        tickets: 150,
        dateAdded: '2023/10/25'
    },
    {
        id: 2,
        title: 'Zielona Mila',
        rating: 8.7,
        language: 'dubbing',
        tickets: 120,
        dateAdded: '2023/10/26'
    },
    {
        id: 3,
        title: 'Nietykalni',
        rating: 9.2,
        language: 'polski',
        tickets: 90,
        dateAdded: '2023/10/27'
    },
    {
        id: 4,
        title: 'Skazani na Shawshank',
        rating: 9.7,
        language: 'napisy',
        tickets: 100,
        dateAdded: '2023/10/28'
    },
    {
        id: 5,
        title: 'Gwiezdne wojny: Nowa nadzieja',
        rating: 8.9,
        language: 'dubbing',
        tickets: 110,
        dateAdded: '2023/10/29'
    },
    {
        id: 6,
        title: 'Forrest Gump',
        rating: 9.1,
        language: 'napisy',
        tickets: 95,
        dateAdded: '2023/10/30'
    },
    {
        id: 7,
        title: 'Siedem',
        rating: 9.4,
        language: 'polski',
        tickets: 85,
        dateAdded: '2023/10/31'
    },
    {
        id: 8,
        title: 'Gladiator',
        rating: 8.5,
        language: 'dubbing',
        tickets: 105,
        dateAdded: '2023/11/01'
    },
    {
        id: 9,
        title: 'Matrix',
        rating: 8.8,
        language: 'napisy',
        tickets: 125,
        dateAdded: '2023/11/02'
    },
    {
        id: 10,
        title: 'Piraci z Karaibów: Klątwa Czarnej Perły',
        rating: 7.9,
        language: 'polski',
        tickets: 80,
        dateAdded: '2023/11/03'
    },
    {
        id: 11,
        title: 'Iniemamocni',
        rating: 8.2,
        language: 'dubbing',
        tickets: 95,
        dateAdded: '2023/11/04'
    },
    {
        id: 12,
        title: 'Avengers: Wojna bez granic',
        rating: 8.6,
        language: 'napisy',
        tickets: 110,
        dateAdded: '2023/11/05'
    },
    {
        id: 13,
        title: 'Joker',
        rating: 9.3,
        language: 'napisy',
        tickets: 100,
        dateAdded: '2023/11/06'
    },
    {
        id: 14,
        title: 'Szeregowiec Ryan',
        rating: 9.0,
        language: 'dubbing',
        tickets: 95,
        dateAdded: '2023/11/07'
    },
    {
        id: 15,
        title: 'Lot nad kukułczym gniazdem',
        rating: 9.6,
        language: 'napisy',
        tickets: 105,
        dateAdded: '2023/11/08'
    },
    {
        id: 16,
        title: 'Pulp Fiction',
        rating: 9.1,
        language: 'polski',
        tickets: 90,
        dateAdded: '2023/11/09'
    },
    {
        id: 17,
        title: 'Ojciec chrzestny',
        rating: 9.7,
        language: 'napisy',
        tickets: 115,
        dateAdded: '2023/11/10'
    },
    {
        id: 18,
        title: 'Chłopcy z ferajny',
        rating: 8.4,
        language: 'dubbing',
        tickets: 100,
        dateAdded: '2023/11/11'
    },
    {
        id: 19,
        title: 'Dwunastu gniewnych ludzi',
        rating: 9.2,
        language: 'napisy',
        tickets: 95,
        dateAdded: '2023/11/12'
    },
    {
        id: 20,
        title: 'Szeregowiec Ryan',
        rating: 8.8,
        language: 'polski',
        tickets: 85,
        dateAdded: '2023/11/13'
    },
    {
        id: 21,
        title: 'Django',
        rating: 8.9,
        language: 'napisy',
        tickets: 105,
        dateAdded: '2023/11/14'
    },
    {
        id: 22,
        title: 'Milczenie owiec',
        rating: 9.4,
        language: 'dubbing',
        tickets: 110,
        dateAdded: '2023/11/15'
    },
    {
        id: 23,
        title: 'Mad Max: Na drodze gniewu',
        rating: 8.6,
        language: 'napisy',
        tickets: 95,
        dateAdded: '2023/11/16'
    },
    {
        id: 24,
        title: 'Ostatni samuraj',
        rating: 8.7,
        language: 'polski',
        tickets: 90,
        dateAdded: '2023/11/17'
    },
    {
        id: 25,
        title: 'Rok 1917',
        rating: 9.3,
        language: 'napisy',
        tickets: 100,
        dateAdded: '2023/11/18'
    },
    {
        id: 26,
        title: 'Chłopcy z ferajny',
        rating: 8.3,
        language: 'napisy',
        tickets: 90,
        dateAdded: '2023/11/19'
    },
    {
        id: 27,
        title: 'Dwunastu gniewnych ludzi',
        rating: 9.1,
        language: 'polski',
        tickets: 95,
        dateAdded: '2023/11/20'
    },
    {
        id: 28,
        title: 'Szeregowiec Ryan',
        rating: 8.7,
        language: 'dubbing',
        tickets: 100,
        dateAdded: '2023/11/21'
    },
    {
        id: 29,
        title: 'Django',
        rating: 8.9,
        language: 'napisy',
        tickets: 105,
        dateAdded: '2023/11/22'
    },
    {
        id: 30,
        title: 'Milczenie owiec',
        rating: 9.2,
        language: 'polski',
        tickets: 110,
        dateAdded: '2023/11/23'
    },
    {
        id: 31,
        title: 'Mad Max: Na drodze gniewu',
        rating: 8.5,
        language: 'napisy',
        tickets: 95,
        dateAdded: '2023/11/24'
    },
    {
        id: 32,
        title: 'Ostatni samuraj',
        rating: 8.8,
        language: 'dubbing',
        tickets: 90,
        dateAdded: '2023/11/25'
    },
    {
        id: 33,
        title: 'Rok 1917',
        rating: 9.0,
        language: 'napisy',
        tickets: 100,
        dateAdded: '2023/11/26'
    },
    {
        id: 34,
        title: 'Ojciec chrzestny II',
        rating: 9.4,
        language: 'polski',
        tickets: 115,
        dateAdded: '2023/11/27'
    },
    {
        id: 35,
        title: 'Władca Pierścieni: Drużyna Pierścienia',
        rating: 9.2,
        language: 'napisy',
        tickets: 105,
        dateAdded: '2023/11/28'
    },
    {
        id: 36,
        title: 'Siedem minut po północy',
        rating: 8.6,
        language: 'dubbing',
        tickets: 95,
        dateAdded: '2023/11/29'
    },
    {
        id: 37,
        title: 'Mroczny Rycerz',
        rating: 9.5,
        language: 'napisy',
        tickets: 110,
        dateAdded: '2023/11/30'
    },
    {
        id: 38,
        title: 'Pianista',
        rating: 9.0,
        language: 'polski',
        tickets: 100,
        dateAdded: '2023/12/01'
    },
    {
        id: 39,
        title: 'Nietykalni',
        rating: 9.3,
        language: 'napisy',
        tickets: 105,
        dateAdded: '2023/12/02'
    },
    {
        id: 40,
        title: 'Chłopcy z ferajny',
        rating: 8.7,
        language: 'dubbing',
        tickets: 95,
        dateAdded: '2023/12/03'
    },
    {
        id: 41,
        title: 'Skazani na Shawshank',
        rating: 9.7,
        language: 'napisy',
        tickets: 120,
        dateAdded: '2023/12/04'
    },
    {
        id: 42,
        title: 'Mroczny Rycerz powstaje',
        rating: 9.3,
        language: 'polski',
        tickets: 110,
        dateAdded: '2023/12/05'
    },
    {
        id: 43,
        title: 'Lista Schindlera',
        rating: 9.1,
        language: 'napisy',
        tickets: 105,
        dateAdded: '2023/12/06'
    },
    {
        id: 44,
        title: 'Władca Pierścieni: Dwie Wieże',
        rating: 9.2,
        language: 'dubbing',
        tickets: 100,
        dateAdded: '2023/12/07'
    },
    {
        id: 45,
        title: 'W pustyni i w puszczy',
        rating: 8.5,
        language: 'napisy',
        tickets: 95,
        dateAdded: '2023/12/08'
    },
    {
        id: 46,
        title: 'Mumia',
        rating: 8.8,
        language: 'polski',
        tickets: 90,
        dateAdded: '2023/12/09'
    },
    {
        id: 47,
        title: 'Gra o tron',
        rating: 9.6,
        language: 'napisy',
        tickets: 125,
        dateAdded: '2023/12/10'
    },
    {
        id: 48,
        title: 'Zawód: Szpieg',
        rating: 8.9,
        language: 'dubbing',
        tickets: 105,
        dateAdded: '2023/12/11'
    },
    {
        id: 49,
        title: 'Ostatni Mohikanin',
        rating: 8.7,
        language: 'napisy',
        tickets: 95,
        dateAdded: '2023/12/12'
    },
    {
        id: 50,
        title: 'Przeminęło z wiatrem',
        rating: 8.4,
        language: 'polski',
        tickets: 90,
        dateAdded: '2023/12/13'
    },
    {
        id: 51,
        title: 'Szybcy i wściekli',
        rating: 8.6,
        language: 'napisy',
        tickets: 110,
        dateAdded: '2023/12/14'
    },
    {
        id: 52,
        title: 'Szklana pułapka',
        rating: 8.9,
        language: 'dubbing',
        tickets: 105,
        dateAdded: '2023/12/15'
    },
    {
        id: 53,
        title: 'Marsjanin',
        rating: 9.2,
        language: 'polski',
        tickets: 100,
        dateAdded: '2023/12/16'
    },
    {
        id: 54,
        title: 'Sherlock Holmes',
        rating: 8.5,
        language: 'napisy',
        tickets: 95,
        dateAdded: '2023/12/17'
    },
    {
        id: 55,
        title: 'Jumanji: Następny poziom',
        rating: 8.7,
        language: 'dubbing',
        tickets: 90,
        dateAdded: '2023/12/18'
    },
    {
        id: 56,
        title: 'Zaginiony',
        rating: 8.4,
        language: 'napisy',
        tickets: 85,
        dateAdded: '2023/12/19'
    }
];

export default filmsData;
