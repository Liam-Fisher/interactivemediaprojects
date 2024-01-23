

const adjacencyMatrices = new FixedFloat32Array(NUM_GRAPHS, NUM_NODES, NUM_NODES, NUM_NODES);
const nodeValues = new FixedInt8Array(NUM_GRAPHS, NUM_NODES, NODE_SIZE);
const nodeHistory = new FixedInt8Array(NUM_GRAPHS, 2);
const noise = new noise();

// from 1 to 255;
const NUM_GRAPHS = 3;
const NUM_NODES = 9;
const NODE_SIZE = 2;
// helpful for probabilies of a specific field, i.e. probabilities expressed as fractions of 1
const MIN_PROB = 0.00001; // e.g. 1/1000'

@state adjacencyMatrices = new FixedFloat32Array(NUM_GRAPHS, NUM_NODES, NUM_NODES, NUM_NODES);
@state nodeValues = new FixedInt8Array(NUM_GRAPHS, NUM_NODES, NODE_SIZE);
@state nodeHistory = new FixedInt8Array(NUM_GRAPHS, 2);
@state noise = new noise(); 



function postTransitionMatrix()  {
        for(let i=0;i<NUM_GRAPHS;i++) {
            for(let j=0;j<NUM_NODES;j++) {
                for(let k=0;k<NUM_NODES;k++) {
                    for(let l=0;l<NUM_NODES;l++) {
                        let val = adjacencyMatrices[i][j][k][l];
                        post("__________________________________________");
                        post("adjacencyMatrixIndex");
                        post(i);
                        post(j);
                        post(k);
                        post(l);
                        post("adjacencyMatrixValue");
                        post(val);
                    }
                }
            }
        }
}
function postNodeValues() {
    for(let i=0;i<NUM_GRAPHS;i++) {
        for(let j=0;j<NUM_NODES;j++) {
            for(let k=0;k<NODE_SIZE;k++) {
            let val = nodeValues[i][j][k];
            post("__________________________________________");
            post("nodeValuesIndex");
            post(i);
            post(j);
            post("nodeValuesValue");
            post(val);
            }
        }
    }
}
function postHistory() {
    for(let i=0;i<NUM_GRAPHS;i++) {
        for(let j=0;j<2;j++) {
            let val = nodeHistory[i][j];
            post("__________________________________________");
            post("graphWalkPositionsIndex");
            post(i);
            post(j);
            post("graphWalkPositionsValue");
            post(val);
        }
    }
}

function checkGraph(graph) {    
    if(graph<0 || graph>=NUM_GRAPHS) {
        post("checkGraph: value out of bounds");
        return -1;
    }
    return graph;
}
function checkNode(node) {
    if(node<0 || node>=NUM_NODES) {
        post("checkNode: value out of bounds");
        return -1;
    }
    return node;
}
function checkIndex(valueIndex) {
    if(valueIndex<0 || valueIndex>=NODE_SIZE) {
        post("checkNodeValue: value out of bounds");
        return -1;
    }
    return valueIndex;
}
function checkValue(nodeValue) {
    if(nodeValue<0 || nodeValue>=256) {
        post("checkNodeValue: value out of bounds");
        return -1;
    }
    return nodeValue;
}
function checkHistory(history) {
    if(history!=0 && history!=1) {
        post("checkHistory: value out of bounds");
        return -1;
    }
    return history;
}
function checkProb(probValue) {
    if(probValue<0 || probValue>1) {
        post("checkProbValue: value out of bounds");
        return -1;
    }
    return probValue;
}

function setProbability(graph, currentNode, previousNode, nextNode, prob) {
    if(graph>=0&&currentNode>=0&&previousNode>=0&&nextNode>=0&&prob>=0) {
        adjacencyMatrices[graph][currentNode][nextNode][previousNode] = prob;
    }
}
function setNode(graph, node, index, value) {
    if(graph>=0&&node>=0&&index>=index&&value>=0) {
        nodeValues[graph][node][index] = value;    
    }
}
function setHistory(graph, history, value) {
    if(graph>=0&&history>=0&&value>=0) {
        nodeHistory[graph][history] = value;
    }
}

function getProbability(graph, currentNode, previousNode, nextNode) { return adjacencyMatrices[graph][currentNode][nextNode][previousNode]; }
function getNodeValue(graph, node, index) { return nodeValues[graph][node][index]; }
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
    post("nextNode: ");
    post(nextNode);
    return checkNode(nextNode);
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
    post("currentNode: ");
    post(currentNode);
    post("previousNode: ");
    post(previousNode);
    let nextNode = getNextNode(rand, checkGraph(graph), currentNode, previousNode);
    stepToNext(checkGraph(graph), currentNode, nextNode);
    return nextNode;
}
function getHistories(graph) {  
    let histories: list = [];
    for(let i=0;i<2;i++) {
        histories.push(getHistory(graph, i));
    }
    return histories;
}
function getNodeValues(graph, node) {
    let values: list = [];
    for(let i=0;i<NODE_SIZE;i++) {
        values.push(getNodeValue(graph, node, i));
    }
    return values;
}

function getProbabilities(graph, currentNode, previousNode) {
    let probabilities: list = [];
    for(let i=0;i<NUM_NODES;i++) {
        probabilities.push(getProbability(graph, currentNode, previousNode, i));
    }
    return probabilities;
}
// this in an interface for setters
function listin2(v) {
	let len = listlen(v);
    if(len<=2) {
        post("listin2: list too short");
        post(len);
    }
    else if(len==3) { setHistory(0+checkGraph(v[0]),  0+checkHistory(v[1]),  0+checkNode(v[2])); }
    else if(len==4) { setNode(0+checkGraph(v[0]),  0+checkNode(v[1]),  0+checkIndex(v[2]), 0+checkValue(v[3])); }
    else if(len==5) { setProbability(0+checkGraph(v[0]), 0+checkNode(v[1]), 0+checkNode(v[2]), 0+checkNode(v[3]), checkProb(v[4])); }
    else {
        post("listin2: list too long");
        post(len);
    }
}
// this is an interface for getters
function listin3(v) {
    let len = listlen(v);
    if(len==0) {
        post("listin3: list too short");
        post(len);
    }
    else if(len==1) { listout2 = getHistories(0+checkGraph(v[0])); }
    else if(len==2) { listout2 = getNodeValues(0+checkGraph(v[0]), 0+checkNode(v[1])); }
    else if(len==3) { listout2 = getProbabilities(0+checkGraph(v[0]), 0+checkNode(v[1]), 0+checkNode(v[2])); }
    else {
        post("listin3: list too long");
        post(len);
    }
}

if(in1<NUM_GRAPHS)  {
    let node = walkGraph(in1);
    listout1 = getNodeValues(in1, node);
}
else if(in1==1000) {
    post("postTransitionMatrix: ");
	postTransitionMatrix();
}
else if(in1==100) {
	postNodeValues();
}
else if (in1==10) {
	postHistory();	
}
else {
	post("too large");
}
