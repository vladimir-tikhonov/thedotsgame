import { Vector2 } from 'three/math/Vector2';
import { Mesh } from 'three/objects/Mesh';
import { LineBasicMaterial } from 'three/materials/LineBasicMaterial';
import { BoxGeometry } from 'three/geometries/BoxGeometry';
import { CircleGeometry } from 'three/geometries/CircleGeometry';
import { DoubleSide } from 'three/constants';

import { hitbox as hitboxStyle } from 'config/styles';

export default class Hitbox {
    private hitboxMesh: Mesh;
    private highlightMesh: Mesh;
    private fieldPosition: Vector2;

    public constructor(fieldPosition: Vector2) {
        this.fieldPosition = fieldPosition;

        const material = new LineBasicMaterial({color: hitboxStyle.colour, transparent: true, opacity: 0});
        material.side = DoubleSide;

        this.hitboxMesh = new Mesh(new BoxGeometry(1, 1, 1), material.clone());
        this.hitboxMesh.position.set(fieldPosition.x, fieldPosition.y, 0);
        this.highlightMesh = new Mesh(new CircleGeometry(hitboxStyle.radius, hitboxStyle.segments), material.clone());
        this.highlightMesh.position.set(fieldPosition.x, fieldPosition.y, 0);
    }

    public getHitboxMesh() {
        return this.hitboxMesh;
    }

    public getHighlightMesh() {
        return this.highlightMesh;
    }

    public getFieldPosition() {
        return this.fieldPosition;
    }

    public hightlight() {
        this.getHighlightMeshMaterial().opacity = hitboxStyle.opacity;
    }

    public unhighlight() {
        this.getHighlightMeshMaterial().opacity = 0;
    }

    private getHighlightMeshMaterial() {
        return this.getHighlightMesh().material as LineBasicMaterial;
    }
}
