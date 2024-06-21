import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

// export class AppComponent implements OnInit {
//   constructor(private http: HttpClient) {}

//   ngOnInit() {
//     this.http.get('https://jsonplaceholder.typicode.com/todos/1').subscribe(data => {
//       console.log(data);
//     });
//   }
// }
export class AppComponent {
  title = 'angular-psicologia';
}