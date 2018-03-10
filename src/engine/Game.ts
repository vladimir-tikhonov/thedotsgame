import Renderer from 'engine/Renderer';
import GameField from 'engine/GameField';
import Controls from 'engine/Controls';
import GameState from 'entities/GameState';
import Hitbox from 'entities/Hitbox';
import * as hitboxService from 'services/Hitboxes';
import * as interactions from 'services/Interactions';

export default class Game {
    private state: GameState;
    private hoveredHitbox: Hitbox | null = null;

    private renderer: Renderer;
    private gameField: GameField;
    private controls: Controls;

    private animationFrameRequestId: number | null = null;

    public constructor(container: HTMLElement, initialState: GameState) {
        this.state = initialState;

        this.renderer = new Renderer(this.state.getConfig());
        const canvasElement = this.renderer.getCanvasElement();

        this.gameField = new GameField(this.state.getConfig());
        this.controls = new Controls(canvasElement, interactions.buildMouseInteractor(canvasElement));

        container.appendChild(canvasElement);
    }

    public start() {
        this.sceduleAnimationFrame();
    }

    public cleanup() {
        if (this.animationFrameRequestId) {
            cancelAnimationFrame(this.animationFrameRequestId);
        }
        this.controls.cleanup();
    }

    private isInitialized() {
        return this.controls.isInitialized();
    }

    private isDirty() {
        return this.controls.isDirty();
    }

    private clearDirtyFlag() {
        this.controls.clearDirtyFlag();
    }

    private sceduleAnimationFrame() {
        this.animationFrameRequestId = requestAnimationFrame(() => this.animationFrameHandler());
    }

    private animationFrameHandler() {
        this.sceduleAnimationFrame();

        if (!this.isInitialized() || !this.isDirty()) {
            return;
        }

        this.checkHitboxHover();

        this.renderer.renderScene(this.gameField.getScene());
        this.clearDirtyFlag();
    }

    private checkHitboxHover() {
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
