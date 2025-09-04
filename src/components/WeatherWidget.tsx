export default function WeatherWidget() {
    return (
        <div className="bg-blue-50 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-bold mb-3">Що по погоді?</h2>
            <p className="text-gray-600 mb-4">
                Бажано глянути, якщо граєш на PadelBaza, GrandPrix, Padel Park
            </p>
            <a
                href="https://forecast7.com/uk/50d4530d52/kiev/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
                <span>🌤️</span>
                <span>Київ Погода</span>
            </a>
        </div>
    );
}