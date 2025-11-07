import { fetchArticles } from "@/lib/nprClient";
import Image from "next/image";
import Layout0 from "./Layout0";
import Layout1 from "./Layout1";

// const STYLES = [
//     "bold font-3xl uppercase",
//     ""
// ]

const LAYOUTS = [Layout0]

export default async function Articles(){
  const storiesArray = await fetchArticles();
  const randomIndex = Math.floor(Math.random() * LAYOUTS.length);

  if (!storiesArray.length) {
      return <p>No articles available at this time.</p>;
  }

  const SelectedLayout = LAYOUTS[randomIndex];

  return (
    <>
      <SelectedLayout storiesArray={storiesArray} />;
    </>
  )
}