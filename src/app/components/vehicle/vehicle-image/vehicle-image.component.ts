import {Component, EventEmitter, Input, OnChanges, OnDestroy, Output} from "@angular/core";
import {CommonModule} from "@angular/common";
import {Card} from "primeng/card";
import {ButtonDirective} from "primeng/button";

@Component({
  selector: "app-vehicle-image",
  imports: [CommonModule, Card, ButtonDirective],
  templateUrl: "./vehicle-image.component.html",
  styleUrl: "./vehicle-image.component.css",
})
export class VehicleImageComponent implements OnChanges, OnDestroy {
  @Input() blob?: Blob;
  @Output() cleared = new EventEmitter<any>();

  imageUrl?: string;

  ngOnChanges() {
    if (this.blob) {
      // Clean up old URL
      if (this.imageUrl) {
        URL.revokeObjectURL(this.imageUrl);
      }

      this.imageUrl = URL.createObjectURL(this.blob);
    }
  }

  ngOnDestroy() {
    if (this.imageUrl) {
      URL.revokeObjectURL(this.imageUrl);
    }
  }

  clearPhoto() {
    if (this.imageUrl) {
      URL.revokeObjectURL(this.imageUrl);
    }

    this.cleared.emit(this.imageUrl);
    this.imageUrl = undefined;
  }
}
