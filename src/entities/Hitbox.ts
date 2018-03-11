import { Vector2 } from 'three/math/Vector2';
import { Mesh } from 'three/objects/Mesh';
import { LineBasicMaterial } from 'three/materials/LineBasicMaterial';
import { CircleGeometry } from 'three/geometries/CircleGeometry';

const HIGLIGHT_COLOUR = 0x000F55;

export default class Hitbox {
    private mesh: Mesh;
    private fieldPosition: Vector2;

    public constructor(fieldPosition: Vector2) {
        this.fieldPosition = fieldPosition;

        const material = new LineBasicMaterial({color: HIGLIGHT_COLOUR, transparent: true, opacity: 0});
        this.mesh = new Mesh(new CircleGeometry(0.5, 20), material);
        this.mesh.position.set(fieldPosition.x, fieldPosition.y, 0);
    }

    public getMesh() {
        return this.mesh;
    }

    public getFieldPosition() {
        return this.fieldPosition;
    }

    public hightlight() {
        this.getMaterial().transparent = false;
    }

    public unhighlight() {
        this.getMaterial().transparent = true;
    }

    private getMaterial() {
        return this.getMesh().material as LineBasicMaterial;
    }
}
