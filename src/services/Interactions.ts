import * as three from 'three';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/map';

export interface IInteractor {
    cursorMovement: Observable<three.Vector2>;
    click: Observable<three.Vector2>;
}

export function buildMouseInteractor(htmlElement: HTMLElement): IInteractor {
    return {
        cursorMovement: Observable.fromEvent<MouseEvent>(htmlElement, 'mousemove').map(extractClientPosition),
        click: Observable.fromEvent<MouseEvent>(htmlElement, 'mousedown').map(extractClientPosition),
    };
}

function extractClientPosition(event: MouseEvent) {
    return new three.Vector2(event.clientX, event.clientY);
}