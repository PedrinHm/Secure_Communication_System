interface StepLayoutProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

export function StepLayout({ title, subtitle, children }: StepLayoutProps) {
  return (
    <div className="space-y-6 max-w-4xl mx-auto p-6">
      <div className="border-b pb-4">
        <h2 className={THEME.components.title}>{title}</h2>
        {subtitle && <p className={THEME.components.subtitle}>{subtitle}</p>}
      </div>
      {children}
    </div>
  );
} 