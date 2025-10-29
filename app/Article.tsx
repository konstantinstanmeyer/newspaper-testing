import { NPRStory } from "@/lib/types/types";

export default async function Article(){
    console.log(":aisudaiushd")
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/article`);
    
    const data: NPRStory = await res.json();

    console.log(data);

    if (!res.ok) {
        return <p>error</p>
    }

    return (
        <div>
            <p>asdasdad</p>
            <p>{data.title}</p>
            <p>{data.author}</p>
            {data.content.map((paragraph, i) => 
                <p key={`${i}-article-paragraph`}>{paragraph}</p>
            )}
        </div>
    )
}