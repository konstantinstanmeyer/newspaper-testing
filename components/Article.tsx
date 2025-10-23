import { FeedItem } from "@/lib/types/types";

export default function Article(data: FeedItem){
    return (
        <>
            <h2>{data.title}</h2>
            <h4>{data.author}</h4>
        </>
    )
}