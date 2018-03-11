import { Subscription } from 'rxjs';
import { Vector2 } from 'three/math/Vector2';

import Renderer from 'engine/Renderer';
import GameField from 'engine/GameField';
import Controls from 'engine/Controls';
import UI from 'engine/UI';
import GameState from 'entities/GameState';
import BaseCommand from 'commands/BaseCommand';
import AddPointCommand from 'commands/AddPointCommand';
import * as interactions from 'services/Interactions';
import * as hitboxService from 'services/Hitboxes';

export default class Game {
    private state: GameState;
    private commandsToUndo: BaseCommand[] = [];
    private commandsToRedo: BaseCommand[] = [];

    private renderer: Renderer;
    private gameField: GameField;
    private controls: Controls;
    private ui: UI;

    private subscriptions: Subscription;

    public constructor(container: HTMLElement, initialState: GameState) {
        this.state = initialState;

        this.renderer = new Renderer(this.state.getConfig());
        this.gameField = new GameField(this.state.getConfig());
        this.controls = new Controls(this.renderer.getCanvasElement(), interactions.buildMouseInteractor);
        this.ui = new UI(container, this.renderer, this.gameField, this.controls);

        this.subscriptions = this.controls.onClick.subscribe((position) => this.handleClick(position));
    }

    public start() {
        this.ui.startAnimationLoop();
    }

    public isUndoAvailable() {
        return this.commandsToUndo.length > 0;
    }

    public isRedoAvailable() {
        return this.commandsToRedo.length > 0;
    }

    public cleanup() {
        this.subscriptions.unsubscribe();
        this.controls.cleanup();
        this.ui.cleanup();
    }

    private doCommand(command: BaseCommand) {
        command.do(this.getContextForCommands());
        this.commandsToUndo.push(command);
    }

    private getContextForCommands() {
        return {
            gameField: this.gameField,
            gameState: this.state,
        };
    }

    private handleClick(clickPosition: Vector2) {
        const hitboxUnderMouse = hitboxService.getHitboxUnderMouse(clickPosition, this.gameField.getHitboxes(),
            this.renderer.getCamera());
        if (!hitboxUnderMouse) {
            return;
        }

        const pointPosition = this.gameField.fieldPositionToPointPosition(hitboxUnderMouse.getFieldPosition());
        const command = new AddPointCommand(pointPosition);
        this.doCommand(command);
    }
}
