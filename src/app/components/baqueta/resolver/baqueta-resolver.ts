import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";

import { inject } from "@angular/core";
import { Baqueta } from "../../../models/baqueta.model";
import { BaquetaService } from "../../../services/baqueta.service";

export const baquetaResolver: ResolveFn<Baqueta> =
    (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
        return inject(BaquetaService).findById(route.paramMap.get('id')!);
    }