import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, Box, Environment, MeshDistortMaterial } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, Lock, CheckCircle2, DownloadCloud, Volume2, VolumeX } from 'lucide-react';
import { useStore } from '../store/useStore';
import * as THREE from 'three';

// 3D Cube component with animations
const AnimatedCube = ({ progress }: { progress: number }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const noiseScale = 0.1 + (progress / 100) * 0.5;
  
  // Rotate the cube based on progress
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
      
      // Scale up based on progress
      const scale = 0.5 + (progress / 100) * 0.5;
      meshRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <Box 
      ref={meshRef} 
      args={[1.5, 1.5, 1.5]} 
      position={[0, 0, 0]}
    >
      <MeshDistortMaterial
        color="#6366F1"
        speed={2}
        distort={noiseScale}
        metalness={0.8}
        roughness={0.2}
      />
    </Box>
  );
};

// Orbiting particles
interface ParticleProps {
  count?: number;
  progress: number;
}

interface ParticleData {
  radius: number;
  speed: number;
  offset: number;
  size: number;
  color: string;
}

const Particles = ({ count = 25, progress }: ParticleProps) => {
  const positions = useRef<ParticleData[]>([]);
  const meshRef = useRef<THREE.InstancedMesh>(null);
  
  // Create random positions for particles
  useEffect(() => {
    positions.current = Array.from({ length: count }, () => ({
      radius: 2 + Math.random() * 1,
      speed: 0.2 + Math.random() * 0.5,
      offset: Math.random() * Math.PI * 2,
      size: 0.05 + Math.random() * 0.05,
      color: [
        '#6366F1', // Indigo
        '#8B5CF6', // Purple
        '#EC4899', // Pink
      ][Math.floor(Math.random() * 3)]
    }));
  }, [count]);
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const orbitFactor = progress / 100; // Orbit gets larger as progress increases
    
    if (meshRef.current) {
      for (let i = 0; i < count; i++) {
        const { radius, speed, offset, size } = positions.current[i];
        
        // Calculate position on circle
        const x = Math.cos(time * speed + offset) * radius * orbitFactor;
        const y = Math.sin(time * speed + offset) * radius * orbitFactor;
        const z = (Math.sin(time * speed * 0.5) * 0.5) * orbitFactor;
        
        // Update instance matrix
        const matrix = new THREE.Matrix4();
        matrix.compose(
          new THREE.Vector3(x, y, z),
          new THREE.Quaternion(),
          new THREE.Vector3(size, size, size)
        );
        
        meshRef.current.setMatrixAt(i, matrix);
      }
      
      meshRef.current.instanceMatrix.needsUpdate = true;
    }
  });
  
  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 16, 16]} />
      <meshStandardMaterial color="#6366F1" emissive="#6366F1" emissiveIntensity={0.5} />
    </instancedMesh>
  );
};

// Loading text that appears above the 3D objects
const LoadingText = ({ progress }: { progress: number }) => {
  return (
    <Text
      position={[0, -2, 0]}
      fontSize={0.3}
      color="#F9FAFB"
      anchorX="center"
      anchorY="middle"
      font="/fonts/JetBrainsMono-Bold.woff"
      material-toneMapped={false}
    >
      {`INITIALIZING...${Math.floor(progress)}%`}
    </Text>
  );
};

// Loading steps for 2D UI
const steps = [
  { text: 'Initializing system...', icon: <Cpu className="w-4 h-4" /> },
  { text: 'Loading assets...', icon: <DownloadCloud className="w-4 h-4" /> },
  { text: 'Establishing secure connection...', icon: <Lock className="w-4 h-4" /> },
  { text: 'System ready', icon: <CheckCircle2 className="w-4 h-4" /> }
];

interface LoadingScreen3DProps {
  progress: number;
  onComplete?: () => void;
}

export const LoadingScreen3D = ({ progress = 0, onComplete }: LoadingScreen3DProps) => {
  const { setAudioEnabled } = useStore();
  const [showAudioPrompt, setShowAudioPrompt] = useState(false);
  const [hasUserChoice, setHasUserChoice] = useState(false);
  const [skipTimer, setSkipTimer] = useState(5);
  const [currentStep, setCurrentStep] = useState(0);

  // Update loading steps based on progress
  useEffect(() => {
    if (progress < 33) {
      setCurrentStep(0);
    } else if (progress < 66) {
      setCurrentStep(1);
    } else if (progress < 100) {
      setCurrentStep(2);
    } else {
      setCurrentStep(3);
    }
  }, [progress]);

  // Complete loading sequence
  useEffect(() => {
    if (progress >= 100) {
      // Skip audio prompt and complete loading directly after 500ms
      const promptTimer = setTimeout(() => {
        // Skip audio prompt completely
        if (onComplete) onComplete();
      }, 500);
      
      return () => clearTimeout(promptTimer);
    }
  }, [progress, onComplete]);

  // Handle audio choice timer
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (showAudioPrompt && skipTimer > 0) {
      timer = setInterval(() => {
        setSkipTimer((prev) => prev - 1);
      }, 1000);
    } else if (skipTimer === 0 && !hasUserChoice) {
      handleAudioChoice(true); // Auto-enable audio when timer reaches 0
    }
    return () => clearInterval(timer);
  }, [showAudioPrompt, skipTimer, hasUserChoice]);

  const handleAudioChoice = (enabled: boolean) => {
    setAudioEnabled(enabled);
    setShowAudioPrompt(false);
    setHasUserChoice(true);
    // Call onComplete callback to signal App.tsx that loading is complete
    setTimeout(() => {
      if (onComplete) onComplete();
    }, 300);
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-primary"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Noise texture overlay */}
      <div className="absolute inset-0 opacity-20 noise-overlay" />
      
      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.1)_0%,transparent_70%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(139,92,246,0.05)_0%,transparent_60%)]" />
      
      {/* Grid lines */}
      <div className="absolute inset-0 bg-grid opacity-10" />
      
      {/* 3D Canvas */}
      <div className="w-full h-64 mb-8">
        <Canvas camera={{ position: [0, 0, 5] }}>
          <ambientLight intensity={0.1} />
          <pointLight position={[10, 10, 10]} intensity={0.5} />
          <pointLight position={[-10, -10, -10]} color="#6366F1" intensity={0.5} />
          
          <AnimatedCube progress={progress} />
          <Particles count={30} progress={progress} />
          <LoadingText progress={progress} />
          
          <Environment preset="city" />
        </Canvas>
      </div>
      
      {/* Loading status */}
      <div className="z-10 w-full max-w-md">
        <div className="h-1 w-full bg-tertiary rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-accent1 to-accent2"
            initial={{ width: '0%' }}
            animate={{ width: `${progress}%` }}
            transition={{ ease: 'easeOut' }}
          />
        </div>
        
        <div className="mt-6 space-y-3">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className={`flex items-center space-x-3 ${
                index <= currentStep ? 'text-light' : 'text-light/30'
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              <span className={`flex items-center justify-center w-6 h-6 rounded-full 
                ${index < currentStep ? 'bg-accent1/20 text-accent1' : 
                  index === currentStep ? 'bg-accent1/10 text-accent1 animate-pulse' : 
                  'bg-tertiary text-light/30'}`}
              >
                {step.icon}
              </span>
              <span className="font-mono text-sm">{step.text}</span>
              {index === currentStep && (
                <span className="loading-dots ml-2"></span>
              )}
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Audio permission prompt */}
      <AnimatePresence>
        {showAudioPrompt && (
          <motion.div
            className="fixed inset-0 z-60 flex items-center justify-center bg-black/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="glass-card p-8 rounded-xl max-w-md w-full"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              transition={{ type: 'spring', damping: 20 }}
            >
              <h2 className="text-2xl font-bold gradient-text mb-4">Enable Audio?</h2>
              <p className="text-light/70 mb-6">
                This experience includes ambient sound effects. Would you like to enable audio?
              </p>
              
              <div className="grid grid-cols-2 gap-4 mt-6">
                <button
                  onClick={() => handleAudioChoice(true)}
                  className="glass-button flex items-center justify-center gap-2 py-3 bg-accent1/10 hover:bg-accent1/20"
                >
                  <Volume2 className="w-5 h-5" />
                  <span>Enable</span>
                </button>
                <button
                  onClick={() => handleAudioChoice(false)}
                  className="glass-button flex items-center justify-center gap-2 py-3"
                >
                  <VolumeX className="w-5 h-5" />
                  <span>No Thanks</span>
                </button>
              </div>
              
              <div className="mt-4 text-center text-sm text-light/50">
                Auto-enabling in {skipTimer} seconds...
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Loading dots CSS */}
      <style>
        {`
        @keyframes dots {
          0%, 20% {
            content: '.';
          }
          40% {
            content: '..';
          }
          60%, 100% {
            content: '...';
          }
        }
        
        .loading-dots::after {
          content: '';
          animation: dots 1.5s infinite;
        }
        
        .bg-grid {
          background-image: linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
          background-size: 20px 20px;
        }
        `}
      </style>
    </motion.div>
  );
};
