import React, { useMemo, useEffect } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  useNodesState,
  useEdgesState,
  useReactFlow,
  ReactFlowProvider,
  BackgroundVariant,
} from '@xyflow/react';
import type { Node, Edge } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { stratify, tree } from 'd3-hierarchy';
import type { Person } from '../types';
import type { Translations } from '../i18n';
import { PersonNode } from './PersonNode';
import type { PersonNodeData } from './PersonNode';
import { GenerationBandNode } from './GenerationBandNode';
import type { GenerationBandData } from './GenerationBandNode';

interface FamilyGraphProps {
  people: Person[];
  selectedPersonId: string | null;
  simulationConsent: boolean;
  t: Translations;
  onSelectPerson: (person: Person) => void;
  targetGeneration?: number | null;
}

const NODE_WIDTH = 175;
const NODE_HEIGHT = 64;
const HORIZONTAL_SPACING = 205;
const LEVEL_HEIGHT = 120; // Compact row height so all 7 generations fit on start

const FamilyGraphCanvas: React.FC<FamilyGraphProps> = ({
  people,
  selectedPersonId,
  simulationConsent,
  t,
  onSelectPerson,
  targetGeneration,
}) => {
  const { setCenter, setViewport, getNodes, getViewport } = useReactFlow();

  // Compute layout positions using d3-hierarchy and generation backdrop bands
  const { initialNodes, initialEdges, generationPositions, nodePositions } = useMemo(() => {
    try {
      const stratifier = stratify<Person>()
        .id((d) => d.id)
        .parentId((d) => d.fatherId);

      const root = stratifier(people);
      const treeLayout = tree<Person>().nodeSize([HORIZONTAL_SPACING, LEVEL_HEIGHT]);
      treeLayout(root);

      const descendants = root.descendants();
      const xCoordinates = descendants.map((d) => d.x ?? 0);
      const minX = Math.min(...xCoordinates);
      const maxX = Math.max(...xCoordinates);
      const centerX = (minX + maxX) / 2;

      const nodes: Node<PersonNodeData | GenerationBandData>[] = [];
      const edges: Edge[] = [];
      const genYMap: Record<number, number> = {};
      const nodePosMap: Record<string, { x: number; y: number }> = {};

      // 1. Full-Width Horizontal Generation Backdrop Bands (-1400px to +1400px)
      for (let g = 1; g <= 7; g++) {
        const yPos = (g - 1) * LEVEL_HEIGHT;
        genYMap[g] = yPos;
        const genInfo = t.generations[g] || {
          name: `Gen ${g}`,
          role: '',
          era: '',
        };

        nodes.push({
          id: `gen-band-${g}`,
          type: 'generationBand',
          position: { x: -1400, y: yPos - 18 },
          selectable: false,
          draggable: false,
          focusable: false,
          deletable: false,
          zIndex: -1,
          data: {
            generation: g,
            name: genInfo.name,
            role: genInfo.role,
            era: genInfo.era,
          },
        });
      }

      // 2. Person Nodes perfectly aligned on top of each generation band
      descendants.forEach((d) => {
        const person = d.data;
        const xPos = (d.x ?? 0) - centerX - NODE_WIDTH / 2;
        const yPos = (person.generation - 1) * LEVEL_HEIGHT;
        nodePosMap[person.id] = { x: xPos + NODE_WIDTH / 2, y: yPos + NODE_HEIGHT / 2 };

        nodes.push({
          id: person.id,
          type: 'personNode',
          position: { x: xPos, y: yPos },
          zIndex: 1,
          data: {
            person,
            isSelected: person.id === selectedPersonId,
            simulationConsent,
            t,
            onSelect: onSelectPerson,
          },
        });

        // 3. Edges connecting parent to child
        if (person.fatherId) {
          const isEdgeHighlighted =
            person.id === selectedPersonId || person.fatherId === selectedPersonId;

          edges.push({
            id: `e-${person.fatherId}-${person.id}`,
            source: person.fatherId,
            target: person.id,
            type: 'smoothstep',
            animated: false,
            style: {
              stroke: isEdgeHighlighted ? '#174E46' : '#5A5243',
              strokeWidth: isEdgeHighlighted ? 3.5 : 2.5,
            },
          });
        }
      });

      return {
        initialNodes: nodes,
        initialEdges: edges,
        generationPositions: genYMap,
        nodePositions: nodePosMap,
      };
    } catch (err) {
      console.error('Failed to compute tree layout:', err);
      return {
        initialNodes: [],
        initialEdges: [],
        generationPositions: {},
        nodePositions: {},
      };
    }
  }, [people, selectedPersonId, simulationConsent, t, onSelectPerson]);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  // Synchronize when data, language or selection updates
  useEffect(() => {
    setNodes(initialNodes);
    setEdges(initialEdges);
  }, [initialNodes, initialEdges, setNodes, setEdges]);

  // Initial load: scale = 0.74 so all 7 generations (down to living relatives) are visible on start!
  useEffect(() => {
    const timer = setTimeout(() => {
      const offsetX = window.innerWidth > 1400 ? (window.innerWidth - 440) / 2 : window.innerWidth / 2;
      setViewport({ x: offsetX, y: 35, zoom: 0.74 });
    }, 120);
    return () => clearTimeout(timer);
  }, [setViewport]);

  // When a person is selected, adjust camera so right-side panel never obscures them
  useEffect(() => {
    if (selectedPersonId && nodePositions[selectedPersonId]) {
      const pos = nodePositions[selectedPersonId];
      const currentVp = getViewport();
      // Shift target camera slightly to the right of node so node stays in open canvas area (left of panel)
      setCenter(pos.x + 80, pos.y, {
        duration: 450,
        zoom: Math.max(currentVp.zoom, 0.78),
      });
    }
  }, [selectedPersonId, nodePositions, setCenter, getViewport]);

  // Smoothly center when a generation is clicked in navigation rail
  useEffect(() => {
    if (targetGeneration && generationPositions[targetGeneration] !== undefined) {
      const currentNodes = getNodes();
      const genNodes = currentNodes.filter((n) => {
        const personData = (n.data as unknown as PersonNodeData)?.person;
        return personData?.generation === targetGeneration;
      });
      if (genNodes.length > 0) {
        const avgX =
          genNodes.reduce((acc, n) => acc + n.position.x + NODE_WIDTH / 2, 0) /
          genNodes.length;
        const targetY = generationPositions[targetGeneration] + NODE_HEIGHT / 2;
        setCenter(avgX, targetY, { duration: 500, zoom: 0.82 });
      }
    }
  }, [targetGeneration, generationPositions, setCenter, getNodes]);

  const nodeTypes = useMemo(
    () => ({
      personNode: PersonNode,
      generationBand: GenerationBandNode,
    }),
    []
  );

  return (
    <div className="graph-container">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        minZoom={0.4}
        maxZoom={1.6}
        proOptions={{ hideAttribution: true }}
      >
        <Background variant={BackgroundVariant.Dots} gap={28} size={1.2} color="#D5CCBA" />
        <Controls
          showInteractive={false}
          style={{
            background: '#FAF7F2',
            border: '1px solid var(--border-subtle)',
            borderRadius: '8px',
            boxShadow: 'var(--shadow-sm)',
          }}
        />
      </ReactFlow>
    </div>
  );
};

export const FamilyGraph: React.FC<FamilyGraphProps> = (props) => {
  return (
    <ReactFlowProvider>
      <FamilyGraphCanvas {...props} />
    </ReactFlowProvider>
  );
};
