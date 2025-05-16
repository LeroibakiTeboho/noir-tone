// app/artists/page.tsx
import { useContent } from '@/contexts/ContentContext';
import ArtistSpotlight from '@/components/content/ArtistSpotlight';

export default function ArtistsPage() {
  const { featuredArtists } = useContent();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gold mb-8">Featured Artists</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {featuredArtists.map(artist => (
          <ArtistSpotlight key={artist.id} artist={artist} />
        ))}
      </div>
    </div>
  );
}