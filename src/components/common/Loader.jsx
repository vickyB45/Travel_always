const Loader = ({ className = "" }) => {
  return (
    <div className={`w-full flex items-center justify-center py-10 ${className}`}>
      <div className="flex gap-2">
        <span className="h-3 w-3 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
        <span className="h-3 w-3 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
        <span className="h-3 w-3 bg-gray-400 rounded-full animate-bounce" />
      </div>
    </div>
  );
};

export default Loader;
