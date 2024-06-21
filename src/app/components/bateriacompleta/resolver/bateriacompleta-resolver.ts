import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";

import { inject } from "@angular/core";
import { BateriaCompleta } from "../../../models/bateriacompleta.model";
import { BateriaCompletaService } from "../../../services/bateriacompleta.service";

export const bateriaCompletaResolver: ResolveFn<BateriaCompleta> =
    (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
        return inject(BateriaCompletaService).findById(route.paramMap.get('id')!);
    }