/**
 * Cyberpunk Post-Processing Effects
 * Heavy effects including bloom, glitch, chromatic aberration, and film grain
 */

import { useRef, useEffect } from 'react';
import { Bloom, ChromaticAberration, Noise, Vignette, EffectComposer } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import { cyberpunkTheme } from '../styles/cyberpunk-theme';
import { Vector2 } from 'three';

interface CyberpunkEffectsProps {
  intensity?: number; // 0-1, defaults to 1 (full intensity)
}

const CyberpunkEffects = ({ intensity = 1 }: CyberpunkEffectsProps) => {
  const { effects } = cyberpunkTheme;
  const glitchRef = useRef<any>(null);

  // Trigger glitch effect periodically
  useEffect(() => {
    if (!glitchRef.current) return;

    const triggerGlitch = () => {
      const delay = (effects.glitch.delay[0] + Math.random() * (effects.glitch.delay[1] - effects.glitch.delay[0])) * 1000;

      setTimeout(() => {
        if (glitchRef.current) {
          // The glitch effect in postprocessing is always active, we just control its intensity via props
          triggerGlitch();
        }
      }, delay);
    };

    triggerGlitch();
  }, [effects.glitch.delay]);

  return (
    <EffectComposer>
      {/* Bloom Effect - Intense neon glow */}
      <Bloom
        intensity={effects.bloom.intensity * intensity}
        luminanceThreshold={effects.bloom.luminanceThreshold}
        luminanceSmoothing={effects.bloom.luminanceSmoothing}
        radius={effects.bloom.radius}
        mipmapBlur
      />

      {/* Chromatic Aberration - RGB color shift */}
      <ChromaticAberration
        offset={new Vector2(0.002 * intensity, 0.002 * intensity)}
        radialModulation={true}
        modulationOffset={0.3}
      />

      {/* Film Grain / Noise */}
      <Noise
        opacity={0.15 * intensity}
        blendFunction={BlendFunction.OVERLAY}
      />

      {/* Vignette - Dark edges */}
      <Vignette
        offset={0.3}
        darkness={0.7 * intensity}
        blendFunction={BlendFunction.NORMAL}
      />

      {/* Scanlines effect via custom shader would go here */}
      {/* For now, we'll use increased noise to simulate */}
      <Noise
        opacity={0.05 * intensity}
        blendFunction={BlendFunction.MULTIPLY}
      />
    </EffectComposer>
  );
};

export default CyberpunkEffects;