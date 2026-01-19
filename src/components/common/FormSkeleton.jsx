const FormSkeleton = () => {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="h-4 w-24 bg-gray-300 rounded" />
      <div className="h-10 bg-gray-300 rounded" />

      <div className="h-4 w-24 bg-gray-300 rounded mt-4" />
      <div className="h-10 bg-gray-300 rounded" />

      <div className="h-10 bg-gray-400 rounded mt-6" />
    </div>
  );
};

export default FormSkeleton;
