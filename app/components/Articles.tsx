import { NPRStory } from "@/lib/types/types";

const STYLES = [
    "bold font-3xl uppercase",
    ""
]

export default async function Articles(){
    console.log(":aisudaiushd")
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/article`);
    
    const storiesArray: Array<NPRStory> = await res.json();

    console.log(storiesArray);

    if (!res.ok) {
        return <p>error</p>
    }

    return (
        <>
            {storiesArray.map((story, articleIndex) => {
                // const styleA
                return (<div key={"article-"+ (articleIndex + 1)} className="w-1/4 text-[#2f2f2f] flex flex-col items-center">
                    <p className="playfair text-3xl font-bold uppercase mb-2 text-center">{story.title}</p>
                    {story?.author ? <p className="playfair font-bold border-t-[1px] border-b-[1px] py-2 border-[#2f2f2f] w-fit">by <span className="uppercase">{story.author}</span></p> : null}
                    {story.content.map((paragraph, i) =>
                        <p className="source text-sm" key={`${i}-storu-paragraph`}>{paragraph}</p>
                    )}
                </div>)
            }
            )}
        </>
    )
}