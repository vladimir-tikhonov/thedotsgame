import { Vector2 } from 'three/math/Vector2';
import { Matrix3 } from 'three/math/Matrix3';
import { Color } from 'three/math/Color';
import { Scene } from 'three/scenes/Scene';
import { Subject } from 'rxjs/Subject';

import Hitbox from 'entities/Hitbox';
import Grid from 'entities/Grid';
import Point from 'entities/Point';
import PointOnField from 'entities/PointOnField';
import { IGameConfig } from 'config/game';

export default class GameField {
    public onChange = new Subject<void>();

    private pointToFieldPositionMatrix!: Matrix3;
    private scene!: Scene;
    private grid!: Grid;
    private hitboxes: Hitbox[] = [];
    private fieldPoints: PointOnField[] = [];

    public constructor(gameConfig: IGameConfig) {
        this.initTranslationMatrix(gameConfig);
        this.initScene();
        this.initGrid(gameConfig);
        this.initHitboxes(gameConfig);
    }

    public pointPositionToFieldPosition(pointPosition: Vector2) {
        return pointPosition.clone().applyMatrix3(this.pointToFieldPositionMatrix);
    }

    public fieldPositionToPointPosition(fieldPosition: Vector2) {
        const inverseMatrix = new Matrix3().getInverse(this.pointToFieldPositionMatrix);
        return fieldPosition.clone().applyMatrix3(inverseMatrix);
    }

    public getScene() {
        return this.scene;
    }

    public getHitboxes() {
        return this.hitboxes;
    }

    public addPoint(newPoint: Point) {
        const fieldPosition = this.pointPositionToFieldPosition(newPoint.getPosition());
        const pointOnField = new PointOnField(newPoint, fieldPosition);

        this.fieldPoints.push(pointOnField);
        this.scene.add(pointOnField.getMesh());
        this.removeHitboxAt(fieldPosition);
        this.onChange.next();
    }

    public removePoint(pointToRemove: Point) {
        const pointIndex = this.fieldPoints.findIndex((pointOnField) => pointOnField.getPoint() === pointToRemove);
        if (pointIndex === -1) {
            throw new Error('There is no such point on field');
        }

        const targetPointOnField = this.fieldPoints[pointIndex];
        this.fieldPoints.splice(pointIndex, 1);
        this.scene.remove(targetPointOnField.getMesh());

        const fieldPosition = this.pointPositionToFieldPosition(pointToRemove.getPosition());
        this.addHitboxAt(fieldPosition);
        this.onChange.next();
    }

    private addHitboxAt(fieldPosition: Vector2) {
        const hitbox = new Hitbox(fieldPosition);
        this.hitboxes.push(hitbox);
        this.getScene().add(hitbox.getHitboxMesh(), hitbox.getHighlightMesh());
    }

    private removeHitboxAt(fieldPosition: Vector2) {
        const hitboxIndex = this.hitboxes.findIndex((hitbox) => hitbox.getFieldPosition().equals(fieldPosition));
        if (hitboxIndex === -1) {
            throw new Error('There is no hitbox on given position');
        }

        const hitboxToRemove = this.hitboxes[hitboxIndex];
        this.hitboxes.splice(hitboxIndex, 1);
        this.getScene().remove(hitboxToRemove.getHitboxMesh(), hitboxToRemove.getHighlightMesh());
    }

    private initTranslationMatrix(gameConfig: IGameConfig) {
        const diffToLeftSide = -gameConfig.horizontalFieldSize / 2;
        const diffToTopSide = gameConfig.verticalFieldSize / 2;
        this.pointToFieldPositionMatrix = new Matrix3().set(
            1,  0,  diffToLeftSide,
            0, -1,  diffToTopSide,
            0,  0,  1,
        );
    }

    private initScene() {
        this.scene = new Scene();
        this.scene.background = new Color(0xf0f0f0);
    }

    private initGrid(gameConfig: IGameConfig) {
        this.grid = new Grid(gameConfig.horizontalFieldSize, gameConfig.verticalFieldSize);
        this.grid.rotateX(90 * Math.PI / 180);
        this.getScene().add(this.grid);
    }

    private initHitboxes(gameConfig: IGameConfig) {
        for (let x = 0; x <= gameConfig.horizontalFieldSize; x++) {
            for (let y = 0; y <= gameConfig.verticalFieldSize; y++) {
                this.addHitboxAt(this.pointPositionToFieldPosition(new Vector2(x, y)));
            }
        }
    }
}
