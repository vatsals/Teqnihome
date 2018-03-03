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
import {
  MatButtonModule,
  MatSelectModule,
  MatCardModule,
  MatCheckboxModule,
  MatSlideToggleModule,
  MatChipsModule,
} from "@angular/material";
import { MatSnackBarModule } from '@angular/material/snack-bar';

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
    path: 'resume',
    component: ResumeComponent
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
    path: 'showoffer',
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
    FilterPipe
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    MatButtonModule,
    MatSelectModule,
    NgxPaginationModule,
    MatCardModule,
    MatSlideToggleModule,
    MatCheckboxModule,
    MatChipsModule,
    MatSnackBarModule,
    DragulaModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule, 
    HttpModule, 
    ReactiveFormsModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
