import Link from "next/link";
import Image from "next/image";

// Add the Artist interface
interface Artist {
  id: string;
  name: string;
  bio: string;
  genre: string;
  image: string;
  // Add any other required properties
}

export default function ArtistSpotlight({ artist }: { artist: Artist }) {
  return (
    <div className="card bg-base-200 overflow-hidden">
      <figure>
        <Image
          src={artist.image}
          alt={artist.name}
          width={400}
          height={300}
          className="w-full h-48 object-cover"
        />
      </figure>
      <div className="card-body">
        <h3 className="card-title text-gold">{artist.name}</h3>
        <p className="text-silver line-clamp-3">{artist.bio}</p>
        <div className="badge badge-primary">{artist.genre}</div>
        <Link
          href={`/artists/${artist.id}`}
          className="btn btn-ghost text-gold mt-4"
        >
          View Profile
        </Link>
      </div>
    </div>
  );
}