import { NodeData } from '../types/family';
import { RootNode } from './RootNode';

function ChildNode({ data, isConnectable }: { data: NodeData; isConnectable?: boolean }) {
  return (
    <RootNode
      data={data}
      isConnectable={isConnectable}
      borderColor="#52c41a"
      showSpouseButton={data.canAddSpouse}
      showChildButton={data.canAddChildren}
    />
  );
}

export default ChildNode;
