import { Edge, Node, NodeProps, ReactFlow } from "@xyflow/react";
import { useEffect, useState } from "react";
import { RootNode } from "../nodes/RootNode";
import { FamilyTree } from "../services/FamilyTree";
import { NodeData } from "../types/family";

interface FamilyTreeViewProps {
  initialData?: Partial<NodeData>;
}

export const FamilyTreeView: React.FC<FamilyTreeViewProps> = ({
  initialData = {},
}) => {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [familyTree, setFamilyTree] = useState<FamilyTree | undefined>(
    undefined
  );

  useEffect(() => {
    const tree = new FamilyTree(initialData);
    setFamilyTree(tree);
    const { nodes, edges } = tree.getTree();
    setNodes(nodes);
    setEdges(edges);
  }, [initialData]);

  const nodeTypes = {
    parent: (props: NodeProps) => (
      <RootNode {...props} familyTree={familyTree} />
    ),
    spouse: (props: NodeProps) => (
      <RootNode {...props} familyTree={familyTree} isSpouse={true} />
    ),
    child: (props: NodeProps) => (
      <RootNode {...props} familyTree={familyTree} />
    ),
  };

  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        fitView
        onNodeClick={(event, node) => {
          // Handle node click events here
          console.log("Node clicked:", node);
        }}
      />
    </div>
  );
};
