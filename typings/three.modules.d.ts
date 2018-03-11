declare module 'three/constants' {
    export { VertexColors, DoubleSide } from 'three';
}

declare module 'three/math/Vector2' {
    import { Vector2 as BaseVector2 } from 'three';
    import { Matrix3 } from 'three';

    export class Vector2 extends BaseVector2 {
        public applyMatrix3(m: Matrix3): Vector2;
    }
}

declare module 'three/math/Vector3' {
    export { Vector3 } from 'three';
}

declare module 'three/math/Matrix3' {
    export { Matrix3 } from 'three';
}

declare module 'three/math/Color' {
    export { Color } from 'three';
}

declare module 'three/core/Raycaster' {
    export { Raycaster } from 'three';
}

declare module 'three/core/Geometry' {
    export { Geometry } from 'three';
}

declare module 'three/cameras/Camera' {
    export { Camera } from 'three';
}

declare module 'three/cameras/OrthographicCamera' {
    export { OrthographicCamera } from 'three';
}

declare module 'three/objects/LineSegments' {
    export { LineSegments } from 'three';
}

declare module 'three/objects/Mesh' {
    export { Mesh } from 'three';
}

declare module 'three/geometries/BoxGeometry' {
    export { BoxGeometry } from 'three';
}

declare module 'three/geometries/CircleGeometry' {
    export { CircleGeometry } from 'three';
}

declare module 'three/materials/LineBasicMaterial' {
    export { LineBasicMaterial } from 'three';
}

declare module 'three/scenes/Scene' {
    export { Scene } from 'three';
}

declare module 'three/renderers/WebGLRenderer' {
    export { WebGLRenderer } from 'three';
}
