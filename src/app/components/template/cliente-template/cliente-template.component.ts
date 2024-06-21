import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { RouterOutlet } from '@angular/router';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-cliente-template',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, RouterOutlet, MatButton, MatIcon],
  templateUrl: './cliente-template.component.html',
  styleUrl: './cliente-template.component.css'
})
export class ClienteTemplateComponent {

}
