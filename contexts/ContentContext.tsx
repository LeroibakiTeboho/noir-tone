// contexts/ContentContext.tsx
'use client';

import { createContext, ReactNode, useContext, useState, useEffect } from 'react';

interface BlogPost {
  id: string;
  title: string;
  content: string;
  author: string;
  date: string;
  tags: string[];
}

interface Artist {
  id: string;
  name: string;
  bio: string;
  image: string;
  genre: string;
  products: string[]; // Related product IDs
}

interface Video {
  id: string;
  title: string;
  url: string;
  type: 'demo' | 'review';
  productId?: string;
  duration: string;
}

interface ContentContextType {
  blogPosts: BlogPost[];
  featuredArtists: Artist[];
  videoDemos: Video[];
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export function ContentProvider({ children }: { children: ReactNode }) {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [featuredArtists, setFeaturedArtists] = useState<Artist[]>([]);
  const [videoDemos, setVideoDemos] = useState<Video[]>([]);

  useEffect(() => {
    // Load mock data
    const mockBlogPosts: BlogPost[] = [
      {
        id: '1',
        title: '5 Tips for Maintaining Your Guitar',
        content: '...',
        author: 'Pro Guitarist',
        date: '2024-03-15',
        tags: ['maintenance', 'guitar']
      }
    ];
    
    const mockArtists: Artist[] = [
      {
        id: '1',
        name: 'Jazz Master',
        bio: 'Award-winning jazz guitarist...',
        image: '/artists/jazz-master.jpg',
        genre: 'Jazz',
        products: ['1', '2']
      }
    ];

    const mockVideos: Video[] = [
      {
        id: '1',
        title: 'Fender Stratocaster Demo',
        url: 'https://youtube.com/embed/xyz',
        type: 'demo',
        productId: '1',
        duration: '8:15'
      }
    ];

    setBlogPosts(mockBlogPosts);
    setFeaturedArtists(mockArtists);
    setVideoDemos(mockVideos);
  }, []);

  return (
    <ContentContext.Provider value={{ blogPosts, featuredArtists, videoDemos }}>
      {children}
    </ContentContext.Provider>
  );
}

export const useContent = () => {
  const context = useContext(ContentContext);
  if (!context) throw new Error('useContent must be used within ContentProvider');
  return context;
};