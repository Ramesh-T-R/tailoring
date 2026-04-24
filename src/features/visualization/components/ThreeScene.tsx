import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage, PerspectiveCamera, ContactShadows, Environment, Float } from '@react-three/drei';
import * as THREE from 'three';
import { FabricProperty } from '../../../types/project';
import { measurementTypeService } from '../../config/api/measurementType.service';
import { MeasurementType } from '../../config/types/measurementType';

interface Props {
  measurements: Record<string, number>;
  dressType: string;
  fabric: FabricProperty;
}

const Garment: React.FC<{ 
  measurements: Record<string, number>, 
  dressType: string, 
  fabric: FabricProperty,
  measurementTypes: MeasurementType[] 
}> = ({ measurements, dressType, fabric, measurementTypes }) => {
  
  const getVal = (name: string, defaultVal: number) => {
    const mt = measurementTypes.find(m => m.name.toLowerCase() === name.toLowerCase());
    if (!mt || !mt._id) return defaultVal;
    return measurements[mt._id] || defaultVal;
  };

  const height = getVal('Height', 170);
  const chest = getVal('Chest', 100);
  const waist = getVal('Waist', 85);
  const shoulderWidth = getVal('Shoulder Width', 45);

  const heightScale = height / 180;
  const chestRadius = (chest / 100) * 0.36;
  const waistRadius = (waist / 85) * 0.3;
  const shoulderRatio = (shoulderWidth / 45) * 0.85;

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
        <cylinderGeometry args={[chestRadius, waistRadius, heightScale * 1.2, 32]} />
        {garmentMaterial}
      </mesh>

      {/* Dress Specific Elements */}
      {dressType.toLowerCase().includes('shirt') && (
        <>
          {/* Collar */}
          <mesh position={[0, heightScale * 0.6, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[chestRadius * 0.4, 0.04, 16, 32]} />
            {garmentMaterial}
          </mesh>
          {/* Sleeves */}
          <mesh position={[shoulderRatio / 2, heightScale * 0.3, 0]} rotation={[0, 0, -Math.PI / 6]}>
            <cylinderGeometry args={[0.08, 0.06, 0.5, 16]} />
            {garmentMaterial}
          </mesh>
          <mesh position={[-shoulderRatio / 2, heightScale * 0.3, 0]} rotation={[0, 0, Math.PI / 6]}>
            <cylinderGeometry args={[0.08, 0.06, 0.5, 16]} />
            {garmentMaterial}
          </mesh>
        </>
      )}

      {dressType.toLowerCase().includes('skirt') && (
        <mesh position={[0, -heightScale * 0.3, 0]}>
          <cylinderGeometry args={[waistRadius, waistRadius * 1.5, heightScale * 0.8, 32]} />
          {garmentMaterial}
        </mesh>
      )}
      
      {dressType.toLowerCase().includes('dress') && (
        <mesh position={[0, -heightScale * 0.5, 0]}>
          <cylinderGeometry args={[waistRadius, waistRadius * 2, heightScale * 1.5, 32]} />
          {garmentMaterial}
        </mesh>
      )}
    </group>
  );
};

export const ThreeScene: React.FC<Props> = (props) => {
  const [mtList, setMtList] = useState<MeasurementType[]>([]);

  useEffect(() => {
    measurementTypeService.getAll().then(setMtList).catch(() => []);
  }, []);

  return (
    <div className="w-full h-full">
      <Canvas shadows dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={35} />
        <OrbitControls makeDefault enableDamping minPolarAngle={0} maxPolarAngle={Math.PI / 1.75} />
        <color attach="background" args={['#1a1a1a']} />
        <Environment preset="city" />
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />

        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
          <Garment {...props} measurementTypes={mtList} />
        </Float>

        <ContactShadows position={[0, -1.5, 0]} opacity={0.4} scale={10} blur={2.5} far={4} />
      </Canvas>
    </div>
  );
};
