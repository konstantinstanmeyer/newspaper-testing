
import { NPRStory } from "@/lib/types/types";
import Article from "./components/Articles";

export default function GDelt(){
    // const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/gdelt?theme=LEADER&count=10`);

    console.log("hello");

    // add logic for text to fall into one of three categories: bold and not italic, italic and thin and all capitalised, lastly italic and thing and all normal-case (Like This)

    return (
        <div>
            <Article />
        </div>
    )
}