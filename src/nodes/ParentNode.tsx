import useFamilyStore from "../store/familyStore";
import { NodeData } from "../types/family";
import { RootNode } from "./RootNode";

function ParentNode({
  data,
  isConnectable,
}: {
  data: NodeData;
  isConnectable?: boolean;
}) {
  const { addNode, addEdge, nodes } = useFamilyStore();

  const handleAddChild = () => {
    // Count existing children to determine position
    const existingChildren = nodes.filter(
      (node) => node.type === "child" && node.data.parentId === data.id
    );
    const childCount = existingChildren.length;

    // Calculate position for new child
    const baseX = data.position.x;
    const baseY = data.position.y + 150;
    const spacing = 300; // Increased spacing between children
    const offset = (childCount * spacing) / 2; // Center the children

    const newNode = {
      id: `node-${Date.now()}`,
      type: "child" as const,
      position: {
        x: baseX - offset,
        y: baseY,
      },
      data: {
        id: `node-${Date.now()}`,
        name: "Child",
        position: {
          x: baseX - offset,
          y: baseY,
        },
        label: "",
        parentId: data.id,
        canAddChildren: true,
        canAddSpouse: true,
      },
    };

    addNode(newNode);

    if (childCount === 0) {
      // First child - direct connection
      addEdge({
        id: `edge-${Date.now()}`,
        source: data.id,
        target: newNode.id,
        type: "smoothstep",
      });
    } else {
      // Additional children - connect to thread
      const threadNode = {
        id: `thread-${data.id}`,
        type: "thread" as const,
        position: {
          x: baseX,
          y: baseY - 50,
        },
        data: {
          id: `thread-${data.id}`,
          name: "",
          position: {
            x: baseX,
            y: baseY - 50,
          },
          label: "",
        },
      };

      // Add thread node if it doesn't exist
      if (!nodes.find((n) => n.id === threadNode.id)) {
        addNode(threadNode);
        // Connect parent to thread
        addEdge({
          id: `edge-${data.id}-thread`,
          source: data.id,
          target: threadNode.id,
          type: "smoothstep",
        });
      }

      // Connect child to thread
      addEdge({
        id: `edge-${threadNode.id}-${newNode.id}`,
        source: threadNode.id,
        target: newNode.id,
        type: "smoothstep",
      });
    }
  };

  return (
    <RootNode
      data={data}
      isConnectable={isConnectable}
      borderColor="#1890ff"
      onAddChild={handleAddChild}
      showChildButton={true}
    />
  );
}

export default ParentNode;
