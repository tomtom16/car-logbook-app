import {Injectable} from "@angular/core";
import {Gasoline} from "../api/car-logbook";


@Injectable({
    providedIn: 'root',
})
export class BadgeService {

    getSeverity(gasoline: Gasoline | undefined): BadgeSeverity {
        if (!!gasoline) {
            return GASOLINE_SEVERITY_MAP[gasoline] ?? 'secondary';
        }
        return 'secondary';
    }

}

export const GASOLINE_SEVERITY_MAP: Record<Gasoline, BadgeSeverity> = {
    DIESEL: 'contrast',
    GASOLINE: 'danger',
    HYBRID: 'warn',
    ELECTRIC: 'success',
};

export type BadgeSeverity = 'info' | 'success' | 'warn' | 'danger' | 'secondary' | 'contrast' | null | undefined;