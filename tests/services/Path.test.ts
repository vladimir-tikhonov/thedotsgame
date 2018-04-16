import { Vector2 } from 'three/math/Vector2';

import * as pathService from 'services/Path';
import Point from 'entities/Point';
import Path from 'entities/Path';
import { Player } from 'entities/GameState';

function buildPoint(coordinatesArray: [number, number], player: Player) {
    return new Point(new Vector2(coordinatesArray[0], coordinatesArray[1]), player);
}

function buildPath(coordinatesArrays: Array<[number, number]>, player: Player) {
    const points = coordinatesArrays.map((coordinatesArray) => buildPoint(coordinatesArray, player));
    return new Path(points);
}

describe('processNewPoint', () => {
    test('it adds a path with one point when there is no existing paths', () => {
        const newPoint = buildPoint([0, 0], Player.Player1);
        const changes = pathService.processNewPoint(newPoint, []);

        expect(changes.removedPaths.length).toBe(0);
        expect(changes.addedPaths.length).toBe(1);
        expect(changes.addedPaths[0].getPoints().length).toBe(1);
        expect(changes.addedPaths[0].getFirstPoint()).toBe(newPoint);
    });

    test('don\'t add point to the path which if they are not adjacent', () => {
        const existingPaths = buildPath([[0, 0]], Player.Player1);
        const newPoint = buildPoint([2, 0], Player.Player1);
        const changes = pathService.processNewPoint(newPoint, [existingPaths]);

        expect(changes.removedPaths.length).toBe(0);
        expect(changes.addedPaths.length).toBe(1);
        expect(changes.addedPaths[0].getPoints().length).toBe(1);
        expect(changes.addedPaths[0].getFirstPoint()).toBe(newPoint);
    });

    test('can append a point to the end of the existing path', () => {
        const existingPaths = buildPath([[1, 0], [2, 0]], Player.Player1);
        const newPoint = buildPoint([3, 0], Player.Player1);
        const changes = pathService.processNewPoint(newPoint, [existingPaths]);

        expect(changes.removedPaths.length).toBe(1);
        expect(changes.addedPaths.length).toBe(1);
        expect(changes.addedPaths[0].getPoints().length).toBe(3);
        expect(changes.addedPaths[0].getLastPoint()).toBe(newPoint);
    });

    test('can prepend a point to the beginning of the existing path', () => {
        const existingPaths = buildPath([[1, 0], [2, 0]], Player.Player1);
        const newPoint = buildPoint([0, 0], Player.Player1);
        const changes = pathService.processNewPoint(newPoint, [existingPaths]);

        expect(changes.removedPaths.length).toBe(1);
        expect(changes.addedPaths.length).toBe(1);
        expect(changes.addedPaths[0].getPoints().length).toBe(3);
        expect(changes.addedPaths[0].getFirstPoint()).toBe(newPoint);
    });
});
