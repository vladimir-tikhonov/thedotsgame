import { IGameConfig } from 'config/game';

export enum Player {
    Player1,
    Player2,
}

export default class GameState {
    public static buildEmptyState(config: IGameConfig) {
        return new GameState(config);
    }

    private config: Readonly<IGameConfig>;
    private currentPlayer = Player.Player1;

    private constructor(config: IGameConfig) {
        this.config = config;
    }

    public getConfig() {
        return this.config;
    }

    public getCurrentPlayer() {
        return this.currentPlayer;
    }

    public getCurrentPlayerType() {
        return this.getCurrentPlayer() === Player.Player1 ?
            this.getConfig().firstPlayerType :
            this.getConfig().secondPlayerType;
    }

    public switchPlayer() {
        this.currentPlayer = this.getCurrentPlayer() === Player.Player1 ? Player.Player2 : Player.Player1;
    }
}
