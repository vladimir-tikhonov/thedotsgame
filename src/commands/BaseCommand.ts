import GameField from 'engine/GameField';
import GameState from 'entities/GameState';

export interface ICommandContext {
    gameField: GameField;
    gameState: GameState;
}

export default abstract class BaseCommand {
    public abstract do(context: ICommandContext): void;
    public abstract undo(context: ICommandContext): void;
}
