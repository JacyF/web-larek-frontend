// Success interface
export interface ISuccess {
    orderSuccess: HTMLElement;
    orderSuccessDescription: HTMLElement;
    orderSucessClosebutton: HTMLButtonElement;
    render(total: number): HTMLElement;
}