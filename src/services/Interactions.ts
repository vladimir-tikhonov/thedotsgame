import * as three from 'three';

type MouseEventListener = (event: MouseEvent) => void;
type PositionChangeListener = (position: three.Vector2) => void;

export interface IInteractor {
    listenForCursorMovement(callback: PositionChangeListener): void;
    listenForClick(callback: PositionChangeListener): void;
    cleanup(): void;
}

export function buildMouseInteractor(htmlElement: HTMLElement) {
    return new MouseInteractor(htmlElement);
}

class MouseInteractor implements IInteractor {
    private htmlElement: HTMLElement;

    private mouseMoveListener: MouseEventListener | null = null;
    private mouseDownListener: MouseEventListener | null = null;

    public constructor(htmlElement: HTMLElement) {
        this.htmlElement = htmlElement;
    }

    public listenForCursorMovement(callback: PositionChangeListener) {
        if (this.mouseMoveListener) {
            throw new Error('Only one listener can be added');
        }

        this.mouseMoveListener = this.addListener('mousemove', callback);
    }

    public listenForClick(callback: PositionChangeListener) {
        if (this.mouseDownListener) {
            throw new Error('Only one listener can be added');
        }

        this.mouseDownListener = this.addListener('mousedown', callback);
    }

    public cleanup() {
        if (this.mouseMoveListener) {
            this.htmlElement.removeEventListener('mousemove', this.mouseMoveListener);
        }

        if (this.mouseDownListener) {
            this.htmlElement.removeEventListener('mousedown', this.mouseDownListener);
        }
    }

    private addListener(eventName: 'mousemove' | 'mousedown', callback: PositionChangeListener) {
        const listener: MouseEventListener = (event) => {
            event.preventDefault();
            const position = new three.Vector2(event.clientX, event.clientY);
            callback(position);
        };
        this.htmlElement.addEventListener(eventName, listener);

        return listener;
    }
}
