import { memo } from 'react';
import type { NodeProps } from '@xyflow/react';

export interface GenerationBandData {
  generation: number;
  name: string;
  role: string;
  era: string;
  [key: string]: unknown;
}

export const GenerationBandNode = memo(({ data }: NodeProps) => {
  const bandData = data as unknown as GenerationBandData;
  const isEven = bandData.generation % 2 === 0;

  return (
    <div
      className={`gen-backdrop-band ${isEven ? 'is-even' : 'is-odd'}`}
      style={{
        width: '2800px',
        height: '98px',
        pointerEvents: 'none',
        userSelect: 'none',
      }}
    >
      <div className="gen-band-label-pill">
        <span className="gen-band-pill-name">{bandData.name}</span>
        <span className="gen-band-pill-divider">·</span>
        <span className="gen-band-pill-role">{bandData.role}</span>
        <span className="gen-band-pill-era">{bandData.era}</span>
      </div>
    </div>
  );
});

GenerationBandNode.displayName = 'GenerationBandNode';
