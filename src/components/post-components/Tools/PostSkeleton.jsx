export const PostSkeleton=()=>{
     return (
    <div className="w-full max-w-[360px] bg-base-100 rounded-2xl shadow-md p-4 mx-auto mb-6">
      
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="skeleton w-10 h-10 rounded-full"></div>
        <div className="flex-1">
          <div className="skeleton h-4 w-24 mb-2"></div>
          <div className="skeleton h-3 w-16"></div>
        </div>
      </div>

      {/* Media (image / video) */}
      <div className="skeleton w-full h-48 rounded-xl mb-4"></div>

      {/* Actions */}
      <div className="flex gap-4 mb-3">
        <div className="skeleton h-6 w-6 rounded-md"></div>
        <div className="skeleton h-6 w-6 rounded-md"></div>
        <div className="skeleton h-6 w-6 rounded-md"></div>
      </div>

      {/* Text */}
      <div className="space-y-2">
        <div className="skeleton h-4 w-full"></div>
        <div className="skeleton h-4 w-5/6"></div>
      </div>

    </div>
  );
}