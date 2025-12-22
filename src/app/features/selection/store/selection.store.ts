import { computed, inject } from '@angular/core';
import { signalStore, withState, withComputed, withMethods, patchState } from '@ngrx/signals';
import { OptionsService } from '../../../core/services/options';
import { BoxSelection, Option } from '../../../shared/models/selection.models';

interface SelectionState {
    selections: BoxSelection[];
    activeBoxId: number | null;
}

const initialState: SelectionState = {
    selections: JSON.parse(localStorage.getItem('gym-data') || '[]'),
    activeBoxId: null,
};

export const SelectionStore = signalStore(
    { providedIn: 'root' },
    withState<SelectionState>(initialState),

    withComputed((store, optionsService = inject(OptionsService)) => {
        const optionsMap = optionsService.getOptionsMap();

        return {
            total: computed(() =>
                store.selections().reduce((acc, s) => {
                    const val = s.optionLabel ? optionsMap.get(s.optionLabel)?.value ?? 0 : 0;
                    return acc + val;
                }, 0)
            )
        };
    }),

    withMethods((store) => ({
        getSelectionForBox(id: number) {
            return store.selections().find(s => s.boxId === id);
        },

        setActiveBox(id: number | null): void {
            patchState(store, { activeBoxId: id });
        },

        updateSelection(boxId: number, label: string): void {
            const updated = store.selections().map(s =>
                s.boxId === boxId ? { ...s, optionLabel: label } : s
            );

            patchState(store, { selections: updated });
            localStorage.setItem('gym-data', JSON.stringify(updated));

            if (boxId < 10) patchState(store, { activeBoxId: boxId + 1 });
        },

        getBoxSubtotal(boxId: number, optionsMap: Map<string, Option>) {
            return computed(() => {
                return store.selections()
                    .filter(s => s.boxId <= boxId)
                    .reduce((acc, s) => {
                        const val = s.optionLabel ? optionsMap.get(s.optionLabel)?.value ?? 0 : 0;
                        return acc + val;
                    }, 0);
            });
        },

        reset(): void {
            const empty = Array.from({ length: 10 }, (_, i) => ({
                boxId: i + 1, optionLabel: null
            })) as BoxSelection[];

            patchState(store, { selections: empty, activeBoxId: null });
            localStorage.setItem('gym-data', JSON.stringify(empty));
        }
    }))
);