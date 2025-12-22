import { ChangeDetectionStrategy, Component, signal } from "@angular/core";
import { DashboardComponent } from "./features/selection/dashboard/dashboard";

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DashboardComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('signal-store-tech-test');

}
