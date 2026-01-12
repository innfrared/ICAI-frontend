import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useTheme } from '../../contexts/ThemeContext';

function makePositions(cols: number, rows: number, sep: number, baseColor: THREE.Color) {
  const count = cols * rows;
  const positions = new Float32Array(count * 3);
  const original = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);

  let i = 0;
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const px = (x - cols / 2) * sep;
      const py = (y - rows / 2) * sep;

      positions[i] = px;
      positions[i + 1] = py;
      positions[i + 2] = 0;

      original[i] = px;
      original[i + 1] = py;
      original[i + 2] = 0;

      colors[i] = baseColor.r;
      colors[i + 1] = baseColor.g;
      colors[i + 2] = baseColor.b;

      i += 3;
    }
  }

  return { positions, original, colors };
}

function WavePoints({
  cols,
  rows,
  sep,
  size,
  zOffset,
  depth,
  isDarkMode,
}: {
  cols: number;
  rows: number;
  sep: number;
  size: number;
  zOffset: number;
  depth: 'front' | 'back';
  isDarkMode: boolean;
}) {
  const pointsRef = useRef<THREE.Points>(null!);
  const { viewport } = useThree();

  const themeConfig = useMemo(
    () => ({
      baseColor: new THREE.Color(isDarkMode ? '#aab4ff' : '#4c52d4'),
      opacity: isDarkMode ? 0.55 : 0.45,
      amplitude: isDarkMode ? 0.22 : 0.16,
    }),
    [isDarkMode]
  );

  const touchColor = useMemo(() => new THREE.Color('#f5e97a'), []);

  const { positions, original, colors } = useMemo(
    () => makePositions(cols, rows, sep, themeConfig.baseColor),
    [cols, rows, sep, themeConfig.baseColor]
  );

  const lastMouse = useRef({ x: 0, y: 0 });
  const idleFrames = useRef(0);

  useFrame(({ mouse, clock }) => {
    const dxm = Math.abs(mouse.x - lastMouse.current.x);
    const dym = Math.abs(mouse.y - lastMouse.current.y);

    if (dxm < 0.001 && dym < 0.001) {
      idleFrames.current++;
      if (idleFrames.current > 10 && depth === 'back') return;
    } else {
      idleFrames.current = 0;
    }

    lastMouse.current.x = mouse.x;
    lastMouse.current.y = mouse.y;

    const geom = pointsRef.current.geometry;
    const posAttr = geom.attributes.position as THREE.BufferAttribute;
    const colAttr = geom.attributes.color as THREE.BufferAttribute;

    const mx = mouse.x * viewport.width * 0.5;
    const my = mouse.y * viewport.height * 0.5;
    const t = clock.getElapsedTime();

    const radius = depth === 'front' ? 1.25 : 0.9;
    const frequency = 5.8;
    const relax = depth === 'front' ? 0.1 : 0.06;

    for (let i = 0; i < posAttr.array.length; i += 3) {
      const ox = original[i];
      const oy = original[i + 1];

      const dx = ox - mx;
      const dy = oy - my;
      const dist = Math.sqrt(dx * dx + dy * dy);

      let tx = ox;
      let ty = oy;
      let tz = zOffset;

      let mix = 0;

      if (dist < radius) {
        const falloff = 1 - dist / radius;
        const wave = Math.sin(dist * frequency - t * 4.2);

        tx += (dx / (dist + 0.001)) * wave * themeConfig.amplitude * falloff;
        ty += (dy / (dist + 0.001)) * wave * themeConfig.amplitude * falloff;
        tz += wave * themeConfig.amplitude * 0.55 * falloff;

        mix = falloff;
      }

      posAttr.array[i] += (tx - posAttr.array[i]) * relax;
      posAttr.array[i + 1] += (ty - posAttr.array[i + 1]) * relax;
      posAttr.array[i + 2] += (tz - posAttr.array[i + 2]) * relax;

      const tr = themeConfig.baseColor.r * (1 - mix) + touchColor.r * mix;
      const tg = themeConfig.baseColor.g * (1 - mix) + touchColor.g * mix;
      const tb = themeConfig.baseColor.b * (1 - mix) + touchColor.b * mix;

      colAttr.array[i] += (tr - colAttr.array[i]) * 0.15;
      colAttr.array[i + 1] += (tg - colAttr.array[i + 1]) * 0.15;
      colAttr.array[i + 2] += (tb - colAttr.array[i + 2]) * 0.15;
    }

    posAttr.needsUpdate = true;
    colAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>

      <pointsMaterial
        size={size}
        vertexColors
        transparent
        opacity={themeConfig.opacity}
        depthWrite={false}
      />
    </points>
  );
}

export function BackgroundWall() {
  const { isDarkMode } = useTheme();

  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 55 }}
      style={{ position: 'absolute', inset: 0 }}
      gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
      dpr={[1, 1.5]}
    >
      <WavePoints
        cols={64}
        rows={40}
        sep={0.22}
        size={0.018}
        zOffset={-0.35}
        depth="back"
        isDarkMode={isDarkMode}
      />

      <WavePoints
        cols={56}
        rows={36}
        sep={0.22}
        size={0.028}
        zOffset={0}
        depth="front"
        isDarkMode={isDarkMode}
      />
    </Canvas>
  );
}
