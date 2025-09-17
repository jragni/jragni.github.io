/**
 * Section Header
 */

export interface SectionHeaderProps {
  label: string;
}

export default function SectionHeader({ label }: SectionHeaderProps) {
  return (
    <div className="md:hidden py-6 sticky top-0 bg-navy z-40 text-lightest-slate flex items-center justify-between">
      <h2 className="text-xl sm:text-2xl font-bold">
        {label}
      </h2>
    </div>
  );
}