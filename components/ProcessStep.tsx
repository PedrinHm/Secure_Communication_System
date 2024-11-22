interface ProcessStepProps {
  title: string;
  status: 'completed' | 'current' | 'pending';
}

export function ProcessStep({ title, status }: ProcessStepProps) {
  const statusStyles = {
    completed: 'text-green-500',
    current: 'text-blue-500',
    pending: 'text-gray-400'
  };

  return (
    <li className={`flex items-center justify-center font-bold px-2 ${statusStyles[status]}`}>
      <span className="text-center break-words w-full">
        {title}
      </span>
    </li>
  );
} 