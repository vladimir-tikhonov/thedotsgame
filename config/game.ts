export enum PlayerType {
    User,
    AI,
}

export interface IGameConfig {
    horizontalFieldSize: number;
    verticalFieldSize: number;
    firstPlayerType: PlayerType;
    secondPlayerType: PlayerType;
}

export const defaultConfig: Readonly<IGameConfig> = {
    horizontalFieldSize: 19,
    verticalFieldSize: 12,
    firstPlayerType: PlayerType.User,
    secondPlayerType: PlayerType.User,
};
