import { Vector2 } from 'three/math/Vector2';

export default class Point {
    private position: Vector2;

    public constructor(position: Vector2) {
        this.position = position;
    }

    public getPosition() {
        return this.position;
    }
}
