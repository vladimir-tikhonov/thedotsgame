// Modified version of GridHelper from three.js, which supports non-square grids.
// Inspired by https://github.com/mrdoob/three.js/issues/6549

import { Vector3 } from 'three/math/Vector3';
import { LineSegments } from 'three/objects/LineSegments';
import { Color } from 'three/math/Color';
import { Geometry } from 'three/core/Geometry';
import { LineBasicMaterial } from 'three/materials/LineBasicMaterial';
import { VertexColors } from 'three/constants';

export default class Grid extends LineSegments {
    public constructor(horizontalSize: number, verticalSize: number, hexColor = 0x444444) {
        const color = new Color(hexColor);
        const geometry = new Geometry();
        const material = new LineBasicMaterial({ vertexColors: VertexColors });

        for (let x = -horizontalSize / 2; x <= horizontalSize / 2; x++) {
            geometry.vertices.push(
                new Vector3(x, 0, -verticalSize / 2),
                new Vector3(x, 0, verticalSize / 2),
            );
            geometry.colors.push(color, color, color, color);
        }

        for (let z = -verticalSize / 2; z <= verticalSize / 2; z++) {
            geometry.vertices.push(
                new Vector3(-horizontalSize / 2, 0, z),
                new Vector3(horizontalSize / 2, 0, z),
            );
            geometry.colors.push(color, color, color, color);
        }

        super(geometry, material);
    }
}
