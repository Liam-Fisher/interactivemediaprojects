/* @param {"min": 0, "max": 1}  * */
const NUM_VALUES = 6;
@state chordNotes = new FixedFloat32Array(NUM_VALUES);
@param({min: 0, max: 1}) topGainScale = 0.5;
@param({min: 0, max: 1}) columnGain = 5;
@param({min: 0, max: 1}) rowGain = 10;
@param({min: 0, max: 1}) defaultGain = 60;
@param({min: 0, max: 1}) columnPan = 0.5;
@param({min: 0, max: 1}) topPan = 1;

function getGain(face, row, column) {
    if(face<2) {
        return defaultGain+rowGain*row+columnGain*column;
    }
    else {
        return  defaultGain*topGain+columnGain*row+columnGain*column;
    }
}

function getPan(face, row, column) {
    if(face<2) {
        return column*(columnPan*0.2) + face*(0.5+columnPan*0.1);
    }
    else {
        return  0.5 + (row-column)*(topPan*columnPan*0.2);
    }
}
// set chord notes
function listin2(v) {
    let len = listlen(v);
    if(len!=NUM_VALUES) {
        post("listin2: list too short");
        post(len);
    }
    else {
        for(let i=0;i<NUM_VALUES;i++) {
            chordNotes[i] = v[i];
        }
    }
}
// input: [face, node, ...values]


let data = listin1;

if(data.length<4) {
    post("data too short");
    return;
}
let face: Int = data.shift();
let node: Int = data.shift();
let row: Int = 0+(node%3);
let column: Int = 0+floor(node/3);
let gain = getGain(face, row, column);
let pan = getPan(face, row, column);
let valueIndexA = data.shift();
let frequency = chordNotes[valueIndexA];
listout1 = [face, gain, pan, frequency];
