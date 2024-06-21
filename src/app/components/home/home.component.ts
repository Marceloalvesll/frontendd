import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { ImageSliderComponent } from '../../image-slider/image-slider.component';

@Component({
  selector: 'app-home-root',
  standalone: true,
  imports: [CommonModule,
    RouterOutlet,
    FormsModule,
    ReactiveFormsModule,
    ImageSliderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent {
  title = 'angular-psicologia';

  slides: any[] = [
    {
      url: '/assets/images/caixa1.jpg',
      title: 'First slide',
      description: 'This is the first slide',
    },
    {
      url: '/assets/images/caixa2.jpg',
      title: 'Second slide',
      description: 'This is the second slide',
    },
    {
      url: '/assets/images/caixa3.jpg',
      title: 'Third slide',
      description: 'This is the third slide',
    },
    {
      url: '/assets/images/caixa4.jpg',
      title: 'Fourth slide',
      description: 'This is the fourth slide',
    },
    {
      url: '/assets/images/caixa5.jpg',
      title: 'Five slide',
      description: 'This is the five slide',
    },
   
  ];
}