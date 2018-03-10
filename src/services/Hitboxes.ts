import { Raycaster } from 'three/core/Raycaster';
import { Vector2 } from 'three/math/Vector2';
import { Camera } from 'three/cameras/Camera';

import Hitbox from 'entities/Hitbox';

export function getHitboxUnderMouse(mousePosition: Vector2, hitboxes: Hitbox[], camera: Camera) {
    const raycaster = new Raycaster();
    raycaster.setFromCamera(mousePosition, camera);

    return hitboxes.find((hitbox) => {
        return raycaster.intersectObject(hitbox.getMesh()).length > 0;
    });
}
