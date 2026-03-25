import {Component, EventEmitter, NgZone, Output} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ButtonModule} from "primeng/button";
import {Card} from "primeng/card";

@Component({
    selector: "app-vehicle-image-upload",
    imports: [CommonModule, ButtonModule, Card],
    templateUrl: "./vehicle-image-upload.component.html",
    styleUrl: "./vehicle-image-upload.component.css",
})
export class VehicleImageUploadComponent {
    imageUrl?: string;
    selectedFile?: File;

    @Output() confirmed = new EventEmitter<File>();

    constructor(private ngZone: NgZone) {
    }

    onFileSelect(event: any) {
        const file = event.target.files?.[0];
        if (!file) return;

        if (!file.type.startsWith('image/')) {
            alert('Only image files are allowed!');
            return;
        }

        // Reset input so same file can be selected again
        event.target.value = null;
        event.target.blur();

        this.selectedFile = file;

        // Cleanup old preview
        if (this.imageUrl) {
            URL.revokeObjectURL(this.imageUrl);
        }

        this.imageUrl = URL.createObjectURL(file);
    }

    confirmUpload() {
        if (this.selectedFile) {
            this.confirmed.emit(this.selectedFile);
        }
    }

    cancel() {
        if (this.imageUrl) {
            URL.revokeObjectURL(this.imageUrl);
        }

        this.imageUrl = undefined;
        this.selectedFile = undefined;
    }

}
