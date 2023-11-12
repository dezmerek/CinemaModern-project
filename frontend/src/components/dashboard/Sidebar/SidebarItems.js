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
                link: '/dashboard/films',
                icon: <BsRecordFill />,
            },
            {
                name: 'Dodaj film',
                link: '/dashboard/films/add',
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
        link: '/dashboard/schedules',
        icon: <BsClockHistory />,
    },
];

export default menuItems;
