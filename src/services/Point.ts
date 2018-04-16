import Point from 'entities/Point';

export function isTwoPointsAdjacent(point1: Point, point2: Point) {
    const diffX = Math.abs(point1.getPosition().x - point2.getPosition().x);
    const diffY = Math.abs(point1.getPosition().y - point2.getPosition().y);

    return (diffX === 1 && diffY === 0) || (diffX === 0 && diffY === 1) || (diffX === 1 && diffY === 1);
}
