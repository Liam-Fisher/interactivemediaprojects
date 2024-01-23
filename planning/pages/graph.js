
// from 1 to 255;
const NUM_GRAPHS = 3;
const NUM_NODES = 9;
// helpful for probabilies of a specific field, i.e. probabilities expressed as fractions of 1
const MIN_PROB = 0.00001; // e.g. 1/1000'

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

function getProbability(graph, currentNode, previousNode, nextNode) { return adjacencyMatrices[graph][currentNode][nextNode][previousNode]; }
function getHistory(graph, history) { return nodeHistory[graph][history]; }

function normNoise() {
    return noise.next()/2+0.5;
}
function getNextNode(threshold, graph, currentNode, previousNode) {
    if(threshold<0||graph<0||currentNode<0||previousNode<0) {
        post("getNextNode failed");
        return -1;
    }
    let prob = 0;
    let probAccum = 0;
    let nextNode = -1;
    do  {
            nextNode++;
            prob = getProbability(graph, currentNode, previousNode, nextNode);
            deltaProb = MIN_PROB*probAccum+prob;
            probAccum += deltaProb;
    }
    while(nextNode < NUM_NODES && probAccum < threshold);
    return nextNode;
}
function stepToNext(graph, currentNode, nextNode) {  
    if(graph<0||nextNode<0||currentNode<0) {
        post("stepToNext failed");
        return -1;
    }
    setHistory(graph, 0, nextNode);
    setHistory(graph, 1, currentNode);
    return nextNode;
}

function walkGraph(graph) {
    let rand = normNoise();
    let currentNode = getHistory(graph, 0);
    let previousNode = getHistory(graph, 1);
    let nextNode = getNextNode(rand, graph, currentNode, previousNode);
    stepToNext(graph, currentNode, nextNode);
    return nextNode;
}
// this in an interface for setters
function listin2(v) {
	let len = listlen(v);
    if(len==3) { setHistory(0+v[0],  0+v[1],  0+v[2]); }
    else if(len==5) { setProbability(0+v[0], 0+v[1], 0+v[2], 0+v[3], v[4]); }
    else {
        post("listin2: wrong number of args");
        post(len);
    }
}

let activeSides = listin1;
for(let i =0; i<NUM_GRAPHS; i++) {
	let activeSide = activeSides[i]; 
	if(activeSide != 0) {
		out1 = walkGraph(activeSide);
	}
}
