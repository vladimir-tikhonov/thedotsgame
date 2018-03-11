import { Vector2 } from 'three/math/Vector2';
import { Mesh } from 'three/objects/Mesh';
import { LineBasicMaterial } from 'three/materials/LineBasicMaterial';
import { CircleGeometry } from 'three/geometries/CircleGeometry';

import Point from 'entities/Point';
import styles from 'config/styles';

export default class PointOnField {
    private point: Point;
    private mesh: Mesh;

    public constructor(point: Point, fieldPosition: Vector2) {
        this.point = point;

        const material = new LineBasicMaterial({ color: styles.point.colour });
        this.mesh = new Mesh(new CircleGeometry(styles.point.radius, styles.point.segments), material);
        this.mesh.position.set(fieldPosition.x, fieldPosition.y, 0);
    }

    public getPoint() {
        return this.point;
    }

    public getMesh() {
        return this.mesh;
    }
}
