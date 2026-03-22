export default function AdminLoading() {
  return (
    <div className="p-6 space-y-6 animate-pulse">
      {/* Header skeleton */}
      <div className="flex items-center justify-between">
        <div className="h-8 w-48 bg-gray-200 rounded" />
        <div className="h-10 w-32 bg-gray-200 rounded-lg" />
      </div>

      {/* Stats row skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-white rounded-xl p-5 border border-gray-100">
            <div className="h-4 w-24 bg-gray-200 rounded mb-3" />
            <div className="h-8 w-16 bg-gray-200 rounded" />
          </div>
        ))}
      </div>

      {/* Table skeleton */}
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100">
          <div className="h-5 w-32 bg-gray-200 rounded" />
        </div>
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex items-center gap-4 p-4 border-b border-gray-50">
            <div className="h-10 w-10 bg-gray-200 rounded-full" />
            <div className="flex-1 space-y-2">
              <div className="h-4 w-3/4 bg-gray-200 rounded" />
              <div className="h-3 w-1/2 bg-gray-100 rounded" />
            </div>
            <div className="h-8 w-20 bg-gray-200 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}
