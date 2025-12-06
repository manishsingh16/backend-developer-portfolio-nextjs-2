import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Stars, Text, Sparkles, PerspectiveCamera, Edges, Trail } from '@react-three/drei';
import * as THREE from 'three';

// Type definition to ensure compatibility in strict environments
declare global {
  namespace JSX {
    interface IntrinsicElements {
      group: any;
      mesh: any;
      meshStandardMaterial: any;
      boxGeometry: any;
      pointLight: any;
      ambientLight: any;
      fog: any;
      color: any;
    }
  }
}

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      group: any;
      mesh: any;
      meshStandardMaterial: any;
      boxGeometry: any;
      pointLight: any;
      ambientLight: any;
      fog: any;
      color: any;
    }
  }
}

// Colors
const NEON_CYAN = "#0ea5e9";
const NEON_PURPLE = "#a855f7";
const GLOW_COLOR = "#38bdf8";

// Tech symbols to display on cube faces
const SYMBOLS = ['{ }', '</>', 'API', 'SQL', 'GET', '404', '://'];

/**
 * Individual Floating Tech Cube
 */
const TechCube = ({ position, scale = 1, color = NEON_CYAN }: { position: [number, number, number], scale?: number, color?: string }) => {
  const meshRef = useRef<THREE.Mesh>(null!);
  // Randomly select a symbol for this cube
  const [symbol] = useState(() => SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)]);
  
  // Random rotation speed
  const [rotSpeed] = useState(() => ({
      x: (Math.random() - 0.5) * 0.5,
      y: (Math.random() - 0.5) * 0.5
  }));

  useFrame((state, delta) => {
    if(meshRef.current) {
        meshRef.current.rotation.x += delta * rotSpeed.x;
        meshRef.current.rotation.y += delta * rotSpeed.y;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <mesh ref={meshRef} position={position} scale={scale}>
            <boxGeometry args={[1, 1, 1]} />
            {/* Standard Material with emissive ensures visibility in dark scene */}
            <meshStandardMaterial 
                color="#0f172a" 
                roughness={0.3} 
                metalness={0.5} 
                emissive={color}
                emissiveIntensity={0.2}
                transparent 
                opacity={0.9} 
            />
            {/* Glowing Edges */}
            <Edges scale={1.05} threshold={15} color={color} />
            
            {/* Symbol on Front Face */}
            <Text 
                position={[0, 0, 0.51]} 
                fontSize={0.4} 
                color={color} 
                anchorX="center" 
                anchorY="middle"
            >
                {symbol}
            </Text>
            {/* Symbol on Side Face */}
             <Text 
                position={[0.51, 0, 0]} 
                rotation={[0, Math.PI / 2, 0]}
                fontSize={0.4} 
                color={color} 
                anchorX="center" 
                anchorY="middle"
            >
                {symbol}
            </Text>
        </mesh>
    </Float>
  );
};

/**
 * Central "Hero" Cube with Trail Effect
 */
const HeroCube = () => {
    const meshRef = useRef<THREE.Mesh>(null!);
    
    useFrame((state, delta) => {
       if (meshRef.current) {
         meshRef.current.rotation.x += delta * 0.4;
         meshRef.current.rotation.y += delta * 0.6;
       }
    });

    return (
        <Float speed={3} rotationIntensity={1.5} floatIntensity={1.5}>
            {/* Trail Effect */}
            <Trail 
                width={3} 
                length={8} 
                color={NEON_PURPLE} 
                attenuation={(t) => t * t}
                target={meshRef} 
            >
                <mesh ref={meshRef} position={[0, 0, 0]}>
                    <boxGeometry args={[1.5, 1.5, 1.5]} />
                    <meshStandardMaterial 
                        color="#0f172a" 
                        roughness={0.2} 
                        metalness={0.8}
                        emissive="#1e1b4b"
                        emissiveIntensity={0.5} 
                    />
                    <Edges scale={1.02} color={NEON_PURPLE} threshold={15} />
                    <Text 
                        position={[0,0,0.8]} 
                        fontSize={0.6} 
                        color={NEON_CYAN} 
                        anchorX="center"
                        anchorY="middle"
                    >
                        {"<Dev />"}
                    </Text>
                </mesh>
            </Trail>
        </Float>
    )
}

/**
 * Simulates Nebula using colored point lights in fog
 */
const NebulaLights = () => {
    return (
        <group>
            {/* Deep Purple Nebula */}
            <pointLight position={[10, 5, -10]} intensity={20} color="#7c3aed" distance={30} />
            {/* Cosmic Blue Cluster */}
            <pointLight position={[-10, -5, -10]} intensity={20} color="#2563eb" distance={30} />
            {/* Pink Accent */}
            <pointLight position={[0, 10, -5]} intensity={10} color="#db2777" distance={25} />
            {/* Front Fill */}
            <pointLight position={[0, 0, 10]} intensity={5} color="#ffffff" distance={20} />
        </group>
    )
}

const Cube3D: React.FC = () => {
  return (
    <div className="absolute inset-0 z-0 bg-dark w-full h-full">
      <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 12], fov: 45 }} gl={{ antialias: true }}>
        {/* Background Color & Fog for Depth */}
        <color attach="background" args={['#020617']} />
        <fog attach="fog" args={['#020617', 5, 40]} />
        
        {/* Lighting */}
        <ambientLight intensity={0.5} />
        <NebulaLights />
        
        {/* Environment: Stars and Sparkles */}
        <Stars radius={100} depth={50} count={6000} factor={4} saturation={0.5} fade speed={1.5} />
        <Sparkles count={200} scale={20} size={4} speed={0.4} opacity={0.5} color={GLOW_COLOR} />

        {/* Central Object */}
        <HeroCube />

        {/* Scattered Background Cubes */}
        {Array.from({ length: 18 }).map((_, i) => (
            <TechCube 
                key={i} 
                position={[
                    (Math.random() - 0.5) * 20, // Spread X
                    (Math.random() - 0.5) * 12, // Spread Y
                    (Math.random() - 0.5) * 10 - 2 // Spread Z (mostly behind)
                ]} 
                scale={0.4 + Math.random() * 0.4}
                color={Math.random() > 0.6 ? NEON_PURPLE : NEON_CYAN}
            />
        ))}

      </Canvas>
    </div>
  );
};

export default Cube3D;