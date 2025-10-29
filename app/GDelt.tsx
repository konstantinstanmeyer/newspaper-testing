
import { NPRStory } from "@/lib/types/types";
import Article from "./Article";

export default function GDelt(){
    // const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/gdelt?theme=LEADER&count=10`);

    console.log("hello")

    return (
        <div>
            <Article />
        </div>
    )
}