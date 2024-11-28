
// Placed order - displaying message
export interface ISuccess {
    success: HTMLElement;
    description: HTMLElement;
    button: HTMLButtonElement;
    render(total: number): HTMLElement;
}