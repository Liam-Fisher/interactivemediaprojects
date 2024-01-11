
// need functions for both input lists that aissng to local fixed length array.

// in1 and in2 indicate a step in the sequence.  in1 is the left side, in2 is the right side.
    // side, chordIndex, 
// @state chordState = new FixedIntArray(2, 3);
    // side, row, column, color: number
// @state faceState = new FixedIntArray(2, 3, 3); 
    // side: [left, right], history: [previous, next], address: row*3+column, 
// @state sequencerState = new FixedIntArray(2, 2);

function listin3(v) {
    for (let i = 0; i < 3; i++) {
        for(let j = 0; j < 3; j++){
            let index = i * 3 + j;
            faceState[0][i][j] = v[index];
        }
    }
}
function listin4(v) {
    for (let i = 0; i < 3; i++) {
        for(let j = 0; j < 3; j++){
            let index = i * 3 + j;
            faceState[1][i][j] = v[index];
        }
    }
}
function listin5(v) {
    for (let i = 0; i < 3; i++) {    
        chordState[0][i] = v[i];
    }
}
function listin6(v) {
    for (let i = 0; i < 3; i++) {    
        chordState[1][i] = v[i];
    }
}
function selectState(options, previous) {
    let selected = listscramble(options);
	let selectedCount =listlen(selected);
	for(let i=0; i<selectedCount;  i++) {	
		let option = selected[i];
		if(option !== previous) {
			return option;
		}
	}
    return previous;
}
function getState(currentState, previousState) {
    switch(currentState) {
        case 1:
            return selectState([0, 2, 4], previousState);
        case 2:
            return selectState([1,5], previousState);
        case 3:
            return selectState([0,4,6], previousState);
        case 4:
            return selectState([1,3,5,7], previousState);
        case 5:
            return selectState([2,4,8], previousState);
        case 6:
            return selectState([3,7], previousState);
        case 7:
            return selectState([4,6,8], previousState);
        case 8:
            return selectState([5,7], previousState);
        default:   //0
            return selectState([1, 3], previousState);
        }
}
function getChord(side, color){
    switch(color) {
        case 1:
            return [chordState[side][0], chordState[side][1]];
        case 2:
            return [chordState[side][1], chordState[side][1]];
        case 3:
            return [chordState[side][1], chordState[side][2]];
        case 4:
            return [chordState[side][2], chordState[side][2]];
        case 5:
            return [chordState[side][0], chordState[side][2]];
        default:    //0
            return [chordState[side][0], chordState[side][0]];
    }
}
function setState(side) {
    let previousState = sequencerState[side][0];
    let currentState = sequencerState[side][1];
    let nextState = getState(previousState, currentState);
    sequencerState[side][0] = currentState;
    sequencerState[side][1] = nextState;
    return nextState;
}
function getStateRow(state) {
    return floor(state / 3);
}
function getStateColumn(state) {
    return state % 3;
}
function getFaceletColor(side, row, column) {
    return faceState[side][row][column];
}

function getNote(side, state)   {
    let row = getStateRow(state);
    let column = getStateColumn(state);
    let color = getFaceletColor(side, row, column);
    let chord = getChord(side, color);
    chord[0]+=row*12;
    chord[1]+=row*12;
    let velocity = 60+column*20;
    chord.push(velocity);
    return chord;
}
if(in1) {
    let nextLeftState = setState(0);
    let leftNotes = getNote(0, nextLeftState);
    post("chordL");
    post(leftNotes[0]);
    post(leftNotes[1]);
    post(leftNotes[2]);

    out1 = leftNotes[0];
    out2 = leftNotes[1];
    out3 = leftNotes[2];
}
if(in2) {
    let nextRightState = setState(1);
    let rightNotes = getNote(1, nextRightState);
    post("chordR");
    post(rightNotes[0]);
    post(rightNotes[1]);
    post(rightNotes[2]);

    out4 = rightNotes[0];
    out5 = rightNotes[1];
    out6 = rightNotes[2];
}
