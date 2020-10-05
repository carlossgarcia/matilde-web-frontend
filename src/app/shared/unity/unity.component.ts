import { Component, OnInit } from '@angular/core';
declare var UnityLoader: any;
declare var UnityProgress: any;

@Component({
  selector: 'app-unity',
  templateUrl: './unity.component.html',
  styleUrls: ['./unity.component.css']
})
export class UnityComponent implements OnInit {

  unityInstance: any;

  constructor() {

  }

  ngOnInit(): void {
    this.unityInstance = UnityLoader.instantiate(
      'unityContainer',
      'assets/unity/Build/build.json',
      { onProgress: UnityProgress }
    );
  }

}
