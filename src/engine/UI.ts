import { Vector2 } from 'three/math/Vector2';
import { Subscription } from 'rxjs';
import { Subject } from 'rxjs/Subject';

import Renderer from 'engine/ui/Renderer';
import GameField from 'engine/ui/GameField';
import Controls from 'engine/ui/Controls';
import Hitbox from 'entities/Hitbox';
import Point from 'entities/Point';
import * as hitboxService from 'services/Hitbox';
import * as interactionService from 'services/Interaction';
import { IGameConfig } from 'config/game';

export default class UI {
    public onClick = new Subject<Vector2>();

    private dirty = true;
    private hoveredHitbox: Hitbox | null = null;

    private container: HTMLElement;
    private renderer: Renderer;
    private gameField: GameField;
    private controls: Controls;

    private animationFrameRequestId: number | null = null;
    private subscription: Subscription;

    public constructor(container: HTMLElement, config: IGameConfig) {
        this.container = container;
        this.renderer = new Renderer(config);
        this.gameField = new GameField(config);
        this.controls = new Controls(this.renderer.getCanvasElement(), interactionService.buildMouseInteractor);

        this.container.appendChild(this.renderer.getCanvasElement());

        const markAsDirty = () => { this.dirty = true; };
        this.subscription = this.controls.onCursorMovement.subscribe(markAsDirty)
            .add(this.gameField.onChange.subscribe(markAsDirty))
            .add(this.controls.onClick.subscribe((fieldPosition) => this.handleClick(fieldPosition)));
    }

    public startAnimationLoop() {
        this.sceduleAnimationFrame();
    }

    public addPoint(newPoint: Point) {
        this.gameField.addPoint(newPoint);
    }

    public removePoint(pointToRemove: Point) {
        this.gameField.removePoint(pointToRemove);
    }

    public cleanup() {
        if (this.animationFrameRequestId) {
            cancelAnimationFrame(this.animationFrameRequestId);
        }
        this.subscription.unsubscribe();
        this.controls.cleanup();
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

    private handleClick(fieldPosition: Vector2) {
        const hitboxUnderMouse = hitboxService.getHitboxUnderMouse(fieldPosition, this.gameField.getHitboxes(),
            this.renderer.getCamera());
        if (!hitboxUnderMouse) {
            return;
        }

        const pointPosition = this.gameField.fieldPositionToPointPosition(hitboxUnderMouse.getFieldPosition());
        this.onClick.next(pointPosition);
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
