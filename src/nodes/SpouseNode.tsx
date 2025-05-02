import { NodeData } from '../types/family';
import { RootNode } from './RootNode';

function SpouseNode({ data, isConnectable }: { data: NodeData; isConnectable?: boolean }) {
  return (
    <RootNode
      data={data}
      isConnectable={isConnectable}
      borderColor="#52c41a"
      showSpouseButton={false}
      showChildButton={true}
      isSpouse={true}
    />
  );
}

export default SpouseNode;
