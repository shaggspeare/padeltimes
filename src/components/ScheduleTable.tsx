'use client';

import { useState, useMemo } from 'react';
import { DaySchedule, Language } from '@/types';
import { getTranslation } from '@/lib/translations';

interface ScheduleTableProps {
    schedule: DaySchedule[];
    language: Language;
}

export default function ScheduleTable({ schedule, language }: ScheduleTableProps) {
    const [selectedDay, setSelectedDay] = useState(0);
    const currentSchedule = schedule[selectedDay];

    // Calculate which venues and courts should be hidden based on availability
    const visibleVenueData = useMemo(() => {
        if (!currentSchedule) return [];

        return currentSchedule.venues.map(venueData => {
            // Filter courts that have at least one available slot
            const visibleCourts = venueData.courtsAvailability.filter(courtData => {
                return courtData.slots.some(slot => slot.availability === 1);
            });

            return {
                ...venueData,
                courtsAvailability: visibleCourts,
                hasVisibleCourts: visibleCourts.length > 0
            };
        }).filter(venueData => venueData.hasVisibleCourts);
    }, [currentSchedule]);

    // Get time slots that have at least one available court
    const visibleTimeSlots = useMemo(() => {
        if (!currentSchedule || visibleVenueData.length === 0) return [];

        const timeSlots = currentSchedule.venues[0].courtsAvailability[0].slots.map(slot => slot.time);

        return timeSlots.filter((time, slotIndex) => {
            return visibleVenueData.some(venueData =>
                venueData.courtsAvailability.some(courtData =>
                    courtData.slots[slotIndex]?.availability === 1
                )
            );
        });
    }, [currentSchedule, visibleVenueData]);

    if (!currentSchedule) return null;

    return (
        <div className="w-full">
            {/* Day Navigation */}
            <div className="flex overflow-x-auto gap-2 mb-4 pb-2">
                {schedule.map((day, index) => (
                    <button
                        key={index}
                        onClick={() => setSelectedDay(index)}
                        className={`px-4 py-2 whitespace-nowrap rounded-lg transition-colors ${
                            selectedDay === index
                                ? 'bg-blue-500 text-white'
                                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                        }`}
                    >
                        {day.dayName}
                    </button>
                ))}
            </div>

            {visibleVenueData.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                    <p className="text-lg mb-2">🎾</p>
                    <p>{language === 'en' ? 'All courts are booked for this day!' : 'Wszystkie korty są zajęte tego dnia!'}</p>
                    <p className="text-sm mt-1">
                        {language === 'en' ? 'Try selecting another day or check back later.' : 'Spróbuj wybrać inny dzień lub sprawdź ponownie później.'}
                    </p>
                </div>
            ) : (
                <>
                    {/* Available courts counter */}
                    <div className="mb-4 text-sm text-gray-600">
                        {language === 'en'
                            ? `Showing ${visibleVenueData.reduce((acc, venue) => acc + venue.courtsAvailability.length, 0)} courts with available slots`
                            : `Wyświetlane są ${visibleVenueData.reduce((acc, venue) => acc + venue.courtsAvailability.length, 0)} korty z dostępnymi slotami`
                        }
                    </div>

                    {/* Schedule Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse min-w-[800px]">
                            <thead>
                            <tr>
                                <th className="sticky left-0 z-20 bg-white border border-gray-300 p-2 text-left w-20">
                                    {getTranslation('time', language)}
                                </th>
                                {visibleVenueData.map((venueData) => (
                                    <th
                                        key={venueData.venue.id}
                                        colSpan={venueData.courtsAvailability.length}
                                        className="border border-gray-300 bg-gray-100 p-2 text-center"
                                    >
                                        <div className="font-bold">{venueData.venue.name}</div>
                                        <div className="text-xs text-gray-500 font-normal">
                                            {venueData.courtsAvailability.length} {getTranslation('courts', language)}
                                        </div>
                                    </th>
                                ))}
                            </tr>
                            <tr>
                                <th className="sticky left-0 z-20 bg-white border border-gray-300"></th>
                                {visibleVenueData.map((venueData) =>
                                    venueData.courtsAvailability.map((courtData) => (
                                        <th
                                            key={`${venueData.venue.id}-${courtData.court.id}`}
                                            className="border border-gray-300 bg-gray-50 p-1 text-center text-xs font-normal min-w-[60px]"
                                        >
                                            <div className="whitespace-nowrap">{courtData.court.name}</div>
                                            <div className="text-gray-500">{courtData.court.shortName}</div>
                                        </th>
                                    ))
                                )}
                            </tr>
                            </thead>
                            <tbody>
                            {visibleTimeSlots.map((time) => {
                                const originalSlotIndex = currentSchedule.venues[0].courtsAvailability[0].slots.findIndex(slot => slot.time === time);

                                return (
                                    <tr key={time}>
                                        <td className="sticky left-0 z-10 bg-white border border-gray-300 p-2 font-medium">
                                            {time}
                                        </td>
                                        {visibleVenueData.map((venueData) =>
                                            venueData.courtsAvailability.map((courtData) => {
                                                const slot = courtData.slots[originalSlotIndex];
                                                if (!slot) return null;

                                                return (
                                                    <td
                                                        key={`${venueData.venue.id}-${courtData.court.id}-${time}`}
                                                        className={`border border-gray-300 p-2 text-center cursor-pointer transition-colors ${
                                                            slot.availability === 1
                                                                ? 'bg-green-100 hover:bg-green-200'
                                                                : 'bg-red-100 hover:bg-red-200'
                                                        }`}
                                                        title={`${venueData.venue.name} - ${courtData.court.name} at ${time}`}
                                                    >
                                                        <span className={`text-sm font-medium ${slot.availability === 1 ? 'text-green-700' : 'text-red-700'}`}>
                                                            {slot.availability === 1 ? '✓' : '✗'}
                                                        </span>
                                                    </td>
                                                );
                                            })
                                        )}
                                    </tr>
                                );
                            })}
                            </tbody>
                        </table>
                    </div>

                    {/* Legend */}
                    <div className="flex gap-4 mt-4 text-sm">
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 bg-green-100 border border-gray-300 flex items-center justify-center">
                                <span className="text-xs text-green-700">✓</span>
                            </div>
                            <span>{getTranslation('available', language)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 bg-red-100 border border-gray-300 flex items-center justify-center">
                                <span className="text-xs text-red-700">✗</span>
                            </div>
                            <span>{getTranslation('booked', language)}</span>
                        </div>
                    </div>

                    {/* Show hidden venues info */}
                    {currentSchedule.venues.length > visibleVenueData.length && (
                        <div className="mt-4 p-3 bg-yellow-50 rounded-lg text-sm text-gray-600">
                            <p className="font-medium mb-1">
                                {language === 'en' ? 'Hidden venues:' : 'Ukryte lokalizacje:'}
                            </p>
                            <p>
                                {currentSchedule.venues.length - visibleVenueData.length} {language === 'en' ? 'venues with no available courts are hidden.' : 'lokalizacji bez dostępnych kortów jest ukrytych.'}
                            </p>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}