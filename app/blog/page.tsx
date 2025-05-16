// app/blog/page.tsx
"use client";
import { useContent } from '@/contexts/ContentContext';
import BlogPostCard from '@/components/content/BlogPostCard';

export default function BlogPage() {
  const { blogPosts } = useContent();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gold mb-8">Music Tips & Blog</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {blogPosts.map(post => (
          <BlogPostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}