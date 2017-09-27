import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { DepositPage } from "../deposit/deposit";
import { ApprovePage } from "../approve/approve";
import { SummaryPage } from "../summary/summary";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = DepositPage;
  tab3Root = ApprovePage;
  tab4Root = SummaryPage;
  constructor() {

  }
}
