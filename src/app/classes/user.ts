import { ILocalStorageSegCatUsuario } from './core';

export class User {
    constructor(public data: ILocalStorageSegCatUsuario) { }
    get FormatedName(): string {
        return `${this.data.UserCopy.persona.nombre} ${this.data.UserCopy.persona.apellidoPaterno} ${this.data.UserCopy.persona.apellidoMaterno}`;
    }

    get Greetings(): string {
        const hour = new Date().getHours();
        let greet = '';
        if (hour >= 0 && hour <= 11) {
            greet = '¡Buenos días!';
        }
        if (hour >= 12 && hour <= 18) {
            greet = '¡Buenas tardes!';
        }
        if (hour >= 19 && hour <= 23) {
            greet = '¡Buenas noches!';
        }
        return greet;
    }

    get IsAdmin(): boolean {
        return this.data.UserCopy.roles.map(r => r.nombre).includes('administrador');
    }

    get FormatedModules(): Array<{ nombre: string, ruta: string, icono: string }> {
        return this.data.UserCopy.modulos.map(m => ({ nombre: m.nombre, ruta: m.ruta, icono: m.icono }));
    }
}