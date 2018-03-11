import Renderer from 'engine/Renderer';
import { Subscription } from 'rxjs';

import GameField from 'engine/GameField';
import Controls from 'engine/Controls';
import GameState from 'entities/GameState';
import Hitbox from 'entities/Hitbox';
import * as hitboxService from 'services/Hitboxes';
import * as interactions from 'services/Interactions';

export default class Game {
    private state: GameState;
    private hoveredHitbox: Hitbox | null = null;
    private dirty = true;

    private renderer: Renderer;
    private gameField: GameField;
    private controls: Controls;

    private animationFrameRequestId: number | null = null;
    private subscription: Subscription;

    public constructor(container: HTMLElement, initialState: GameState) {
        this.state = initialState;

        this.renderer = new Renderer(this.state.getConfig());
        const canvasElement = this.renderer.getCanvasElement();

        this.gameField = new GameField(this.state.getConfig());
        this.controls = new Controls(canvasElement, interactions.buildMouseInteractor(canvasElement));

        this.subscription = this.controls.onCursorMovement.subscribe(() => { this.dirty = true; });

        container.appendChild(canvasElement);
    }

    public start() {
        this.sceduleAnimationFrame();
    }

    public cleanup() {
        if (this.animationFrameRequestId) {
            cancelAnimationFrame(this.animationFrameRequestId);
        }
        this.subscription.unsubscribe();

        this.controls.cleanup();
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
