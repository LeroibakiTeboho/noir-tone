"use client";
import ProductCard from "@/components/ui/ProductCard";
import products from "@/data/products.json";
import AnimateWrapper from "@/components/ui/AnimateWrapper";
import ArtistSpotlight from "@/components/content/ArtistSpotlight";
import VideoDemoCard from "@/components/content/VideoDemoCard";
// import HeroSection from "@/components/sections/HeroSection";
import Footer from "@/components/sections/Footer";

interface Artist {
  id: string;
  name: string;
  instrument: string;
  image: string;
  bio: string;
}

interface VideoDemo {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
  url: string;
}

// Mock data directly in component
const featuredArtists: Artist[] = [
  {
    id: "1",
    name: "John Guitarist",
    instrument: "Guitar",
    image: "/images/artists/john.jpg",
    bio: "Award-winning guitarist with 15 years experience...",
  },
  {
    id: "2",
    name: "Sarah Pianist",
    instrument: "Piano",
    image: "/images/artists/sarah.png",
    bio: "Classically trained pianist with international accolades",
  },
];

const videoDemos: VideoDemo[] = [
  {
    id: "v1",
    title: "Beginner Guitar Lesson",
    thumbnail: "/images/videos/jazz-guitar-lesson-thumb.jpg",
    duration: "12:34",
    url: "https://youtu.be/vIg1GxpxE6E",
  },
  {
    id: "v2",
    title: "Piano Maintenance Guide",
    thumbnail: "/images/videos/piano-care.jpg",
    duration: "08:45",
    url: "https://youtu.be/vIg1GxpxE6E",
  },
];

export default function Home() {
  return (
    <AnimateWrapper>
      <main className="container mx-auto px-4 py-8">
        {/* <HeroSection
          title="Discover Your Perfect Instrument"
          subtitle="Premium musical instruments crafted for professionals and enthusiasts"
          ctaText="Explore Collection"
          bgImage="/images/hero-bg.png" // Optional custom image
        /> */}
        <h1 className="text-4xl font-bold text-gold mb-8">
          Featured Instruments
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
          {products
            .sort(() => 0.5 - Math.random()) // Shuffle array
            .slice(0, 6)
            .map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
        </div>

        <section className="py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-gold mb-8">
              Featured Artists
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredArtists.map((artist) => (
                <ArtistSpotlight key={artist.id} artist={artist} />
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 bg-base-200">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-gold mb-8">Latest Videos</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {videoDemos.map((video) => (
                <VideoDemoCard key={video.id} video={video} />
              ))}
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </AnimateWrapper>
  );
}
