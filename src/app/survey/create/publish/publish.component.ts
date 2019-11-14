import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { SurveyQuestionService } from 'src/app/shared/survey/survey.question.service';
import { FormGroup, FormControl, NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-publish',
  templateUrl: './publish.component.html',
  styleUrls: ['./publish.component.css']
})
export class PublishComponent implements OnInit {
  selectedAll: any;
  formPublish: FormGroup;
  formUser: FormGroup;
  formStatus: FormGroup;
  emailList: any[];
  allUser: any[];
  selectedEmail = [];
  selectedUsername = [];
  dataUser = [];
  dataEmail = [];
  dataUsername = [];
  userIdList = [];

  constructor(
    public dialogRef: MatDialogRef<PublishComponent>,
    @Inject(MAT_DIALOG_DATA) public data: number,
    private _router: Router, 
    private serviceQ: SurveyQuestionService
  ) { }

  ngOnInit() {
    console.log(this.data);
    this.serviceQ.getAllUser().subscribe(
      res => {
        this.allUser = res;
        for (let index = 0; index < this.allUser.length; index++) {
          if(this.allUser[index].email != null){
            this.dataUser.push(this.allUser[index]);
            this.dataEmail.push(this.allUser[index].email);
            this.dataUsername.push(this.allUser[index].username);
          }
        }
      }
    )
    this.selectedEmail = this.dataEmail;
    this.selectedUsername = this.dataUsername;
    this.initForm();
    this.initStatus(this.data);
  }

  initForm(){
    this.formPublish = new FormGroup({
      emailList: new FormControl(''),
      emailBody: new FormControl(''),
      subject: new FormControl('')
    });
  }

  initStatus(idSurvey){
    this.formUser = new FormGroup({
      idSurvey: new FormControl(idSurvey),
      userList: new FormControl(''),
      privateStatus: new FormControl(false,[]),
      activeStatus: new FormControl(true, []),
      publishStatus: new FormControl(true, [])
    });
  }

  onCancel(): void{
    this.dialogRef.close();
  }

  findId(data, cek){
    var i = 0;
    this.userIdList = [];
    for (let index = 0; index < this.dataUser.length; index++) {
      for (let j = 0; j < data.length; j++) {
        if(cek == 1){ 
          if(this.dataUser[index].email == data[j]){
            this.userIdList[i] = this.dataUser[index].id;
            i++;
          }
        }else if(cek == 2){
          if(this.dataUser[index].username == data[j]){
            this.userIdList[i] = this.dataUser[index].id;
            i++;
          }
        }
      }
    }
    return this.userIdList;
  }

  sendEmail(data: NgForm){
    // Send to survey
    this.formUser.value.userList = this.findId(data.value.emailList, 1);
    this.sendSurvey(this.formUser.value)
    // Send to email service
    data.value.privateStatus = true;
    data.value.publishStatus = true;
    this.serviceQ.sendEmail(data.value).subscribe(
      resp => console.log('email sent', resp)
    );
    console.log('email list data: ',data.value);
    this.onCancel();
    this._router.navigate(['cards']);
  }

  sendUsername(data: NgForm){
    this.formUser.value.privateStatus = true;
    this.formUser.value.publishStatus = true;
    this.formUser.value.userList = this.findId(data.value.userList, 2);
    this.sendSurvey(this.formUser.value);
    this.onCancel();
    this._router.navigate(['cards']);
  }

  sendSurvey(data){
    this.serviceQ.sendSurvey(data).subscribe(
      res => console.log('summit : ', res)
    );
  }

  search(query, info){
    if(info == 'email'){
      let result = this.select(query, this.dataEmail);
      this.selectedEmail = result;
    }else if (info == 'username'){
      let result = this.select(query, this.dataUsername);
      this.selectedUsername = result;
    }
  }

  select(query, data): any[]{
    let result: any[] = [];
    for(let a of data){
      if(a.toLowerCase().indexOf(query) > -1){
        result.push(a);
      }
    }
    if(result.length == 0){
      result.push('Not Found Data');
    }
    return result;
  }

  selectAllEmail(info){
    if(info._selected){
      this.formPublish.setValue({
        emailList: this.selectedEmail,
        emailBody: this.formPublish.value.emailBody,
        subject: this.formPublish.value.subject
      })
      info._selected = true;
    }
    if(info._selected == false){
      this.formPublish.setValue({
        emailList: [],
        emailBody: this.formPublish.value.emailBody,
        subject: this.formPublish.value.subject
      })
    }
  }

  selectAllUsername(info){
    if(info.selected){
      this.formUser.setValue({
        idSurvey: this.data,
        userList: this.selectedUsername,
        privateStatus: true,
        activeStatus: this.formUser.value.activeStatus,
        publishStatus: this.formUser.value.publishStatus
      })
      info.selected = true;
    }
    if(info.selected == false){
      this.formUser.setValue({
        idSurvey: this.data,
        userList: [],
        privateStatus: true,
        activeStatus: this.formUser.value.activeStatus,
        publishStatus: this.formUser.value.publishStatus
      })
    }
  }

  copyLink(inputElement){
    inputElement.select();
    document.execCommand('copy');
    inputElement.setSelectionRange(0,0);
  }

}
