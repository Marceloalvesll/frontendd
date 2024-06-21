import { Routes } from '@angular/router';
import { MarcaListComponent } from './components/marca/marca-list/marca-list.component';
import { MarcaFormComponent } from './components/marca/marca-form/marca-form.component';
import { marcaResolver } from './components/marca/resolver/marca-resolver';
import { BateriaCompletaListComponent } from './components/bateriacompleta/bateriacompleta-list/bateriacompleta-list.component';
import { BateriaCompletaFormComponent } from './components/bateriacompleta/bateriacompleta-form/bateriacompleta-form.component';
import { bateriaCompletaResolver } from './components/bateriacompleta/resolver/bateriacompleta-resolver';
import { CategoriaListComponent } from './components/categoria/categoria-list/categoria-list.component';
import { categoriaResolver } from './components/categoria/resolver/categoria-resolver';
import { CategoriaFormComponent } from './components/categoria/categoria-form/categoria-form.component';
import { AcessorioListComponent } from './components/acessorio/acessorio-list/acessorio-list.component';
import { AcessorioFormComponent } from './components/acessorio/acessorio-form/acessorio-form.component';
import { acessorioResolver } from './components/acessorio/resolver/acessorio-resolver';
import { BaquetaListComponent } from './components/baqueta/baqueta-list/baqueta-list.component';
import { BaquetaFormComponent } from './components/baqueta/baqueta-form/baqueta-form.component';
import { baquetaResolver } from './components/baqueta/resolver/baqueta-resolver';
import { TamborAvulsoListComponent } from './components/tamboravulso/tamboravulso-list/tamboravulso-list.component';
import { TamborAvulsoFormComponent } from './components/tamboravulso/tamboravulso-form/tamboravulso-form.component';
import { tamborAvulsoResolver } from './components/tamboravulso/resolver/tamboravulso-resolver';
import { TelefoneFormComponent } from './components/telefone/telefone-form/telefone-form.component';
import { TelefoneListComponent } from './components/telefone/telefone-list/telefone-list.component';
import { telefoneResolver } from './components/telefone/resolver/telefone-resolver';
import { EnderecoListComponent } from './components/endereco/endereco-list/endereco-list.component';
import { EnderecoFormComponent } from './components/endereco/endereco-form/endereco-form.component';
import { enderecoResolver } from './components/endereco/resolver/endereco-resolver';
import { LoginClienteComponent } from "./components/logincliente/logincliente.component";
import { ClienteFormComponent } from "./components/cliente/cliente-form/cliente-form.component";
import { ClienteListComponent } from './components/cliente/cliente-list/cliente-list.component';
import { CarrinhoComponent } from './components/carrinho/carrinho.component';
import { BateriaCompletaCardListComponent } from './components/bateriacompleta-card-list/bateriacompleta-card-list.component';
import { ClienteTemplateComponent } from './components/template/cliente-template/cliente-template.component';
import { AdminTemplateComponent } from './components/template/admin-template/admin-template.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ClientePerfilComponent } from './components/cliente/cliente-perfil/cliente-perfil.component';
import { ClienteOrdersComponent } from './components/cliente/cliente-orders/cliente-orders.component';
import { HomeComponent } from './components/home/home.component';
import { clienteResolver } from './components/cliente/resolver/cliente-resolver';
import { LoginAdminComponent } from './components/loginadmin/loginadmin.component';





export const routes: Routes = [
    { path: 'login', component: LoginClienteComponent, title: 'Login' },
    { path: 'enderecos/cliente/new', component: EnderecoFormComponent, title: 'Novo endereco', },
    { path: 'clientes/new', component: ClienteFormComponent, title: 'Novo usuario', },
    { path: 'login/admin', component: LoginAdminComponent, title: 'LoginAdmin' },
    // { path: 'bateriasCompleta/new', component: BateriaCompletaFormComponent, title: 'Nova Bateria Completa' },
    
    

    {
        path: '',
        component: ClienteTemplateComponent,
        title: 'e-commerce',
        children: [
            { path: '', pathMatch: 'full', redirectTo: 'home' },
            { path: 'home', component: HomeComponent, title: 'Home' },
            { path: 'produtos', component: BateriaCompletaCardListComponent, title: 'Produtos à Venda' },
            { path: 'carrinho', component: CarrinhoComponent, title: 'Carrinho de pedidos' },
            { path: 'checkout', component: CheckoutComponent, title: 'Finalizar Compra' },
            { path: 'perfil/enderecos/new/:idCliente', component: EnderecoFormComponent },
            { path: 'perfil/enderecos/edit/:id', component: EnderecoFormComponent },
            { path: 'perfil', component: ClientePerfilComponent },
            { path: 'perfil/edit/:id', component: ClienteFormComponent },
            { path: 'orders/:id', component: ClienteOrdersComponent },

            // this.router.navigate(['/orders', pedidoId]);

            { path: 'cliente/orders', component: ClienteOrdersComponent },
            { path: 'perfil/telefones/new/:idCliente', component: TelefoneFormComponent },
            { path: 'perfil/telefones/edit/:id', component: TelefoneFormComponent },
            
        ]
    },

    {
        path: 'admin',
        component: AdminTemplateComponent,
        title: 'e-commerce',
        children: [
            { path: '', pathMatch: 'full', redirectTo: 'marcas' },

            { path: 'marcas', component: MarcaListComponent, title: 'Lista de Marcas' },
            { path: 'marcas/new', component: MarcaFormComponent, title: 'Nova Marca' },
            { path: 'marcas/edit/:id', component: MarcaFormComponent, resolve: { marca: marcaResolver } },

            { path: 'bateriasCompleta', component: BateriaCompletaListComponent, title: 'Lista de Bateria Completa' },
            { path: 'bateriasCompleta/new', component: BateriaCompletaFormComponent, title: 'Nova Bateria Completa' },
            { path: 'bateriasCompleta/edit/:id', component: BateriaCompletaFormComponent, resolve: { bateriaCompleta: bateriaCompletaResolver } },

            { path: 'categorias', component: CategoriaListComponent, title: 'Lista de Categorias' },
            { path: 'categorias/new', component: CategoriaFormComponent, title: 'Nova Categoria' },
            { path: 'categorias/edit/:id', component: CategoriaFormComponent, resolve: { categoria: categoriaResolver } },
           
            { path: 'enderecos', component: EnderecoListComponent, title: 'Lista de Enderecos' },
            { path: 'enderecos/new', component: EnderecoFormComponent, title: 'Novo Endereco' },
            { path: 'enderecos/edit/:id', component: EnderecoFormComponent, resolve: { endereco: enderecoResolver } },

            { path: 'telefones', component: TelefoneListComponent, title: 'Lista de Telefones' },
            { path: 'telefones/new', component: TelefoneFormComponent, title: 'Novo Telefone' },
            { path: 'telefones/edit/:id', component: TelefoneFormComponent, resolve: { telefone: telefoneResolver } },

            { path: 'login', component: LoginClienteComponent, title: 'Login' },

            { path: 'clientes', component: ClienteListComponent, title: 'Lista de Clientes' },
            { path: 'clientes/new', component: ClienteFormComponent, title: 'Novo usuario', },
            { path: 'clientes/edit/:id', component: ClienteFormComponent, resolve: { cliente: clienteResolver } },

             // { path: 'acessorios', component: AcessorioListComponent, title: 'Lista de Acessorios' },
            // { path: 'acessorios/new', component: AcessorioFormComponent, title: 'Nova Acessorio' },
            // { path: 'acessorios/edit/:id', component: AcessorioFormComponent, resolve: { acessorio: acessorioResolver } },

            // { path: 'baquetas', component: BaquetaListComponent, title: 'Lista de Baquetas' },
            // { path: 'baquetas/new', component: BaquetaFormComponent, title: 'Nova Baqueta' },
            // { path: 'baquetas/edit/:id', component: BaquetaFormComponent, resolve: { baqueta: baquetaResolver } },

            // { path: 'tamboresAvulso', component: TamborAvulsoListComponent, title: 'Lista de Tambores' },
            // { path: 'tamboresAvulso/new', component: TamborAvulsoFormComponent, title: 'Novo Tambor' },
            // { path: 'tamboresAvulso/edit/:id', component: TamborAvulsoFormComponent, resolve: { tamborAvulso: tamborAvulsoResolver } },


            // { path: 'carrinho', component: CarrinhoComponent, title: 'Carrinho de pedidos' },
            // { path: 'produtos', component: BateriaCompletaCardListComponent, title: 'Produtos à Venda' },
            // { path: 'checkout', component: CheckoutComponent, title: 'Finalizar Compra' },


        ]
    }

];
