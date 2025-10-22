import { FeedItem } from "@/types/types";

export default async function Newsfeed(){
    const res = await fetch("http://localhost:3000/api/npr");

    const data = await res.json();

    return (
        <div className="flex">
            <div className="flex flex-wrap w-screen relative justify-center">
                {data.map((article: FeedItem, i: number) =>
                    <div key={i + "feed-item"} className="m-2 p-2 bg-amber-400 w-1/2 [&>*]:my-2">
                        <p><strong>Title</strong> {article.title}</p>
                        {article.author !== "The Associated Press" ? <p><strong>Author</strong> {article.author}</p> : null}
                        <p><strong>Content</strong> {article.description}</p>
                        {article.image !== "undefined" ? <img className="aged contrast-100 bg-white" src={article.image} /> : null}
                    </div>
                )}
            </div>
        </div>
    )
}