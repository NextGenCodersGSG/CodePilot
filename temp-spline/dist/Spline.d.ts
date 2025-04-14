/// <reference types="react" />
import { Application } from '@splinetool/runtime';
import type { SPEObject, SplineEvent, SplineEventName } from '@splinetool/runtime';
export type { SPEObject, SplineEvent, SplineEventName };
export interface SplineProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onLoad'> {
    scene: string;
    onLoad?: (e: Application) => void;
    onSplineMouseDown?: (e: SplineEvent) => void;
    onSplineMouseUp?: (e: SplineEvent) => void;
    onSplineMouseHover?: (e: SplineEvent) => void;
    onSplineKeyDown?: (e: SplineEvent) => void;
    onSplineKeyUp?: (e: SplineEvent) => void;
    onSplineStart?: (e: SplineEvent) => void;
    onSplineLookAt?: (e: SplineEvent) => void;
    onSplineFollow?: (e: SplineEvent) => void;
    onSplineScroll?: (e: SplineEvent) => void;
    renderOnDemand?: boolean;
}
declare const Spline: import("react").ForwardRefExoticComponent<SplineProps & import("react").RefAttributes<HTMLDivElement>>;
export default Spline;
