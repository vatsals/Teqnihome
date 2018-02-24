import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DragulaModule } from 'ng2-dragula';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatSelectModule,
  MatCardModule,
  MatCheckboxModule,
  MatSlideToggleModule,
  MatChipsModule,
} from "@angular/material";

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
    CalendarComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    MatButtonModule,
    MatSelectModule,
    MatCardModule,
    MatSlideToggleModule,
    MatCheckboxModule,
    MatChipsModule,
    DragulaModule,
    BrowserAnimationsModule,
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
