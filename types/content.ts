// types/content.ts
export interface Artist {
  id: string;
  name: string;
  bio: string;
  image: string;
  instruments: string[];
}

export interface VideoDemo {
  id: string;
  title: string;
  url: string;
  thumbnail: string;
  duration: string;
}

// hooks/useContent.ts
import { useState } from 'react';

const useContent = () => {
  const [featuredArtists] = useState<Artist[]>([/* your artist data */]);
  const [videoDemos] = useState<VideoDemo[]>([/* your video data */]);

  return { featuredArtists, videoDemos };
};

export default useContent;