import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Http, HttpModule, Response, Headers } from '@angular/http';
import { HttpHeaders } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { DragulaModule } from 'ng2-dragula';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import * as $ from 'jquery';
import { CalendarModule } from 'angular-calendar';
import {CalendarprimModule} from 'primeng/calendar';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { RecaptchaModule } from 'ng-recaptcha';
import {
  MatButtonModule,
  MatSelectModule,
  MatCardModule,
  MatCheckboxModule,
  MatSlideToggleModule,
  MatChipsModule,
} from "@angular/material";
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AmazingTimePickerModule } from 'amazing-time-picker';
import { MyDatePickerModule } from 'mydatepicker';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { BoardComponent } from './board/board.component';
import { CardComponent } from './card/card.component';
import { MidComponent } from './mid/mid.component';
import { EditcardComponent } from './editcard/editcard.component';
import { ResumeComponent } from './resume/resume.component';
import { SearchuserComponent } from './searchuser/searchuser.component';
import { RequestsComponent } from './requests/requests.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { AppliedjobsComponent } from './appliedjobs/appliedjobs.component';
import { MatchedjobsComponent } from './matchedjobs/matchedjobs.component';
import { JobsearchComponent } from './jobsearch/jobsearch.component';
import { CalendarComponent } from './calendar/calendar.component';
import { PostjobComponent } from './postjob/postjob.component';
import { MyjobspostComponent } from './myjobspost/myjobspost.component';
import { CandidatematchComponent } from './candidatematch/candidatematch.component';
import { CandidateappliedComponent } from './candidateapplied/candidateapplied.component';
import { ResumesearchComponent } from './resumesearch/resumesearch.component';
import { InterviewsComponent } from './interviews/interviews.component';
import { ViewreferenceComponent } from './viewreference/viewreference.component';
import { ProvidereferenceComponent } from './providereference/providereference.component';
import { ShowofferComponent } from './showoffer/showoffer.component';
import { FriendspageComponent } from './friendspage/friendspage.component';
import { LoginComponent } from './login/login.component';
import { ForgotpassComponent } from './forgotpass/forgotpass.component';
import { DataService } from './data.service';
import { NotfoundComponent } from './notfound/notfound.component';
import { FilterPipe } from './filter.pipe';
import { CreateresumeComponent } from './createresume/createresume.component';
import { SpecardComponent } from './specard/specard.component';
import { CardreqComponent } from './cardreq/cardreq.component';
import { EditofferComponent } from './editoffer/editoffer.component';
import { SpecresumeComponent } from './specresume/specresume.component';
import { EditresumeComponent } from './editresume/editresume.component';
import { ChartComponent } from './chart/chart.component';
import { Filter2Pipe } from './filter2.pipe';
import { AddemployeeComponent } from './addemployee/addemployee.component';
import { ProjdashboardComponent } from './projdashboard/projdashboard.component';
import { CreateprojectComponent } from './createproject/createproject.component';
import { PompombuildComponent } from './pompombuild/pompombuild.component';
import { PompombuildboardComponent } from './pompombuildboard/pompombuildboard.component';
import { CreateissueComponent } from './createissue/createissue.component';
import { BurndownComponent } from './burndown/burndown.component';
import { PriceComponent } from './price/price.component';
import { TaskComponent } from './task/task.component';
import { CreatetestComponent } from './createtest/createtest.component';
import { ListtestComponent } from './listtest/listtest.component';
import { ListtestuserComponent } from './listtestuser/listtestuser.component';
import { AttempttestComponent } from './attempttest/attempttest.component';
import { AssignmentsComponent } from './assignments/assignments.component';
import { CreatesprintComponent } from './createsprint/createsprint.component';
import { SprintComponent } from './sprint/sprint.component';
import { AvailsComponent } from './avails/avails.component';
import { TasksComponent } from './tasks/tasks.component';

const appRoutes: Routes = [
  {
    path: '',
    component: MidComponent
  },
  {
    path: 'card',
    component: CardComponent
  },
  {
    path: 'avail',
    component: AvailsComponent
  },
  {
    path: 'editresume',
    component: EditresumeComponent
  },
  {
    path: 'assignments',
    component: AssignmentsComponent
  },
  {
    path: 'cardreq',
    component: CardreqComponent
  },
  {
    path: 'specard/:id',
    component: SpecardComponent
  },
  {
    path: 'specresume/:id',
    component: SpecresumeComponent
  },
  {
    path: 'editoffer/:id',
    component: EditofferComponent
  },
  {
    path: 'resume',
    component: ResumeComponent
  },
  {
    path: 'createsprint',
    component: CreatesprintComponent
  },
  {
    path: 'createtest',
    component: CreatetestComponent
  },
  {
    path: 'listtest',
    component: ListtestComponent
  },
  {
    path: 'listtestuser',
    component: ListtestuserComponent
  },
  {
    path: 'attempttest',
    component: AttempttestComponent
  },
  {
    path: 'createresume',
    component: CreateresumeComponent
  },
  {
    path: 'card/editcard',
    component: EditcardComponent
  },
  {
    path: 'searchuser',
    component: SearchuserComponent
  },
  {
    path: 'requests',
    component: RequestsComponent
  },
  {
    path: 'privacy',
    component: PrivacyComponent
  },
  {
    path: 'appliedjobs',
    component: AppliedjobsComponent
  },
  {
    path: 'matchedjobs',
    component: MatchedjobsComponent
  },
  {
    path: 'jobsearch',
    component: JobsearchComponent
  },
  {
    path: 'calendar',
    component: CalendarComponent
  },
  {
    path: 'postjob',
    component: PostjobComponent
  },
  {
    path: 'myjobspost',
    component: MyjobspostComponent
  },
  {
    path: 'candidatematch',
    component: CandidatematchComponent
  },
  {
    path: 'candidateapplied',
    component: CandidateappliedComponent
  },
  {
    path: 'resumesearch',
    component: ResumesearchComponent
  },
  {
    path: 'interviews',
    component: InterviewsComponent
  },
  {
    path: 'viewreference',
    component: ViewreferenceComponent
  },
  {
    path: 'providereference',
    component: ProvidereferenceComponent
  },
  {
    path: 'showoffer/:id',
    component: ShowofferComponent
  },
  {
    path: 'friendspage',
    component: FriendspageComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'login',
    children: [
    {
      path: ':name',
      component: LoginComponent
    },
    {
      path: ':name/:id',
      component: LoginComponent
    }
    ]
  },
  {
    path: 'forgotpass',
    component: ForgotpassComponent
  },
  {
    path: 'price',
    component: PriceComponent
  },
  {
    path: 'projdashboard',
    component: ProjdashboardComponent
  },
  {
    path: 'addemployee',
    component: AddemployeeComponent
  },
  {
    path: 'project/:id',
    component: PompombuildComponent
  },
  {
    path: 'projectboard/:id',
    component: PompombuildboardComponent
  },
  {
    path: 'viewtask/:id',
    component: TaskComponent
  },
  {
    path: 'createproject',
    component: CreateprojectComponent
  },
  {
    path: 'createissue',
    component: CreateissueComponent
  },
  {
    path: 'burndown',
    component: SprintComponent
  },
  {
    path: 'chart',
    component: ChartComponent
  },
  {
    path: '**',
    component: NotfoundComponent
  }
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    BoardComponent,
    CardComponent,
    MidComponent,
    EditcardComponent,
    ResumeComponent,
    SearchuserComponent,
    RequestsComponent,
    CreatesprintComponent,
    SprintComponent,
    PrivacyComponent,
    AppliedjobsComponent,
    MatchedjobsComponent,
    JobsearchComponent,
    CalendarComponent,
    PostjobComponent,
    MyjobspostComponent,
    CandidatematchComponent,
    CandidateappliedComponent,
    ResumesearchComponent,
    InterviewsComponent,
    ViewreferenceComponent,
    ProvidereferenceComponent,
    ShowofferComponent,
    FriendspageComponent,
    LoginComponent,
    ForgotpassComponent,
    NotfoundComponent,
    FilterPipe,
    CreateresumeComponent,
    SpecardComponent,
    CardreqComponent,
    EditofferComponent,
    SpecresumeComponent,
    EditresumeComponent,
    ChartComponent,
    Filter2Pipe,
    AddemployeeComponent,
    ProjdashboardComponent,
    CreateprojectComponent,
    PompombuildComponent,
    PompombuildboardComponent,
    CreateissueComponent,
    BurndownComponent,
    PriceComponent,
    TaskComponent,
    TasksComponent,
    CreatetestComponent,
    ListtestComponent,
    ListtestuserComponent,
    AttempttestComponent,
    AssignmentsComponent,
    AvailsComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    CalendarModule.forRoot(),
    NgbModalModule.forRoot(),
    CalendarprimModule,
    CommonModule,
    MatButtonModule,
    MatSelectModule,
    NgxPaginationModule,
    MatCardModule,
    MatSlideToggleModule,
    MatCheckboxModule,
    MatChipsModule,
    MatSnackBarModule,
    AmazingTimePickerModule, 
    MyDatePickerModule,
    DragulaModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule, 
    HttpModule, 
    RecaptchaModule.forRoot(), 
    ReactiveFormsModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
