import { Language } from '@/types';
import { getTranslation } from '@/lib/translations';

interface WeatherWidgetProps {
    language: Language;
}

export default function WeatherWidget({ language }: WeatherWidgetProps) {
    return (
        <div className="bg-blue-50 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-bold mb-3">{getTranslation('weatherTitle', language)}</h2>
            <p className="text-gray-600 mb-4">
                {getTranslation('weatherDescription', language)}
            </p>
            <a
                href="https://weather.com/weather/today/l/52.23,21.01"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
                <span>🌤️</span>
                <span>{getTranslation('warsawWeather', language)}</span>
            </a>
        </div>
    );
}