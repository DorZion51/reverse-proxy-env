import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EnvService } from '../enviroment-vars/env.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'frontend';

  constructor(private envService: EnvService) {}


  ngOnInit(): void {
    this.envService.loadEnv().then(() => {
      // Now you have access to environment variables
      console.log('API URL:', this.envService.getEnvVar('API_URL'));
      console.log('WALLET_ADDRESS:', this.envService.getEnvVar('WALLET_ADDRESS'));
    });
  }

}
