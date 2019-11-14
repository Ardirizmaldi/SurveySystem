import { Component, OnInit, Inject } from '@angular/core';
import { SurveyQuestionService } from 'src/app/shared/survey/survey.question.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { AuthentificationService } from 'src/app/auth';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  constructor(private serviceQ: SurveyQuestionService,
    private authservice: AuthentificationService,
    public dialogref: MatDialogRef<ProfileComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any[]) { }

  ngOnInit() {
  }

  logout() {
    this.dialogref.close();
    return this.authservice.logout();
  }

}
