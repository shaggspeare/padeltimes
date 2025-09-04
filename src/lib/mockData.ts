import { Venue, DaySchedule, Language } from '@/types';
import { dayNames, monthNames } from './translations';

export const venues: Venue[] = [
    {
        id: 'we-are-padel',
        name: 'We Are Padel Warsaw',
        description: 'Modern padel club in the heart of Warsaw',
        address: 'Marszałkowska 84/92, 00-514 Warsaw',
        link: 'https://wearepadel.pl/',
        courts: [
            { id: 'wap1', name: 'Court 1', shortName: '1' },
            { id: 'wap2', name: 'Court 2', shortName: '2' },
            { id: 'wap3', name: 'Court 3', shortName: '3' },
            { id: 'wap4', name: 'Court 4', shortName: '4' },
        ],
    },
    {
        id: 'padlovnia',
        name: 'Padlovnia',
        description: 'Most modern padel club in Poland',
        address: 'Wał Miedzeszyński 389, 03-994 Warsaw',
        link: 'https://padlovnia.pl/',
        phone: '+48 22 499 99 00',
        courts: [
            { id: 'pad1', name: 'Court 1', shortName: '1' },
            { id: 'pad2', name: 'Court 2', shortName: '2' },
            { id: 'pad3', name: 'Court 3', shortName: '3' },
            { id: 'pad4', name: 'Court 4', shortName: '4' },
            { id: 'pad5', name: 'Court 5', shortName: '5' },
            { id: 'pad6', name: 'Court 6', shortName: '6' },
            { id: 'pad7', name: 'Court 7', shortName: '7' },
            { id: 'pad8', name: 'Court 8', shortName: '8' },
        ],
    },
    {
        id: 'warsaw-padel-club',
        name: 'Warsaw Padel Club',
        description: 'Premium padel experience',
        address: 'Annopol 3, Hala DC1, 03-236 Warsaw',
        link: 'https://www.warsawpadelclub.pl/',
        phone: '+48 602 500 498',
        courts: [
            { id: 'wpc1', name: 'Court 1', shortName: '1' },
            { id: 'wpc2', name: 'Court 2', shortName: '2' },
            { id: 'wpc3', name: 'Court 3', shortName: '3' },
        ],
    },
    {
        id: 'interpadel-warszawa',
        name: 'InterPadel Warszawa',
        description: 'Professional padel facilities',
        address: 'Bokserska 66a, 02-690 Warsaw',
        link: 'https://interpadel.pl/',
        phone: '+48 734 433 772',
        courts: [
            { id: 'ip1', name: 'Court 1', shortName: '1' },
            { id: 'ip2', name: 'Court 2', shortName: '2' },
            { id: 'ip3', name: 'Court 3', shortName: '3' },
            { id: 'ip4', name: 'Court 4', shortName: '4' },
        ],
    },
    {
        id: 'wkt-mera',
        name: 'WKT Mera',
        description: 'Warsaw Tennis Club Mera',
        address: 'al. Bohaterów Września 12, 02-389 Warsaw',
        link: 'https://wkt-mera.pl/',
        phone: '+48 22 822 93 82',
        courts: [
            { id: 'mera1', name: 'Court 1', shortName: '1' },
            { id: 'mera2', name: 'Court 2', shortName: '2' },
        ],
    },
    {
        id: 'garden-club',
        name: 'Garden Club',
        description: 'Sports & Health Club Konstancin',
        address: 'Konstancin-Jeziorna (near Warsaw)',
        link: 'https://garden-club.pl/',
        courts: [
            { id: 'gc1', name: 'Court 1', shortName: '1' },
            { id: 'gc2', name: 'Court 2', shortName: '2' },
        ],
    },
    {
        id: 'decathlon-targowek',
        name: 'Decathlon Targówek',
        description: 'Padel courts at Decathlon',
        address: 'Geodezyjna 76, 03-290 Warsaw',
        link: 'https://www.decathlon.pl/',
        courts: [
            { id: 'dec1', name: 'Court 1', shortName: '1' },
            { id: 'dec2', name: 'Court 2', shortName: '2' },
        ],
    },
    {
        id: 'padel4all-vistula',
        name: 'Padel4All Vistula',
        description: 'Outdoor court by the Vistula River',
        address: 'Gen. George Smith Patton Boulevard, Warsaw',
        link: 'https://bestofwarsaw.pl/',
        courts: [
            { id: 'vis1', name: 'Court 1', shortName: '1' },
        ],
    },
];

const timeSlots = [
    '07:00', '08:00', '09:00', '10:00', '11:00', '12:00',
    '13:00', '14:00', '15:00', '16:00', '17:00', '18:00',
    '19:00', '20:00', '21:00', '22:00',
];

export function generateScheduleForWeek(language: Language = 'en'): DaySchedule[] {
    const schedule: DaySchedule[] = [];
    const today = new Date();

    for (let i = 0; i < 7; i++) {
        const currentDate = new Date(today);
        currentDate.setDate(today.getDate() + i);

        const dayName = dayNames[language][currentDate.getDay()];
        const monthName = monthNames[language][currentDate.getMonth()];

        const daySchedule: DaySchedule = {
            date: currentDate,
            dayName: `${dayName}, ${currentDate.getDate()} ${monthName}`,
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