import { Component, OnInit } from '@angular/core';
import { SurveyQuestionService } from 'src/app/shared/survey/survey.question.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormArray, FormControl, FormBuilder, NgForm, Validators } from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'app-submit-responses',
  templateUrl: './submit-responses.component.html',
  styleUrls: ['./submit-responses.component.css']
})
export class SubmitResponsesComponent implements OnInit {
  survey: any;
  surveyid: any;
  pageid: any;
  pagetitle: string;
  pageicon: any;
  imgicon: any;
  pagecolorheader: any;
  pagecolorbody: any;
  imgheader: any;
  totalpages: number;
  questions: any[];
  values: any[];
  formGroup: FormGroup;
  hal = 0;
  checked: any;
  submitstatus: any;

  constructor(
    private service: SurveyQuestionService,
    private activeroute: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router) { }

  ngOnInit() {
    this.activeroute.params.subscribe(
      (params: Params) => {
        const surveyId = params.id;
        const userId = params.idUser;
        const pageId = this.hal;
        this.service.getShowSurveyById(userId, surveyId, pageId).subscribe(
          data => {
            this.survey = data;
            this.pagetitle = data.title;
            this.pageid = data.id;
            this.submitstatus = data.submitStatus;
            this.pagecolorheader = data.colorHeader;
            this.pagecolorbody = data.colorBg;
            this.imgheader = data.imgHeader;
            this.pageicon = data.icon;
            this.imgicon = data.imgIcon;
            this.totalpages = data.totalpages;
            this.questions = data.questions;
            this.values = data.questions.values;
            this.checked = data.questions.values.checked;
            this.createformpage();

            // tslint:disable-next-line: only-arrow-functions
            this.toDataURL(data.imgIcon, function(dataUrl) {
              console.log('RESULT:', dataUrl);
            })
          });
      });
  }


  toDataURL(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function() {
      var reader = new FileReader();
      reader.onloadend = function() {
        callback(reader.result);
      }
      reader.readAsDataURL(xhr.response);
    };
    xhr.open('GET', url);
    xhr.responseType = 'blob';
    xhr.send();
  }

  createformpage() {
    let pagesarr = [];
    for (let i = 0; i< this.questions.length; i++) {
    pagesarr.push(this.initquestions(this.questions[i]));
    }

    this.formGroup = new FormGroup({
      'id': new FormControl(this.pageid),
      'idSurvey': new FormControl(this.survey.idSurvey),
      'submitStatus': new FormControl(this.submitstatus),
      'idUser': new FormControl(this.survey.idUser),
      'questions': new FormArray(pagesarr)
    });
  }

  get form() {
    return this.formGroup.controls;
  }

  public initquestions(question) {
    let valuearr: any[] = [];
    var date: any;

    var validationList: any[] = []
    
    for (let i = 0; i< question.values.length; i++) {
      valuearr.push(this.initValue(question.values[i]));
      // valuearr[i] = question.values[i];
    }
    
    if (question.questionType == 'DATE_TYPE' && question.dateAnswer != null) {
      date = moment(question.dateAnswer).format();
    }
    
    function lengthValidation(required, type, setting, value) {
      if (type == "LENGTH") {
        if (setting == "MAX") {
          validationList.push(Validators.maxLength(value));
        } else {
          validationList.push(Validators.minLength(value));
        }
      }
      requiredValidation(required);

      return Validators.compose(validationList);
    }

    function requiredValidation(required:boolean) {
      if (required) {
        validationList.push(Validators.required)
      }
      return Validators.compose(validationList)
    }
 

    return new FormGroup({
      'id': new FormControl(''),
      'questionType': new FormControl(question.questionType),
      'answer': new FormControl(question.answer, 
        lengthValidation(question.requiredValue, question.validateType, question.validateSetting, question.validateValue)),
      'dateAnswer': new FormControl(date),	
      'values': new FormArray(valuearr)
    });
  }

  initValue(value): FormGroup {
    return new FormGroup({
      'id': new FormControl(''),
      'values': new FormControl(''),
      'imgValue': new FormControl(value.imgValue),
      'checked': new FormControl(value.checked)
    });
  }

  onSubmit(formData: NgForm) {
    if (this.formGroup.valid) {
      this.service.submitresponpage(formData).subscribe(
        res => console.log('create : ', res)
      );
      this.hal++;
      return this.ngOnInit();
    }
  }

  onSubmit2(formData) {
    if (this.formGroup.valid) {
      formData.value.submitStatus = true;
      this.service.submitresponpage(formData.value).subscribe(
        res => console.log('create : ', res)
      );
      this.hal++;
        return this.router.navigate(['cards']); 
    }
  }

  previous() {
    this.hal--;
    return this.ngOnInit();
  }

}
