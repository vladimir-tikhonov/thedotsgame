import { Vector2 } from 'three/math/Vector2';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/map';

export interface IInteractor {
    onCursorMovement: Observable<Vector2>;
    onClick: Observable<Vector2>;
    subscription: Subscription;
}

export type InteractorBuilder = (htmlElement: HTMLElement) => IInteractor;

export function buildMouseInteractor(htmlElement: HTMLElement): IInteractor {
    const cursorMovementObservable = Observable.fromEvent<MouseEvent>(htmlElement, 'mousemove')
        .map(extractClientPosition);
    const onClickObservable = Observable.fromEvent<MouseEvent>(htmlElement, 'mousedown').map(extractClientPosition);

    const onCursorMovement = new Subject<Vector2>();
    const onClick = new Subject<Vector2>();
    const subscription = cursorMovementObservable.subscribe(onCursorMovement).add(onClickObservable.subscribe(onClick));

    return {
        onCursorMovement,
        onClick,
        subscription,
    };
}

function extractClientPosition(event: MouseEvent) {
    return new Vector2(event.clientX, event.clientY);
}
