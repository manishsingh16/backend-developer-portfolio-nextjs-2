
import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Stars, PerspectiveCamera, MeshDistortMaterial, Sphere, Icosahedron, Box, Torus, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

/**
 * The Central Logic Unit - Represents the "Brain" of the Backend.
 * It uses a distorted material to simulate active processing/fluid data.
 */
const NeuralCore = () => {
  const coreRef = useRef<THREE.Mesh>(null!);
  const cageRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (coreRef.current) {
      // "Breathing" animation for the core
      const scale = 1 + Math.sin(t * 1.5) * 0.1;
      coreRef.current.scale.set(scale, scale, scale);
      coreRef.current.rotation.z = t * 0.2;
    }
    if (cageRef.current) {
      // Counter-rotation for the wireframe cage
      cageRef.current.rotation.x = t * 0.1;
      cageRef.current.rotation.y = t * 0.15;
    }
  });

  return (
    <group>
      {/* The Liquid Logic Core */}
      <Sphere args={[1.5, 64, 64]} ref={coreRef}>
        <MeshDistortMaterial 
          color="#0ea5e9" 
          attach="material" 
          distort={0.4} 
          speed={2} 
          roughness={0.2}
          metalness={0.8}
        />
      </Sphere>

      {/* The Structural Wireframe (Security/Architecture) */}
      <Icosahedron args={[2.2, 1]} ref={cageRef}>
        <meshBasicMaterial 
          color="#8b5cf6" 
          wireframe 
          transparent 
          opacity={0.3} 
        />
      </Icosahedron>

      {/* Inner Energy Ring */}
      <Float speed={5} rotationIntensity={1} floatIntensity={0.5}>
        <Torus args={[3, 0.05, 16, 100]} rotation={[Math.PI / 2, 0, 0]}>
          <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={2} />
        </Torus>
      </Float>
    </group>
  );
};

/**
 * Floating Cubes representing Microservices/Containers/Nodes.
 * They orbit the core and look organized yet dynamic.
 */
const MicroservicesSwarm = ({ count }: { count: number }) => {
  const meshRef = useRef<THREE.InstancedMesh>(null!);
  
  // Pre-compute random positions and initial factors
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const radius = 5 + Math.random() * 4; // Distance from core
      const y = (Math.random() - 0.5) * 6;
      const speed = Math.random() * 0.2 + 0.1;
      const scale = Math.random() * 0.2 + 0.1;
      temp.push({ angle, radius, y, speed, scale, x: 0, z: 0 });
    }
    return temp;
  }, [count]);

  const dummy = new THREE.Object3D();

  useFrame((state) => {
    if (!meshRef.current) return;
    
    const t = state.clock.getElapsedTime();

    particles.forEach((particle, i) => {
      // Orbit logic
      const currentAngle = particle.angle + t * particle.speed * 0.5;
      particle.x = Math.cos(currentAngle) * particle.radius;
      particle.z = Math.sin(currentAngle) * particle.radius;
      
      // Bobbing logic
      const bob = Math.sin(t * 2 + i) * 0.5;

      dummy.position.set(particle.x, particle.y + bob, particle.z);
      dummy.scale.set(particle.scale, particle.scale, particle.scale);
      dummy.rotation.set(t * particle.speed, t * particle.speed, t * particle.speed);
      
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial 
        color="#8b5cf6" 
        transparent 
        opacity={0.6} 
        roughness={0.3} 
        metalness={0.6} 
      />
    </instancedMesh>
  );
};

// Camera Parallax Rig
const Rig = () => {
  useFrame((state) => {
    state.camera.position.lerp(
      new THREE.Vector3(state.mouse.x * 1.5, state.mouse.y * 1.5, 9),
      0.05
    );
    state.camera.lookAt(0, 0, 0);
  });
  return null;
};

const Cube3D: React.FC = () => {
  return (
    <div className="absolute inset-0 z-0 bg-dark">
      <Canvas dpr={[1, 2]} gl={{ antialias: true, alpha: true }}>
        <PerspectiveCamera makeDefault position={[0, 0, 9]} fov={50} />
        <Rig />
        
        {/* Cinematic Lighting */}
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#38bdf8" />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#a78bfa" />
        <spotLight 
          position={[0, 10, 0]} 
          angle={0.5} 
          penumbra={1} 
          intensity={2} 
          color="#ffffff" 
          castShadow 
        />
        
        {/* Background Elements */}
        <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={0.5} />
        <Sparkles count={100} scale={10} size={1} speed={0.4} opacity={0.5} color="#0ea5e9" />
        
        {/* Main Scene Components */}
        <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
          <NeuralCore />
        </Float>
        <MicroservicesSwarm count={40} />
        
        {/* Atmosphere */}
        <fog attach="fog" args={['#020617', 5, 25]} />
      </Canvas>
    </div>
  );
};

export default Cube3D;
