import { motion } from 'framer-motion';

interface SimpleRobotProps {
  className?: string;
}

export function SimpleRobot({ className = "" }: SimpleRobotProps) {
  return (
    <div className={`w-full h-full flex items-center justify-center ${className}`}>
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative"
      >
        {/* Robot Body */}
        <motion.div
          animate={{
            y: [0, -10, 0],
            rotateY: [0, 5, -5, 0]
          }}
          transition={{
            y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
            rotateY: { duration: 4, repeat: Infinity, ease: "easeInOut" }
          }}
          className="relative w-32 h-40 mx-auto"
        >
          {/* Head */}
          <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl mx-auto mb-2 relative overflow-hidden shadow-lg shadow-indigo-500/50">
            {/* Eyes */}
            <motion.div 
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="flex justify-center space-x-2 pt-4"
            >
              <div className="w-3 h-3 bg-cyan-400 rounded-full shadow-lg shadow-cyan-400/50"></div>
              <div className="w-3 h-3 bg-cyan-400 rounded-full shadow-lg shadow-cyan-400/50"></div>
            </motion.div>
            {/* Mouth */}
            <div className="w-8 h-2 bg-cyan-400/50 rounded-full mx-auto mt-2"></div>
          </div>
          
          {/* Body */}
          <div className="w-24 h-16 bg-gradient-to-br from-slate-700 to-slate-800 rounded-lg mx-auto relative overflow-hidden shadow-lg">
            {/* Chest panel */}
            <div className="w-16 h-10 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-md mx-auto mt-2 relative">
              <motion.div
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-full h-full bg-cyan-400/20 rounded-md absolute inset-0"
              ></motion.div>
            </div>
          </div>
          
          {/* Arms */}
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -left-4 top-20 w-3 h-12 bg-gradient-to-b from-slate-600 to-slate-700 rounded-full shadow-lg"
          ></motion.div>
          <motion.div
            animate={{ rotate: [0, -10, 10, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -right-4 top-20 w-3 h-12 bg-gradient-to-b from-slate-600 to-slate-700 rounded-full shadow-lg"
          ></motion.div>
        </motion.div>
        
        {/* Floating particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full"
            style={{
              left: `${30 + i * 15}%`,
              top: `${20 + (i % 2) * 40}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0, 1, 0],
              scale: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 2 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.3,
              ease: "easeInOut"
            }}
          />
        ))}
        
        {/* Glow effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-cyan-500/20 rounded-full blur-xl scale-150 -z-10"></div>
      </motion.div>
    </div>
  );
}
