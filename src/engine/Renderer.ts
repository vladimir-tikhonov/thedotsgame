import * as three from 'three';
import { IGameConfig } from 'config/game';

export default class Renderer {
    private camera!: three.Camera;
    private renderer!: three.WebGLRenderer;

    public constructor(gameConfig: IGameConfig) {
        this.initCamera(gameConfig);
        this.initRenderer();
    }

    public renderScene(scene: three.Scene) {
        this.renderer.render(scene, this.getCamera());
    }

    public getCamera() {
        return this.camera;
    }

    public getCanvasElement() {
        return this.renderer.domElement;
    }

    private initRenderer() {
        this.renderer = new three.WebGLRenderer();
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    private initCamera(gameConfig: IGameConfig) {
        const aspectRatio = window.innerWidth / window.innerHeight;
        this.camera = new three.OrthographicCamera(
            -gameConfig.fieldSize / 2 * aspectRatio, gameConfig.fieldSize / 2 * aspectRatio,
            gameConfig.fieldSize / 2, -gameConfig.fieldSize / 2,
            0, 1
        );
    }
}
