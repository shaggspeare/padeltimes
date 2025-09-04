'use client';

import { useState, useEffect } from 'react';
import ScheduleTable from '@/components/ScheduleTable';
import WeatherWidget from '@/components/WeatherWidget';
import VenueList from '@/components/VenueList';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { generateScheduleForWeek, venues } from '@/lib/mockData';
import { getTranslation } from '@/lib/translations';
import { DaySchedule, Language } from '@/types';

export default function Home() {
  const [schedule, setSchedule] = useState<DaySchedule[]>([]);
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    // Check for saved language preference or browser language
    const savedLanguage = localStorage.getItem('padel-language') as Language;
    const browserLanguage = navigator.language.startsWith('pl') ? 'pl' : 'en';
    const initialLanguage = savedLanguage || browserLanguage;

    setLanguage(initialLanguage);
    setSchedule(generateScheduleForWeek(initialLanguage));
  }, []);

  const handleLanguageChange = (newLanguage: Language) => {
    setLanguage(newLanguage);
    setSchedule(generateScheduleForWeek(newLanguage));
    localStorage.setItem('padel-language', newLanguage);

    // Update document language
    document.documentElement.lang = newLanguage;
  };

  return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-gray-800">
                {getTranslation('siteTitle', language)}
              </h1>
              <div className="flex items-center gap-4">
                <div className="text-sm text-gray-500">
                  {getTranslation('updatedAt', language)}: {new Date().toLocaleString(language === 'pl' ? 'pl-PL' : 'en-US')}
                </div>
                <LanguageSwitcher
                    currentLanguage={language}
                    onLanguageChange={handleLanguageChange}
                />
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8">
          {/* Weather Widget */}
          <WeatherWidget language={language} />

          {/* Schedule Table */}
          {schedule.length > 0 && (
              <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
                <ScheduleTable schedule={schedule} language={language} />
              </div>
          )}

          {/* Venue List */}
          <VenueList venues={venues} language={language} />

          {/* Additional recommendations */}
          <div className="mt-8 p-6 bg-yellow-50 rounded-lg">
            <h3 className="font-bold mb-2">{getTranslation('alsoRecommend', language)}</h3>
            <div className="space-y-2">
              <a
                  href="https://playtomic.com/warsaw"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-blue-600 hover:underline"
              >
                Playtomic Warsaw - {language === 'en' ? 'Book courts online' : 'Rezerwuj korty online'}
              </a>
              <a
                  href="https://padellands.com/en/pistas-de-padel/europa/poland/warsaw"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-blue-600 hover:underline"
              >
                Padellands - {language === 'en' ? 'Complete directory' : 'Kompletny katalog'}
              </a>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-gray-800 text-white py-8 mt-12">
          <div className="container mx-auto px-4 text-center">
            <p className="mb-2">{getTranslation('footerCopyright', language)}</p>
            <p className="text-sm text-gray-400">
              {getTranslation('footerDescription', language)}
            </p>
            <div className="mt-4 flex justify-center items-center gap-6 text-xs text-gray-400">
              <span>🎾 Padel in Warsaw</span>
              <span>🏓 Real-time updates</span>
              <span>📱 Mobile friendly</span>
            </div>
          </div>
        </footer>
      </div>
  );
}