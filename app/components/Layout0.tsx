import { NPRStory } from "@/lib/types/types";
import Image from "next/image";

const IMAGE_FREQUENCIES = [0.8, 0.7, 0.55, 0.45, 0.35, 0.3, 0.25, 0.2, 0.15, 0.1];

// variable that controls how many story indexes must be iterated through before the standard image frequency gets defaulted to (acts as divider for the defaults) 
const REQUIRED_SPACING = 2;

interface Props {
    storiesArray: NPRStory[];
}

export default async function Layout0({storiesArray}: Props){
    let lastImageIndex: number | null = null;

    return (
        <div className="w-full columns-1 md:columns-2 lg:columns-3 2xl:columns-5 justify-center justify-items-center !gap-x-0 relative ">
            <div id="overlay" className="absolute top-0 left-0  w-full columns-1 md:columns-2 lg:columns-3 2xl:columns-5 !gap-x-0 h-full justify-center z-20 pointer-events-none">
                <div className="border-r-black border-none sm:border-solid sm:border-r-[1px] h-full hidden md:block"></div>
                <div className="border-r-black border-none lg:border-solid lg:border-r-[1px] h-full hidden md:block"></div>
                <div className="border-r-black border-none 2xl:border-solid 2xl:border-r-[1px] h-full hidden lg:block"></div>
                <div className="border-r-black border-none 2xl:border-solid 2xl:border-r-[1px] h-full hidden 2xl:block"></div>
                <div className="border-r-black h-full hidden xl:block"></div>
            </div>
            {storiesArray.map((story, articleIndex) => {

            console.log(story.url)
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
                const spacingFactor = Math.min(distance / REQUIRED_SPACING, 1); // tweak requiredSpacing to control frequency
                adjustedProbability *= spacingFactor; // assignment operator fun!~!
            }

            // console.log("adjusted probability: " + adjustedProbability)

            if (Math.random() < adjustedProbability && story?.image !== "") {
                image = story.image;
                lastImageIndex = articleIndex;
            }
            
            return (
            <div key={"article-" + (articleIndex + 1)} className={`w-[90%] break-inside-avoid justify-start`}>
                <div className="w-full !break-words !hyphens-auto text-[#2f2f2f] flex flex-col items-center relative">
                    {image ? <Image priority={true} width={640} height={480} alt={story.title + "_image"} className="sepia-image mt-4" src={image} /> : null}
                    <p>{story?.imageAlt}</p>
                    <p className="playfair !hyphens-auto text-3xl mt-4 font-bold mb-2 text-center mx-5">{story.title.replace(/\s*:.*/, "")}</p>
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