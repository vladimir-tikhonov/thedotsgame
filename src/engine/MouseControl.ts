import * as three from 'three';
import Hitbox from 'entities/Hitbox';

export default class MouseControl {
    private mousePosition: null | three.Vector2 = null;
    private canvas: HTMLCanvasElement;
    private hoveredHitbox: Hitbox | null = null;
    private hasChanges = false;

    public constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        canvas.addEventListener('mousemove', (event) => this.handleMouseMove(event), false);
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

    public wasMousePositionChanged() {
        const result = this.hasChanges;
        this.hasChanges = false;
        return result;
    }

    public onHitboxUnderMouse(hitbox: Hitbox) {
        if (this.hoveredHitbox === hitbox) {
            return;
        }

        this.clearHoveredHitbox();
        this.addHoveredHitbox(hitbox);
    }

    public onNoHitboxUnderMouse() {
        this.clearHoveredHitbox();
    }

    private addHoveredHitbox(hitbox: Hitbox) {
        hitbox.hightlight();
        this.hoveredHitbox = hitbox;
        this.canvas.style.cursor = 'pointer';
    }

    private clearHoveredHitbox() {
        if (this.hoveredHitbox === null) {
            return;
        }

        this.hoveredHitbox.unhighlight();
        this.hoveredHitbox = null;
        this.canvas.style.cursor = 'default';
    }

    private handleMouseMove(event: MouseEvent) {
        event.preventDefault();

        const boundingRect = this.canvas.getBoundingClientRect();
        const x = event.clientX - boundingRect.left;
        const y = event.clientY - boundingRect.top;
        if (!this.mousePosition) {
            this.mousePosition = new three.Vector2();
        }

        this.mousePosition.x = (x / window.innerWidth) * 2 - 1;
        this.mousePosition.y = -(y / window.innerHeight) * 2 + 1;

        this.hasChanges = true;
    }
}
