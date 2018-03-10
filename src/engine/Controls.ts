import * as three from 'three';
import { IInteractor } from 'services/Interactions';

export default class Controls {
    private mousePosition: three.Vector2 | null = null;
    private lastClickPosition: three.Vector2 | null = null;
    private canvas: HTMLCanvasElement;
    private interactor: IInteractor;
    private dirty = false;

    public constructor(canvas: HTMLCanvasElement, interactor: IInteractor) {
        this.canvas = canvas;
        this.interactor = interactor;

        this.interactor.listenForCursorMovement((newCursorPosition) => this.handleNewCursorPosition(newCursorPosition));
        this.interactor.listenForClick((clickPosition) => this.handleClick(clickPosition));
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
        this.interactor.cleanup();
    }

    private handleNewCursorPosition(newCursorPosition: three.Vector2) {
        this.mousePosition = this.clientPositionToRelativePosition(newCursorPosition);
        this.dirty = true;
    }

    private handleClick(clickPosition: three.Vector2) {
        this.lastClickPosition = clickPosition;
        this.dirty = true;
    }

    private clientPositionToRelativePosition(clientPosition: three.Vector2) {
        const boundingRect = this.canvas.getBoundingClientRect();
        const x = clientPosition.x - boundingRect.left;
        const y = clientPosition.y - boundingRect.top;

        return new three.Vector2((x / window.innerWidth) * 2 - 1, -(y / window.innerHeight) * 2 + 1);
    }
}
