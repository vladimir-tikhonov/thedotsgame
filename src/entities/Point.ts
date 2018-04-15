import { Vector2 } from 'three/math/Vector2';

import { Player } from 'entities/GameState';

export default class Point {
    private pointPosition: Vector2;
    private player: Player;

    public constructor(pointPosition: Vector2, player: Player) {
        this.pointPosition = pointPosition;
        this.player = player;
    }

    public getPosition() {
        return this.pointPosition;
    }

    public getPlayer() {
        return this.player;
    }
}
