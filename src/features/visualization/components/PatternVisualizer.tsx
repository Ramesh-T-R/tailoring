import React, { useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, ContactShadows, Float } from '@react-three/drei';
import * as THREE from 'three';
import { Box } from '@mui/material';

interface PatternVisualizerProps {
  measurements: Record<string, number>;
  measurementTypes: any[];
}

const PatternMesh: React.FC<{ 
  measurements: Record<string, number>, 
  measurementTypes: any[] 
}> = ({ measurements, measurementTypes }) => {
  
  const getVal = (name: string, defaultVal: number) => {
    const mt = measurementTypes.find(m => m.name.toLowerCase() === name.toLowerCase());
    if (!mt || !mt._id) return defaultVal;
    return measurements[mt._id] || defaultVal;
  };

  // Princess Cut Blouse specific measurements (in inches typically)
  const chest = getVal('Chest', 36);
  const waist = getVal('Waist', 30);
  const length = getVal('Length', 14);
  const shoulder = getVal('Shoulder Width', 14);
  const apexPoint = getVal('Shoulder to Bust', 9.5); // Distance from shoulder to apex
  const apexWidth = getVal('Apex to Apex', 7);

  // Constants for geometry
  const scale = 0.1; // Scale down for 3D view
  const W_CHEST = (chest / 4) * scale;
  const W_WAIST = (waist / 4) * scale;
  const H_TOTAL = length * scale;
  const W_SHOULDER = (shoulder / 2) * scale;
  const H_APEX_FROM_TOP = apexPoint * scale;
  const H_APEX_FROM_BOT = H_TOTAL - H_APEX_FROM_TOP;
  const W_APEX = (apexWidth / 2) * scale;

  // Create Front Panel with Princess Cut
  const frontShape = useMemo(() => {
    const shape = new THREE.Shape();
    
    // Starting from bottom center (0,0)
    shape.moveTo(0, 0);
    shape.lineTo(W_APEX, 0); // Bottom waist line center piece
    
    // Princess curve starting from waist to apex
    shape.bezierCurveTo(
      W_APEX, H_APEX_FROM_BOT * 0.4,
      W_APEX, H_APEX_FROM_BOT * 0.8,
      W_APEX, H_APEX_FROM_BOT
    );

    // Continue from apex up to armhole/shoulder area
    shape.bezierCurveTo(
      W_APEX, H_APEX_FROM_BOT + (H_TOTAL - H_APEX_FROM_BOT) * 0.4,
      W_SHOULDER * 0.5, H_TOTAL * 0.8,
      W_SHOULDER * 0.6, H_TOTAL // Top shoulder point of center piece
    );

    // Top shoulder line
    shape.lineTo(W_SHOULDER * 0.3, H_TOTAL);
    
    // Neck curve
    shape.quadraticCurveTo(0, H_TOTAL, 0, H_TOTAL * 0.7);
    
    // Back to center
    shape.lineTo(0, 0);

    return shape;
  }, [W_CHEST, W_WAIST, H_TOTAL, W_SHOULDER, H_APEX_FROM_BOT, W_APEX]);

  const sidePieceShape = useMemo(() => {
    const shape = new THREE.Shape();
    
    // Starting from bottom side
    shape.moveTo(W_APEX + 0.05 * scale, 0);
    shape.lineTo(W_WAIST, 0);
    
    // Side seam up
    shape.lineTo(W_CHEST, H_TOTAL * 0.7);
    
    // Armhole curve
    shape.bezierCurveTo(
      W_CHEST * 0.9, H_TOTAL * 0.85,
      W_SHOULDER * 1.1, H_TOTAL * 0.95,
      W_SHOULDER, H_TOTAL
    );

    // Shoulder top
    shape.lineTo(W_SHOULDER * 0.7, H_TOTAL);

    // Princess cut curve (matching the main piece)
    shape.bezierCurveTo(
      W_SHOULDER * 0.6, H_TOTAL * 0.8,
      W_APEX + 0.1 * scale, H_APEX_FROM_BOT + 0.2 * scale,
      W_APEX + 0.05 * scale, H_APEX_FROM_BOT
    );

    shape.bezierCurveTo(
      W_APEX + 0.05 * scale, H_APEX_FROM_BOT * 0.7,
      W_APEX + 0.1 * scale, H_APEX_FROM_BOT * 0.3,
      W_APEX + 0.05 * scale, 0
    );

    return shape;
  }, [W_CHEST, W_WAIST, H_TOTAL, W_SHOULDER, H_APEX_FROM_BOT, W_APEX]);

  return (
    <group position={[-W_CHEST / 2, -H_TOTAL / 2, 0]}>
      {/* Front Center Pieces */}
      <group>
        <mesh castShadow receiveShadow>
          <shapeGeometry args={[frontShape]} />
          <meshPhysicalMaterial 
            color="#e91e63" 
            side={THREE.DoubleSide} 
            transparent 
            opacity={0.9}
            roughness={0.3}
            metalness={0.1}
          />
        </mesh>
        <mesh castShadow receiveShadow rotation={[0, Math.PI, 0]}>
          <shapeGeometry args={[frontShape]} />
          <meshPhysicalMaterial 
            color="#e91e63" 
            side={THREE.DoubleSide} 
            transparent 
            opacity={0.9}
            roughness={0.3}
            metalness={0.1}
          />
        </mesh>
      </group>

      {/* Side Pieces */}
      <group>
        <mesh castShadow receiveShadow position={[0.02 * scale, 0, 0.01 * scale]}>
          <shapeGeometry args={[sidePieceShape]} />
          <meshPhysicalMaterial 
            color="#c2185b" 
            side={THREE.DoubleSide} 
            transparent 
            opacity={0.9}
            roughness={0.3}
          />
        </mesh>
        <mesh castShadow receiveShadow rotation={[0, Math.PI, 0]} position={[-0.02 * scale, 0, 0.01 * scale]}>
          <shapeGeometry args={[sidePieceShape]} />
          <meshPhysicalMaterial 
            color="#c2185b" 
            side={THREE.DoubleSide} 
            transparent 
            opacity={0.9}
            roughness={0.3}
          />
        </mesh>
      </group>

      {/* Blueprint lines */}
      <lineSegments position={[0, 0, 0.02 * scale]}>
        <edgesGeometry args={[new THREE.ShapeGeometry(frontShape)]} />
        <lineBasicMaterial color="white" transparent opacity={0.5} />
      </lineSegments>
    </group>
  );
};

export const PatternVisualizer: React.FC<PatternVisualizerProps> = ({ measurements, measurementTypes }) => {
  return (
    <Box sx={{ width: '100%', height: '100%', minHeight: 450, bgcolor: '#121212', borderRadius: 2, overflow: 'hidden', border: '1px solid #333' }}>
      <Canvas shadows dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 0, 6]} fov={35} />
        <OrbitControls makeDefault enableDamping />
        <color attach="background" args={['#111']} />
        <Environment preset="night" />
        <ambientLight intensity={0.2} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1.5} castShadow />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#e91e63" />
        
        <Float speed={2} rotationIntensity={0.2} floatIntensity={0.3}>
          <PatternMesh measurements={measurements} measurementTypes={measurementTypes} />
        </Float>

        <ContactShadows position={[0, -2.5, 0]} opacity={0.6} scale={10} blur={2} far={4} />
      </Canvas>
      <Box sx={{ position: 'absolute', top: 16, left: 16, color: 'rgba(255,255,255,0.5)', pointerEvents: 'none' }}>
        <Typography variant="caption" sx={{ display: 'block', fontWeight: 700, letterSpacing: 1 }}>TECHNICAL DRAFT</Typography>
        <Typography variant="h6" sx={{ color: '#e91e63', fontWeight: 800 }}>PRINCESS CUT</Typography>
      </Box>
    </Box>
  );
};

import { Typography } from '@mui/material';
