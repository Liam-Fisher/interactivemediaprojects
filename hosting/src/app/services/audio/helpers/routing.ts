
type connection = Record<string, [number?, number?]>;



export function routeOut<T extends AudioNode>(ctx: AudioContext, tgtNode: T) {
    if (tgtNode.numberOfOutputs > 0) {
      tgtNode.connect(ctx.destination);
    }
}
    
export function makeConnections<T extends AudioNode>(
    nodes: Map<string, AudioNode>,
    newNode: T,
    isInput: boolean,
    map?: connection
  ) {
    for (let nodeID in map) {
      let existingNode = nodes.get(nodeID);
      let connections = map[nodeID];
      if (!existingNode) {
        throw new Error(
          `node with ID ${nodeID} specified in source map does not exist`
        );
      }
      validateConnections(
        isInput ? existingNode : newNode,
        isInput ? newNode : existingNode,
        connections
      );
      (isInput ? newNode : existingNode).connect(
        isInput ? existingNode : newNode,
        ...connections
      );
    }
  }
  export function validateConnections(
    srcNode: AudioNode,
    tgtNode: AudioNode,
    io: [number?, number?]
  ) {
    if (srcNode.numberOfOutputs <= (io?.[0] ?? -1)) {
      throw new Error(`output ${io?.[0]} does not exist`);
    }
    if (tgtNode.numberOfInputs <= (io?.[1] ?? -1)) {
      throw new Error(`input ${io?.[1]} does not exist`);
    }
    return true;
  }