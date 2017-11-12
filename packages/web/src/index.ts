import * as three from 'three';

const fieldSize = 30;
const aspect = window.innerWidth / window.innerHeight;
const scene = new three.Scene();
scene.background = new three.Color(0xf0f0f0);

const camera = new three.OrthographicCamera(
    fieldSize / 2 * aspect,
    -fieldSize / 2 * aspect,
    fieldSize / 2,
    -fieldSize / 2,
    0,
    1,
);

const makeCircle = (x: number, y: number) => {
    const material = new three.LineBasicMaterial({color: 0xFF0000});
    material.side = three.DoubleSide;
    const circle = new three.Mesh(new three.CircleGeometry(0.3, 20), material);
    circle.position.set(x, y, 0);
    scene.add(circle);
};

for (let i = -fieldSize / 2 + 1; i < fieldSize / 2; i++) {
    for (let j = -fieldSize / 2 + 1; j < fieldSize / 2; j++) {
        makeCircle(i, j);
    }
}

const gridHelper = new three.GridHelper(fieldSize, fieldSize);
gridHelper.rotateX(90 * Math.PI / 180);
scene.add(gridHelper);

const renderer = new three.WebGLRenderer();
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
const canvasElement = renderer.domElement;
document.body.appendChild(canvasElement);

const raycaster = new three.Raycaster();
const mouse = new three.Vector2();

function onMouseMove(event: MouseEvent) {
    event.preventDefault();

    const boundingRect = canvasElement.getBoundingClientRect();
    const x = event.clientX - boundingRect.left;
    const y = event.clientY - boundingRect.top;
    mouse.x = (x / window.innerWidth) * 2 - 1;
    mouse.y = -(y / window.innerHeight) * 2 + 1;
}

canvasElement.addEventListener('mousemove', onMouseMove, false);

let firstRun = true;
function animate() {
    requestAnimationFrame(animate);

    if (!firstRun) {
        raycaster.setFromCamera(mouse, camera);
        raycaster.intersectObjects(scene.children).map(({object}) => {
            if (!(object instanceof three.Mesh)) {
                return;
            }

            (object.material as three.LineBasicMaterial).color = new three.Color(0x0000FF);
        });
    }

    renderer.render(scene, camera);
    firstRun = false;
}

window.requestAnimationFrame(animate);
