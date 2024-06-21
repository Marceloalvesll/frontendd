import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";

import { inject } from "@angular/core";
import { ParteBateria } from "../../../models/partebateria.model";
import { ParteBateriaService } from "../../../services/partebateria.service";


export const parteBatariaResolver: ResolveFn<ParteBateria> =
    (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
        return inject(ParteBateriaService).findById(route.paramMap.get('id')!);
    }