import * as THREE from 'three';

export default class AxisGridHelper {
grid: THREE.GridHelper;
axes: THREE.AxesHelper;
_visible!: boolean;
    constructor( node: THREE.Object3D, units = 10 ) {

        const axes = new THREE.AxesHelper();
        if(Array.isArray(axes.material)) {
            axes.material[0].depthTest = false;
        }
        else {
            axes.material.depthTest = false;
        }
        axes.renderOrder = 2; // after the grid
        node.add( axes );

        const grid = new THREE.GridHelper( units, units );
        grid.material.depthTest = false;
        grid.renderOrder = 1;
        node.add( grid );

        this.grid = grid;
        this.axes = axes;
        this.visible = false;

    }
    get visible() {

        return this._visible;

    }
    set visible( v ) {

        this._visible = v;
        this.grid.visible = v;
        this.axes.visible = v;

    }

}