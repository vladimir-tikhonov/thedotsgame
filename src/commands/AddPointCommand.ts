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
        this.addedPoint = new Point(this.pointPosition);
        context.ui.addPoint(this.addedPoint);
    }

    public undo(context: ICommandContext) {
        if (!this.addedPoint) {
            throw new Error('Command wasn\'t executed yet.');
        }
        context.ui.removePoint(this.addedPoint);
    }
}
