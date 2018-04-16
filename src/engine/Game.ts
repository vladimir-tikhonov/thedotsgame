import { Subscription } from 'rxjs';
import { Vector2 } from 'three/math/Vector2';

import UI from 'engine/UI';
import GameState from 'entities/GameState';
import BaseCommand from 'commands/BaseCommand';
import AddPointCommand from 'commands/AddPointCommand';

export default class Game {
    private state: GameState;
    private commandsToUndo: BaseCommand[] = [];
    private commandsToRedo: BaseCommand[] = [];

    private ui: UI;

    private subscriptions: Subscription;

    public constructor(container: HTMLElement, initialState: GameState) {
        this.state = initialState;

        this.ui = new UI(container, this.state);

        this.subscriptions = this.ui.onClick.subscribe((pointPosition) => this.handleClick(pointPosition));
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
        this.ui.cleanup();
    }

    private doCommand(command: BaseCommand) {
        command.do(this.getContextForCommands());
        this.commandsToUndo.push(command);
    }

    private getContextForCommands() {
        return {
            ui: this.ui,
            gameState: this.state,
        };
    }

    private handleClick(pointPosition: Vector2) {
        const command = new AddPointCommand(pointPosition);
        this.doCommand(command);
    }
}
