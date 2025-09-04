import { Venue, DaySchedule } from '@/types';

export const venues: Venue[] = [
    {
        id: 'rsp-kyoto',
        name: 'RSP Kyoto',
        image: '/img/location1.jpg',
        link: 'https://racketsportspark.kyiv.ua/',
        description: 'Racket Sports Park KYOTO',
        courts: [
            { id: 'k1', name: 'Корт 1', shortName: '1' },
            { id: 'k2', name: 'Корт 2', shortName: '2' },
            { id: 'k3', name: 'Корт 3', shortName: '3' },
            { id: 'k4', name: 'Корт 4', shortName: '4' },
            { id: 'k5', name: 'Корт 5', shortName: '5' },
            { id: 'kvip1', name: 'VIP Корт 1', shortName: 'VIP1' },
            { id: 'kvip2', name: 'VIP Корт 2', shortName: 'VIP2' },
        ],
    },
    {
        id: 'rsp-nyvky',
        name: 'RSP Nyvky',
        image: '/img/location8.jpg',
        link: 'https://racketsportspark.kyiv.ua/',
        description: 'Racket Sports Park NYVKY',
        courts: [
            { id: 'n1', name: 'Корт 1', shortName: '1' },
            { id: 'n2', name: 'Корт 2', shortName: '2' },
            { id: 'n3', name: 'Корт 3', shortName: '3' },
        ],
    },
    {
        id: 'padelbaza',
        name: 'PadelBaza',
        image: '/img/location3.jpg',
        link: 'https://padelbaza.com/',
        description: 'PadelBaza — Олімпійський центр',
        courts: [
            { id: 'pa', name: 'Корт А', shortName: 'А' },
            { id: 'pb', name: 'Корт B', shortName: 'B' },
            { id: 'pc', name: 'Корт С', shortName: 'С' },
            { id: 'pd', name: 'Корт D', shortName: 'D' },
            { id: 'pv1', name: 'Вулиця 1', shortName: 'Вул1' },
            { id: 'pv2', name: 'Вулиця 2', shortName: 'Вул2' },
        ],
    },
    {
        id: 'rejo-vdng',
        name: 'Rejo ВДНГ',
        image: '/img/location2.jpg',
        link: 'https://rejo.ua/ua/padel-tennis/rejo-polyot1/',
        description: 'REJO-ВДНГ',
        courts: [
            { id: 'rv1', name: 'Корт 1', shortName: '1' },
            { id: 'rv2', name: 'Корт 2', shortName: '2' },
            { id: 'rv3', name: 'Корт 3', shortName: '3' },
            { id: 'rv4', name: 'Корт 4', shortName: '4' },
            { id: 'rv5', name: 'Корт 5', shortName: '5' },
            { id: 'rv6', name: 'Корт 6', shortName: '6' },
        ],
    },
    {
        id: 'rejo-obolon',
        name: 'Rejo Оболонь',
        image: '/img/location7.jpg',
        link: 'https://rejo.ua/ua/padel-tennis/obolon/',
        description: 'REJO-Оболонь',
        courts: [
            { id: 'ro1', name: 'Корт 1', shortName: '1' },
            { id: 'ro2', name: 'Корт 2', shortName: '2' },
            { id: 'ro3', name: 'Корт 3', shortName: '3' },
        ],
    },
    {
        id: 'grandprix',
        name: 'GrandPrix',
        image: '/img/location4.jpg',
        link: 'https://ua.grand-prix.ua/',
        description: 'GrandPrix Evolution',
        courts: [
            { id: 'g1', name: 'Корт 1', shortName: '1' },
            { id: 'g2', name: 'Корт 2', shortName: '2' },
            { id: 'g3', name: 'Корт 3', shortName: '3' },
        ],
    },
    {
        id: 'club22',
        name: 'Club22.Unit',
        image: '/img/location6.jpg',
        link: 'https://22club.unit.city/',
        description: 'Club22.Unit',
        courts: [
            { id: 'c2', name: 'Корт 2', shortName: '2' },
            { id: 'c1', name: 'Корт 1', shortName: '1' },
            { id: 'c3', name: 'Корт 3', shortName: '3' },
        ],
    },
];

const timeSlots = [
    '07:00', '08:00', '09:00', '10:00', '11:00', '12:00',
    '13:00', '14:00', '15:00', '16:00', '17:00', '18:00',
    '19:00', '20:00', '21:00', '22:00',
];

export function generateScheduleForWeek(): DaySchedule[] {
    const schedule: DaySchedule[] = [];
    const today = new Date();
    const ukrainianDays = ['Неділя', 'Понеділок', 'Вівторок', 'Середа', 'Четвер', 'П\'ятниця', 'Субота'];
    const ukrainianMonths = ['січня', 'лютого', 'березня', 'квітня', 'травня', 'червня',
        'липня', 'серпня', 'вересня', 'жовтня', 'листопада', 'грудня'];

    for (let i = 0; i < 7; i++) {
        const currentDate = new Date(today);
        currentDate.setDate(today.getDate() + i);

        const daySchedule: DaySchedule = {
            date: currentDate,
            dayName: `${ukrainianDays[currentDate.getDay()]}, ${currentDate.getDate()} ${ukrainianMonths[currentDate.getMonth()]}`,
            venues: venues.map(venue => ({
                venue,
                courtsAvailability: venue.courts.map(court => ({
                    court,
                    slots: timeSlots.map(time => {
                        // Generate random availability with more realistic patterns
                        const hour = parseInt(time.split(':')[0]);
                        let availability = 1;

                        // Peak hours (17-21) are more likely to be booked
                        if (hour >= 17 && hour <= 21) {
                            availability = Math.random() > 0.3 ? 2 : 1;
                        }
                        // Weekend mornings are popular
                        else if ((currentDate.getDay() === 0 || currentDate.getDay() === 6) && hour >= 9 && hour <= 12) {
                            availability = Math.random() > 0.4 ? 2 : 1;
                        }
                        // Early morning and late evening are usually available
                        else if (hour < 9 || hour > 21) {
                            availability = Math.random() > 0.8 ? 2 : 1;
                        }
                        // Regular hours
                        else {
                            availability = Math.random() > 0.6 ? 2 : 1;
                        }

                        return { time, availability };
                    }),
                })),
            })),
        };

        schedule.push(daySchedule);
    }

    return schedule;
}