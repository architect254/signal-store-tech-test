import { DecimalPipe } from "@angular/common";
import { Component, inject } from "@angular/core";
import { BoxComponent } from "../components/box";
import { OptionSelectorComponent } from "../components/option-selector";
import { SelectionStore } from "../store/selection.store";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [BoxComponent, OptionSelectorComponent, DecimalPipe],
  template: `
    <div class="dashboard">
      <div class="top-bar">
        <div class="total-score">
          <small> TOTAL</small>
          <h1>{{ store.total() | number:'1.2-2' }}</h1>
        </div>
        <button (click)="store.reset()" class="reset-btn">RESET</button>
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
    .dashboard { 
      padding: 15px; 
      max-width: 1400px; 
      margin: 0 auto; 
      font-family: 'Segoe UI', sans-serif; 
    }
    
    .top-bar { 
      display: flex; 
      justify-content: space-between; 
      align-items: flex-end; 
      margin-bottom: 24px;
      padding-bottom: 10px;
      border-bottom: 2px solid #f0f0f0;
    }
    
    .total-score small { color: #888; letter-spacing: 1px; }
    .total-score h1 { margin: 0; font-size: clamp(2rem, 5vw, 3.5rem); color: #2c3e50; line-height: 1; }
    
    .boxes-container {
      display: grid;
      /* Default: 10 columns for desktop */
      grid-template-columns: repeat(10, 1fr);
      gap: 10px;
      margin-bottom: 30px;
    }

    .reset-btn { 
      background: #ff4757; 
      color: white; 
      border: none; 
      padding: 12px 24px; 
      border-radius: 6px; 
      cursor: pointer; 
      font-weight: bold;
      transition: transform 0.1s;
    }
    .reset-btn:active { transform: scale(0.95); }

    /* Responsive Breakpoints */
    @media (max-width: 1200px) {
      .boxes-container { grid-template-columns: repeat(5, 1fr); }
    }
    
    @media (max-width: 600px) {
      .boxes-container { grid-template-columns: repeat(2, 1fr); }
      .top-bar { flex-direction: column; align-items: flex-start; gap: 15px; }
      .reset-btn { width: 100%; }
    }
  `]
})
export class DashboardComponent {
  store = inject(SelectionStore);
}