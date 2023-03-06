import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JuegoUnoComponent } from './juego-uno/juego-uno/juego-uno.component'

const routes: Routes = [{
  path: '',
  component: JuegoUnoComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
