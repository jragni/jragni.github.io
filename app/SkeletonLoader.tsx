/**
 * Skeleton Loader Components
 */

interface SkeletonProps {
  className?: string;
}

export function SkeletonBox({ className = '' }: SkeletonProps) {
  return (
    <div className={`bg-navy/50 animate-pulse rounded ${className}`}></div>
  );
}

export function SkeletonText({ className = '' }: SkeletonProps) {
  return (
    <div className={`bg-navy/50 animate-pulse rounded h-4 ${className}`}></div>
  );
}

export function SkeletonProjectCard() {
  return (
    <div className="w-full flex md:flex-nowrap flex-wrap gap-4 opacity-60">
      <div className="min-w-[200px] pt-2">
        <SkeletonBox className="w-[200px] h-[100px]" />
      </div>
      <div className="flex-1 space-y-3">
        <SkeletonText className="w-3/4" />
        <SkeletonText className="w-full" />
        <SkeletonText className="w-5/6" />
        <div className="flex gap-2 mt-2">
          <SkeletonBox className="w-16 h-6 rounded-full" />
          <SkeletonBox className="w-20 h-6 rounded-full" />
          <SkeletonBox className="w-14 h-6 rounded-full" />
        </div>
      </div>
    </div>
  );
}

export function SkeletonExperienceCard() {
  return (
    <div className="space-y-4 opacity-60">
      <div className="flex justify-between items-start">
        <SkeletonText className="w-48" />
        <SkeletonText className="w-24" />
      </div>
      <SkeletonText className="w-full" />
      <SkeletonText className="w-4/5" />
      <div className="flex gap-2 mt-2">
        <SkeletonBox className="w-16 h-6 rounded-full" />
        <SkeletonBox className="w-20 h-6 rounded-full" />
        <SkeletonBox className="w-18 h-6 rounded-full" />
      </div>
    </div>
  );
}