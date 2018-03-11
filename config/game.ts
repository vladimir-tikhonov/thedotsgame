export interface IGameConfig {
    horizontalFieldSize: number;
    verticalFieldSize: number;
}

export const defaultConfig: Readonly<IGameConfig> = {
    horizontalFieldSize: 20,
    verticalFieldSize: 30,
};
