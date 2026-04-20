import React, { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage, PerspectiveCamera, ContactShadows, Environment, Float } from '@react-three/drei';
import * as THREE from 'three';
import { MeasurementProfile, FabricProperty } from '../../../types/project';

interface Props {
  measurements: MeasurementProfile;
  dressType: string;
  fabric: FabricProperty;
}

const Garment: React.FC<Props> = ({ measurements, dressType, fabric }) => {
  const heightScale = measurements.height / 180;
  const chestRadius = (measurements.chest / 100) * 0.36;
  const waistRadius = (measurements.waist / 85) * 0.3;
  const shoulderWidth = (measurements.shoulderWidth / 45) * 0.85;

  // Fabric color mapping
  const fabricColor = fabric.type === 'Denim' ? '#1e3a8a' : 
                      fabric.type === 'Silk' ? '#fdf2f8' : 
                      fabric.type === 'Linen' ? '#fafaf9' : '#ffffff';

  const garmentMaterial = (
    <meshPhysicalMaterial 
      color={fabricColor}
      roughness={fabric.type === 'Silk' ? 0.1 : 0.8}
      metalness={fabric.type === 'Silk' ? 0.2 : 0}
      clearcoat={fabric.type === 'Silk' ? 1 : 0}
      side={THREE.DoubleSide}
    />
  );

  return (
    <group position={[0, heightScale * 0.1, 0]}>
      {/* Main Body of the Dress */}
      <mesh castShadow>
        <cylinderGeometry args={[chestRadius, waistRadius, heightScale * 0.85, 32]} />
        {garmentMaterial}
      </mesh>

      {/* Dress Specific Elements */}
      {dressType === 'Formal Shirt' && (
        <>
          {/* Collar */}
          <mesh position={[0, heightScale * 0.45, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.08, 0.04, 16, 32]} />
            {garmentMaterial}
          </mesh>
          {/* Sleeves */}
          <mesh position={[shoulderWidth / 2, heightScale * 0.3, 0]} rotation={[0, 0, -Math.PI / 6]}>
            <cylinderGeometry args={[0.08, 0.06, 0.5, 16]} />
            {garmentMaterial}
          </mesh>
          <mesh position={[-shoulderWidth / 2, heightScale * 0.3, 0]} rotation={[0, 0, Math.PI / 6]}>
            <cylinderGeometry args={[0.08, 0.06, 0.5, 16]} />
            {garmentMaterial}
          </mesh>
        </>
      )}

      {dressType === 'Skirt' && (
        <mesh position={[0, -heightScale * 0.3, 0]}>
          <cylinderGeometry args={[waistRadius, waistRadius * 1.5, heightScale * 0.6, 32]} />
          {garmentMaterial}
        </mesh>
      )}
    </group>
  );
};

export const ThreeScene: React.FC<Props> = (props) => {
  return (
    <div className="w-full h-full">
      <Canvas shadows dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[3, 2, 5]} fov={35} />
        <OrbitControls makeDefault enableDamping />
        <color attach="background" args={['#fafafa']} />
        <Environment preset="studio" />
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />

        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
          <Garment {...props} />
        </Float>

        <ContactShadows position={[0, -0.5, 0]} opacity={0.4} scale={10} blur={2.5} far={4} />
      </Canvas>
    </div>
  );
};
