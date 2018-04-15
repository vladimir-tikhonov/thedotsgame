import { Vector2 } from 'three/math/Vector2';

import BaseCommand, { ICommandContext } from 'commands/BaseCommand';
import Point from 'entities/Point';

export default class AddPointCommand extends BaseCommand {
    private pointPosition: Vector2;
    private addedPoint: Point | null = null;

    public constructor(pointPosition: Vector2) {
        super();
        this.pointPosition = pointPosition;
    }

    public do(context: ICommandContext) {
        const { ui, gameState } = context;

        this.addedPoint = new Point(this.pointPosition, gameState.getCurrentPlayer());
        ui.addPoint(this.addedPoint);
        gameState.switchPlayer();
    }

    public undo(context: ICommandContext) {
        if (!this.addedPoint) {
            throw new Error('Command wasn\'t executed yet.');
        }

        const { ui, gameState } = context;
        ui.removePoint(this.addedPoint);
        gameState.switchPlayer();
    }
}
