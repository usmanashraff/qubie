const MessageSkeleton = ({ isUser = false }) => {
    return (
      <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} my-2`}>
        <div
          className={`p-3 rounded-2xl animate-pulse ${
            isUser ? 'bg-slate-800' : 'bg-slate-800'
          } w-[70%] max-w-xs`}
        >
          <div className="h-4 bg-gray-600 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-600 rounded w-2/3 mb-2"></div>
          <div className="h-4 bg-gray-600 rounded w-1/2"></div>
        </div>
      </div>
    );
  };
  
  export default MessageSkeleton;
  