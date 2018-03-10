import { IGameConfig } from 'config/game';

export default class GameState {
    public static buildEmptyState(config: IGameConfig) {
        return new GameState(config);
    }

    private config: Readonly<IGameConfig>;

    private constructor(config: IGameConfig) {
        this.config = config;
    }

    public getConfig() {
        return this.config;
    }
}
