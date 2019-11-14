import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const getJmlPage = "api/survey/find-all-survey-pagination";
const getJmlPageAssign = "api/survey/find-all-survey-pagination-assign";
const getSavedCards = "api/survey/find-all-survey-pagination-save-status";
const getSavedCardsOldest = "";
const getSavedCardsNewest = "";
const getSavedCardsAscending = "";
const getSavedCardsDescending = "";
const getPublishedCards = "api/survey/find-all-survey-pagination-publish-status";
const getPublishedCardsOldest = "";
const getPublishedCardsNewest = "";
const getPublishedCardsAscending = "";
const getPublishedCardsDescending = "";
const getPrivateCards = "api/survey/find-all-survey-pagination-private-status";
const getPrivateCardsOldest = "";
const getPrivateCardsNewest = "";
const getPrivateCardsAscending = "";
const getPrivateCardsDescending = ""; 
const getPublicCards = "api/survey/find-all-survey-pagination-public-status";
const getPublicCardsOldest = "";
const getPublicCardsNewest = "";
const getPublicCardsAscending = "";
const getPublicCardsDescending = "";
const getAnsweredCards = "api/survey/find-all-survey-pagination-assign-answered-status";
const getAnsweredCardsOldest = "";
const getAnsweredCardsNewest = "";
const getAnsweredCardsAscending = "";
const getAnsweredCardsDescending = "";
const getDismissedCards = "api/survey/find-all-survey-pagination-assign-dismiss-status";
const getDismissedCardsOldest = "";
const getDismissedCardsNewest = "";
const getDismissedCardsAscending = "";
const getDismissedCardsDescending = "";
const getMysurveyOldest = "api/survey/find-all-survey-pagination-sort-by-last-modified-asc";
const getMysurveyNewest = "api/survey/find-all-survey-pagination-sort-by-last-modified-desc";
const getMysurveyAscending = "api/survey/find-all-survey-pagination-sort-bydesc";
const getMysurveyDescending = "api/survey/find-all-survey-pagination-sort-byasc";
const getAssignOldest = "api/survey/find-all-survey-pagination-assign-lastmodifiedASC";
const getAssignNewest = "api/survey/find-all-survey-pagination-assign-lastmodifiedDESC";
const getAssignAscending = "api/survey/find-all-survey-pagination-assign-sortAsc";
const getAssignDescending = "api/survey/find-all-survey-pagination-assign-sortDesc";
const addSurveyUrl = "api/survey/add-survey";
const sendSurvey = "api/survey/assign-survey";
const sendEmail = "api/mail/sendMailMulti";
const getIdSurveyUrl = "api/survey/generate-id-survey";
const upload = "api/file/upload/survey";
const getAllUser = "api/survey/find-all-user";

// endpoint submit response
const submitsurvey = "api/survey/update-response";
const getsubmitpage = "api/survey/load-survey-by-survey-id-and-page-id";

// endpoint detail 
const detailview = "api/survey/detail-view";

// endpoint highview
const highview = "api/survey/high-view"

const triggeranswerfield = "api/survey/insert-response";
const cloneSurvey = "api/survey/clone-survey";
const userProfile = "api/auth/getUserDetails";

const headerConfig = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })
};

@Injectable({
    providedIn: 'root'
})
export class SurveyQuestionService {
    jmlPage: any;
    saveStatus: any;
    constructor(private http: HttpClient) { }

    getUser(): Observable<any[]>{
        return this.http.get<any[]>(userProfile, headerConfig);
    }

    getSurveyId(): Observable<number> {
        return this.http.get<number>(getIdSurveyUrl, headerConfig);
    }

    setCloneSurvey(idSurvey): Observable<any[]>{
        const urlClone = `${cloneSurvey}/${idSurvey}`;
        return this.http.post<any[]>(urlClone, headerConfig);
    }

    getAllUser(): Observable<any[]> {
        return this.http.get<any[]>(getAllUser, headerConfig);
    }

    getCards(idUser: string, hal: number): Observable<any> {
        const urlprovide = `${getJmlPage}/${idUser}/${hal}`;
        return this.http.get<any[]>(urlprovide);
    }

    getAssign(idUser: string, hal: number): Observable<any> {
        const urlprovide = `${getJmlPageAssign}/${idUser}/${hal}`;
        return this.http.get<any[]>(urlprovide);
    }

    getSavedCards(idUser: string, hal: number): Observable<any> {
        const urlprovide = `${getSavedCards}/${idUser}/${hal}`;
        return this.http.get<any[]>(urlprovide);
    }

    getSavedCardsOldest(idUser: string, hal: number): Observable<any> {
        const urlprovide = `${getSavedCardsOldest}/${idUser}/${hal}`;
        return this.http.get<any[]>(urlprovide);
    }

    getSavedCardsNewest(idUser: string, hal: number): Observable<any> {
        const urlprovide = `${getSavedCardsNewest}/${idUser}/${hal}`;
        return this.http.get<any[]>(urlprovide);
    }

    getSavedCardsAscending(idUser: string, hal: number): Observable<any> {
        const urlprovide = `${getSavedCardsAscending}/${idUser}/${hal}`;
        return this.http.get<any[]>(urlprovide);
    }

    getSavedCardsDescending(idUser: string, hal: number): Observable<any> {
        const urlprovide = `${getSavedCardsDescending}/${idUser}/${hal}`;
        return this.http.get<any[]>(urlprovide);
    }

    getPublishedCards(idUser: string, hal: number): Observable<any> {
        const urlprovide = `${getPublishedCards}/${idUser}/${hal}`;
        return this.http.get<any[]>(urlprovide);
    }

    getPublishedCardsOldest(idUser: string, hal: number): Observable<any> {
        const urlprovide = `${getPublishedCardsOldest}/${idUser}/${hal}`;
        return this.http.get<any[]>(urlprovide);
    }

    getPublishedCardsNewest(idUser: string, hal: number): Observable<any> {
        const urlprovide = `${getPublishedCardsNewest}/${idUser}/${hal}`;
        return this.http.get<any[]>(urlprovide);
    }

    getPublishedCardsAscending(idUser: string, hal: number): Observable<any> {
        const urlprovide = `${getPublishedCardsAscending}/${idUser}/${hal}`;
        return this.http.get<any[]>(urlprovide);
    }

    getPublishedCardsDescending(idUser: string, hal: number): Observable<any> {
        const urlprovide = `${getPublishedCardsDescending}/${idUser}/${hal}`;
        return this.http.get<any[]>(urlprovide);
    }

    getPrivateCards(idUser: string, hal: number): Observable<any> {
        const urlprovide = `${getPrivateCards}/${idUser}/${hal}`;
        return this.http.get<any[]>(urlprovide);
    }

    getPrivateCardsOldest(idUser: string, hal: number): Observable<any> {
        const urlprovide = `${getPrivateCardsOldest}/${idUser}/${hal}`;
        return this.http.get<any[]>(urlprovide);
    }

    getPrivateCardsNewest(idUser: string, hal: number): Observable<any> {
        const urlprovide = `${getPrivateCardsNewest}/${idUser}/${hal}`;
        return this.http.get<any[]>(urlprovide);
    }

    getPrivateCardsAscending(idUser: string, hal: number): Observable<any> {
        const urlprovide = `${getPrivateCardsAscending}/${idUser}/${hal}`;
        return this.http.get<any[]>(urlprovide);
    }

    getPrivateCardsDescending(idUser: string, hal: number): Observable<any> {
        const urlprovide = `${getPrivateCardsDescending}/${idUser}/${hal}`;
        return this.http.get<any[]>(urlprovide);
    }

    getPublicCards(idUser: string, hal: number): Observable<any> {
        const urlprovide = `${getPublicCards}/${idUser}/${hal}`;
        return this.http.get<any[]>(urlprovide);
    }

    getPublicCardsOldest(idUser: string, hal: number): Observable<any> {
        const urlprovide = `${getPublicCardsOldest}/${idUser}/${hal}`;
        return this.http.get<any[]>(urlprovide);
    }

    getPublicCardsNewest(idUser: string, hal: number): Observable<any> {
        const urlprovide = `${getPublicCardsNewest}/${idUser}/${hal}`;
        return this.http.get<any[]>(urlprovide);
    }

    getPublicCardsAscending(idUser: string, hal: number): Observable<any> {
        const urlprovide = `${getPublicCardsAscending}/${idUser}/${hal}`;
        return this.http.get<any[]>(urlprovide);
    }

    getPublicCardsDescending(idUser: string, hal: number): Observable<any> {
        const urlprovide = `${getPublicCardsDescending}/${idUser}/${hal}`;
        return this.http.get<any[]>(urlprovide);
    }

    getAnsweredCards(idUser: string, hal: number): Observable<any> {
        const urlprovide = `${getAnsweredCards}/${idUser}/${hal}`;
        return this.http.get<any[]>(urlprovide);
    }

    getAnsweredCardsOldest(idUser: string, hal: number): Observable<any> {
        const urlprovide = `${getAnsweredCardsOldest}/${idUser}/${hal}`;
        return this.http.get<any[]>(urlprovide);
    }

    getAnsweredCardsNewest(idUser: string, hal: number): Observable<any> {
        const urlprovide = `${getAnsweredCardsNewest}/${idUser}/${hal}`;
        return this.http.get<any[]>(urlprovide);
    }

    getAnsweredCardsAscending(idUser: string, hal: number): Observable<any> {
        const urlprovide = `${getAnsweredCardsAscending}/${idUser}/${hal}`;
        return this.http.get<any[]>(urlprovide);
    }

    getAnsweredCardsDescending(idUser: string, hal: number): Observable<any> {
        const urlprovide = `${getAnsweredCardsDescending}/${idUser}/${hal}`;
        return this.http.get<any[]>(urlprovide);
    }

    getDismissedCards(idUser: string, hal: number): Observable<any> {
        const urlprovide = `${getDismissedCards}/${idUser}/${hal}`;
        return this.http.get<any[]>(urlprovide);
    }

    getDismissedCardsOldest(idUser: string, hal: number): Observable<any> {
        const urlprovide = `${getDismissedCardsOldest}/${idUser}/${hal}`;
        return this.http.get<any[]>(urlprovide);
    }

    getDismissedCardsNewest(idUser: string, hal: number): Observable<any> {
        const urlprovide = `${getDismissedCardsNewest}/${idUser}/${hal}`;
        return this.http.get<any[]>(urlprovide);
    }

    getDismissedCardsAscending(idUser: string, hal: number): Observable<any> {
        const urlprovide = `${getDismissedCardsAscending}/${idUser}/${hal}`;
        return this.http.get<any[]>(urlprovide);
    }

    getDismissedCardsDescending(idUser: string, hal: number): Observable<any> {
        const urlprovide = `${getDismissedCardsDescending}/${idUser}/${hal}`;
        return this.http.get<any[]>(urlprovide);
    }

    getMysurveyOldest(idUser: string, hal: number): Observable<any> {
        const urlprovide = `${getMysurveyOldest}/${idUser}/${hal}`;
        return this.http.get<any[]>(urlprovide);
    }

    getMysurveyNewest(idUser: string, hal: number): Observable<any> {
        const urlprovide = `${getMysurveyNewest}/${idUser}/${hal}`;
        return this.http.get<any[]>(urlprovide);
    }

    getMysurveyAscending(idUser: string, hal: number): Observable<any> {
        const urlprovide = `${getMysurveyAscending}/${idUser}/${hal}`;
        return this.http.get<any[]>(urlprovide);
    }

    getMysurveyDescending(idUser: string, hal: number): Observable<any> {
        const urlprovide = `${getMysurveyDescending}/${idUser}/${hal}`;
        return this.http.get<any[]>(urlprovide);
    }

    getAssignOldest(idUser: string, hal: number): Observable<any> {
        const urlprovide = `${getAssignOldest}/${idUser}/${hal}`;
        return this.http.get<any[]>(urlprovide);
    }

    getAssignNewest(idUser: string, hal: number): Observable<any> {
        const urlprovide = `${getAssignNewest}/${idUser}/${hal}`;
        return this.http.get<any[]>(urlprovide);
    }

    getAssignAscending(idUser: string, hal: number): Observable<any> {
        const urlprovide = `${getAssignAscending}/${idUser}/${hal}`;
        return this.http.get<any[]>(urlprovide);
    }

    getAssignDescending(idUser: string, hal: number): Observable<any> {
        const urlprovide = `${getAssignDescending}/${idUser}/${hal}`;
        return this.http.get<any[]>(urlprovide);
    }

    sendSurvey(data): Observable<any> {
        return this.http.post<any>(sendSurvey, data, headerConfig);
    }

    sendEmail(dataEmail): Observable<any> {
        return this.http.post<any>(sendEmail, dataEmail, headerConfig);
    }

    triggeranswerfield(idUser: string, idsurvey: number): Observable<any> {
        const urltriggeranswer = `${triggeranswerfield}/${idUser}/${idsurvey}`;
        return this.http.post<any>(urltriggeranswer, headerConfig);
    }

    create(form): Observable<any> {
        return this.http.post<any>(addSurveyUrl, form, headerConfig);
    }

    delete(id: number) {
        const Url = `api/survey/delete-survey/${id}`;
        return this.http.delete(Url);
    }

    dismiss(userId, surveyId) {
        const Url = `api/survey/dismiss-survey/${userId}/${surveyId}`;
        return this.http.delete(Url);
    }

    public uploadImage(image: Blob, nama: string): Observable<any> {
        const formData = new FormData();
        formData.append('name', nama);
        formData.append('image', image);
        return this.http.post(upload, formData);
    }

    // submit response function
    submitresponpage(form): Observable<any> {
        return this.http.post<any>(submitsurvey, form, headerConfig);
    }

    getShowSurveyById(userid: string, id: number, idpage: number): Observable<any> {
        const showUrl = `${getsubmitpage}/${userid}/${id}/${idpage}`;
        return this.http.get(showUrl);
    }
    // end submit function

    // detailview function
    detailview(surveyid: number, index: number): Observable<any>{
        const detailviewurl = `${detailview}/${surveyid}/${index}`;
        return this.http.get(detailviewurl);
    }

    // mockdetailview(surveyid: number): Observable<any>{
    //     const detailviewurl2 = `${dummyurldetail}/${surveyid}`;
    //     return this.http.get(detailviewurl2);
    // }

    highview(surveyid: number, page_number: number): Observable<any>{
        const highviewurl = `${highview}/${surveyid}/${page_number}`;
        return this.http.get(highviewurl);
    }
}
