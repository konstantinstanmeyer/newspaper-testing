export interface DailyArticleModel {
    url: string;
    title: string;
    publication: string;
    author: string | null;
    date: string;
    image: string | null;
    content: Array<string>;
}