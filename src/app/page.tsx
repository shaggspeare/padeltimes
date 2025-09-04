'use client';

import { useState, useEffect } from 'react';
import ScheduleTable from '@/components/ScheduleTable';
import WeatherWidget from '@/components/WeatherWidget';
import VenueList from '@/components/VenueList';
import { generateScheduleForWeek, venues } from '@/lib/mockData';
import { DaySchedule } from '@/types';

export default function Home() {
  const [schedule, setSchedule] = useState<DaySchedule[]>([]);

  useEffect(() => {
    setSchedule(generateScheduleForWeek());
  }, []);

  return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-gray-800">
                PadelTime — Всі падел корти Києва
              </h1>
              <div className="text-sm text-gray-500">
                Оновлено: {new Date().toLocaleString('uk-UA')}
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8">
          {/* Weather Widget */}
          <WeatherWidget />

          {/* Schedule Table */}
          {schedule.length > 0 && (
              <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
                <ScheduleTable schedule={schedule} />
              </div>
          )}

          {/* Venue List */}
          <VenueList venues={venues} />

          {/* Additional padel park */}
          <div className="mt-8 p-6 bg-yellow-50 rounded-lg">
            <h3 className="font-bold mb-2">Також рекомендуємо:</h3>
            <a
                href="https://www.tennispark.com.ua/padel-tennis"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
            >
              Padel Park - Tennis Park
            </a>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-gray-800 text-white py-8 mt-12">
          <div className="container mx-auto px-4 text-center">
            <p className="mb-2">© 2024 PadelTime Київ</p>
            <p className="text-sm text-gray-400">
              Розклад падел кортів оновлюється в реальному часі
            </p>
          </div>
        </footer>
      </div>
  );
}