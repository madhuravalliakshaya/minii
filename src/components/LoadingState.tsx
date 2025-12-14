import { motion } from 'framer-motion';

const LoadingState = () => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {Array.from({ length: 10 }).map((_, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: index * 0.05 }}
          className="p-4 rounded-xl bg-card"
        >
          <div className="aspect-square mb-4 rounded-lg bg-muted animate-pulse" />
          <div className="space-y-2">
            <div className="h-4 bg-muted rounded animate-pulse" />
            <div className="h-3 bg-muted rounded w-2/3 animate-pulse" />
            <div className="flex justify-between">
              <div className="h-3 bg-muted rounded w-1/4 animate-pulse" />
              <div className="h-3 bg-muted rounded w-1/4 animate-pulse" />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default LoadingState;
