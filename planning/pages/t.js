let topGain = 0.5;
let columnGain = 0.1;
let rowGain = 0.1;
let columnPan = 0.5;
let topPan = 1;
let gain = 0;

function getGain(face, row, column) {
    if(face<2) {
        return gain+rowGain*row+columnGain*column;
    }
    else {
        return  gain*topGain+columnGain*row+columnGain*column;
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