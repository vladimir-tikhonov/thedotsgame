import Point from 'entities/Point';

export default class Path {
    private points: Point[];

    public constructor(points: Point[]) {
        this.points = points;
    }

    public appendPoint(newPoint: Point) {
        if (newPoint.getPlayer() !== this.getPlayer()) {
            throw new Error('Path: cannot add a point belonging to the different player.');
        }

        this.points = [...this.points, newPoint];
        return this;
    }

    public prependPoint(newPoint: Point) {
        if (newPoint.getPlayer() !== this.getPlayer()) {
            throw new Error('Path: cannot add a point belonging to the different player.');
        }

        this.points = [newPoint, ...this.points];
        return this;
    }

    public getPoints() {
        return this.points;
    }

    public getPlayer() {
        return this.getFirstPoint().getPlayer();
    }

    public getFirstPoint() {
        return this.points[0];
    }

    public getLastPoint() {
        return this.points[this.points.length - 1];
    }

    public clone() {
        return new Path([...this.points]);
    }
}
