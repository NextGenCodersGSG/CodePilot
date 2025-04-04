export default function LoadingSpinner({className}: {className?: string}) {
    return (
      <span className={`inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin ${className}`}></span>
    );
  }