const MessageSkeleton = ({ isUser = false }) => {
    return (
      <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} my-2`}>
        <div
          className={`p-3 rounded-2xl animate-pulse ${
            isUser ? '  <div className="h-4 bg-gradient-to-b from-background via-muted to-background dark:from-slate-950 dark:via-slate-900 dark:to-slate-950  rounded w-3/4 mb-2"></div>' : '  <div className="h-4 bg-gradient-to-b from-background via-muted to-background dark:from-slate-950 dark:via-slate-900 dark:to-slate-950  rounded w-3/4 mb-2"></div>'
          } w-[70%] max-w-xs`}
        >
          <div className="h-4 bg-gray-600/45 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-600/45 rounded w-2/3 mb-2"></div>
          <div className="h-4 bg-gray-600/45 rounded w-1/2"></div>
        </div>
      </div>
    );
  };
  
  export default MessageSkeleton;
  