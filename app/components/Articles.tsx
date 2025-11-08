import { fetchArticles } from "@/lib/nprClient";
import Layout0 from "./Layout0";
import Layout1 from "./Layout1";

// const STYLES = [
//     "bold font-3xl uppercase",
//     ""
// ]

const LAYOUTS = [Layout1]

// add a fix for quotations in "centered" text boxes returned by npr.

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