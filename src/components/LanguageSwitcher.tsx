'use client';

import { Language } from '@/types';
import { getTranslation } from '@/lib/translations';

interface LanguageSwitcherProps {
    currentLanguage: Language;
    onLanguageChange: (language: Language) => void;
}

export default function LanguageSwitcher({ currentLanguage, onLanguageChange }: LanguageSwitcherProps) {
    const otherLanguage: Language = currentLanguage === 'en' ? 'pl' : 'en';

    return (
        <button
            onClick={() => onLanguageChange(otherLanguage)}
            className="flex items-center gap-2 px-3 py-2 text-sm bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            title={`Switch to ${otherLanguage === 'en' ? 'English' : 'Polish'}`}
        >
            <span className="text-lg">
                {otherLanguage === 'en' ? '🇺🇸' : '🇵🇱'}
            </span>
            <span>{getTranslation('languageSwitch', currentLanguage)}</span>
        </button>
    );
}