// components/content/BlogPostCard.tsx
import Link from 'next/link';

export default function BlogPostCard({ post }: { post: BlogPost }) {
  return (
    <div className="card bg-base-200 hover:shadow-xl transition-shadow">
      <div className="card-body">
        <h3 className="card-title text-gold">{post.title}</h3>
        <div className="flex items-center gap-4 text-silver">
          <span>{post.author}</span>
          <span>•</span>
          <span>{new Date(post.date).toLocaleDateString()}</span>
        </div>
        <div className="flex gap-2 mt-2">
          {post.tags.map(tag => (
            <span key={tag} className="badge badge-outline">{tag}</span>
          ))}
        </div>
        <Link href={`/blog/${post.id}`} className="btn btn-ghost text-gold mt-4">
          Read More
        </Link>
      </div>
    </div>
  );
}