import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

function ParticleField() {
  const ref = useRef<THREE.Points>(null);
  const { viewport, mouse } = useThree();
  
  // Generate particles in a more organized, grid-like pattern
  const count = 2000; // Reduced for better performance
  const positions = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const cols = 20;
    const rows = count / cols;
    
    for (let i = 0; i < count; i++) {
      const col = (i % cols) - cols / 2;
      const row = Math.floor(i / cols) - rows / 2;
      
      positions[i * 3] = col + (Math.random() - 0.5) * 0.5;
      positions[i * 3 + 1] = row + (Math.random() - 0.5) * 0.5;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 2;
    }
    
    return positions;
  }, []);

  // Optimize connections by only connecting nearby particles
  const connections = useMemo(() => {
    const maxDistance = 2;
    const lines: number[] = [];
    
    for (let i = 0; i < count; i++) {
      const x1 = positions[i * 3];
      const y1 = positions[i * 3 + 1];
      const z1 = positions[i * 3 + 2];
      
      for (let j = i + 1; j < count; j++) {
        const x2 = positions[j * 3];
        const y2 = positions[j * 3 + 1];
        const z2 = positions[j * 3 + 2];
        
        const distance = Math.sqrt(
          Math.pow(x2 - x1, 2) +
          Math.pow(y2 - y1, 2) +
          Math.pow(z2 - z1, 2)
        );
        
        if (distance < maxDistance) {
          lines.push(x1, y1, z1, x2, y2, z2);
        }
      }
    }
    
    return new Float32Array(lines);
  }, [positions]);

  useFrame((state) => {
    if (!ref.current) return;
    
    // Smooth mouse-based rotation
    ref.current.rotation.x = THREE.MathUtils.lerp(
      ref.current.rotation.x,
      mouse.y * 0.5,
      0.1
    );
    ref.current.rotation.y = THREE.MathUtils.lerp(
      ref.current.rotation.y,
      mouse.x * 0.5,
      0.1
    );
    
    // Subtle breathing animation
    const scale = 1 + Math.sin(state.clock.getElapsedTime() * 0.5) * 0.02;
    ref.current.scale.set(scale, scale, scale);
  });

  return (
    <group>
      <Points ref={ref}>
        <PointMaterial
          transparent
          vertexColors
          size={0.03}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          color="#00FFFF"
        />
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={positions.length / 3}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
      </Points>
      
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={connections.length / 3}
            array={connections}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial
          attach="material"
          color="#FF1493"
          transparent
          opacity={0.1}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>
    </group>
  );
}

export const ParticleBackground = () => {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 60 }}
        dpr={Math.min(2, window.devicePixelRatio)}
        performance={{ min: 0.5 }}
      >
        <color attach="background" args={['#2A0A4C']} />
        <ParticleField />
      </Canvas>
    </div>
  );
};