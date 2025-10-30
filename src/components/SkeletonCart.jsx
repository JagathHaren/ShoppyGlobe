const SkeletonCard = () => {
  return (
    <div className="animate-pulse bg-white p-4 rounded-xl shadow">
      <div className="h-40 bg-gray-700 rounded mb-4"></div>
      <div className="h-4 bg-gray-700 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-gray-700 rounded w-1/2 mb-2"></div>
      <div className="h-8 bg-gray-700 rounded mt-4 w-1/2"></div>
    </div>
  );
};

export default SkeletonCard;
