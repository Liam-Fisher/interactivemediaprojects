"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RubixCubeState = void 0;
var faceAddressObject = {
    "x": [['front', 'top', 'back', 'bottom'], ['right', 'left']],
    "y": [['front', 'right', 'back', 'left'], ['top', 'bottom']],
    "z": [['left', 'bottom', 'right', 'top'], ['front', 'back']]
};
var faceletAddressObject = {
    "front": { "y": [[0, 1, 2], [3, 4, 5], [6, 7, 8]], "x": [[0, 3, 6], [1, 4, 7], [2, 5, 8]], "z": []
    },
    "left": { "y": [[0, 1, 2], [3, 4, 5], [6, 7, 8]], "z": [[2, 5, 8], [1, 4, 7], [0, 3, 6]], "x": []
    },
    "top": { "z": [[0, 1, 2], [3, 4, 5], [6, 7, 8]], "x": [[0, 3, 6], [1, 4, 7], [2, 5, 8]], "y": []
    },
    "back": { "y": [[6, 7, 8], [3, 4, 5], [0, 1, 2]], "x": [[2, 5, 8], [1, 4, 7], [0, 3, 6]], "z": []
    },
    "right": { "y": [[6, 7, 8], [3, 4, 5], [0, 1, 2]], "z": [[2, 5, 8], [1, 4, 7], [0, 3, 6]], "x": []
    },
    "bottom": { "z": [[6, 7, 8], [3, 4, 5], [0, 1, 2]], "x": [[2, 5, 8], [1, 4, 7], [0, 3, 6]], "y": []
    }
};
function getCubeletGenArgs(slice, axis3d) {
    if (axis3d === 'x')
        return [slice, 3, 0];
    if (axis3d === 'z')
        return [slice * 9, 1, 0];
    return [slice * 3, 1, 7];
}
var RubixCubeState = /** @class */ (function () {
    function RubixCubeState() {
        this.debug = true;
        this.faceNames = ['front', 'back', 'top', 'bottom', 'right', 'left'];
        this.cubeletNames = [
            "corner_A", "edge_A", "corner_B",
            "edge_B", "center_A", "edge_C",
            "corner_C", "edge_D", "corner_D",
            "edge_E", "center_B", "edge_F",
            "center_C", "middle", "center_D",
            "edge_G", "center_E", "edge_H",
            "corner_E", "edge_I", "corner_F",
            "edge_J", "center_F", "edge_K",
            "corner_G", "edge_L", "corner_H"
        ];
        this.faceColors = Object.fromEntries(this.faceNames.map(function (name, i) { return [name, (new Array(9)).fill(i)]; }));
        this.cubeletAddresses = new Map(this.cubeletNames.map(function (name, i) { return [i, name]; }));
        //this.faceColors = Object.fromEntries(this.faceNames.map((name, i) => [name, (new Array(9)).fill(i)]));
        //this.cubeletAddresses = new Map(this.cubeletNames.map((name, i) => [i, name]));
    }
    RubixCubeState.prototype.transposeFace = function (f, o) {
        var map = f.map(function (_, i) { return f.at((i % 3 + (i % 3) * 3)); });
        return o ? map : map.reverse();
    };
    RubixCubeState.prototype.printCubelets = function () {
        console.log("... ... ... printing cubelets ... ... ... ... ");
        for (var i = 0; i < 27; i++) {
            if (i % 9 === 0) {
                if (i === 0) {
                    console.log("front layer");
                }
                else if (i === 9) {
                    console.log("middle layer");
                }
                else {
                    console.log("back layer");
                }
                console.log("______________________");
            }
            console.log("".concat(this.cubeletAddresses.get(i), ": ").concat(i));
        }
        console.log("... ... ... ... ... ... ... ... ... ... ... ... ");
    };
    RubixCubeState.prototype.printFaces = function () {
        console.log("... ... ... printing faces ... ... ... ... ");
        for (var face in this.faceColors) {
            var colors = this.faceColors[face];
            console.log("".concat(face, ":           "));
            console.log("".concat(colors[0], "|").concat(colors[1], "|").concat(colors[2]));
            console.log("".concat(colors[3], "|").concat(colors[4], "|").concat(colors[5]));
            console.log("".concat(colors[6], "|").concat(colors[7], "|").concat(colors[8]));
        }
        console.log("... ... ... ...  ... ... ... ... ... ... ");
    };
    RubixCubeState.prototype.getCubeletAddresses = function (axis3d, orientation, slice) {
        var _a = getCubeletGenArgs(slice, axis3d), addr = _a[0], inc1 = _a[1], inc2 = _a[2];
        var _b = [[], [], 0], diagonal = _b[0], orthogonal = _b[1], fixed = _b[2];
        var index = 0;
        while (index < 9) {
            if (index === 4) {
                fixed = addr; // add address to permutation
            }
            else {
                if (+!fixed === index % 2) {
                    if (orientation)
                        orthogonal.unshift(addr);
                    else
                        orthogonal.push(addr);
                }
                else {
                    if (orientation)
                        diagonal.unshift(addr);
                    else
                        diagonal.push(addr);
                }
                //(+!fixed === index % 2 ? orthogonal:diagonal).splice(orientation?0:index, 0, addr);
            }
            addr += (!inc2 || !(index % 3)) ? inc1 : inc2; // change increment
            index++;
        }
        return [diagonal, orthogonal, fixed];
    };
    RubixCubeState.prototype.rotateSideFace = function (sides, orientation, slice) {
        if (slice) {
            var side = slice > 0 ? sides[0] : sides[1];
            if (this.debug)
                console.log("rotating side face: ".concat(side, " with orientation ").concat(orientation));
            this.faceColors[side] = this.transposeFace(this.faceColors[side], orientation);
        }
    };
    RubixCubeState.prototype.rotateCubelets = function (axis3d, orientation, slice) {
        var _a = this.getCubeletAddresses(axis3d, orientation, slice), diagonal = _a[0], orthogonal = _a[1], fixed = _a[2];
        if (this.debug)
            console.log("rotating cubelets: ".concat(diagonal.join('|'), "|").concat(orthogonal.join('|'), "|").concat(fixed));
        var fixedName = this.cubeletAddresses.get(fixed);
        var cubeletNames = [fixedName];
        var initialDiagonalName = this.cubeletAddresses.get(diagonal[0]);
        var initialOrthogonalName = this.cubeletAddresses.get(orthogonal[0]);
        for (var i = 1; i <= 4; i++) {
            var diagonalName = (i === 4) ? initialDiagonalName : this.cubeletAddresses.get(diagonal[i - 1]);
            var orthogonalName = (i === 4) ? initialOrthogonalName : this.cubeletAddresses.get(orthogonal[i]);
            cubeletNames.push(diagonalName, orthogonalName);
            this.cubeletAddresses.set(diagonal[i - 1], orthogonalName);
            this.cubeletAddresses.set(orthogonal[i - 1], diagonalName);
        }
        return cubeletNames;
    };
    RubixCubeState.prototype.rotateSlice = function (faces, axis3d, orientation, slice) {
        if (this.debug) {
            console.log("initial face colors");
            this.printFaces();
        }
        var ring = faces[0], sides = faces[1];
        console.log("ring rotation order: ".concat(ring.join('=>')));
        if (orientation) {
            console.log("reversing orientation");
            ring.reverse();
            console.log("ring rotation order: ".concat(ring.join('=>')));
        }
        this.rotateSideFace(sides, orientation, slice);
        var facelets = ring.map(function (face) { return faceletAddressObject[face][axis3d][slice + 1]; });
        var intialColors = Array.from(this.faceColors[ring[0]]);
        for (var i = 1; i <= ring.length; i++) {
            var isLastFace = (i === ring.length);
            for (var j = 0; j < 3; j++) {
                if (isLastFace) {
                    console.log("setting facelet ".concat(facelets[i - 1][j], " of face: ").concat(ring[i - 1], " to facelet ").concat(facelets[0][j], " of face: ").concat(ring[0]));
                    this.faceColors[ring[i - 1]][facelets[i - 1][j]] = intialColors[facelets[0][j]];
                }
                else {
                    console.log("setting facelet ".concat(facelets[i - 1][j], " of face: ").concat(ring[i - 1], " to facelet ").concat(facelets[0][j], " of face: ").concat(ring[i]));
                    this.faceColors[ring[i - 1]][facelets[i - 1][j]] = this.faceColors[ring[i]][facelets[i][j]];
                }
            }
        }
        if (this.debug) {
            console.log("new face colors");
            this.printFaces();
        }
        return this.rotateCubelets(axis3d, orientation, slice);
    };
    RubixCubeState.prototype.rotateCube = function (faces, axis3d, orientation) {
        var cubeletNames = [];
        for (var i = -1; i <= 1; i++) {
            cubeletNames.push.apply(cubeletNames, this.rotateSlice(faces, axis3d, orientation, i));
        }
        return cubeletNames;
    };
    RubixCubeState.prototype.rotate = function (r) {
        var orientation = r.orientation, axis3d = r.axis3d, slice = r.slice;
        if (!axis3d || orientation === undefined) {
            return [];
        }
        var faces = faceAddressObject[axis3d];
        if (typeof slice !== 'number') {
            return this.rotateCube(faces, axis3d, orientation);
        }
        return this.rotateSlice(faces, axis3d, orientation, slice);
    };
    return RubixCubeState;
}());
exports.RubixCubeState = RubixCubeState;
var state = new RubixCubeState();
state.cubeletAddresses.forEach(function (name, i) { return console.log("".concat(name, ": ").concat(i)); });
var testRotations = [
    { orientation: true, axis3d: 'x', slice: 0 },
    { orientation: false, axis3d: 'x', slice: 0 }
];
for (var test = 0; test < testRotations.length; test++) {
    var testRotation = testRotations[test];
    console.log("test: ".concat(test, " ~~~~~~~~~~"));
    console.log("rotating slice ".concat(testRotation.slice, " on axis ").concat(testRotation.axis3d, " with orientation: ").concat(testRotation.orientation));
    var cubeletNames = state.rotate(testRotation);
    console.log("rotated cubelets: ".concat(cubeletNames.join('|')));
}
