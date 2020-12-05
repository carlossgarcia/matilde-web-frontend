export interface ISegCatUsuario {
    activo: boolean;
    correo: string;
    cvePersonaId: number;
    cveUsuario: number;
    fechaRegistro: string;
    registroCompleto: boolean;
    usuario: string;
    persona: IMaPersona;
    roles: IRolesUsuario[];
    modulos: IModulosUsuario[];
}
export interface IMaPersona {
    activo: boolean;
    apellidoMaterno: string;
    apellidoPaterno: string;
    cvePersona: number;
    cvePersonaReg: number;
    imagen: string;
    nombre: string;
    registroCompleto: boolean;
    tokenSeguimientoRegistro: string;
}

export interface ILocalStorageSegCatUsuario {
    UserCopy: ISegCatUsuario;
    exp: number;
    iat: number;
}

export interface IRolesUsuario {
    activo: boolean;
    cveRol: number;
    nombre: string;
    rol: ISegCatRol;
}

export interface ISegCatRol {
    activo: boolean;
    cveRol: number;
    nombre: string;
}

export interface IModulosUsuario {
    activo: boolean,
    id: number;
    modulo: {
        activo: boolean;
        cveModulo: number;
        cvePersonaReg: number;
        nombre: string;
        ruta: string;
        icono: string;
    }
}