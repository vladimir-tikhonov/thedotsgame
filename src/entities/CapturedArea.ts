import Path from 'entities/Path';

export default class CapturedArea {
    private path: Path;

    public constructor(path: Path) {
        this.path = path;
    }

    public getPlayer() {
        return this.path.getPlayer();
    }

    public getPath() {
        return this.path;
    }
}
