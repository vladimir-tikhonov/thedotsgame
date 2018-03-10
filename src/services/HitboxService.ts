import * as three from 'three';
import Hitbox from 'entities/Hitbox';

export function getHitboxUnderMouse(mousePosition: three.Vector2, hitboxes: Hitbox[], camera: three.Camera) {
    const raycaster = new three.Raycaster();
    raycaster.setFromCamera(mousePosition, camera);

    return hitboxes.find((hitbox) => {
        return raycaster.intersectObject(hitbox.getMesh()).length > 0;
    });
}
