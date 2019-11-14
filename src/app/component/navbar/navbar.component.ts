import { Component, OnInit, Input } from '@angular/core';
import { AuthentificationService } from 'src/app/auth';
import { ProfileComponent } from './profile/profile.component';
import { MatDialog } from '@angular/material';
import { SurveyQuestionService } from 'src/app/shared/survey/survey.question.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @Input() title: string;
  user: any;
  pic: any;
  constructor(private authService: AuthentificationService, 
    private serviceQ: SurveyQuestionService, 
    public dialog: MatDialog) { }

  ngOnInit() {
    this.serviceQ.getUser().subscribe(
      userProfile => {
        this.user = userProfile;
        this.pic = this.user.profile_photo;
      }
    );
  }

  profileDialog() {
    const dialog = this.dialog.open(ProfileComponent, {
      width: '240px',
      position: {
        top: '70px',
        right: '50px'
      },
      data: this.user
    });
  }
}
