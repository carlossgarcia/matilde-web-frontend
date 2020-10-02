class SpanSpinner {
    get spinner(): HTMLSpanElement {
        const span = document.createElement('span') as HTMLSpanElement;
        span.classList.add('spinner-border', 'spinner-border-sm');
        span.setAttribute('role', 'status');
        span.setAttribute('aria-hidden', 'true');
        return span;
    }
}

export class SpinnerUtilities {
    constructor(public targetBtn: HTMLButtonElement) { }

    AddSpinnerToButton(): Promise<void> {
        return new Promise((resolve, reject) => {
            this.targetBtn.addEventListener('click', () => {
                this.targetBtn.textContent = '';
                const spinner = new SpanSpinner().spinner;
                this.targetBtn.appendChild(spinner);
                resolve();
            });
        });
    }

    RemoveSpinnerFromButton(msg: string): Promise<void> {
        return new Promise((resolve, reject) => {
            this.targetBtn.innerHTML = '';
            this.targetBtn.textContent = msg;
            resolve();
        });
    }
}