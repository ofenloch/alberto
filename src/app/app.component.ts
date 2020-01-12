import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Alberto';

  constructor() {
    // This won't work because the HTML is not there yet.
    // So we have to add ngOnInit() and call activateTab there.
    // this.activateTab('Input');
  }

  ngOnInit() {
    this.activateTab('Input');
  }

  activateTab(tabId: string): void {
    // Get all elements with class="tabcontent" and hide them
    const tabcontent = document.getElementsByClassName('tabcontent') as HTMLCollectionOf<HTMLElement>;
    for (let i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = 'none';
    }
    // Get all elements with class="tablinks" and remove the class "active"
    const tablinks = document.getElementsByClassName('tablinks');
    for (let i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(' active', '');
    }
    // Show the current tab, and add an "active" class to the button that opened the tab
    const newActiveTab = document.getElementById(tabId);
    newActiveTab.style.display = 'block';
    newActiveTab.className += ' active';
  }
}
