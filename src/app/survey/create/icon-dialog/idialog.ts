import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NgxImageCompressService } from 'ngx-image-compress';
import { SurveyQuestionService } from 'src/app/shared/survey/survey.question.service';

@Component({
    templateUrl: './idialog.html',
    styleUrls: ['./idialog.css']
})
export class DialogIcon {
    urlpicLogo: any;
    iImg: number = 1;

    constructor(
        private dialogRef: MatDialogRef<DialogIcon>,
        @Inject(MAT_DIALOG_DATA) public data: number,
        private imageCompress: NgxImageCompressService,
        private surveyservice: SurveyQuestionService) { }

    b64toBlob(dataURI) {
        const byteString = atob(dataURI.split(',')[1]);
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);

        for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        return new Blob([ab], { type: 'image/jpeg' });
    }

    addPictureLogo() {
        this.imageCompress.uploadFile().then(({ image, orientation }) => {

            this.imageCompress.compressFile(image, orientation, 50, 50).then(
                result => {
                    const blob = this.b64toBlob(result);
                    this.surveyservice.uploadImage(blob, this.data + '-ImageLogo' + '(' + this.iImg + ')').subscribe(
                        (resquestion) => {
                            console.log('ini yg dikirim', resquestion);
                            this.dialogRef.close({
                                logo: {
                                    imgL: resquestion.path,
                                    imgI: result
                                }
                            });
                        },
                        (err) => {
                            console.log(err);
                        });
                }
            );
        });
        this.iImg++;
    }

    confirmSelection1() {
        this.dialogRef.close({
            logo: {
                selectedLogo: 'assets/icon/Animal1.svg'
            }
        });
    }
    confirmSelection2() {
        this.dialogRef.close({
            logo: {
                selectedLogo: 'assets/icon/Animal2.svg'
            }
        });
    }
    confirmSelection3() {
        this.dialogRef.close({
            logo: {
                selectedLogo: 'assets/icon/Animal3.svg'
            }
        });
    }
    confirmSelection4() {
        this.dialogRef.close({
            logo: {
                selectedLogo: 'assets/icon/Animal4.svg'
            }
        });
    }
    confirmSelection5() {
        this.dialogRef.close({
            logo: {
                selectedLogo: 'assets/icon/Face1.svg'
            }
        });
    }
    confirmSelection6() {
        this.dialogRef.close({
            logo: {
                selectedLogo: 'assets/icon/Face2.svg'
            }
        });
    }
    confirmSelection7() {
        this.dialogRef.close({
            logo: {
                selectedLogo: 'assets/icon/Face3.svg'
            }
        });
    }
    confirmSelection8() {
        this.dialogRef.close({
            logo: {
                selectedLogo: 'assets/icon/File1.svg'
            }
        });
    }
    confirmSelection9() {
        this.dialogRef.close({
            logo: {
                selectedLogo: 'assets/icon/File2.svg'
            }
        });
    }
    confirmSelection10() {
        this.dialogRef.close({
            logo: {
                selectedLogo: 'assets/icon/File3.svg'
            }
        });
    }
    confirmSelection11() {
        this.dialogRef.close({
            logo: {
                selectedLogo: 'assets/icon/File4.svg'
            }
        });
    }
    confirmSelection12() {
        this.dialogRef.close({
            logo: {
                selectedLogo: 'assets/icon/Food1.svg'
            }
        });
    }
    confirmSelection13() {
        this.dialogRef.close({
            logo: {
                selectedLogo: 'assets/icon/Food2.svg'
            }
        });
    }
    confirmSelection14() {
        this.dialogRef.close({
            logo: {
                selectedLogo: 'assets/icon/Food3.svg'
            }
        });
    }
    confirmSelection15() {
        this.dialogRef.close({
            logo: {
                selectedLogo: 'assets/icon/Food4.svg'
            }
        });
    }
    confirmSelection16() {
        this.dialogRef.close({
            logo: {
                selectedLogo: 'assets/icon/Food5.svg'
            }
        });
    }
    confirmSelection17() {
        this.dialogRef.close({
            logo: {
                selectedLogo: 'assets/icon/Food7.svg'
            }
        });
    }
    confirmSelection18() {
        this.dialogRef.close({
            logo: {
                selectedLogo: 'assets/icon/Food8.svg'
            }
        });
    }
    confirmSelection19() {
        this.dialogRef.close({
            logo: {
                selectedLogo: 'assets/icon/Stuff4.svg'
            }
        });
    }
    confirmSelection20() {
        this.dialogRef.close({
            logo: {
                selectedLogo: 'assets/icon/Place1.svg'
            }
        });
    }
    confirmSelection21() {
        this.dialogRef.close({
            logo: {
                selectedLogo: 'assets/icon/Place2.svg'
            }
        });
    }
    confirmSelection22() {
        this.dialogRef.close({
            logo: {
                selectedLogo: 'assets/icon/Stuff1.svg'
            }
        });
    }
    confirmSelection23() {
        this.dialogRef.close({
            logo: {
                selectedLogo: 'assets/icon/Stuff2.svg'
            }
        });
    }
    confirmSelection24() {
        this.dialogRef.close({
            logo: {
                selectedLogo: 'assets/icon/Stuff3.svg'
            }
        });
    }

    confirmSelection25() {
        this.dialogRef.close({
            logo: {
                selectedLogo: 'assets/icon/Food6.svg'
            }
        });
    }

    confirmSelection26() {
        this.dialogRef.close({
            logo: {
                selectedLogo: 'assets/icon/Food9.svg'
            }
        });
    }

}