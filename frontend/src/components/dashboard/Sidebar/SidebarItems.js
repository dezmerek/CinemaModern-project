import {
    BsHouse,
    BsTicketPerforated,
    BsFileEarmarkPlus,
    BsEasel2,
    BsPeople,
    BsSticky,
    BsClockHistory,
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
        link: '/dashboard/films',
        icon: <BsFileEarmarkPlus />,
    },
    {
        name: 'Sale',
        link: '/dashboard/halls',
        icon: <BsEasel2 />,
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
