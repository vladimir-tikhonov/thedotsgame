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
        const cameraAspectRatio = gameConfig.horizontalFieldSize / gameConfig.verticalFieldSize;
        const screenAspectRatio = window.innerWidth / window.innerHeight;
        const aspectRatio = screenAspectRatio / cameraAspectRatio;

        const [ widthExtension, heightExtension ] = aspectRatio > 1 ?
            [aspectRatio, 1] :
            [1, 1 / aspectRatio];

        this.camera = new OrthographicCamera(
            (-gameConfig.horizontalFieldSize / 2) * widthExtension,
            (gameConfig.horizontalFieldSize / 2) * widthExtension,
            (gameConfig.verticalFieldSize / 2) * heightExtension,
            (-gameConfig.verticalFieldSize / 2) * heightExtension,
            0,
            1,
        );
    }
}
