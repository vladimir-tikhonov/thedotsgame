import { Vector2 } from 'three/math/Vector2';
import { Subscription } from 'rxjs';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { IInteractor } from 'services/Interactions';

function toRelativePosition(element: HTMLElement, clientPosition: Vector2) {
    const boundingRect = element.getBoundingClientRect();
    const x = clientPosition.x - boundingRect.left;
    const y = clientPosition.y - boundingRect.top;

    return new Vector2((x / window.innerWidth) * 2 - 1, -(y / window.innerHeight) * 2 + 1);
}

export default class Controls {
    public cursorMovement: Observable<Vector2>;
    public click: Observable<Vector2>;

    private mousePosition: Vector2 | null = null;
    private subscriptions: Subscription[];

    public constructor(canvas: HTMLCanvasElement, interactor: IInteractor) {
        const toCanvasRelativePosition = (clientPosition: Vector2) => toRelativePosition(canvas, clientPosition);
        this.cursorMovement = interactor.cursorMovement.map(toCanvasRelativePosition);
        this.click = interactor.click.map(toCanvasRelativePosition);

        this.subscriptions = [
            this.cursorMovement.subscribe((newCursorPosition) => this.handleNewCursorPosition(newCursorPosition)),
        ];
    }

    public isInitialized() {
        return this.mousePosition !== null;
    }

    public getMousePosition() {
        if (!this.mousePosition) {
            throw new Error('Mouse control wasn\'t initialized yet.');
        }

        return this.mousePosition;
    }

    public cleanup() {
        this.subscriptions.forEach((subscription) => subscription.unsubscribe());
        this.subscriptions = [];
    }

    private handleNewCursorPosition(newCursorPosition: Vector2) {
        this.mousePosition = newCursorPosition;
    }
}
