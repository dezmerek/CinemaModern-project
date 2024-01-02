import {
    BsHouse,
    BsTicketPerforated,
    BsFileEarmarkPlus,
    BsEasel2,
    BsPeople,
    BsSticky,
    BsClockHistory,
    BsRecordFill,
} from 'react-icons/bs';

const menuItems = [
    {
        name: 'Dashboard',
        link: '/dashboard',
        icon: <BsHouse />,
    },
    {
        name: 'Bilety',
        link: '/dashboard/tickets',
        icon: <BsTicketPerforated />,
    },
    {
        name: 'Filmy',
        icon: <BsFileEarmarkPlus />,
        submenu: [
            {
                name: 'Lista filmów',
                link: '/dashboard/movies',
                icon: <BsRecordFill />,
            },
            {
                name: 'Dodaj film',
                link: '/dashboard/movies/add',
                icon: <BsRecordFill />,
            },
            {
                name: 'Zapowiedzi',
                link: '/dashboard/movies/preview',
                icon: <BsRecordFill />,
            },
            {
                name: 'Polecane',
                link: '/dashboard/movies/recommended',
                icon: <BsRecordFill />,
            },
        ],
    },
    {
        name: 'Sale',
        icon: <BsEasel2 />,
        submenu: [
            {
                name: 'Lista sal',
                link: '/dashboard/halls',
                icon: <BsRecordFill />,
            },
            {
                name: 'Dodaj sale',
                link: '/dashboard/halls/add',
                icon: <BsRecordFill />,
            },
        ],
    },
    {
        name: 'Użytkownicy',
        link: '/dashboard/users',
        icon: <BsPeople />,
    },
    {
        name: 'Voucher',
        link: '/dashboard/vouchers',
        icon: <BsSticky />,
    },
    {
        name: 'Harmonogram',
        icon: <BsClockHistory />,
        submenu: [
            {
                name: 'Lista seansów',
                link: '/dashboard/schedules',
                icon: <BsRecordFill />,
            },
            {
                name: 'Dodaj seans',
                link: '/dashboard/schedules/add',
                icon: <BsRecordFill />,
            },
        ],
    },
];

export default menuItems;
