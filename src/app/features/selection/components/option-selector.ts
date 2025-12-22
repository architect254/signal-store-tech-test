import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { OptionsService } from "../../../core/services/options";
import { SelectionStore } from "../store/selection.store";
import { OptionComponent } from "./option";

@Component({
  selector: 'app-option-selector',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [OptionComponent],
  template: `
    @if (store.activeBoxId(); as activeId) {
      <div class="selector-wrapper">
        <div class="groups-layout">
          @for (group of groups; track group.category) {
            <div class="category-section">
              <h3 class="category-title">{{ group.category }}</h3>
              <div class="options-grid">
                @for (opt of group.options; track opt.label) {
                  <app-option [option]="opt" [boxId]="activeId" />
                }
              </div>
            </div>
          }
        </div>
      </div>
    }
  `,
  styles: [`
    .selector-wrapper {
      margin-top: 20px;
      padding: 20px;
      background: #f9f9f9;
      border: 1px solid #ddd;
      border-radius: 8px;
      animation: slideUp 0.2s ease-out;
    }

    .groups-layout {
      display: flex;
      flex-wrap: wrap;
      gap: 30px;
      justify-content: flex-start;
    }

    .category-section {
      flex: 1;
      min-width: 200px;
    }

    .category-title {
      font-size: 0.9rem;
      color: #3498db;
      text-transform: lowercase;
      border-bottom: 2px solid #3498db;
      padding-bottom: 5px;
      margin-bottom: 15px;
      font-weight: 600;
    }

    .options-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(60px, 1fr));
      gap: 6px;
    }

    @keyframes slideUp {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }

    /* Mobile responsiveness */
    @media (max-width: 600px) {
      .groups-layout { flex-direction: column; }
    }
  `]
})
export class OptionSelectorComponent {
  readonly store = inject(SelectionStore);
  readonly groups = inject(OptionsService).groups();
}