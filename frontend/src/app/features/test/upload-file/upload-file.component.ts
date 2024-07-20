import { Component } from '@angular/core';
import { S3Service } from '../../../services/s3.service';

@Component({
  selector: 'app-upload-file',
  standalone: true,
  imports: [],
  templateUrl: './upload-file.component.html',
  styleUrl: './upload-file.component.css'
})
export class UploadFileComponent {
  status: "initial" | "uploading" | "success" | "fail" = "initial";
  file?: File | null;
  limit = {
    types: ['image/jpeg', 'images/png'],
    size: 1 * 1024 * 1024,
  }
  imageUrl: string | ArrayBuffer | null = null;

  constructor(private s3Service: S3Service) {
    this.s3Service.assumeRole().subscribe();
  }

  changeUpload(event: Event) {
    if (event.target) {
      const input = event.target as HTMLInputElement;
      if (input.files && input.files[0]) {
        const file: File = input.files[0];
        console.log(file);
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e) => {
          this.imageUrl = e.target!.result;
        }
      }
    }
  }

  onUpload() {

  }
}
