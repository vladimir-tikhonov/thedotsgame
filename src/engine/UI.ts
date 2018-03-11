import { Subscription } from 'rxjs';

import Renderer from 'engine/Renderer';
import GameField from 'engine/GameField';
import Controls from 'engine/Controls';
import Hitbox from 'entities/Hitbox';
import * as hitboxService from 'services/Hitboxes';

export default class UI {
    private dirty = true;
    private hoveredHitbox: Hitbox | null = null;

    private container: HTMLElement;
    private renderer: Renderer;
    private gameField: GameField;
    private controls: Controls;

    private animationFrameRequestId: number | null = null;
    private subscription: Subscription;

    public constructor(container: HTMLElement, renderer: Renderer, gameField: GameField, controls: Controls) {
        this.container = container;
        this.renderer = renderer;
        this.gameField = gameField;
        this.controls = controls;

        this.container.appendChild(this.renderer.getCanvasElement());

        const markAsDirty = () => { this.dirty = true; };
        this.subscription = this.controls.onCursorMovement.subscribe(markAsDirty)
            .add(this.gameField.onChange.subscribe(markAsDirty));
    }

    public startAnimationLoop() {
        this.sceduleAnimationFrame();
    }

    public cleanup() {
        if (this.animationFrameRequestId) {
            cancelAnimationFrame(this.animationFrameRequestId);
        }
        this.subscription.unsubscribe();
        this.container.removeChild(this.renderer.getCanvasElement());
    }

    private sceduleAnimationFrame() {
        this.animationFrameRequestId = requestAnimationFrame(() => this.animationFrameHandler());
    }

    private animationFrameHandler() {
        this.sceduleAnimationFrame();

        if (!this.dirty) {
            return;
        }

        this.checkHitboxHover();

        this.renderer.renderScene(this.gameField.getScene());
        this.dirty = false;
    }

    private checkHitboxHover() {
        if (!this.controls.isInitialized()) {
            return;
        }

        const hitboxUnderMouse = hitboxService.getHitboxUnderMouse(this.controls.getMousePosition(),
            this.gameField.getHitboxes(), this.renderer.getCamera());

        if (hitboxUnderMouse) {
            this.setHoveredHitbox(hitboxUnderMouse);
        } else {
            this.clearHoveredHitbox();
        }
    }

    private setHoveredHitbox(hitbox: Hitbox) {
        if (this.hoveredHitbox === hitbox) {
            return;
        }

        this.clearHoveredHitbox();

        hitbox.hightlight();
        this.hoveredHitbox = hitbox;
        this.renderer.getCanvasElement().style.cursor = 'pointer';
    }

    private clearHoveredHitbox() {
        if (this.hoveredHitbox === null) {
            return;
        }

        this.hoveredHitbox.unhighlight();
        this.hoveredHitbox = null;
        this.renderer.getCanvasElement().style.cursor = 'default';
    }
}
