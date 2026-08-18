export default function RoadDivider({ className = "" }) {
  return (
    <div className={`mx-auto flex h-16 w-px flex-col items-center ${className}`}>
      <div className="road-stitch h-full" />
    </div>
  );
}
