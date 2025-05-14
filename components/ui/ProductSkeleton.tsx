// components/ui/ProductSkeleton.tsx
export default function ProductSkeleton() {
  return (
    <div className="card bg-base-100 shadow-xl animate-pulse">
      <div className="h-48 bg-base-300 rounded-t-xl"></div>
      <div className="card-body space-y-4">
        <div className="h-6 bg-base-300 rounded w-3/4"></div>
        <div className="h-4 bg-base-300 rounded w-1/4"></div>
        <div className="h-4 bg-base-300 rounded w-full"></div>
        <div className="h-4 bg-base-300 rounded w-full"></div>
      </div>
    </div>
  );
}