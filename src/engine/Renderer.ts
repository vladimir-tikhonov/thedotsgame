import { Scene } from 'three/scenes/Scene';
import { Camera } from 'three/cameras/Camera';
import { WebGLRenderer } from 'three/renderers/WebGLRenderer';
import { OrthographicCamera } from 'three/cameras/OrthographicCamera';
import { IGameConfig } from 'config/game';

export default class Renderer {
    private camera!: Camera;
    private renderer!: WebGLRenderer;

    public constructor(gameConfig: IGameConfig) {
        this.initCamera(gameConfig);
        this.initRenderer();
    }

    public renderScene(scene: Scene) {
        this.renderer.render(scene, this.getCamera());
    }

    public getCamera() {
        return this.camera;
    }

    public getCanvasElement() {
        return this.renderer.domElement;
    }

    private initRenderer() {
        this.renderer = new WebGLRenderer();
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    private initCamera(gameConfig: IGameConfig) {
        const aspectRatio = window.innerWidth / window.innerHeight;
        this.camera = new OrthographicCamera(
            -gameConfig.fieldSize / 2 * aspectRatio, gameConfig.fieldSize / 2 * aspectRatio,
            gameConfig.fieldSize / 2, -gameConfig.fieldSize / 2,
            0, 1,
        );
    }
}
