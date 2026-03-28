interface DifficultyBadgeProps {
  difficulty?: string;
  className?: string;
}

const difficultyConfig: Record<string, { label: string; classes: string }> = {
  easy: { label: 'Easy', classes: 'bg-green-100 text-green-700 border-green-200' },
  moderate: { label: 'Moderate', classes: 'bg-amber-100 text-amber-700 border-amber-200' },
  challenging: { label: 'Challenging', classes: 'bg-orange-100 text-orange-700 border-orange-200' },
  strenuous: { label: 'Strenuous', classes: 'bg-red-100 text-red-700 border-red-200' },
  difficult: { label: 'Difficult', classes: 'bg-red-100 text-red-700 border-red-200' },
};

export default function DifficultyBadge({ difficulty, className = '' }: DifficultyBadgeProps) {
  if (!difficulty) return null;
  const key = difficulty.toLowerCase();
  const config = difficultyConfig[key] || { label: difficulty, classes: 'bg-gray-100 text-gray-600 border-gray-200' };

  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${config.classes} ${className}`}>
      <span className='w-1.5 h-1.5 rounded-full bg-current' />
      {config.label}
    </span>
  );
}
