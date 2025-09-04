'use client';

import { useState } from 'react';
import { DaySchedule } from '@/types';

interface ScheduleTableProps {
    schedule: DaySchedule[];
}

export default function ScheduleTable({ schedule }: ScheduleTableProps) {
    const [selectedDay, setSelectedDay] = useState(0);
    const currentSchedule = schedule[selectedDay];

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

            {/* Schedule Table */}
            <div className="overflow-x-auto">
                <table className="w-full border-collapse min-w-[1200px]">
                    <thead>
                    <tr>
                        <th className="sticky left-0 z-20 bg-white border border-gray-300 p-2 text-left w-20">
                            Час
                        </th>
                        {currentSchedule.venues.map((venueData) => (
                            <th
                                key={venueData.venue.id}
                                colSpan={venueData.venue.courts.length}
                                className="border border-gray-300 bg-gray-100 p-2 text-center"
                            >
                                <div className="font-bold">{venueData.venue.name}</div>
                            </th>
                        ))}
                    </tr>
                    <tr>
                        <th className="sticky left-0 z-20 bg-white border border-gray-300"></th>
                        {currentSchedule.venues.map((venueData) =>
                            venueData.venue.courts.map((court) => (
                                <th
                                    key={`${venueData.venue.id}-${court.id}`}
                                    className="border border-gray-300 bg-gray-50 p-1 text-center text-xs font-normal min-w-[60px]"
                                >
                                    <div className="whitespace-nowrap">{court.name}</div>
                                    <div className="text-gray-500">{court.shortName}</div>
                                </th>
                            ))
                        )}
                    </tr>
                    </thead>
                    <tbody>
                    {currentSchedule.venues[0].courtsAvailability[0].slots.map((_, slotIndex) => {
                        const time = currentSchedule.venues[0].courtsAvailability[0].slots[slotIndex].time;

                        return (
                            <tr key={time}>
                                <td className="sticky left-0 z-10 bg-white border border-gray-300 p-2 font-medium">
                                    {time}
                                </td>
                                {currentSchedule.venues.map((venueData) =>
                                        venueData.courtsAvailability.map((courtData) => {
                                            const slot = courtData.slots[slotIndex];
                                            return (
                                                <td
                                                    key={`${venueData.venue.id}-${courtData.court.id}-${time}`}
                                                    className={`border border-gray-300 p-2 text-center cursor-pointer transition-colors ${
                                                        slot.availability === 1
                                                            ? 'bg-green-100 hover:bg-green-200'
                                                            : 'bg-red-100 hover:bg-red-200'
                                                    }`}
                                                >
                          <span className={slot.availability === 1 ? 'text-green-700' : 'text-red-700'}>
                            {slot.availability}
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
                    <div className="w-4 h-4 bg-green-100 border border-gray-300"></div>
                    <span>Вільно</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-red-100 border border-gray-300"></div>
                    <span>Зайнято</span>
                </div>
            </div>
        </div>
    );
}