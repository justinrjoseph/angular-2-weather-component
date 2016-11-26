export class Weather {
    constructor(
        public temperature: number,
        public summary: string,
        public wind: number,
        public humidity: number,
        public icon: string
    ) {}
}