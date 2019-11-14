import { Component, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ImageCroppedEvent, ImageCropperComponent } from 'ngx-image-cropper';
import { SurveyQuestionService } from 'src/app/shared/survey/survey.question.service';
import { Font, FontInterface } from 'ngx-font-picker';

export interface DialogData {
    idSurvey: number;
    ColorH: string;
    ColorB: string;
    imgHeader: string;
    imgHead: string;
    Font: string;
}
export class ImageSnippet {
    constructor(public src: string, public file: File) { }
}
@Component({
    templateUrl: './picker.html',
    styleUrls: ['./picker.css']
})
// tslint:disable-next-line: component-class-suffix
export class MyDialogColor {
    imageChangedEvent: any = '';
    croppedImage: any;
    urlpicHeader: any;
    showCropper = false;
    datas: any;
    selectedFile: ImageSnippet;
    iImg: number = 1;
    presetFonts = ['Arial', 'Times', 'Courier', 'Lato', 'Open Sans', 'Roboto Slab'];
    font: Font = new Font({
        family: 'Roboto'
    });

    constructor(
        private dialogRef: MatDialogRef<MyDialogColor>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData,
        private surveyservice: SurveyQuestionService) { }
    @ViewChild(ImageCropperComponent) imageCropper: ImageCropperComponent;

    public fontPick = this.presetFonts;
    fontPickerChange(event: FontInterface): void {
        this.font.family = event.family;
        this.dialogRef.close({
            data: {
                idSurvey: this.data.idSurvey,
                imgH: this.data.imgHeader,
                imgHead: this.data.imgHead,
                font: this.font.family,
                header: this.data.ColorH,
                body: this.data.ColorB
            }
        });
        console.log('tes', event.family);
    }

    b64toBlob(dataURI) {
        const byteString = atob(dataURI.split(',')[1]);
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);

        for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        return new Blob([ab], { type: 'image/jpeg' });
    }

    processFile(imageInput: any) {
        const file: File = imageInput.files[0];
        const reader = new FileReader();
        console.log(imageInput);

        reader.addEventListener('load', (event: any) => {
            this.selectedFile = new ImageSnippet(event.target.result, file);
        });
        reader.readAsDataURL(file);
    }

    imageCropped(event: ImageCroppedEvent) {
        this.croppedImage = event.base64;
        console.log(this.croppedImage);
    }

    submit() {
        const blob = this.b64toBlob(this.croppedImage);
        this.surveyservice.uploadImage(blob, this.data.idSurvey + '-ImageHeader' + '(' + this.iImg + ')').subscribe(
            (resquestion) => {
                this.dialogRef.close({
                    data: {
                        imgH: resquestion.path,
                        font: this.data.Font,
                        body: this.data.ColorB,
                        imgHead: this.croppedImage
                    }
                });
            },
            (err) => {
                console.log(err);
            });
        this.iImg++;
    }

    imageLoaded() {
        this.showCropper = true;
        // show cropper
    }

    confirmSelection1() {
        this.dialogRef.close({
            data: {
                font: this.data.Font,
                header: '#505980',
                body: this.data.ColorB
            }
        });
    }
    confirmSelection2() {
        this.dialogRef.close({
            data: {
                font: this.data.Font,
                header: '#3D5174',
                body: this.data.ColorB
            }
        });
    }
    confirmSelection3() {
        this.dialogRef.close({
            data: {
                font: this.data.Font,
                header: '#555DA6',
                body: this.data.ColorB
            }
        });
    }
    confirmSelection4() {
        this.dialogRef.close({
            data: {
                font: this.data.Font,
                header: '#594A71',
                body: this.data.ColorB
            }
        });
    }
    confirmSelection5() {
        this.dialogRef.close({
            data: {
                font: this.data.Font,
                header: '#C5B3CB',
                body: this.data.ColorB
            }
        });
    }
    confirmSelection6() {
        this.dialogRef.close({
            data: {
                imgH: this.data.imgHeader,
                imgHead: this.data.imgHead,
                font: this.data.Font,
                header: this.data.ColorH,
                body: '#eeeef2'
            }
        });
    }
    confirmSelection7() {
        this.dialogRef.close({
            data: {
                imgH: this.data.imgHeader,
                imgHead: this.data.imgHead,
                font: this.data.Font,
                header: this.data.ColorH,
                body: '#D8DDE3'
            }
        });
    }
    confirmSelection8() {
        this.dialogRef.close({
            data: {
                imgH: this.data.imgHeader,
                imgHead: this.data.imgHead,
                font: this.data.Font,
                header: this.data.ColorH,
                body: '#C6CAD6'
            }
        });
    }
    confirmSelection9() {
        this.dialogRef.close({
            data: {
                imgH: this.data.imgHeader,
                imgHead: this.data.imgHead,
                font: this.data.Font,
                header: this.data.ColorH,
                body: '#F6F6F6'
            }
        });
    }
    confirmSelection10() {
        this.dialogRef.close({
            data: {
                imgH: this.data.imgHeader,
                imgHead: this.data.imgHead,
                font: this.data.Font,
                header: this.data.ColorH,
                body: '#E1D3E5'
            }
        });
    }

    public onEventLogH(event: string, data: any): void {
        this.dialogRef.close({
            data: {
                font: this.data.Font,
                header: data,
                body: this.data.ColorB
            }
        });
    }

    public onEventLogB(event: string, data: any): void {
        this.dialogRef.close({
            data: {
                imgH: this.data.imgHeader,
                imgHead: this.data.imgHead,
                font: this.data.Font,
                header: this.data.ColorH,
                body: data
            }
        });
    }
}
