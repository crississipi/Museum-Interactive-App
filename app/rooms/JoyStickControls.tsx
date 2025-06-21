// components/Joystick.tsx
'use client';

import { useEffect, useRef } from 'react';
import nipplejs from 'nipplejs';

interface JoystickProps {
  onMove: (dir: { x: number; z: number }) => void;
}

const Joystick = ({ onMove }: JoystickProps) => {
  const zoneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!zoneRef.current) return;

    const manager = nipplejs.create({
      zone: zoneRef.current,
      mode: 'static',
      position: { left: '60px', bottom: '60px' },
      color: 'blue',
    });

    manager.on('move', (_, data) => {
      const angle = data.angle.radian;
      const force = data.force;
      onMove({ x: Math.cos(angle) * force, z: Math.sin(angle) * force });
    });

    manager.on('end', () => {
      onMove({ x: 0, z: 0 });
    });

    return () => {
      manager.destroy();
    };
  }, [onMove]);

  return (
    <div
      ref={zoneRef}
      className="fixed bottom-4 left-4 w-32 h-32 z-50"
      style={{ touchAction: 'none' }}
    />
  );
};

export default Joystick;
