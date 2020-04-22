import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShipmentService } from './services/shipment.service';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        FormsModule

    ],
    declarations: [

    ],
    exports: [
        CommonModule,
        FormsModule
    ],
    providers: [
        // ShipmentService
    ]
})
export class SharedModule {}