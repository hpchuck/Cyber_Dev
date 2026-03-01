import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const BlackTheme3DBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);
  const frameIdRef = useRef<number | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 30;
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true, 
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Create particles
    const particleGeometry = new THREE.BufferGeometry();
    const particleCount = 1500;
    const positionArray = new Float32Array(particleCount * 3);
    const sizeArray = new Float32Array(particleCount);
    const colorArray = new Float32Array(particleCount * 3);

    // Create particle positions, sizes and colors
    for (let i = 0; i < particleCount; i++) {
      // Position
      positionArray[i * 3] = (Math.random() - 0.5) * 100; // x
      positionArray[i * 3 + 1] = (Math.random() - 0.5) * 100; // y
      positionArray[i * 3 + 2] = (Math.random() - 0.5) * 100; // z

      // Size
      sizeArray[i] = Math.random() * 0.5 + 0.1;

      // Color - use indigo to purple gradient
      const colorValue = Math.random();
      // Indigo (99, 102, 241) to Purple (139, 92, 246)
      colorArray[i * 3] = (99 + colorValue * (139 - 99)) / 255; // R
      colorArray[i * 3 + 1] = (102 + colorValue * (92 - 102)) / 255; // G
      colorArray[i * 3 + 2] = (241 + colorValue * (246 - 241)) / 255; // B
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positionArray, 3));
    particleGeometry.setAttribute('size', new THREE.BufferAttribute(sizeArray, 1));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(colorArray, 3));

    // Particle material
    const particleMaterial = new THREE.PointsMaterial({
      size: 0.8,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });

    // Create particle system
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);
    particlesRef.current = particles;

    // Animation function
    const animate = () => {
      if (particles) {
        particles.rotation.x += 0.0005;
        particles.rotation.y += 0.0005;
      }

      if (renderer && scene && camera) {
        renderer.render(scene, camera);
      }

      frameIdRef.current = requestAnimationFrame(animate);
    };

    // Handle window resize
    const handleResize = () => {
      if (camera && renderer) {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      }
    };

    window.addEventListener('resize', handleResize);
    animate();

    // Cleanup
    return () => {
      if (frameIdRef.current) {
        cancelAnimationFrame(frameIdRef.current);
      }
      window.removeEventListener('resize', handleResize);
      if (containerRef.current && renderer) {
        containerRef.current.removeChild(renderer.domElement);
      }
      
      // Dispose resources
      if (particleGeometry) particleGeometry.dispose();
      if (particleMaterial) particleMaterial.dispose();
      if (renderer) renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ 
        background: 'radial-gradient(circle at center, #050505 0%, #000000 100%)'
      }}
    />
  );
};

export default BlackTheme3DBackground;
