import Point from 'entities/Point';
import Path from 'entities/Path';
import CapturedArea from 'entities/CapturedArea';
import { Player } from 'entities/GameState';
import * as pathService from 'services/Path';

export interface ICapturedAreaChanges {
    addedCapturedAreas: CapturedArea[];
    removedCapturedAreas: CapturedArea[];
}

export default class CapturedAreas {
    private paths: Path[] = [];
    private capturedAreas: CapturedArea[] = [];

    public addPoint(newPoint: Point) {
        const diff = pathService.processNewPoint(newPoint, this.getPathsForPlayer(newPoint.getPlayer()));
        return this.processPathChanges(diff);
    }

    public removePoint(_pointToRemove: Point) {
        // TODO
        return this.processPathChanges({ addedPaths: [], removedPaths: [] });
    }

    private processPathChanges(diff: pathService.IPathChanges): ICapturedAreaChanges {
        this.paths = this.paths.filter((existingPath) => !diff.removedPaths.includes(existingPath))
            .concat(diff.addedPaths);
        const newClosedPaths = diff.addedPaths.filter((addedPath) => pathService.isPathClosed(addedPath));
        const addedCapturedAreas = newClosedPaths.map((closedPath) => new CapturedArea(closedPath));
        const removedCapturedAreas = this.capturedAreas.filter((caprutedArea) => {
            return diff.removedPaths.includes(caprutedArea.getPath());
        });
        this.capturedAreas = this.capturedAreas.filter((caprutedArea) => !removedCapturedAreas.includes(caprutedArea))
            .concat(addedCapturedAreas);

        return { addedCapturedAreas, removedCapturedAreas };
    }

    private getPathsForPlayer(player: Player) {
        return this.paths.filter((path) => path.getPlayer() === player);
    }
}
