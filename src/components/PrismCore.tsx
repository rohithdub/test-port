import { Canvas, useFrame } from '@react-three/fiber';
import { useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';

export type CoreDestination = 'overview' | 'projects' | 'skills' | 'trajectory' | 'contact';

type Point3 = readonly [number, number, number];
const A: Point3 = [0, 1.1, 0];
const B: Point3 = [0.34, 0.6, 0.08];
const C: Point3 = [0.24, -0.45, 0.06];
const D: Point3 = [0, -0.72, 0];
const E: Point3 = [-0.24, -0.45, -0.06];
const F: Point3 = [-0.34, 0.6, -0.08];
const prismEdges: Array<[Point3, Point3, boolean]> = [
  [A, B, false], [B, C, false], [C, D, false], [D, E, false], [E, F, false], [F, A, false],
  [A, D, true], [F, C, false], [B, E, false]
];
const path1: Point3[] = [
  [-0.68, 1.05, 0.08], [0.15, 1.22, 0.08], [0.92, 0.78, 0.08], [1.18, 0.05, 0.08],
  [0.82, -0.72, 0.08], [0.05, -1.12, 0.08], [-0.82, -0.68, 0.08], [-1.12, 0.05, 0.08], [-1.10, 0.65, 0.08]
];
const path2: Point3[] = [
  [-0.78, 0.2, -0.22], [-0.48, 0.7, -0.22], [0.3, 0.82, -0.22], [0.88, 0.34, -0.22],
  [0.72, -0.42, -0.22], [0.1, -0.82, -0.22], [-0.62, -0.54, -0.22]
];
const path3: Point3[] = [
  [-0.52, 0.35, 0.24], [-0.1, 0.72, 0.24], [0.48, 0.4, 0.24], [0.44, -0.34, 0.24], [-0.08, -0.62, 0.24], [-0.5, -0.22, 0.24]
];

function edgesForPath(points: Point3[], close = false): Array<[Point3, Point3]> {
  const edges: Array<[Point3, Point3]> = [];
  for (let index = 0; index < points.length - 1; index += 1) edges.push([points[index], points[index + 1]]);
  if (close) edges.push([points[points.length - 1], points[0]]);
  return edges;
}

function Segment({ a, b, color, opacity = 0.9, radius = 0.008 }: {
  a: Point3; b: Point3; color: string; opacity?: number; radius?: number;
}) {
  const geometry = useMemo(() => {
    const start = new THREE.Vector3(...a);
    const end = new THREE.Vector3(...b);
    const direction = new THREE.Vector3().subVectors(end, start);
    const length = direction.length();
    const midpoint = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);
    const rotation = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction.normalize());
    return { midpoint, rotation, length };
  }, [a, b]);

  return (
    <mesh position={geometry.midpoint} quaternion={geometry.rotation}>
      <cylinderGeometry args={[radius, radius, geometry.length, 5, 1, true]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={color === '#63f1d1' ? 1.5 : 0.25}
        transparent opacity={opacity} roughness={0.3} metalness={0.25} depthWrite={false} />
    </mesh>
  );
}

function CoreNode({ position, active = false }: { position: Point3; active?: boolean }) {
  return (
    <mesh position={position}>
      <icosahedronGeometry args={[active ? 0.035 : 0.023, 1]} />
      <meshStandardMaterial color={active ? '#c1fff1' : '#56aeb0'} emissive={active ? '#63f1d1' : '#1c777b'}
        emissiveIntensity={active ? 2.1 : 0.6} roughness={0.24} metalness={0.25} />
    </mesh>
  );
}

function CoreGeometry({ destination, reducedMotion }: { destination: CoreDestination; reducedMotion: boolean }) {
  const group = useRef<THREE.Group>(null);
  const lineTint = destination === 'projects' ? '#73d8ff' : destination === 'skills' ? '#b3a0ff' : destination === 'trajectory' ? '#ffc982' : '#63f1d1';
  const focusedIndex: Record<CoreDestination, number> = { overview: 3, projects: 2, skills: 4, trajectory: 6, contact: 0 };

  useFrame((state, delta) => {
    if (!group.current || reducedMotion) return;
    const time = state.clock.elapsedTime;
    group.current.rotation.y += delta * 0.055;
    group.current.rotation.x = Math.sin(time * 0.24) * 0.055;
    group.current.rotation.z = Math.sin(time * 0.19) * 0.025;
  });

  return (
    <group ref={group}>
      {edgesForPath(path1).map(([a, b], index) => (
        <Segment key={`p1-${index}`} a={a} b={b} color={lineTint} opacity={index === focusedIndex[destination] ? 0.98 : 0.55} radius={0.008} />
      ))}
      {edgesForPath(path2, true).map(([a, b], index) => <Segment key={`p2-${index}`} a={a} b={b} color="#4e9ea8" opacity={0.48} radius={0.006} />)}
      {edgesForPath(path3, true).map(([a, b], index) => <Segment key={`p3-${index}`} a={a} b={b} color="#6dbfc1" opacity={0.43} radius={0.0055} />)}
      {prismEdges.map(([a, b, signature], index) => <Segment key={`prism-${index}`} a={a} b={b}
        color={signature ? '#63f1d1' : '#b1d7dc'} opacity={signature ? 1 : 0.9} radius={signature ? 0.014 : 0.009} />)}
      {path1.filter((_, index) => index % 2 === 0).map((point, index) => <CoreNode key={`outer-node-${index}`} position={point} active={index === focusedIndex[destination] % 5} />)}
      {path2.map((point, index) => <CoreNode key={`mid-node-${index}`} position={point} active={destination === 'projects' && index === 3} />)}
      {path3.filter((_, index) => index % 2 === 0).map((point, index) => <CoreNode key={`inner-node-${index}`} position={point} active={destination === 'skills' && index === 1} />)}
      <CoreNode position={A} active />
      <CoreNode position={D} active />
    </group>
  );
}

function hasWebGL(): boolean {
  try {
    const canvas = document.createElement('canvas');
    return Boolean(window.WebGLRenderingContext && (canvas.getContext('webgl2') || canvas.getContext('webgl')));
  } catch {
    return false;
  }
}

export function PrismFallback({ destination = 'overview' }: { destination?: CoreDestination }) {
  const tint = destination === 'projects' ? '#73d8ff' : destination === 'skills' ? '#b3a0ff' : destination === 'trajectory' ? '#ffc982' : '#63f1d1';
  return (
    <svg className="prism-fallback" viewBox="0 0 1000 800" role="img" aria-label="VYRON Prism Weave spatial core">
      <defs>
        <linearGradient id="prismLine" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#e0ffff" /><stop offset="1" stopColor={tint} /></linearGradient>
        <filter id="prismGlow" x="-40%" y="-40%" width="180%" height="180%"><feGaussianBlur stdDeviation="3.5" result="blur" /><feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
      </defs>
      <g transform="translate(500 400) scale(220 -220)" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <g stroke="#387d83" strokeWidth="0.012" opacity=".72">
          <polyline points="-0.68,1.05 0.15,1.22 0.92,0.78 1.18,0.05 0.82,-0.72 0.05,-1.12 -0.82,-0.68 -1.12,0.05 -1.10,0.65" />
          <polygon points="-0.78,0.2 -0.48,0.7 0.3,0.82 0.88,0.34 0.72,-0.42 0.1,-0.82 -0.62,-0.54" />
          <polygon points="-0.52,0.35 -0.1,0.72 0.48,0.4 0.44,-0.34 -0.08,-0.62 -0.5,-0.22" />
        </g>
        <g stroke="url(#prismLine)" strokeWidth="0.014" filter="url(#prismGlow)">
          <polyline points="0,1.1 0.34,0.6 0.24,-0.45 0,-0.72 -0.24,-0.45 -0.34,0.6 0,1.1" />
          <line x1="-0.34" y1="0.6" x2="0.24" y2="-0.45" />
          <line x1="0.34" y1="0.6" x2="-0.24" y2="-0.45" />
        </g>
        <line x1="0" y1="1.1" x2="0" y2="-0.72" stroke="#63f1d1" strokeWidth="0.021" filter="url(#prismGlow)" />
        <g fill="#bdfff4" stroke="none">
          <circle cx="0" cy="1.1" r="0.026" /><circle cx="0" cy="-0.72" r="0.026" />
          <circle cx="0.92" cy="0.78" r="0.018" /><circle cx="0.05" cy="-1.12" r="0.018" /><circle cx="-1.12" cy="0.05" r="0.018" />
        </g>
      </g>
    </svg>
  );
}

export function PrismCore({ destination }: { destination: CoreDestination }) {
  const [webgl, setWebgl] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setWebgl(hasWebGL());
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReducedMotion(query.matches);
    update();
    query.addEventListener?.('change', update);
    return () => query.removeEventListener?.('change', update);
  }, []);

  if (!webgl) return <PrismFallback destination={destination} />;

  return (
    <Canvas className="prism-canvas" camera={{ position: [0, 0, 5.2], fov: 34 }} dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: 'low-power' }} fallback={<PrismFallback destination={destination} />}>
      <ambientLight intensity={0.72} />
      <pointLight position={[3, 2, 4]} intensity={2.4} color="#8bfff0" />
      <pointLight position={[-3, -1.5, 2]} intensity={1.2} color="#3579aa" />
      <CoreGeometry destination={destination} reducedMotion={reducedMotion} />
    </Canvas>
  );
}

export function DestinationCoreBadge({ destination, status }: { destination: CoreDestination; status: string }) {
  const number = ({ overview: '01', projects: '02', skills: '03', trajectory: '04', contact: '05' } as const)[destination];
  return (
    <div className="destination-core-badge" aria-label={`Prism Weave core synced to ${destination}`}>
      <div className="destination-mini-core"><PrismCore destination={destination} /></div>
      <div className="destination-core-copy">
        <span className="micro-label">CORE PATH / {number}</span>
        <strong>{destination.toUpperCase()} ALIGNMENT</strong>
        <small>{status}</small>
      </div>
      <span className="destination-core-led" />
    </div>
  );
}
