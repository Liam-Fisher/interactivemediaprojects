"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var faceletAddressObject = {
    "front": {
        "y": [[0, 1, 2], [3, 4, 5], [6, 7, 8]], "x": [[0, 3, 6], [1, 4, 7], [2, 5, 8]], "z": []
    },
    "left": {
        "y": [[0, 1, 2], [3, 4, 5], [6, 7, 8]], "z": [[2, 5, 8], [1, 4, 7], [0, 3, 6]], "x": []
    },
    "top": {
        "z": [[0, 1, 2], [3, 4, 5], [6, 7, 8]], "x": [[0, 3, 6], [1, 4, 7], [2, 5, 8]], "y": []
    },
    "back": {
        "y": [[6, 7, 8], [3, 4, 5], [0, 1, 2]], "x": [[2, 5, 8], [1, 4, 7], [0, 3, 6]], "z": []
    },
    "right": {
        "y": [[6, 7, 8], [3, 4, 5], [0, 1, 2]], "z": [[2, 5, 8], [1, 4, 7], [0, 3, 6]], "x": []
    },
    "bottom": {
        "z": [[6, 7, 8], [3, 4, 5], [0, 1, 2]], "x": [[2, 5, 8], [1, 4, 7], [0, 3, 6]], "y": []
    }
};
var RubixFaceletState = /** @class */ (function () {
    function RubixFaceletState() {
        this.faceNames = ['front', 'back', 'top', 'bottom', 'left', 'right'];
        this.reset();
    }
    RubixFaceletState.prototype.reset = function () {
        this.facelets = Object.fromEntries(this.faceNames.map(function (name, i) { return [name, (new Array(9)).fill(i)]; }));
    };
    RubixFaceletState.prototype.printFaces = function () {
        console.log("... ... ... printing faces ... ... ... ... ");
        for (var face in this.facelets) {
            var colors = this.facelets[face];
            console.log("".concat(face, ":           "));
            console.log("".concat(colors[0], "|").concat(colors[1], "|").concat(colors[2]));
            console.log("".concat(colors[3], "|").concat(colors[4], "|").concat(colors[5]));
            console.log("".concat(colors[6], "|").concat(colors[7], "|").concat(colors[8]));
        }
        console.log("... ... ... ...  ... ... ... ... ... ... ");
    };
    RubixFaceletState.prototype.transposeFace = function (f, o) {
        var map = f.map(function (_, i) { return f.at((i % 3 + (i % 3) * 3)); });
        return o === '+' ? map : map.reverse();
    };
    RubixFaceletState.prototype.rotateSideFace = function (axis, orientation, slice) {
        var sideFaceName = this.getSideFace(axis, slice);
        if (sideFaceName) {
            this.facelets[sideFaceName] = this.transposeFace(this.facelets[sideFaceName], orientation);
        }
    }; /*
    getFaceletAddress(axis2d: 'horizontal' | 'vertical', slice: number): number[][] {
    
    
    } */
    RubixFaceletState.prototype.getSideFace = function (axis, slice) {
        if (slice === 0)
            return undefined;
        if (axis === 'x')
            return slice === -1 ? 'left' : 'right';
        if (axis === 'y')
            return slice === -1 ? 'top' : 'bottom';
        if (axis === 'z')
            return slice === -1 ? 'front' : 'back';
    };
    RubixFaceletState.prototype.getRingFaces = function (axis) {
        if (axis === 'x')
            return ['front', 'bottom', 'back', 'top']; // 0 2 1 3 | 2 0 3 1
        if (axis === 'y')
            return ['left', 'front', 'right', 'back']; // 4 0 5 1 | 1 5 0 4
        if (axis === 'z')
            return ['top', 'right', 'bottom', 'left']; // 2 5 3 4 | 2 5 3 4
        throw new Error("invalid axis ".concat(axis));
    };
    RubixFaceletState.prototype.rotateSlice = function (ring, facelets) {
        var initial = Array.from(this.facelets[ring[0]]);
        for (var i = 1; i <= ring.length; i++) {
            var isLastFace = (i === ring.length);
            for (var j = 0; j < 3; j++) {
                if (isLastFace) {
                    console.log("setting facelet ".concat(facelets[i - 1][j], " of face: ").concat(ring[i - 1], " to facelet ").concat(facelets[0][j], " of face: ").concat(ring[0]));
                    this.facelets[ring[i - 1]][facelets[i - 1][j]] = initial[facelets[0][j]];
                }
                else {
                    console.log("setting facelet ".concat(facelets[i - 1][j], " of face: ").concat(ring[i - 1], " to facelet ").concat(facelets[0][j], " of face: ").concat(ring[i]));
                    this.facelets[ring[i - 1]][facelets[i - 1][j]] = this.facelets[ring[i]][facelets[i][j]];
                }
            }
        }
    };
    RubixFaceletState.prototype.rotate = function (axis3d, orientation, slice) {
        var _a;
        this.rotateSideFace(axis3d, orientation, slice);
        var ring = this.getRingFaces(axis3d);
        console.log("ring rotation order: ".concat(ring.join('=>')));
        if (orientation) {
            console.log("reversing orientation");
            _a = [ring[3], ring[1]], ring[1] = _a[0], ring[3] = _a[1];
            console.log("ring rotation order: ".concat(ring.join('=>')));
        }
        var facelets = ring.map(function (face) { return faceletAddressObject[face][axis3d][slice + 1]; });
        this.rotateSlice(ring, facelets);
    };
    return RubixFaceletState;
}());
var state = new RubixFaceletState();
var testRotations = [
    { orientation: '+', axis3d: 'x', slice: -1 },
    { orientation: '-', axis3d: 'x', slice: 0 },
    { orientation: '+', axis3d: 'x', slice: 1 },
    { orientation: '+', axis3d: 'x', slice: -1 },
    { orientation: '-', axis3d: 'x', slice: 0 },
    { orientation: '-', axis3d: 'x', slice: 1 },
    { orientation: '+', axis3d: 'x', slice: -1 },
    { orientation: '-', axis3d: 'x', slice: 0 },
    { orientation: '+', axis3d: 'x', slice: 1 },
    { orientation: '+', axis3d: 'x', slice: -1 },
    { orientation: '-', axis3d: 'x', slice: 0 },
    { orientation: '-', axis3d: 'x', slice: 1 }
];
for (var test = 0; test < testRotations.length; test++) {
    var testRotation = testRotations[test];
    var orientation_1 = testRotation.orientation, axis3d = testRotation.axis3d, slice = testRotation.slice;
    console.log("test: ".concat(test, " ~~~~~~~~~~"));
    console.log("rotating slice ".concat(slice, " on axis ").concat(axis3d, " with orientation: ").concat(orientation_1));
    state.rotate(axis3d, orientation_1, slice);
    state.printFaces();
}
