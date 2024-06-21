import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";

import { inject } from "@angular/core";
import { TamborAvulso } from "../../../models/tamboravulso.model";
import { TamborAvulsoService } from "../../../services/tamboravulso.service";

export const tamborAvulsoResolver: ResolveFn<TamborAvulso> =
    (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
        return inject(TamborAvulsoService).findById(route.paramMap.get('id')!);
    }