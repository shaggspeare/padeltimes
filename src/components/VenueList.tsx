import { Venue } from '@/types';

interface VenueListProps {
    venues: Venue[];
}

export default function VenueList({ venues }: VenueListProps) {
    return (
        <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Де можна пограти в Падел-теніс?</h2>
            <p className="text-gray-600 mb-8">Дивись адреси найкращих падел кортів Києва</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {venues.map((venue) => (
                    <a
                        key={venue.id}
                        href={venue.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group block rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
                    >
                        <div className="aspect-video bg-gray-200 relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-500 opacity-75"></div>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="text-white text-center">
                                    <div className="text-4xl mb-2">🎾</div>
                                    <div className="text-xs opacity-75">Padel Court</div>
                                </div>
                            </div>
                        </div>
                        <div className="p-4 bg-white">
                            <h3 className="font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                                {venue.description || venue.name}
                            </h3>
                            <p className="text-sm text-gray-500 mt-1">{venue.courts.length} кортів</p>
                        </div>
                    </a>
                ))}
            </div>
        </div>
    );
}