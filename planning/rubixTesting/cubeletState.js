"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CubeletState = void 0;
var cubeletAddressObject = {
    corner: {
        x: {
            '+': [0, 2, 8, 6],
            '-': [0, 6, 8, 2]
        },
        y: {
            '+': [0, 6, 18, 12],
            '-': [0, 12, 18, 6]
        },
        z: {
            '+': [0, 18, 20, 2],
            '-': [0, 2, 20, 18]
        }
    },
    edge: {
        x: {
            '+': [2, 8, 14, 12],
            '-': [2, 12, 14, 8]
        },
        y: {
            '+': [6, 8, 20, 18],
            '-': [6, 18, 20, 8]
        },
        z: {
            '+': [8, 14, 20, 12],
            '-': [8, 12, 20, 14]
        }
    },
    center: {
        x: {
            '+': [12, 14, 20, 18],
            '-': [12, 18, 20, 14]
        },
        y: {
            '+': [2, 8, 14, 12],
            '-': [2, 12, 14, 8]
        },
        z: {
            '+': [6, 8, 20, 18],
            '-': [6, 18, 20, 8]
        }
    }
};
var CubeletState = /** @class */ (function () {
    function CubeletState(size) {
        this.size = 3;
        this.axis = ['x', 'y', 'z'];
        this.cubelets = [];
        this.size = size !== null && size !== void 0 ? size : this.size;
        this.reset();
    }
    CubeletState.prototype.reset = function () {
        this.cubelets = [
            "corner_A", "edge_I", "corner_B",
            "edge_J", "center_U", "edge_K",
            "corner_C", "edge_L", "corner_D",
            "edge_M", "center_V", "edge_N",
            "center_W", "middle", "center_X",
            "edge_O", "center_Y", "edge_P",
            "corner_E", "edge_Q", "corner_F",
            "edge_R", "center_Z", "edge_S",
            "corner_G", "edge_T", "corner_H"
        ];
    };
    CubeletState.prototype.rotationCycle = function (s, o, g1, g2) {
        return [s, s + (o === '+' ? g1 : g2), s + g1 + g2, s + (o === '+' ? g2 : g1)];
    };
    CubeletState.prototype.printCubelets = function () {
        console.log("... ... ... printing cubelets ... ... ... ... ");
        for (var i = 0; i < Math.pow(this.size, 2); i++) {
            var layer = Math.floor(i / this.size);
            if (i % this.size === 0) {
                console.log("__________layer".concat(layer, "___________"));
            }
            console.log("".concat(this.cubelets.slice(i * this.size, i * this.size + this.size).join('|')));
        }
        console.log("... ... ... ... ... ... ... ... ... ... ... ... ");
    };
    CubeletState.prototype.getScaling = function (axis) {
        return [axis === 'z' ? 3 : 9, axis === 'x' ? 3 : 1];
    };
    CubeletState.prototype.getOffset = function (axis, slice) {
        return (slice + 1) * (axis === 'z' ? 9 : axis === 'y' ? 3 : 1);
    };
    CubeletState.prototype.getAddressFromName = function (name) {
        return this.cubelets.indexOf(name);
    };
    CubeletState.prototype.getCubeletAddresses = function (orientation, offset, s) {
        // different sizes would require splitting the cubelets into rings 
        var diagonal = this.rotationCycle(offset, orientation, s[0] * 2, s[1] * 2);
        var orthogonal = this.rotationCycle(offset + s[1], orientation, (s[0] - s[1]), (s[0] + s[1]));
        var fixed = s[0] + s[1] + offset; // for z 4, 13, 22 | for y 10, 13, 16 | for x 12, 13, 14
        return [diagonal, orthogonal, fixed];
    };
    CubeletState.prototype.rotate = function (axis, orientation, slice) {
        var scale = this.getScaling(axis);
        var offset = this.getOffset(axis, slice);
        console.log("scale: ".concat(scale));
        var _a = this.getCubeletAddresses(orientation, offset, scale), diagonal = _a[0], orthogonal = _a[1], fixed = _a[2];
        console.log("diagonal addresses: ".concat(diagonal));
        console.log("orthogonal addresses: ".concat(orthogonal));
        console.log("fixed address: ".concat(fixed));
        return __spreadArray([this.cubelets[fixed]], this.permute([diagonal, orthogonal]), true);
    };
    CubeletState.prototype.permute = function (cycles) {
        var rotatedCubelets = [];
        for (var i = 0; i < cycles.length; i++) {
            var cycle = cycles[i].reverse();
            var temp = this.cubelets[cycle[0]];
            for (var j = 0; j < cycle.length - 1; j++) {
                console.log("swapping ".concat(cycle[j], " with ").concat(cycle[j + 1]));
                var newName = this.cubelets[cycle[j + 1]];
                this.cubelets[cycle[j]] = newName;
                rotatedCubelets.push(newName);
            }
            this.cubelets[cycle[cycle.length - 1]] = temp;
            rotatedCubelets.push(temp);
        }
        return rotatedCubelets;
    };
    return CubeletState;
}());
exports.CubeletState = CubeletState;
var state = new CubeletState();
state.printCubelets();
var testRotations = [
    { orientation: '+', axis3d: 'y', slice: 1 },
    { orientation: '+', axis3d: 'z', slice: -1 },
    { orientation: '+', axis3d: 'x', slice: 1 }
];
// rotated F|D|C|B instead of F|G|H|B
for (var test = 0; test < testRotations.length; test++) {
    var testRotation = testRotations[test];
    var orientation_1 = testRotation.orientation, axis3d = testRotation.axis3d, slice = testRotation.slice;
    console.log("test: ".concat(test, " ~~~~~~~~~~"));
    console.log("rotating slice ".concat(slice, " on axis ").concat(axis3d, " with orientation: ").concat(orientation_1));
    var cubeletNames = state.rotate(axis3d, orientation_1, slice);
    console.log("rotated cubelets: ".concat(cubeletNames.join('|')));
    state.printCubelets();
}
