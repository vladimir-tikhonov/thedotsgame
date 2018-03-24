import { Vector2 } from 'three/math/Vector2';
import { Subscription } from 'rxjs';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { InteractorBuilder } from 'services/Interactions';

function toRelativePosition(element: HTMLElement, clientPosition: Vector2) {
    const boundingRect = element.getBoundingClientRect();
    const x = clientPosition.x - boundingRect.left;
    const y = clientPosition.y - boundingRect.top;

    return new Vector2((x / window.innerWidth) * 2 - 1, -(y / window.innerHeight) * 2 + 1);
}

export default class Controls {
    public onCursorMovement: Observable<Vector2>;
    public onClick: Observable<Vector2>;

    private mousePosition: Vector2 | null = null;
    private subscriptions: Subscription;

    public constructor(canvas: HTMLCanvasElement, interactorBuilder: InteractorBuilder) {
        const toCanvasRelativePosition = (clientPosition: Vector2) => toRelativePosition(canvas, clientPosition);

        const interactor = interactorBuilder(canvas);
        this.onCursorMovement = interactor.onCursorMovement.map(toCanvasRelativePosition);
        this.onClick = interactor.onClick.map(toCanvasRelativePosition);

        this.subscriptions = this.onCursorMovement.subscribe((position) => { this.handleNewCursorPosition(position); })
            .add(interactor.subscription);
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
        this.subscriptions.unsubscribe();
    }

    private handleNewCursorPosition(newCursorPosition: Vector2) {
        this.mousePosition = newCursorPosition;
    }
}
