import { Component, input, inject, computed, ChangeDetectionStrategy } from "@angular/core";
import { SelectionStore } from "../store/selection.store";
import { OptionsService } from "../../../core/services/options";
import { DecimalPipe } from "@angular/common";

@Component({
    selector: 'app-box',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [DecimalPipe],
    template: `
    <div class="box" [class.active]="isActive()" (click)="store.setActiveBox(boxId())">
      <div class="box-id-wrapper"> 
        <span class="box-id">{{ boxId() }}</span>
      </div>

      @if (selection(); as selection) {
        @if (selection.optionLabel) {
          <div class="selected-option">
            {{ selection.optionLabel }}
          </div>
        } @else {
          <div class="placeholder">Select element</div>
        }
      }

      <div class="bottom-wrapper">
        <span class="box-segment"></span>
        <span class="box-segment">
          @if (selection()?.optionLabel) {
            {{ subtotal() | number:'1.1-1' }}
          }
        </span>
        <span class="box-segment"></span>
      </div>
    </div>
  `,
    styles: [`
    .box {
      border: 1px solid rgba(255, 255, 255, 0.507);
      height: 174px;
      padding: 0 12px;
      cursor: pointer;
      position: relative;
      background-color: white; 
    }

    .box:hover { background-color: #eee; }

    .box.active { background-color: rgba(172, 255, 47, 0.349); }

    .box-id-wrapper {
      position: absolute;
      top: 0;
      left: 0;
      background-color: #eee;
      width: 100%;
      height: 24px;
    }

    .box.active .box-id-wrapper { background-color: rgba(172, 255, 47, 0.349); }

    .box-id {
      position: absolute;
      top: 0px;
      left: 0;
      padding: 0 4px;
      background: white;
      font-size: 12px;
      font-weight: bold;
    }

    .selected-option {
      font-size: 74px;
      position: absolute;
      top: 10%;
      left: 8%;
      font-weight: bold;
    }

    .placeholder {
      position: relative;
      top: 40%;
      color: #999;
      font-size: 14px;
      text-align: center;
    }

    .bottom-wrapper {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      display: flex;
      justify-content: space-evenly;
      gap: 1px;
    }

    .box-segment {
      height: 24px;
      background-color: #eee;
      width: 100%;
      text-align: center;
      line-height: 24px; 
      font-size: 12px;
    }

    .box.active .box-segment {
      background-color: rgba(172, 255, 47, 0.349);
    }
  `]
})
export class BoxComponent {
    boxId = input.required<number>();

    store = inject(SelectionStore);

    selection = computed(() => this.store.getSelectionForBox(this.boxId()));

    isActive = computed(() => this.store.activeBoxId() === this.boxId());

    optionsService = inject(OptionsService);

    subtotal = computed(() => {
        const optionsMap = this.optionsService.getOptionsMap();
        return this.store.selections()
            .filter(s => s.boxId <= this.boxId())
            .reduce((acc, s) => {
                const val = s.optionLabel ? optionsMap.get(s.optionLabel)?.value ?? 0 : 0;
                return acc + val;
            }, 0);
    });
}