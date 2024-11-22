export interface MediaImpl {
    height: number,
    width: number,

    Full(): string,

    Middle(): string,
}

export class Media implements MediaImpl{
    Full(): string {
        return "height: "+ this.height + " px;" + "width: "+ this.width + " px;";
    }
    Middle():string{
        return "height: "+ this.height / 2 + " px;" + "width: "+ this.width  / 2+ " px;";

    }

    public height: number;
    public width: number;
    constructor() {
        const [height, width] = [window.outerHeight, window.outerWidth];
        this.height = height;
        this.width = width;
    }
}

export const media = new Media();
