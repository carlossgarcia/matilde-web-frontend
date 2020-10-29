import { Component, OnInit } from '@angular/core';
declare var UnityLoader: any;
declare var UnityProgress: any;

@Component({
  selector: 'app-unity',
  templateUrl: './unity.component.html',
  styleUrls: ['./unity.component.scss']
})
export class UnityComponent implements OnInit {

  unityInstance: any;

  constructor() {

  }

  ngOnInit(): void {
    this.unityInstance = UnityLoader.instantiate(
      'unityContainer',
      'assets/unity/Build/build.json',
      { onProgress: this.UnityProgress }
    );
  }

  UnityProgress(unityInstance, progress) {
    if (!unityInstance.Module) {
      return;
    }
    (document.querySelector('#progress-bar') as HTMLElement).style.width = (100 * progress) + '%';
    if (progress == 1) {
      document.querySelector('#progress-bar-container').remove();
      document.querySelector('#msg').remove();
      unityInstance.logo.style.display = unityInstance.progress.style.display = 'none';
    }
  }

}
