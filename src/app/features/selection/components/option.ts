import { Component, input, inject, computed, ChangeDetectionStrategy } from "@angular/core";
import { SelectionStore } from "../store/selection.store";
import { Option } from '../../../shared/models/selection.models'

@Component({
    selector: 'app-option',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <div class="option" 
         [class.selected]="isSelected()" 
         [attr.data-tooltip]="option().value"
         (click)="store.updateSelection(boxId(), option().label)">
      {{ option().label }}
    </div>
  `,
    styles: [`
    .option {
      background: white;
      border: 1px solid #ddd;
      padding: 10px 5px;
      text-align: center;
      font-weight: bold;
      cursor: pointer;
      position: relative;
    }
    .option.selected { background: #2c3e50; color: white; }
    .option:hover::after {
      content: 'Val: ' attr(data-tooltip);
      position: absolute; bottom: 110%; left: 50%; transform: translateX(-50%);
      background: #333; color: #fff; padding: 4px 8px; border-radius: 4px;
      font-size: 10px; white-space: nowrap; z-index: 100; pointer-events: none;
    }
  `]
})
export class OptionComponent {
    option = input.required<Option>();
    boxId = input.required<number>();

    store = inject(SelectionStore);

    isSelected = computed(() => this.store.getSelectionForBox(this.boxId())?.optionLabel === this.option().label);
}