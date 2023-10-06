export default function Loading() {
  return (
    <div className="fixed top-0 left-0 bg-deep-lilac/40 h-screen w-screen z-40">
      <span className="w-12 h-12 rounded-full inline-block box-border animate-loader absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2"></span>
    </div>
  );
}
