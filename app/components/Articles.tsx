import { NPRStory } from "@/lib/types/types";

const STYLES = [
    "bold font-3xl uppercase",
    ""
]

export default async function Articles(){
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/article`);
    
    const storiesArray: Array<NPRStory> = await res.json();

    const IMAGE_FREQUENCIES = [0.88, 0.76, 0.60, 0.52, 0.45, 0.40, 0.35, 0.30, 0.28, 0.25];

    if (!res.ok) {
        return <p>error</p>
    }

    return (
        <div className="w-full grid grid-cols-5 border-collapse">
            {storiesArray.map((story, articleIndex) => {
            const isLastColumn = articleIndex === 4;

            // determine whether this article should have an image
            let image: string | null = null;
            const probability = IMAGE_FREQUENCIES[articleIndex] ?? 0;
            if (Math.random() < probability) {
                image = story?.image;
            }
            return (
                <div key={"article-" + (articleIndex + 1)} className={`px-5 ${!isLastColumn ? "border-r-1 border-[#2f2f2f]" : ""}`}>
                <div className="w-full text-[#2f2f2f] flex flex-col items-center">
                    <p className="playfair text-3xl font-bold uppercase mb-2 text-center">{story.title}</p>
                    <p className="playfair font-bold border-t-[1px] border-b-[1px] py-1.5 mt-3 border-[#2f2f2f] w-fit mb-4">
                        by <span className="uppercase">{story?.author ? story.author : story?.publication ? story.publication : "UNKNOWN"}</span>
                    </p>
                    {story.content.map((paragraph, i) =>
                        <p className="source text-sm" key={`${i}-story-paragraph`}>{paragraph}</p>
                    )}
                </div>
        </div>
    )
  })}
</div>
    )
}