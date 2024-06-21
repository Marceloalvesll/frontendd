import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";

import { inject } from "@angular/core";
import { Acessorio } from "../../../models/acessorio.model";
import { AcessorioService } from "../../../services/acessorio.service";


export const acessorioResolver: ResolveFn<Acessorio> =
    (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
        return inject(AcessorioService).findById(route.paramMap.get('id')!);
    }