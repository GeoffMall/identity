import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MdAutocompleteModule, MdButtonModule, MdButtonToggleModule, MdCardModule, MdCheckboxModule, MdChipsModule,
  MdDialogModule, MdGridListModule, MdIconModule, MdInputModule, MdListModule, MdMenuModule, MdProgressBarModule,
  MdProgressSpinnerModule, MdRadioModule, MdSelectModule, MdSidenavModule, MdSliderModule, MdSlideToggleModule,
  MdSnackBarModule, MdTabsModule, MdToolbarModule, MdTooltipModule
} from '@angular/material';
import {MdDataTableModule} from "ng2-md-datatable";

@NgModule({
  imports: [
    CommonModule,

    // Form Control
    MdAutocompleteModule,
    MdCheckboxModule,
    MdInputModule,
    MdRadioModule,
    MdSelectModule,
    MdSliderModule,
    MdSlideToggleModule,

    // Navigation
    MdMenuModule,
    MdSidenavModule,
    MdToolbarModule,

    // Layout
    MdListModule,
    MdGridListModule,
    MdCardModule,
    MdTabsModule,

    // Buttons, Indicators & Icons
    MdButtonModule,
    MdButtonToggleModule,
    MdChipsModule,
    MdIconModule,
    MdProgressSpinnerModule,
    MdProgressBarModule,

    // Popups & Modals
    MdDialogModule,
    MdTooltipModule,
    MdSnackBarModule,

    MdDataTableModule
  ],
  exports: [
    // Form Control
    MdAutocompleteModule,
    MdCheckboxModule,
    MdInputModule,
    MdRadioModule,
    MdSelectModule,
    MdSliderModule,
    MdSlideToggleModule,

    // Navigation
    MdMenuModule,
    MdSidenavModule,
    MdToolbarModule,

    // Layout
    MdListModule,
    MdGridListModule,
    MdCardModule,
    MdTabsModule,

    // Buttons, Indicators & Icons
    MdButtonModule,
    MdButtonToggleModule,
    MdChipsModule,
    MdIconModule,
    MdProgressSpinnerModule,
    MdProgressBarModule,

    // Popups & Modals
    MdDialogModule,
    MdTooltipModule,
    MdSnackBarModule,

    MdDataTableModule
    ]
})
export class MaterialModule { }
