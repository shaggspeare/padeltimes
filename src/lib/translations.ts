// src/lib/translations.ts
import { Translations, Language } from '@/types';

export const translations: Translations = {
    // Header
    siteTitle: {
        en: "PadelTime — All Padel Courts in Warsaw",
        pl: "PadelTime — Wszystkie korty padel w Warszawie"
    },
    updatedAt: {
        en: "Updated:",
        pl: "Zaktualizowano:"
    },

    // Table
    time: {
        en: "Time",
        pl: "Czas"
    },
    available: {
        en: "Available",
        pl: "Dostępne"
    },
    booked: {
        en: "Booked",
        pl: "Zajęte"
    },

    // Weather
    weatherTitle: {
        en: "What's the weather like?",
        pl: "Jaka jest pogoda?"
    },
    weatherDescription: {
        en: "Worth checking, especially if you're playing at outdoor venues",
        pl: "Warto sprawdzić, szczególnie jeśli grasz na kortach zewnętrznych"
    },
    warsawWeather: {
        en: "Warsaw Weather",
        pl: "Pogoda Warszawa"
    },

    // Venues
    venueListTitle: {
        en: "Where to play Padel?",
        pl: "Gdzie grać w Padel?"
    },
    venueListDescription: {
        en: "Check out the addresses of the best padel courts in Warsaw",
        pl: "Sprawdź adresy najlepszych kortów padel w Warszawie"
    },
    courts: {
        en: "courts",
        pl: "kortów"
    },

    // Footer
    footerCopyright: {
        en: "© 2024 PadelTime Warsaw",
        pl: "© 2024 PadelTime Warszawa"
    },
    footerDescription: {
        en: "Padel court schedules updated in real time",
        pl: "Rozkład kortów padel aktualizowany w czasie rzeczywistym"
    },

    // Days
    monday: { en: "Monday", pl: "Poniedziałek" },
    tuesday: { en: "Tuesday", pl: "Wtorek" },
    wednesday: { en: "Wednesday", pl: "Środa" },
    thursday: { en: "Thursday", pl: "Czwartek" },
    friday: { en: "Friday", pl: "Piątek" },
    saturday: { en: "Saturday", pl: "Sobota" },
    sunday: { en: "Sunday", pl: "Niedziela" },

    // Months
    january: { en: "January", pl: "stycznia" },
    february: { en: "February", pl: "lutego" },
    march: { en: "March", pl: "marca" },
    april: { en: "April", pl: "kwietnia" },
    may: { en: "May", pl: "maja" },
    june: { en: "June", pl: "czerwca" },
    july: { en: "July", pl: "lipca" },
    august: { en: "August", pl: "sierpnia" },
    september: { en: "September", pl: "września" },
    october: { en: "October", pl: "października" },
    november: { en: "November", pl: "listopada" },
    december: { en: "December", pl: "grudnia" },

    // Additional
    alsoRecommend: {
        en: "We also recommend:",
        pl: "Polecamy również:"
    },
    languageSwitch: {
        en: "Polish",
        pl: "English"
    }
};

export const getTranslation = (key: string, language: Language): string => {
    return translations[key]?.[language] || key;
};

export const dayNames: { [key in Language]: string[] } = {
    en: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    pl: ["Niedziela", "Poniedziałek", "Wtorek", "Środa", "Czwartek", "Piątek", "Sobota"]
};

export const monthNames: { [key in Language]: string[] } = {
    en: ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"],
    pl: ["stycznia", "lutego", "marca", "kwietnia", "maja", "czerwca",
        "lipca", "sierpnia", "września", "października", "listopada", "grudnia"]
};