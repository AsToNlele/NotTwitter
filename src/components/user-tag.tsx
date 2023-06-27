export const UserTag = ({ horizontal = false }: { horizontal?: boolean }) => {
  return (
    <div
      className={`flex items-start text-sm ${
        horizontal ? "gap-2" : "flex-col"
      }`}
    >
      <span className="font-semibold">AsToN</span>
      <span className="text-slate-500">@AsToN</span>
    </div>
  );
};
