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
            {{ selection()?.optionValue | number:'1.1-1' }}
          }
        </span>
        <span class="box-segment"></span>
      </div>
    </div>
  `,
  styles: [`
    .box {
      border: 1px solid #ddd;
      height: 174px;
      padding: 0; 
      cursor: pointer;
      position: relative;
      background-color: white;
      overflow: hidden;
    }

    .box:hover { background-color: #f9f9f9; }

    .box.active { background-color: rgba(172, 255, 47, 0.3); }

    .box-id-wrapper {
      position: absolute;
      top: 0;
      left: 0;
      background-color: #eee;
      width: 100%;
      height: 24px;
      z-index: 1;
    }

    .box.active .box-id-wrapper { background-color: rgba(172, 255, 47, 0.5); }

    .box-id {
      position: absolute;
      top: 0px;
      left: 0;
      padding: 0 6px;
      background: white;
      font-size: 11px;
      font-weight: bold;
    }

    .selected-option {
      /* Fluid typography: Min 40px, Scales with width, Max 74px */
      font-size: clamp(40px, 6vw, 74px); 
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -55%); 
      font-weight: 800;
      color: #2c3e50;
    }

    .placeholder {
      position: absolute;
      top: 50%;
      left: 0;
      width: 100%;
      transform: translateY(-50%);
      color: #bdc3c7;
      font-size: 0.8rem;
      text-align: center;
      text-transform: uppercase;
      padding: 0 5px;
    }

    .bottom-wrapper {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      display: flex;
      gap: 1px;
    }

    .box-segment {
      height: 24px;
      background-color: #eee;
      flex: 1; 
      text-align: center;
      line-height: 24px; 
      font-size: 11px;
      color: #7f8c8d;
    }

    .box.active .box-segment {
      background-color: rgba(172, 255, 47, 0.5);
      color: #2c3e50;
    }
  `]
})
export class BoxComponent {
  boxId = input.required<number>();
  store = inject(SelectionStore);
  optionsService = inject(OptionsService);

  selection = computed(() => this.store.getSelectionForBox(this.boxId()));
  isActive = computed(() => this.store.activeBoxId() === this.boxId());
}