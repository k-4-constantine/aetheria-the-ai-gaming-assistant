import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
type AetheriaLogoProps = {
  className?: string;
};
export function AetheriaLogo({ className }: AetheriaLogoProps) {
  return (
    <motion.div
      className={cn('font-display text-2xl tracking-wider text-foreground', className)}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <span className="text-aetheria-cyan">A</span>etheria
    </motion.div>
  );
}