export interface IGameConfig {
    fieldSize: number;
}

export const defaultConfig: Readonly<IGameConfig> = {
    fieldSize: 30,
};
