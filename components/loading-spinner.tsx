export function LoadingSpinner() {
  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="h-12 w-12 animate-spin rounded-full border-t-2 border-b-2 border-primary" />
    </div>
  );
}
