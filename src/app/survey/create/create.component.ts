import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormControl, NgForm, Validators } from '@angular/forms';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { SurveyQuestionService } from 'src/app/shared/survey/survey.question.service';
import { _MatInputMixinBase, MatDialog } from '@angular/material';
import { PublishComponent } from './publish/publish.component';
import { debounceTime } from 'rxjs/operators';
import { DialogIcon } from './icon-dialog/idialog';
import { MyDialogColor } from './color-image-picker/picker';
import { NgxImageCompressService } from 'ngx-image-compress';
import { AuthentificationService } from 'src/app/auth';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  idSurvey: number;
  username: string;
  formGroup: FormGroup;
  title = '';
  url = '';
  firstV = '0';
  secondV = '5';
  selected: string;
  titledesc = 'td';
  iImagePage = 0;
  iImageQuestion = 0;
  iImageValue = 0;
  photo: any;
  option = [
    { icon: 'sort', teks: 'Short Answer', nilai: 'SHORT_ANSWER' },
    { icon: 'subject', teks: 'Long Answer', nilai: 'LONG_ANSWER' },
    { icon: 'radio_button_checked', teks: 'Multiple Choice', nilai: 'MULTIPLE' },
    { icon: 'check_box', teks: 'Checkboxes', nilai: 'CHECKBOX' },
    { icon: 'arrow_drop_down_circle', teks: 'Dropdown', nilai: 'DROPDOWN' },
    { icon: 'cloud_upload', teks: 'File Upload', nilai: 'FILE_UPLOAD' },
    { icon: 'linear_scale', teks: 'Linear Scale', nilai: 'LINEAR_SCALE' },
    { icon: 'more_vert', teks: 'Multiple choice grid', nilai: 'MULTI_CHOICE_MULTI' },
    { icon: 'apps', teks: 'Checkbox grid', nilai: 'CHECKBOX_GRID' },
    { icon: 'insert_invitation', teks: 'Date', nilai: 'DATE_TYPE' },
    { icon: 'access_time', teks: 'Time', nilai: 'TIME_TYPE' },
    { icon: 'insert_emoticon', teks: 'Emoji', nilai: 'EMOJI_TYPE' }
  ];

  numberOption = [
    {value: 'GT', viewValue: 'Greater than'},
    {value: 'GTET', viewValue: 'Greater than or equal to'},
    {value: 'LT', viewValue: 'Less than'},
    {value: 'LTET', viewValue: 'Less than or equal to'},
    {value: 'ET', viewValue: 'Equal to'},
    {value: 'NET', viewValue: 'Not equal to'},
    {value: 'B', viewValue: 'Between'},
    {value: 'NB', viewValue: 'Not between'},
    {value: 'IS', viewValue: 'Is number'},
    {value: 'WN', viewValue: 'Whole number'}
  ];

  textOption = [
    {value: 'C', viewValue: 'Contains'},
    {value: 'DC', viewValue: 'Doesnt contains'},
    {value: 'EA', viewValue: 'Email address'},
    {value: 'URL', viewValue: 'URL'}
  ];

  lengthOption = [
    {value:'MAX', viewValue:'Maximum character count'},
    {value:'MIN', viewValue:'Minimum character count'}
  ];

  selectedColor = '';
  selectedLogo = '';
  urlpicQ = '';
  urlpicValue = '';
  Font: string;
  ColorH: string;
  ColorB: string;
  fontColor: string;
  imgHeader: string;
  imgIcon: string;
  imgHead: string;
  imgI: string;
  imgResultBeforeCompress: string;
  imgResultAfterCompress: string;
  maxTitle = 20;
  maxQtitle = 30;

  constructor(
    private serviceSurvey: SurveyQuestionService,
    private serviceAuth: AuthentificationService,
    public dialog: MatDialog,
    private imageCompress: NgxImageCompressService,
  ) {
  }

  ngOnInit() {
    this.serviceSurvey.getSurveyId().subscribe(
      data => {
        this.idSurvey = data;
      }
    );
    this.serviceAuth.getUser().subscribe(
      res => {
        this.username = res;
      }
    );
    this.section();

    this.formGroup.valueChanges
      .pipe(debounceTime(2000))
      .subscribe(() => {
        if (this.formGroup.valid) {
          this.serviceSurvey.create(this.formGroup.value).subscribe(
            res => console.log('create : ', res)
          );
        }
      });
  }

  getContrastYIQ(hexcolor) {
    hexcolor = hexcolor.replace('#', '');
    const r = parseInt(hexcolor.substr(0, 2), 16);
    const g = parseInt(hexcolor.substr(2, 2), 16);
    const b = parseInt(hexcolor.substr(4, 2), 16);
    const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
    return (yiq >= 128) ? '#4F4F4F' : 'white';
  }

  setMyStyles() {
    const styles = {
      color: this.fontColor
    };
    return styles;
  }

  function($scope) {
  $scope.question = [];
  $scope.activeMenu = $scope.question[0];

  $scope.setActive = (question) => {
    $scope.activeMenu = question;
  };
  }

  openDialogColor() {
    const dialog = this.dialog.open(MyDialogColor, {
      width: '220px',
      panelClass: 'dialog-color',
      position: {
        top: '20px',
        right: '180px'
      },
      data: {
        idSurvey: this.idSurvey,
        Font: this.Font,
        ColorH: this.ColorH,
        ColorB: this.ColorB,
        imgHeader: this.imgHeader,
        imgHead: this.imgHead
      }
    });

    dialog.afterClosed()
      .subscribe(data => {
        this.Font = data.data.font;
        this.ColorH = data.data.header;
        this.ColorB = data.data.body;
        this.imgHeader = data.data.imgH;
        this.imgHead = data.data.imgHead;
        this.fontColor = this.getContrastYIQ(this.ColorH);
      });
  }

  openDialogLogo() {
    const dialog = this.dialog.open(DialogIcon, {
      width: '450px',
      panelClass: 'dialog-logo',
      position: {
        top: '100px',
        left: '170px'
      },
      data: this.idSurvey
    });

    dialog.afterClosed()
      .subscribe(logo => {
        // Jika gak keluar artinya ada variabel data yg salah seperti logo.logo data.data
        this.imgIcon = logo.logo.imgL;
        this.selectedLogo = logo.logo.selectedLogo;
        this.imgI = logo.logo.imgI;
      });
  }

  /* Build Form Group Start */
  get form() { return this.formGroup.controls; }

  public section(): void {
    this.formGroup = new FormGroup({
      idSurvey: new FormControl(this.idSurvey),
      idUser: new FormControl(this.username),
      publishStatus: new FormControl(false, []),      
      fontPicker: new FormControl(null),
      colorHeader: new FormControl(null),
      colorBg: new FormControl(null),
      imgHeader: new FormControl(null),
      icon: new FormControl(null),
      imgIcon: new FormControl(null),
      pages: new FormArray([
        this.initpages()
      ])
    });
  }

  public initpages(): FormGroup {
    return new FormGroup({
      id: new FormControl(null),
      title: new FormControl(null, Validators.maxLength(this.maxTitle)),
      desc: new FormControl(null),
      questions: new FormArray([
        this.initquestions()
      ])
    });
  }

  public initquestions(): FormGroup {
    return new FormGroup({
      id: new FormControl(null),
      question: new FormControl(null),
      description: new FormControl(null),
      questionType: new FormControl(null),
      imgPage: new FormControl(null),
      imgQuestion: new FormControl(null),
      requiredValue: new FormControl(false, []),
      validateStatus: new FormControl(false),
      // validate: this.initValidate(),
      //diganti yusro
      validateType: new FormControl(null),
      validateSetting: new FormControl(null),
      validateValue: new FormControl(null),
      values: new FormArray([
        this.initValue(0)
      ])
    });
  }

  //ini juga
  // public initValidate(){
  //   return new FormGroup({
  //     validateType: new FormControl(null),
  //     validateSetting: new FormControl(null),
  //     validateValue: new FormControl(null)
  //   })
  // }

  public initValue(i): FormGroup {
    const valuesVal: string = 'Option ' + i;
    return new FormGroup({
      id: new FormControl(null),
      values: new FormControl(valuesVal),
      checked: new FormControl(false),
      imgValue: new FormControl(null)
    });
  }

  public getpages(i): string{
    const control = this.form.pages as FormArray;
   if(control.value[i].title != null){
    if(control.value[i].title.length > this.maxTitle){
      return "Title can't more than " + this.maxTitle + " characters"
    }
   }
  } 

  public getQuestion(info, i,j): string{
    const control = (this.form.pages as FormArray).at(i).get('questions') as FormArray;
    if(info == 'question'){
      if(control.value[j].question != null){
        if(control.value[j].question.length > this.maxQtitle){
          return "Question can't more than " + this.maxQtitle + " characters"
        }
      }
    }
  }

  /* Build Form Group End */

  public addpages(formData: NgForm): void {
    const control = this.form.pages as FormArray;
    control.push(this.initpages());

    // Submit
    if (this.formGroup.valid) {
      this.serviceSurvey.create(formData).subscribe(
        res => console.log('create : ', res)
      );
    }
  }

  public removepages(i) {
    const control = this.form.pages as FormArray;
    control.removeAt(i);
  }

  public addquestions(i, formData: NgForm): void {
    const control = (this.form.pages as FormArray).at(i).get('questions') as FormArray;
    control.push(this.initquestions());

    // Submit
    if (this.formGroup.valid) {
      this.serviceSurvey.create(formData).subscribe(
        res => console.log('create : ', res)
      );
    }
  }

  public addTitle(i): void {
    const control = (this.form.pages as FormArray).at(i).get('questions') as FormArray;
    control.push(
      new FormGroup({
        id: new FormControl(null),
        question: new FormControl(null),
        description: new FormControl(null),
        questionType: new FormControl('TITLEDESCRIPTION'),
        titlepic: new FormControl(null),
        imgPage: new FormControl(null),
        imgQuestion: new FormControl(null),
        requiredValue: new FormControl(false, []),
        values: new FormArray([
          this.initValue(0)
        ])
      })
    );
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

  addPicturePages(i) {
    const control = (this.form.pages as FormArray).at(i).get('questions') as FormArray;
    this.imageCompress.uploadFile().then(({ image, orientation }) => {

      this.imageCompress.compressFile(image, orientation, 75, 50).then(
        result => {
          const idSurvey: string = '' + this.idSurvey;
          const idPage: string = '' + i;
          const iImg: string = '' + this.iImagePage;
          const blob = this.b64toBlob(result);
          this.serviceSurvey.uploadImage(blob, idSurvey + '-' + idPage + '(' + iImg + ')').subscribe(
            (resquestion) => {
              control.push(
                new FormGroup({
                  id: new FormControl(null),
                  question: new FormControl(null),
                  description: new FormControl(null),
                  questionType: new FormControl('PICTUREPAGE'),
                  titlepic: new FormControl(null),
                  imgPage: new FormControl(resquestion.path),
                  imgQuestion: new FormControl(null),
                  requiredValue: new FormControl(false, []),
                  values: new FormArray([
                    this.initValue(0)
                  ])
                })
              );
            },
            (err) => {
              console.log(err);
            });
        }
      );
    });
    this.iImagePage++;
  }

  addPictureQuestion(i, j) {
    const control = (this.form.pages as FormArray).at(i).get('questions') as FormArray;
    const hControl = control.value;
    this.imageCompress.uploadFile().then(({ image, orientation }) => {
      this.imageCompress.compressFile(image, orientation, 75, 50).then(
        result => {
          const idSurvey: string = '' + this.idSurvey;
          const idPage: string = '' + i;
          const idQuestion: string = '' + j;
          const iImg: string = '' + this.iImageQuestion;
          const blob = this.b64toBlob(result);
          this.serviceSurvey.uploadImage(blob, idSurvey + '-' + idPage + '-' + idQuestion + '(' + iImg + ')').subscribe(
            (resquestion) => {
              hControl[j].imgQuestion = null;
              control.setValue(hControl);
              hControl[j].imgQuestion = resquestion.path;
              this.urlpicQ = resquestion.path;
              control.setValue(hControl);
            },
            (err) => {
              console.log(err);
            });
        }
      );
    });
    this.iImageQuestion++;
  }

  addPictureValue(i, j, k) {
    const control = ((this.form.pages as FormArray).at(i).get('questions') as FormArray).at(j).get('values') as FormArray;
    const hControl = control.value;
    this.imageCompress.uploadFile().then(({ image, orientation }) => {

      this.imageCompress.compressFile(image, orientation, 75, 50).then(
        result => {
          const idSurvey: string = '' + this.idSurvey;
          const idPage: string = '' + i;
          const idQuestion: string = '' + j;
          const idValue: string = '' + k;
          const iImg: string = '' + this.iImageValue;
          const blob = this.b64toBlob(result);
          this.serviceSurvey.uploadImage(blob, idSurvey + '-' + idPage + '-' + idQuestion + '-' + idValue + '(' + iImg + ')').subscribe(
            (resquestion) => {
              hControl[k].imgValue = resquestion.path;
              control.setValue(hControl);
            },
            (err) => {
              console.log(err);
            });
        }
      );
    });
    this.iImageValue++;
  }

  public removequestions(i, j) {
    const control = (this.form.pages as FormArray).at(i).get('questions') as FormArray;
    control.removeAt(j);
  }

  public removeImageOption(i, j) {
    const control = ((this.form.pages as FormArray).at(i).get('questions') as FormArray).at(j).get('path') as FormArray;
    control.removeAt(i);
  }

  public duplicateQuestion(i, j) {
    const control = (this.form.pages as FormArray).at(i).get('questions') as FormArray;
    control.push(
      new FormGroup({
        id: new FormControl(''),
        question: new FormControl(control.value[j].question),
        description: new FormControl(control.value[j].description),
        questionType: new FormControl(control.value[j].questionType),
        imgPage: new FormControl(control.value[j].imgPage),
        imgQuestion: new FormControl(control.value[j].imgQuestion),
        requiredValue: new FormControl(control.value[j].requiredValue, []),
        validateStatus: new FormControl(control.value[j].validateStatus),
        validateType: new FormControl(control.value[j].validateType),
        validateSetting: new FormControl(control.value[j].validateSetting),
        validateValue: new FormControl(control.value[j].validateValue),
        values: new FormArray([
          this.initValue(0)
        ])
      })
    );

    if (control.value[i].questionType === 'MULTIPLE') {
      const ctrl = (( this.form.pages as FormArray).at(i).get('questions') as FormArray).at(j + 1).get('values') as FormArray;
      for (let index = 0; index < control.value[j].values.length - 1; index++) {
        this.addOption(i, j + 1);
      }
      ctrl.setValue(control.value[j].values);
    }
  }

  public addOption(i, j) {
    const control = (( this.form.pages as FormArray).at(i).get('questions') as FormArray).at(j).get('values') as FormArray;
    control.push(this.initValue(control.value.length));
  }

  public removeOption(i, j, k) {
    const control = (( this.form.pages as FormArray).at(i).get('questions') as FormArray).at(j).get('values') as FormArray;
    control.removeAt(k);
  }

  public addRequired(i, j, status) {
    const control = (this.form.pages as FormArray).at(i).get('questions') as FormArray;
    const hControl = control.value;
    if (status == 'true') {
      hControl[j].validateStatus = true;
    } else {
      hControl[j].validateStatus = false;
    }
    control.setValue(hControl);
  }

  // Submit Survey

  onSubmit(formData: NgForm) {
    if (this.formGroup.valid) {
      console.log(formData.value);
      this.serviceSurvey.create(formData.value).subscribe(
        res => console.log('create : ', res)
      );
      // Show dialog
      this.dialog.open(PublishComponent, {
        data: this.idSurvey,
        width: '800px',
        maxHeight: '637px',
        panelClass: 'dialog-publish',
      });
    }
  }

  // Drag and Drop Question

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      console.log('Transfering item to new container');
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

  // Split Form

  addSplit(ar1: any[], ar2: any[], i, j) {
    ar1 = [...ar1];
    ar2 = [...ar2];
    ar2[j] = ar1[i + 1];
    console.log('array 1:', ar1);
    console.log('array 2: ', ar2);
    return ar2;
  }

  removeValue(ar: any[], i) {
    ar = [...ar];
    ar.splice(i, 1);
    console.log('array baru :', ar);
    return ar;
  }

  public putquestion(iForm, iQuestion, j) {
    const controlAwal = ( this.form.pages as FormArray).at(iForm).get('questions') as FormArray;
    const hControl = controlAwal.value;
    const controlKedua = ( this.form.pages as FormArray).at(iForm + 1).get('questions') as FormArray;
    const hControlKedua = controlKedua.value;

    for (let values = 0; values < hControl[iQuestion + 1].values.length - 1; values++) {
      this.addOption(iForm + 1, hControlKedua.length - 1);
      console.log('i: ', values);
    }
    const newControlKedua = this.addSplit(hControl, hControlKedua, iQuestion, j);
    controlKedua.setValue(newControlKedua);
    return hControl;
  }

  splitQuestionForms(iForm, formData, jmlQ, j) {
    let je = 0;
    let control;
    for (let index = j; index < jmlQ - 1; index++) {
      control = this.putquestion(iForm, index, je);
      je++;
      if (je > 0 && index + 1 < jmlQ - 1) {
        this.addquestions(iForm + 1, formData);
      }
    }
    const controlAwal = ( this.form.pages as FormArray).at(iForm).get('questions') as FormArray;
    for (let index = j; index < jmlQ - 1; index++) {
      this.removequestions(iForm, index);
      const newControl = this.removeValue(control, index);
      controlAwal.setValue(newControl);
    }
  }

  moveItems(arb: any[], ara: any[]) {
    arb = [];
    ara = [...ara];
    let i = arb.length;
    for (let index = 0; index < ara.length; index++) {
      if (ara[index] !== undefined) {
        arb[i] = ara[index];
        i++;
      }
    }
    console.log(arb);
    return arb;
  }

  public splitQuestion(iForm, formData) {
    const controlBawah = ( this.form.pages as FormArray).at(iForm).get('questions') as FormArray;
    const hControlBawah = controlBawah.value;

    const controlAtas = ( this.form.pages as FormArray).at(iForm - 1).get('questions') as FormArray;
    const hControlAtas = controlAtas.value;

    const newControlBawah = this.moveItems(hControlBawah, hControlAtas);
    if (newControlBawah[0] === undefined) {
      this.removequestions(iForm, 0);
      newControlBawah.pop();
    }
    console.log('control bawah', newControlBawah);
    if (newControlBawah.length <= 1 && newControlBawah[0].values !== undefined) {
      console.log(newControlBawah[0].values);
      console.log(newControlBawah[0].values.length);
      for (let values = 0; values < newControlBawah[0].values.length - 1; values++) {
        console.log(newControlBawah.length);
        this.addOption(iForm, newControlBawah.length - 1);
        console.log('sampe add option');
      }
    } else {
      for (let index = 1; index < newControlBawah.length; index++) {
        this.addquestions(iForm, formData);
        console.log('sampe sini');
        for (let values = 0; values < newControlBawah[index - 1].values.length - 1; values++) {
          this.addOption(iForm, newControlBawah.length);
        }
      }
    }
    controlBawah.setValue(newControlBawah);
    const ar = [];
    for (let i = 0; i <= newControlBawah.length; i++) {
      if (ar.length < 1) {
        this.removequestions(iForm - 1, 0);
      }
    }
    controlAtas.setValue(ar);
  }

  splitForm(i, j, jmlQ, jmlPage, formData: NgForm) {
    let je = 0;
    let control;
    if ((j + 1) == jmlQ) {
      this.addpages(formData);
      if ((i + 1) < jmlPage) {
        for (let index = jmlPage; index > i + 1; index--) {
          this.splitQuestion(index, formData);
        }
      } else {
        this.removequestions(i + 1, 0);
      }
    } else if ((j + 1) < jmlQ) { // question ke j to n
      if ((i + 1) < jmlPage) {
        console.log('sampe sini yaaaaaaaaaaaaaaaaaaaaaaaaaa');
        this.addpages(formData);
        for (let index = i; index < jmlPage - 1; index++) {
          this.splitQuestionForms(index, formData, jmlQ, j);
        }
      } else {
        this.addpages(formData);
        for (let index = j; index < jmlQ - 1; index++) {
          control = this.putquestion(i, index, je);
          je++;
          if (je > 0 && index + 1 < jmlQ - 1) {
            this.addquestions(i + 1, formData);
          }
        }
        let newControl: any[];
        const controlAwal = ( this.form.pages as FormArray).at(i).get('questions') as FormArray;
        for (let index = jmlQ - 1; index > j; index--) {
          console.log(index);
          this.removequestions(i, index);
          newControl = this.removeValue(control, index);
          console.log('last:', newControl);
        }
        controlAwal.setValue(newControl);
      }
    }
  }

  // Merge Form

  addMerge(ara: any[], arb: any[], i): any[] {
    arb = [...arb];
    ara = [...ara];
    arb[arb.length] = ara[i];
    return arb;
  }

  public putquestions(iForm, iQuestion, formData: NgForm) {
    const controlAwal = ( this.form.pages as FormArray).at(iForm).get('questions') as FormArray;
    const hControl = controlAwal.value;

    const controlSebelum = ( this.form.pages as FormArray).at(iForm - 1).get('questions') as FormArray;
    const hControlSebelum = controlSebelum.value;

    this.addquestions(iForm - 1, formData);
    for (let values = 0; values < hControl[iQuestion].values.length - 1; values++) {
      this.addOption(iForm - 1, hControlSebelum.length);
    }
    const newControlSebelum = this.addMerge(hControl, hControlSebelum, iQuestion);
    controlSebelum.setValue(newControlSebelum);
  }

  mergeForm(iForm, j, jmlQ, formData: NgForm) {
    for (let index = 0; index < jmlQ; index++) {
      this.putquestions(iForm, index, formData);
    }
    this.removepages(iForm);
  }

}
