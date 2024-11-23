import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { motion } from "framer-motion";

interface ProcessStepProps {
  title: string;
  status: 'completed' | 'current' | 'pending';
  onReset?: () => void;
}

export function ProcessStep({ title, status, onReset }: ProcessStepProps) {
  const statusStyles = {
    completed: 'text-green-500',
    current: 'text-blue-500',
    pending: 'text-gray-400'
  };

  return (
    <li className={`flex flex-col items-center justify-center font-bold px-2 ${statusStyles[status]}`}>
      <span className="text-center break-words w-full">
        {title}
      </span>
      
      {status === 'completed' && onReset && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-center pt-4"
        >
          <Button
            variant="outline"
            onClick={onReset}
            className="hover:bg-gray-50"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Repetir
          </Button>
        </motion.div>
      )}
    </li>
  );
} 