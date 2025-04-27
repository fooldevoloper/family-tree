import { NodeData } from "../types/family";
import { RootNode } from "./RootNode";

function ParentNode({
  data,
  isConnectable,
}: {
  data: NodeData;
  isConnectable?: boolean;
}) {
  return (
    <RootNode
      data={data}
      isConnectable={isConnectable}
      borderColor="#1890ff"
      showChildButton={true}
    />
  );
}

export default ParentNode;
