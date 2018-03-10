import Renderer from 'engine/Renderer';
import GameField from 'engine/GameField';
import MouseControl from 'engine/MouseControl';
import * as hitboxService from 'services/HitboxService';
import { defaultConfig as gameConfig } from 'config/game';

const renderer = new Renderer(gameConfig);
document.body.appendChild(renderer.getCanvasElement());

const gameField = new GameField(gameConfig);

const mouseControl = new MouseControl(renderer.getCanvasElement());

function animationLoop() {
    requestAnimationFrame(animationLoop);

    if (!mouseControl.isInitialized() || !mouseControl.wasMousePositionChanged()) {
        return;
    }

    const hitboxUnderMouse = hitboxService.getHitboxUnderMouse(mouseControl.getMousePosition(),
        gameField.getHitboxes(), renderer.getCamera());
    if (hitboxUnderMouse) {
        mouseControl.onHitboxUnderMouse(hitboxUnderMouse);
    } else {
        mouseControl.onNoHitboxUnderMouse();
    }

    renderer.renderScene(gameField.getScene());
}

window.requestAnimationFrame(animationLoop);
