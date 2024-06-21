import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { inject } from "@angular/core";
import { Categoria } from "../../../models/categoria.model";
import { CategoriaService } from "../../../services/categoria.service";

export const categoriaResolver: ResolveFn<Categoria> =
    (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
        return inject(CategoriaService).findById(route.paramMap.get('id')!);
    }