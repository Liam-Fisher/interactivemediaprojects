const NUM_GRAPHS = 3;
const NUM_NODES = 9;

@state adjacencyMatrices = new FixedFloat32Array(NUM_GRAPHS, NUM_NODES, NUM_NODES, NUM_NODES);
@state nodeHistory = new FixedInt8Array(NUM_GRAPHS, 2);
@state noise = new noise(); 


function setProbability(graph, currentNode, previousNode, nextNode, prob) {
    if(graph>=0&&currentNode>=0&&previousNode>=0&&nextNode>=0&&prob>=0) {
        adjacencyMatrices[graph][currentNode][nextNode][previousNode] = prob;
    }
}

function setHistory(graph, history, value) {
    if(graph>=0&&history>=0&&value>=0) {
        nodeHistory[graph][history] = value;
    }
}
// used for data input 
function listin2(v) {
	let len = listlen(v);
    if(len==5) { 
        setProbability(0+v[0], 0+v[1], 0+v[2], 0+v[3], v[4]); 
    }
    else { 
        setHistory(0+v[0],  0+v[1],  0+v[2]); 
    }
}
function getProbability(graph, currentNode, previousNode, nextNode) {
    return adjacencyMatrices[graph][currentNode][nextNode][previousNode]; 
}
function getHistory(graph, history) { 
    return nodeHistory[graph][history]; 
}
function normNoise() {
    return noise.next()/2+0.5;
}
function getNextNode(threshold, graph, currentNode, previousNode) {
    let probAccum = 0;
    let nextNode = -1;
    do  {
            nextNode++;
            probAccum += adjacencyMatrices[graph][currentNode][nextNode][previousNode];
    }
    while(nextNode < NUM_NODES && probAccum < threshold);
    return nextNode;
}
function stepToNext(graph, currentNode, nextNode) {  
    setHistory(graph, 0, nextNode);
    setHistory(graph, 1, currentNode);
    return nextNode;
}

function walkGraph(graph,buf) {
    let rand = normNoise();
    let currentNode = getHistory(graph, 0);
    let previousNode = getHistory(graph, 1);
    let nextNode = getNextNode(rand, graph, currentNode, previousNode);
    stepToNext(graph, currentNode, nextNode);
    return getMsgOut(graph, buf, currentNode, previousNode);
}
function getMsgOut(graph, buf, currentNode, previousNode) {
    let currentRow = floor(currentNode/3);
    let currentCol = currentNode%3;
    let previousRow = floor(previousNode/3);
    let previousCol = previousNode%3;
    return [graph, buf, currentRow, currentCol, previousRow, previousCol];
}
let activeSides = listin1;
for(let i =0; i<NUM_GRAPHS; i++) {
	let activeSide = activeSides[i]; 
	if(activeSide != 0) {
		listout1 = walkGraph(i);
	}
}