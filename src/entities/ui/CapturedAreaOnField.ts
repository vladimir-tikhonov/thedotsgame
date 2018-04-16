import { Vector2 } from 'three/math/Vector2';
import { Vector3 } from 'three/math/Vector3';
import { Mesh } from 'three/objects/Mesh';
import { Geometry } from 'three/core/Geometry';
import { Face3 } from 'three/core/Face3';
import { LineBasicMaterial } from 'three/materials/LineBasicMaterial';
import earcut from 'earcut';

import CapturedArea from 'entities/CapturedArea';
import { capturedArea as capturedAreaStyles } from 'config/styles';
import * as stylesService from 'services/Styles';

export default class CapturedAreaOnField {
    private capturedArea: CapturedArea;
    private points: Vector2[];
    private mesh!: Mesh;

    public constructor(capturedArea: CapturedArea, points: Vector2[]) {
        this.capturedArea = capturedArea;
        this.points = points;
        this.initMesh();
    }

    public getCapturedArea() {
        return this.capturedArea;
    }

    public getMesh() {
        return this.mesh;
    }

    private initMesh() {
        const geometry = new Geometry();
        const flattenedPoints: number[] = [];
        for (const point of this.points) {
            geometry.vertices.push(new Vector3(point.x, point.y, 0));
            flattenedPoints.push(point.x, point.y);
        }

        const triangleIndicies = earcut(flattenedPoints);
        for (let i = 0; i < triangleIndicies.length; i += 3) {
            geometry.faces.push(new Face3(triangleIndicies[i], triangleIndicies[i + 1], triangleIndicies[i + 2]));
        }

        const currentPlayersColour = stylesService.getPointColourForPlayer(this.capturedArea.getPlayer());
        const material = new LineBasicMaterial({
            color: currentPlayersColour,
            transparent: true,
            opacity: capturedAreaStyles.opacity,
        });
        this.mesh = new Mesh(geometry, material);
    }
}
