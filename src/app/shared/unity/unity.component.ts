import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { UnityCache } from 'src/app/classes/unity-cache';
import { TelemetriaService } from 'src/app/services/telemetria.service';
declare var UnityLoader: any;
declare var UnityProgress: any;

@Component({
  selector: 'app-unity',
  templateUrl: './unity.component.html',
  styleUrls: ['./unity.component.scss']
})
export class UnityComponent implements OnInit, OnDestroy {

  unityInstance: any;
  buildJsonUrl = 'assets/unity/Build/build.json';

  @HostListener('window:beforeunload', ['$event'])
  handleBeforeUnload(event) {
    // Finaliza la telemetría si cierra la página
    this.telemetriaS.Final();
  }

  constructor(private telemetriaS: TelemetriaService) {

  }

  ngOnInit(): void {
    //Iniciamos la telemetria
    this.telemetriaS.Inicio();
    // const cache = new UnityCache(this.buildJsonUrl);
    // En este punto los assets están guardados en el servidor
    this.unityInstance = UnityLoader.instantiate(
      'unityContainer',
      this.buildJsonUrl,
      { onProgress: this.UnityProgress }
    );
    // console.log(UnityLoader);

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

  ngOnDestroy() {
    // Finaliza la telemetría si se mueve dentro de la aplicación
    this.telemetriaS.Final();
  }

}
