import { DecimalPipe } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { BoxComponent } from "../components/box";
import { SelectionStore } from "../store/selection.store";
import { OptionSelectorComponent } from "../components/option-selector";

@Component({
    selector: 'app-dashboard',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [BoxComponent, OptionSelectorComponent, DecimalPipe],
    template: `
    <div class="dashboard">
      <div class="top-bar">
        <div class="total-score">
          <small>TOTAL</small>
          <h1>{{ store.total() | number:'1.1-1' }}</h1>
        </div>
        <button (click)="store.reset()" class="reset-btn">Reset</button>
      </div>

      <div class="boxes-container">
        @for (s of store.selections(); track s.boxId) {
          <app-box [boxId]="s.boxId" />
        }
      </div>

      <app-option-selector />
    </div>
  `,
    styles: [`
    .dashboard { padding: 20px; font-family: sans-serif; }
    .top-bar { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
    .total-score h1 { margin: 0; font-size: 3rem; color: #333; }
    .boxes-container {
      display: grid;
      grid-template-columns: repeat(10, 1fr);
      gap: 8px;
      margin-bottom: 30px;
    }
    .reset-btn { background: #e74c3c; color: white; border: none; padding: 10px 20px; border-radius: 4px; cursor: pointer; }
    @media (max-width: 800px) { .boxes-container { grid-template-columns: repeat(5, 1fr); } }
  `]
})
export class DashboardComponent {
    store = inject(SelectionStore);
}