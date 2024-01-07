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
// cubelets are addressed by their position in the cube, from right to left, top to bottom, back to front
var math_1 = require("./math");
var RubixCubeletState = /** @class */ (function () {
    function RubixCubeletState(size) {
        this.size = 3;
        this.axis = ['x', 'y', 'z'];
        this.cubelets = [];
        this.size = size !== null && size !== void 0 ? size : this.size;
        this.reset();
    }
    RubixCubeletState.prototype.reset = function () {
        this.cubelets = [
            "corner_B", "edge_I", "corner_A",
            "edge_K", "center_U", "edge_J",
            "corner_D", "edge_L", "corner_C",
            "edge_N", "center_V", "edge_M",
            "center_X", "middle", "center_W",
            "edge_P", "center_Y", "edge_O",
            "corner_F", "edge_Q", "corner_E",
            "edge_S", "center_Z", "edge_R",
            "corner_H", "edge_T", "corner_G"
        ];
    };
    RubixCubeletState.prototype.printCubelets = function () {
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
    RubixCubeletState.prototype.getScaling = function (axis) {
        return [axis === 'z' ? 3 : 9, axis === 'x' ? 3 : 1];
    };
    RubixCubeletState.prototype.getOffset = function (axis, slice) {
        return (slice + 1) * (axis === 'z' ? 9 : axis === 'y' ? 3 : 1);
    };
    RubixCubeletState.prototype.getCubeletAddresses = function (orientation, offset, s) {
        // different sizes would require splitting the cubelets into rings 
        var diagonal = (0, math_1.rotationCycle)(offset, orientation, s[0] * 2, s[1] * 2);
        var orthogonal = (0, math_1.rotationCycle)(offset + s[1], orientation, (s[0] - s[1]), (s[0] + s[1]));
        var fixed = s[0] + s[1] + offset; // for z 4, 13, 22 | for y 10, 13, 16 | for x 12, 13, 14
        return [diagonal, orthogonal, fixed];
    };
    RubixCubeletState.prototype.rotate = function (axis3d, orientation, slice) {
        var scale = this.getScaling(axis3d);
        var offset = this.getOffset(axis3d, slice);
        console.log("scale: ".concat(scale));
        var _a = this.getCubeletAddresses(orientation, offset, scale), diagonal = _a[0], orthogonal = _a[1], fixed = _a[2];
        console.log("diagonal addresses: ".concat(diagonal));
        console.log("orthogonal addresses: ".concat(orthogonal));
        console.log("fixed address: ".concat(fixed));
        var cubeletNames = [];
        (0, math_1.permute)(this.cubelets, cubeletNames, [diagonal, orthogonal]);
        return __spreadArray([this.cubelets[fixed]], cubeletNames, true);
    };
    return RubixCubeletState;
}());
var state = new RubixCubeletState();
state.printCubelets();
var testRotations = [
    { orientation: '+', axis3d: 'z', slice: -1 }
];
for (var test = 0; test < testRotations.length; test++) {
    var testRotation = testRotations[test];
    var orientation_1 = testRotation.orientation, axis3d = testRotation.axis3d, slice = testRotation.slice;
    console.log("test: ".concat(test, " ~~~~~~~~~~"));
    console.log("rotating slice ".concat(slice, " on axis ").concat(axis3d, " with orientation: ").concat(orientation_1));
    var cubeletNames = state.rotate(axis3d, orientation_1, slice);
    console.log("rotated cubelets: ".concat(cubeletNames.join('|')));
    state.printCubelets();
}
