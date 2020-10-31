/**
 * Función que borra la información del usuario del localhost y reinicia la página
 * Hace parcialmente lo mismo que DestroySessionInformation en AuthService.ts
 * TODO: Agregar un modal que avise al usuario que se tiene que volver a loggear.
 */
export function HTTP_INTERCEPTOR_SESSION_DESTROYER(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    location.reload();
}
