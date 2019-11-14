import { Component, OnInit } from '@angular/core';
import { SurveyQuestionService } from 'src/app/shared/survey/survey.question.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AuthentificationService } from 'src/app/auth';

@Component({  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {
  cards: any;
  cards2: any;
  surveyid: any;
  route: any;
  pages: number[] = [];
  totalsubmitpage = 0;
  jmlpage: number;
  getJmlPageAssign: number;
  surveyView: any;
  saveStatus: any;
  userid: string;
  dismissCard: boolean;
  userId: string;
  hal: number = 1;

  constructor(
    private surveyService: SurveyQuestionService,
    private router: Router,
    private activeroute: ActivatedRoute,
    private authService: AuthentificationService) { }

  ngOnInit() {
    this.authService.getUser().subscribe(
      data => {
        this.userid = data;
      });
    this.activeroute.params.subscribe(
      (params: Params) => {
        this.userId = this.userid;
        this.hal = this.hal;
        this.surveyService.getCards(this.userId, this.hal).subscribe(
          cards => {
            if (cards != null) {
              this.cards = cards.surveyView;
              this.jmlpage = cards.totalPages;
              for (let index = 0; index < this.jmlpage; index++) {
                this.pages[index] = index + 1;
              }
            }
          });
        this.surveyService.getAssign(this.userId, this.hal).subscribe(
          cards2 => {
            if (cards2 != null) {
              this.cards2 = cards2.surveyView;
              this.getJmlPageAssign = cards2.totalPages;
              for (let index = 0; index < this.getJmlPageAssign; index++) {
                this.pages[index] = index + 1;
              }
            }
          }
        );
        this.dismissCard = false;
      });
  }

  coba(id: number) {
    this.router.navigate(['show', this.userid, id]);
  }

  showsurvey(id: number) {
    this.router.navigate(['result', id]);
  }

  // filter status

  savedCards(event) {
    if(event.checked = true) {
      this.surveyService.getSavedCards(this.userid, this.hal).subscribe(
        cards => {
          this.cards = cards.surveyView;
          this.jmlpage = cards.totalPages;
          for (let index = 0; index < this.jmlpage; index++) {
            this.pages[index] = index + 1;
          }
        });
        console.log('saved');
    } else {
      this.ngOnInit();
    }
  }

  publishedCards(event) {
    if(event.checked = true) {
      this.surveyService.getPublishedCards(this.userid, this.hal).subscribe(
        cards => {
          this.cards = cards.surveyView;
          this.jmlpage = cards.totalPages;
          for (let index = 0; index < this.jmlpage; index++) {
            this.pages[index] = index + 1;
          }
        });
        console.log('published');
    } else {
      this.ngOnInit();
    }
  }

  answeredCards(event) {
    if (event.checked = true) {
      this.surveyService.getAnsweredCards(this.userid, this.hal).subscribe(
        cards2 => {
          this.cards2 = cards2.surveyView;
          this.getJmlPageAssign = cards2.totalPages;
          for (let index = 0; index < this.getJmlPageAssign; index++) {
            this.pages[index] = index + 1;
          }
        });
    } else {
      this.ngOnInit();
    }
  }

  publicCards(event) {
    if (event.checked =  true) {
      this.surveyService.getPublicCards(this.userid, this.hal).subscribe(
        cards2 => {
          this.cards2 = cards2.surveyView;
          this.getJmlPageAssign = cards2.totalPages;
          for (let index = 0; index < this.getJmlPageAssign; index++) {
            this.pages[index] = index + 1;
          }
        });
    } else {
      this.ngOnInit();
    }
  }

  dismissedCards(event) {
    if (event.checked = true) {
      this.surveyService.getDismissedCards(this.userid, this.hal).subscribe(
        cards2 => {
          this.cards2 = cards2.surveyView;
          this.getJmlPageAssign = cards2.totalPages;
          for (let index = 0; index < this.getJmlPageAssign; index++) {
            this.pages[index] = index + 1;
          }
        });
    } else {
      this.ngOnInit();
    }
  }

  privateCards(event) {
    if (event.checked = true) {
      this.surveyService.getPrivateCards(this.userid, this.hal).subscribe(
        cards2 => {
          this.cards2 = cards2.surveyView;
          this.getJmlPageAssign = cards2.totalPages;
          for (let index = 0; index < this.getJmlPageAssign; index++) {
            this.pages[index] = index + 1;
          }
        });
    } else {
      this.ngOnInit();
    }
  }

  // savedCardsOldest(event) {
  //   if (event.checked) {
  //     this.surveyService.getSavedCardsOldest(this.userid, this.hal).subscribe(
  //       cards => {
  //         this.cards = cards.surveyView;
  //         this.jmlpage = cards.totalPages;
  //         for (let index = 0; index < this.jmlpage; index++) {
  //           this.pages[index] = index + 1;
  //         }
  //       });
  //   } else {
  //     this.ngOnInit();
  //   }
  // }

  // savedCardsnewest(event) {
  //   if (event.checked) {
  //     this.surveyService.getSavedCardsNewest(this.userid, this.hal).subscribe(
  //       cards => {
  //         this.cards = cards.surveyView;
  //         this.jmlpage = cards.totalPages;
  //         for (let index = 0; index < this.jmlpage; index++) {
  //           this.pages[index] = index + 1;
  //         }
  //       });
  //   } else {
  //     this.ngOnInit();
  //   }
  // }

  // savedCardsAscending(event) {
  //   if (event.checked) {
  //     this.surveyService.getSavedCardsAscending(this.userid, this.hal).subscribe(
  //       cards => {
  //         this.cards = cards.surveyView;
  //         this.jmlpage = cards.totalPages;
  //         for (let index = 0; index < this.jmlpage; index++) {
  //           this.pages[index] = index + 1;
  //         }
  //       });
  //   } else {
  //     this.ngOnInit();
  //   }
  // }

  // savedCardsDescending(event) {
  //   if (event.checked) {
  //     this.surveyService.getSavedCardsDescending(this.userid, this.hal).subscribe(
  //       cards => {
  //         this.cards = cards.surveyView;
  //         this.jmlpage = cards.totalPages;
  //         for (let index = 0; index < this.jmlpage; index++) {
  //           this.pages[index] = index + 1;
  //         }
  //       });
  //   } else {
  //     this.ngOnInit();
  //   }
  // }

  

  publishedCardsOldest(event) {
    if (event.checked) {
      this.surveyService.getPublishedCardsOldest(this.userid, this.hal).subscribe(
        cards => {
          this.cards = cards.surveyView;
          this.jmlpage = cards.totalPages;
          for (let index = 0; index < this.jmlpage; index++) {
            this.pages[index] = index + 1;
          }
        });
    } else {
      this.ngOnInit();
    }
  }

  publishedCardsNewest(event) {
    if (event.checked) {
      this.surveyService.getPublishedCardsNewest(this.userid, this.hal).subscribe(
        cards => {
          this.cards = cards.surveyView;
          this.jmlpage = cards.totalPages;
          for (let index = 0; index < this.jmlpage; index++) {
            this.pages[index] = index + 1;
          }
        });
    } else {
      this.ngOnInit();
    }
  }

  publishedCardsAscending(event) {
    if (event.checked) {
      this.surveyService.getPublishedCardsAscending(this.userid, this.hal).subscribe(
        cards => {
          this.cards = cards.surveyView;
          this.jmlpage = cards.totalPages;
          for (let index = 0; index < this.jmlpage; index++) {
            this.pages[index] = index + 1;
          }
        });
    } else {
      this.ngOnInit();
    }
  }

  publishedCardsDescending(event) {
    if (event.checked) {
      this.surveyService.getPublishedCardsDescending(this.userid, this.hal).subscribe(
        cards => {
          this.cards = cards.surveyView;
          this.jmlpage = cards.totalPages;
          for (let index = 0; index < this.jmlpage; index++) {
            this.pages[index] = index + 1;
          }
        });
    } else {
      this.ngOnInit();
    }
  }

  privateCardsOldest(event) {
    if (event.checked) {
      this.surveyService.getPrivateCardsOldest(this.userid, this.hal).subscribe(
        cards2 => {
          this.cards2 = cards2.surveyView;
          this.getJmlPageAssign = cards2.totalPages;
          for (let index = 0; index < this.getJmlPageAssign; index++) {
            this.pages[index] = index + 1;
          }
        });
    } else {
      this.ngOnInit();
    }
  }

  privateCardsNewest(event) {
    if (event.checked) {
      this.surveyService.getPrivateCardsNewest(this.userid, this.hal).subscribe(
        cards2 => {
          this.cards2 = cards2.surveyView;
          this.getJmlPageAssign = cards2.totalPages;
          for (let index = 0; index < this.getJmlPageAssign; index++) {
            this.pages[index] = index + 1;
          }
        });
    } else {
      this.ngOnInit();
    }
  }

  privateCardsAscending(event) {
    if (event.checked) {
      this.surveyService.getPrivateCardsAscending(this.userid, this.hal).subscribe(
        cards2 => {
          this.cards2 = cards2.surveyView;
          this.getJmlPageAssign = cards2.totalPages;
          for (let index = 0; index < this.getJmlPageAssign; index++) {
            this.pages[index] = index + 1;
          }
        });
    } else {
      this.ngOnInit();
    }
  }

  privateCardsDescending(event) {
    if (event.checked) {
      this.surveyService.getPrivateCardsDescending(this.userid, this.hal).subscribe(
        cards2 => {
          this.cards2 = cards2.surveyView;
          this.getJmlPageAssign = cards2.totalPages;
          for (let index = 0; index < this.getJmlPageAssign; index++) {
            this.pages[index] = index + 1;
          }
        });
    } else {
      this.ngOnInit();
    }
  }

  publicCardsOldest(event) {
    if (event.checked) {
      this.surveyService.getPublicCardsOldest(this.userid, this.hal).subscribe(
        cards2 => {
          this.cards2 = cards2.surveyView;
          this.getJmlPageAssign = cards2.totalPages;
          for (let index = 0; index < this.getJmlPageAssign; index++) {
            this.pages[index] = index + 1;
          }
        });
    } else {
      this.ngOnInit();
    }
  }

  publicCardsNewest(event) {
    if (event.checked) {
      this.surveyService.getPublicCardsNewest(this.userid, this.hal).subscribe(
        cards2 => {
          this.cards2 = cards2.surveyView;
          this.getJmlPageAssign = cards2.totalPages;
          for (let index = 0; index < this.getJmlPageAssign; index++) {
            this.pages[index] = index + 1;
          }
        });
    } else {
      this.ngOnInit();
    }
  }

  publicCardsAscending(event) {
    if (event.checked) {
      this.surveyService.getPublicCardsAscending(this.userid, this.hal).subscribe(
        cards2 => {
          this.cards2 = cards2.surveyView;
          this.getJmlPageAssign = cards2.totalPages;
          for (let index = 0; index < this.getJmlPageAssign; index++) {
            this.pages[index] = index + 1;
          }
        });
    } else {
      this.ngOnInit();
    }
  }

  publicCardsDescending(event) {
    if (event.checked) {
      this.surveyService.getPublicCardsDescending(this.userid, this.hal).subscribe(
        cards2 => {
          this.cards2 = cards2.surveyView;
          this.getJmlPageAssign = cards2.totalPages;
          for (let index = 0; index < this.getJmlPageAssign; index++) {
            this.pages[index] = index + 1;
          }
        });
    } else {
      this.ngOnInit();
    }
  }

  answeredCardsOldest(event) {
    if (event.checked) {
      this.surveyService.getAnsweredCardsOldest(this.userid, this.hal).subscribe(
        cards2 => {
          this.cards2 = cards2.surveyView;
          this.getJmlPageAssign = cards2.totalPages;
          for (let index = 0; index < this.getJmlPageAssign; index++) {
            this.pages[index] = index + 1;
          }
        });
    } else {
      this.ngOnInit();
    }
  }

  answeredCardsNewest(event) {
    if (event.checked) {
      this.surveyService.getAnsweredCardsNewest(this.userid, this.hal).subscribe(
        cards2 => {
          this.cards2 = cards2.surveyView;
          this.getJmlPageAssign = cards2.totalPages;
          for (let index = 0; index < this.getJmlPageAssign; index++) {
            this.pages[index] = index + 1;
          }
        });
    } else {
      this.ngOnInit();
    }
  }

  answeredCardsAscending(event) {
    if (event.checked) {
      this.surveyService.getAnsweredCardsAscending(this.userid, this.hal).subscribe(
        cards2 => {
          this.cards2 = cards2.surveyView;
          this.getJmlPageAssign = cards2.totalPages;
          for (let index = 0; index < this.getJmlPageAssign; index++) {
            this.pages[index] = index + 1;
          }
        });
    } else {
      this.ngOnInit();
    }
  }

  answeredCardsDescending(event) {
    if (event.checked) {
      this.surveyService.getAnsweredCardsDescending(this.userid, this.hal).subscribe(
        cards2 => {
          this.cards2 = cards2.surveyView;
          this.getJmlPageAssign = cards2.totalPages;
          for (let index = 0; index < this.getJmlPageAssign; index++) {
            this.pages[index] = index + 1;
          }
        });
    } else {
      this.ngOnInit();
    }
  }

  dismissedCardsOldest(event) {
    if (event.checked) {
      this.surveyService.getDismissedCardsOldest(this.userid, this.hal).subscribe(
        cards2 => {
          this.cards2 = cards2.surveyView;
          this.getJmlPageAssign = cards2.totalPages;
          for (let index = 0; index < this.getJmlPageAssign; index++) {
            this.pages[index] = index + 1;
          }
        });
    } else {
      this.ngOnInit();
    }
  }

  dismissedCardsNewest(event) {
    if (event.checked) {
      this.surveyService.getDismissedCardsNewest(this.userid, this.hal).subscribe(
        cards2 => {
          this.cards2 = cards2.surveyView;
          this.getJmlPageAssign = cards2.totalPages;
          for (let index = 0; index < this.getJmlPageAssign; index++) {
            this.pages[index] = index + 1;
          }
        });
    } else {
      this.ngOnInit();
    }
  }

  dismissedCardsAscending(event) {
    if (event.checked) {
      this.surveyService.getDismissedCardsAscending(this.userid, this.hal).subscribe(
        cards2 => {
          this.cards2 = cards2.surveyView;
          this.getJmlPageAssign = cards2.totalPages;
          for (let index = 0; index < this.getJmlPageAssign; index++) {
            this.pages[index] = index + 1;
          }
        });
    } else {
      this.ngOnInit();
    }
  }

  dismissedCardsDescending(event) {
    if (event.checked) {
      this.surveyService.getDismissedCardsDescending(this.userid, this.hal).subscribe(
        cards2 => {
          this.cards2 = cards2.surveyView;
          this.getJmlPageAssign = cards2.totalPages;
          for (let index = 0; index < this.getJmlPageAssign; index++) {
            this.pages[index] = index + 1;
          }
        });
    } else {
      this.ngOnInit();
    }
  }

  oldest(klik) {
    console.log(klik.isTrusted);
    if (klik.isTrusted) {
      console.log('berhasil');
      this.surveyService.getMysurveyOldest(this.userid, this.hal).subscribe(
        cards => {
          this.cards = cards.surveyView;
          this.jmlpage = cards.totalPages;
          for (let index = 0; index < this.jmlpage; index++) {
            this.pages[index] = index + 1;
          }
          console.log(this.pages);
        });
    } else {
      this.ngOnInit();
    }
  }

  newest(klik) {
    console.log(klik.isTrusted);
    if (klik.isTrusted) {
      console.log('done');
      this.surveyService.getMysurveyNewest(this.userid, this.hal).subscribe(
        cards => {
          this.cards = cards.surveyView;
          this.jmlpage = cards.totalPages;
          for (let index = 0; index < this.jmlpage; index++) {
            this.pages[index] = index + 1;
          }
          console.log(this.pages);
        });
    } else {
      this.ngOnInit();
    }
  }

  descending(klik) {
    console.log(klik.isTrusted);
    if (klik.isTrusted) {
      console.log('finish');
      this.surveyService.getMysurveyDescending(this.userid, this.hal).subscribe(
        cards => {
          this.cards = cards.surveyView;
          this.jmlpage = cards.totalPages;
          for (let index = 0; index < this.jmlpage; index++) {
            this.pages[index] = index + 1;
          }
          console.log(this.pages);
        });
    } else {
      this.ngOnInit();
    }
  }

  ascending(klik) {
    console.log(klik.isTrusted);
    if (klik.isTrusted) {
      console.log('succesed');
      this.surveyService.getMysurveyAscending(this.userid, this.hal).subscribe(
        cards => {
          this.cards = cards.surveyView;
          this.jmlpage = cards.totalPages;
          for (let index = 0; index < this.jmlpage; index++) {
            this.pages[index] = index + 1;
          }
          console.log(this.pages);
        });
    } else {
      this.ngOnInit();
    }
  }

  assignOldest(klik) {
    console.log(klik.isTrusted);
    if (klik.isTrusted) {
      console.log('berhasil');
      this.surveyService.getAssignOldest(this.userid, this.hal).subscribe(
        cards2 => {
          this.cards2 = cards2.surveyView;
          this.getJmlPageAssign = cards2.totalPages;
          for (let index = 0; index < this.getJmlPageAssign; index++) {
            this.pages[index] = index + 1;
          }
          console.log(this.pages);
        });
    } else {
      this.ngOnInit();
    }
  }

  assignNewest(klik) {
    console.log(klik.isTrusted);
    if (klik.isTrusted) {
      console.log('done');
      this.surveyService.getAssignNewest(this.userid, this.hal).subscribe(
        cards2 => {
          this.cards2 = cards2.surveyView;
          this.getJmlPageAssign = cards2.totalPages;
          for (let index = 0; index < this.getJmlPageAssign; index++) {
            this.pages[index] = index + 1;
          }
          console.log(this.pages);
        });
    } else {
      this.ngOnInit();
    }
  }

  assignDescending(klik) {
    console.log(klik.isTrusted);
    if (klik.isTrusted) {
      console.log('finish');
      this.surveyService.getAssignDescending(this.userid, this.hal).subscribe(
        cards2 => {
          this.cards2 = cards2.surveyView;
          this.getJmlPageAssign = cards2.totalPages;
          for (let index = 0; index < this.getJmlPageAssign; index++) {
            this.pages[index] = index + 1;
          }
          console.log(this.pages);
        });
    } else {
      this.ngOnInit();
    }
  }

  assignAscending(klik) {
    console.log(klik.isTrusted);
    if (klik.isTrusted) {
      console.log('succesed');
      this.surveyService.getAssignAscending(this.userid, this.hal).subscribe(
        cards => {
          this.cards = cards.surveyView;
          this.jmlpage = cards.totalPages;
          for (let index = 0; index < this.jmlpage; index++) {
            this.pages[index] = index + 1;
          }
          console.log(this.pages);
        });
    } else {
      this.ngOnInit();
    }
  }

  // delete by id

  delete(id) {
    console.log(id);
    this.surveyService.delete(id).subscribe(
      res =>
      this.ngOnInit()
    );
  }

  dismiss(idSurvey) {
    this.surveyService.dismiss(this.userId, idSurvey).subscribe(
      res =>
      this.ngOnInit()
    );
    console.log('dismiss'); 
    // this.dismissCard = true;
  }

  duplicate(idSurvey) {
    this.surveyService.setCloneSurvey(idSurvey).subscribe(
      res =>
      this.ngOnInit()
    )
  }

  // pagination function

  previous() {
    this.hal--;
    return this.ngOnInit();
  }

  page(userid, hal) {
    this.surveyService.getCards(userid, hal).subscribe(
      cards => {
        this.cards = cards.surveyView;
      });
   }

  next() {
    this.hal++;
    return this.ngOnInit();
  }

  create() {
    this.router.navigateByUrl('/create');
  }
}




