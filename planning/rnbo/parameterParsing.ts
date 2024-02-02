
// This one will parse by parameter, not by subpatcher
interface ParamNode {
    name: string;
    children: ParamNode[];
  }
  
function buildTree(ids: string[]): ParamNode {
    const root: ParamNode = { name: 'root', children: [] };
  
    ids.forEach((id) => {
      const path = id.split('/');
      let currentNode: ParamNode = root;
  
      path.forEach((nodeName) => {
        const existingNode = currentNode?.children.find((child) => child.name === nodeName);
  
        if (existingNode) {
          currentNode = existingNode;
        } else {
          const newNode: ParamNode = { name: nodeName, children: [] };
          currentNode.children.push(newNode);
          currentNode = newNode;
        }
      });
    });
  
    return root;
  }
  
  // Example usage
  const ids = ["top/A", "top/B", "top/inner/A", "top/inner/B"];
  const tree = buildTree(ids);
  console.log(JSON.stringify(tree, null, 2));



export interface BottomPreset {
    [name: string]: {value: number}
}
export interface SubpatcherPreset {
    __sps: {
        [name: string]: BottomLevelPreset|BottomLevelPreset[]|SubpatcherPreset|SubpatcherPreset[]
    };
}
export interface Node {
    name: string; // key of the preset
    parallel: number; // length of the preset if it is an array, or 1 if it is not
    children: Node[]; // children of the preset
}
declare function parseLayout(layout: NestedPreset, idMap: Map<string, number>): SubpatcherNode[];


export type PresetParameterData = {value: number};
export type BottomLevelPreset = { [name: string]: {value: number} }

export interface SubpatcherPreset {
    __sps: {
        [name: string]: BottomLevelPreset|BottomLevelPreset[]|SubpatcherPreset|SubpatcherPreset[]
    };
}
export type NestedPreset = (BottomLevelPreset&SubpatcherPreset)|SubpatcherPreset|BottomLevelPreset;
export type PolyPreset = {
    __sps: {
        poly: NestedPreset[]
    }
}
export interface TopLevelPreset  {
    name: string;
    preset: NestedPreset|PolyPreset;
}
export interface SubpatcherNode {
    name: string; // name of the subpatcher
    indices: number[]; // indices of the parameters at this subpatcher level
    unique_voices: number; // number of unique voices at this subpatcher level
    parallel_voices: number; // number of parallel voices at this subpatcher level
    children: SubpatcherNode[];
}
type ParameterMap = Map<string, {index: number}>;
export function parsePreset({preset}: TopLevelPreset, parametersById: ParameterMap, name: string): SubpatcherNode[] {
    
    let root: SubpatcherNode = createSubpatcherNode(name, [], 0, 0, []);
    let tree: SubpatcherNode[] = [];
    let topLevelPolySize: number = 0;
    let parameterPath: string[] = [];
    let hasSubpatchers = ('__sps' in preset);
    if(isPoly(preset)) { 
        topLevelPolySize = preset.__sps.poly.length;
        root.unique_voices = topLevelPolySize;
        parameterPath.push('poly');
        let hasChildren = isNested(preset.__sps.poly[0]); // all instances of the poly preset have the same structure
    }
    else if('__sps' in preset) {

        let hasChildren = isNested(preset.__sps); // all instances of the preset have the same structure
    }
    else {

    }
    tree.push(root);
    return tree;
}
function getParameterIndices(preset: NestedPreset, path: string[], parametersById: ParameterMap): number[] {
    let indices: number[] = [];
    for(let key in preset) {
        if(key === '__sps') continue; // skip subpatchers
        let parameterId = path.concat(key).join('/');
        if(key in parametersById) {
            indices.push(parametersById.get(key)!.index);
        }
    }
    return indices;
}

function createSubpatcherNode(name: string, indices: number[], unique_voices: number, parallel_voices: number, children: SubpatcherNode[]) {
    return {name, indices, unique_voices, parallel_voices, children};
}

function isBottomLevel(preset: NestedPreset): preset is BottomLevelPreset {
    return !('__sps' in preset);
}

function isNested(preset: NestedPreset|BottomLevelPreset): preset is NestedPreset {
    return '__sps' in preset;
}
function isPoly(preset: NestedPreset|PolyPreset): preset is PolyPreset {
    return '__sps' in preset && 'poly' in preset.__sps;
}



declare function addParameterToNode(node: SubpatcherNode, path: string, value: number): void;