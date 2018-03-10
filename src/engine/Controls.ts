import { Vector2 } from 'three/math/Vector2';
import { IInteractor } from 'services/Interactions';
import { Subscription } from 'rxjs';

export default class Controls {
    private mousePosition: Vector2 | null = null;
    private lastClickPosition: Vector2 | null = null;
    private canvas: HTMLCanvasElement;
    private subscriptions: Subscription[];
    private dirty = false;

    public constructor(canvas: HTMLCanvasElement, interactor: IInteractor) {
        this.canvas = canvas;

        this.subscriptions = [
            interactor.cursorMovement.subscribe((newCursorPosition) => this.handleNewCursorPosition(newCursorPosition)),
            interactor.click.subscribe((clickPosition) => this.handleClick(clickPosition)),
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

    public getLastClickPosition() {
        return this.lastClickPosition;
    }

    public clearLastClickPosition() {
        this.lastClickPosition = null;
    }

    public isDirty() {
        return this.dirty;
    }

    public clearDirtyFlag() {
        this.dirty = false;
    }

    public cleanup() {
        this.subscriptions.forEach((subscription) => subscription.unsubscribe());
    }

    private handleNewCursorPosition(newCursorPosition: Vector2) {
        this.mousePosition = this.clientPositionToRelativePosition(newCursorPosition);
        this.dirty = true;
    }

    private handleClick(clickPosition: Vector2) {
        this.lastClickPosition = clickPosition;
        this.dirty = true;
    }

    private clientPositionToRelativePosition(clientPosition: Vector2) {
        const boundingRect = this.canvas.getBoundingClientRect();
        const x = clientPosition.x - boundingRect.left;
        const y = clientPosition.y - boundingRect.top;

        return new Vector2((x / window.innerWidth) * 2 - 1, -(y / window.innerHeight) * 2 + 1);
    }
}
