import UI from 'engine/UI';
import GameState from 'entities/GameState';

export interface ICommandContext {
    ui: UI;
    gameState: GameState;
}

export default abstract class BaseCommand {
    public abstract do(context: ICommandContext): void;
    public abstract undo(context: ICommandContext): void;
}
