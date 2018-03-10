import * as three from 'three';

const HIGLIGHT_COLOUR = 0x000F55;

export default class Hitbox {
    private mesh: three.Mesh;

    public constructor(position: three.Vector2) {
        const material = new three.LineBasicMaterial({color: HIGLIGHT_COLOUR, transparent: true, opacity: 0});
        material.side = three.DoubleSide;
        this.mesh = new three.Mesh(new three.CircleGeometry(0.5, 20), material);
        this.mesh.position.set(position.x, position.y, 0);
    }

    public getMesh() {
        return this.mesh;
    }

    public hightlight() {
        this.getMaterial().transparent = false;
    }

    public unhighlight() {
        this.getMaterial().transparent = true;
    }

    private getMaterial() {
        return this.getMesh().material as three.LineBasicMaterial;
    }
}
