// src/types/index.ts
export interface Court {
    id: string;
    name: string;
    shortName: string;
}

export interface Venue {
    id: string;
    name: string;
    courts: Court[];
    image?: string;
    link?: string;
    description?: string;
    address?: string;
    phone?: string;
}

export interface TimeSlot {
    time: string;
    availability: number; // 1 = available, 2 = booked
}

export interface DaySchedule {
    date: Date;
    dayName: string;
    venues: {
        venue: Venue;
        courtsAvailability: {
            court: Court;
            slots: TimeSlot[];
        }[];
    }[];
}

export type Language = 'en' | 'pl';

export interface Translations {
    [key: string]: {
        [key in Language]: string;
    };
}