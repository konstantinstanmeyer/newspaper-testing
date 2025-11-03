import { NPRStory } from "@/lib/types/types";

const STYLES = [
    "bold font-3xl uppercase",
    ""
]

async function fetchArticles(url: string): Promise<NPRStory[]> {
    try {
        const res = await fetch(url);

        if (!res.ok) {
        console.error("Fetch failed with status:", res.status);
        return [];
        }

        const data = await res.json();

        if (!Array.isArray(data)) {
        console.error("API returned invalid data:", data);
        return [];
        }

        return data;
    } catch (err) {
        console.error("Error fetching NPR articles:", err);
        return [];
    }
}

export default async function Articles(){
    let storiesArray: NPRStory[] = []
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/daily-articles`);
        if (!res.ok){
            console.log("error: " + res.status)
        } else {
            const data = await res.json();
            storiesArray = data;
        }
    } catch(e){
        console.log("Server side error fetching npr stories. Error: " + (e as Error).message)
    }

    const IMAGE_FREQUENCIES = [0.8, 0.7, 0.55, 0.45, 0.35, 0.30, 0.25, 0.20, 0.15, 0.10];
    let lastImageIndex: number | null = null;
    const requiredSpacing = 5; // number of articles to “recover” full probability

    return (
        <div className="w-full grid grid-cols-5 border-collapse gap-y-0">
            {storiesArray.map((story, articleIndex) => {
            const isLastColumn = articleIndex === 4;

            // determine whether this article should have an image
            let image: string | null = null;

            const baseProbability = IMAGE_FREQUENCIES[articleIndex] ?? 0.25;
            let adjustedProbability = baseProbability;

            if (lastImageIndex !== null) {
                const distance = articleIndex - lastImageIndex;
                // checks for distance from last printed image, influencing the chance of whether another should appear or not
                // taken from some AI generated BS (likely BS, i will say) so this probability should be studied in practice, or just find a better, factually backed statistic...
                // this math may need to be double-checked at a later time, as it was taken from a data pool where the article index may have already affected the probability
                // meaning this math entirely assumes the base probability, but this critique/assumption may not be correct and or may not be causing as large an influence as i assume
                const spacingFactor = Math.min(distance / requiredSpacing, 1); // tweak requiredSpacing to control frequency
                adjustedProbability *= spacingFactor; // assignment operator fun!~!
            }

            console.log("adjusted probability: " + adjustedProbability)

            if (Math.random() < adjustedProbability) {
                image = story.image;
                lastImageIndex = articleIndex;
            }
            
            return (
                <div key={"article-" + (articleIndex + 1)} className={`px-5 ${!isLastColumn ? "border-r-1 border-[#2f2f2f]" : ""}`}>
                <div className="w-full !break-words !hyphens-auto text-[#2f2f2f] flex flex-col items-center relative">
                    {image ? <img className="sepia-image mt-4" src={image} /> : null}
                    <p>{story?.imageAlt}</p>
                    <p className="playfair !hyphens-auto text-3xl mt-4 font-bold mb-2 text-center mx-5">{story.title}</p>
                    <p className="playfair font-bold border-t-[1px] border-b-[1px] py-1.5 mt-3 border-[#2f2f2f] w-fit mb-4 text-center">
                        by <span className="uppercase">{story?.author ? story.author : story?.publication ? story.publication : "UNKNOWN"}</span>
                    </p>
                    {story.content?.map((paragraph, i) =>
                        <p className="source text-sm mb-2" key={`${i}-story-paragraph`}>{paragraph}</p>
                    )}
                </div>
        </div>
    )
  })}
</div>
    )
}