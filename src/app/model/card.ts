export class Card {
    constructor(
        public name: String,
        public image: String,
        public birthday: number,
        public planet: String,
        public planets: object
    ) {}
}
export interface IPagedResults<T> {
    totalRecords: number;
    results: T;
};
