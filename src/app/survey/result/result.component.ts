import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { SurveyQuestionService } from 'src/app/shared/survey/survey.question.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})

export class ResultComponent implements OnInit {
  detailresponse: any;
  index: number;
  pages: any;
  dateanswer: Date;
  defaultIndex = 0;
  defaultPage = 1;
  pagetitle: string;
  pagecolorheader: any;
  pagecolorbody: any;
  imgheader: any;
  pageicon: any;
  imgicon: any;
  colors = ['red', 'blue', 'green'];
  randomItem: string;
  totalres = 0;
  totalpage: any;
  tanggapan: any;
  hal: number;

  constructor(
    private route: ActivatedRoute,
    private service: SurveyQuestionService) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        const surveyId = params.idSurvey;
        const index = this.defaultIndex;
        const page_number = this.defaultPage;

        this.getDetailViewData(surveyId, index);
        this.getHighViewData(surveyId, page_number);
      }
    );
    this.getColor();
  }

  // Highviwew Function
  getColor() {

    if (!this.randomItem) {
      this.randomItem = this.colors[Math.floor(Math.random() * this.colors.length)];
      console.log('s', this.randomItem);
    }
    return this.randomItem;
  }

  getHighViewData(surveyId: number, page_number: number) {
    this.service.highview(surveyId, page_number).subscribe(
      data => {
        console.log(data.response);
        this.totalpage = data.totalPage;
        this.totalres = data.totalResponse;
        this.tanggapan = data.response;
        this.pagetitle = data.title;
        this.pagecolorheader = data.colorHeader;
        this.pagecolorbody = data.colorBg;
        this.imgheader = data.imgHeader;
        this.pageicon = data.icon;
        this.imgicon = data.imgIcon;
      }
    );
  }

  detailview(index: number) {
    console.log(this.defaultIndex)
    this.defaultIndex = index;
    this.index = 1;
    return this.ngOnInit();
  }


  // Detailview Function
  getDetailViewData(surveyId: number, index: number) {
    this.service.detailview(surveyId, index).subscribe(
      data => {
        if (data != null) {
          this.detailresponse = data;
          this.pages = data.pages; 
        }
        console.log("default");
      });
  }

  prev() {
    console.log(this.defaultIndex);
    this.defaultIndex--;
    return this.ngOnInit();
  }

  next() {
    this.defaultIndex++;
    return this.ngOnInit();
  }

  prevpage() {
    console.log(this.defaultIndex);
    this.defaultPage--;
    return this.ngOnInit();
  }

  nextpage() {
    this.defaultPage++;
    return this.ngOnInit();
  }
}
