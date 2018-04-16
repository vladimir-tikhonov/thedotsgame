import Point from 'entities/Point';
import Path from 'entities/Path';
import * as pointService from 'services/Point';

export interface IPathChanges {
    addedPaths: Path[];
    removedPaths: Path[];
}

export function processNewPoint(newPoint: Point, existingPaths: Path[]): IPathChanges {
    const removedPaths: Path[] = [];
    const addedPaths: Path[] = [];

    // Extending existing path
    for (const existingPath of existingPaths) {
        if (pointService.isTwoPointsAdjacent(existingPath.getLastPoint(), newPoint)) {
            addedPaths.push(existingPath.clone().appendPoint(newPoint));
            removedPaths.push(existingPath);
        } else if (pointService.isTwoPointsAdjacent(existingPath.getFirstPoint(), newPoint)) {
            addedPaths.push(existingPath.clone().prependPoint(newPoint));
            removedPaths.push(existingPath);
        }
    }

    if (addedPaths.length === 0) {
        addedPaths.push(new Path([newPoint]));
    }
    return { addedPaths, removedPaths };
}

export function isPathClosed(path: Path) {
    if (path.getPoints().length <= 2) {
        return false;
    }

    return pointService.isTwoPointsAdjacent(path.getFirstPoint(), path.getLastPoint());
}
