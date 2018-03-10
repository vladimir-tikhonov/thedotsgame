import * as three from 'three';
import Hitbox from 'entities/Hitbox';
import { IGameConfig } from 'config/game';

export default class GameField {
    private scene!: three.Scene;
    private grid!: three.GridHelper;
    private hitboxes: Hitbox[] = [];

    public constructor(gameConfig: IGameConfig) {
        this.initScene();
        this.initGrid(gameConfig);
        this.initHitboxes(gameConfig);
    }

    public getScene() {
        return this.scene;
    }

    public getHitboxes() {
        return this.hitboxes;
    }

    private initScene() {
        this.scene = new three.Scene();
        this.scene.background = new three.Color(0xf0f0f0);
    }

    private initGrid(gameConfig: IGameConfig) {
        this.grid = new three.GridHelper(gameConfig.fieldSize, gameConfig.fieldSize);
        this.grid.rotateX(90 * Math.PI / 180);
        this.getScene().add(this.grid);
    }

    private initHitboxes(gameConfig: IGameConfig) {
        for (let x = -gameConfig.fieldSize / 2 + 1; x < gameConfig.fieldSize / 2; x++) {
            for (let y = -gameConfig.fieldSize / 2 + 1; y < gameConfig.fieldSize / 2; y++) {
                const hitbox = new Hitbox(new three.Vector2(x, y));
                this.hitboxes.push(hitbox);
                this.scene.add(hitbox.getMesh());
            }
        }
    }
}