// components/content/VideoDemoCard.tsx
export default function VideoDemoCard({ video }: { video: Video }) {
  return (
    <div className="card bg-base-200 overflow-hidden">
      <div className="aspect-video">
        <iframe
          src={video.url}
          className="w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
      <div className="card-body">
        <h3 className="card-title text-gold">{video.title}</h3>
        <div className="flex items-center gap-2 text-silver">
          <span className="badge badge-outline">
            {video.type === 'demo' ? 'Demo' : 'Review'}
          </span>
          <span>{video.duration}</span>
        </div>
      </div>
    </div>
  );
}