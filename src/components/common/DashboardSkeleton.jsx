const DashboardSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-pulse">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="h-32 bg-gray-200 rounded-xl"
        />
      ))}
    </div>
  );
};

export default DashboardSkeleton;
