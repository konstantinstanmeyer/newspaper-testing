import Articles from "@/app/components/Articles";

export default async function Home() {

  return (
    <div className="bg-[#f9f7f1] min-h-screen items-center flex flex-col relative text-[#2f2f2f]">
      <div className="relative w-full flex justify-center items-center mt-4">
        <header className="text-[100px] mx-4 manufacturing text-center leading-none mb-2">The Open Dispatch</header>
      </div>
      <div className="w-full h-fit border-t-[2px] border-b-[1px] border-[#2f2f2f] flex items-center justify-center pt-[2px] pb-[2px]">
        <p className="text-sm font-semibold libre text-center tracking-widest border-t-[1px] border-b-[2px] w-full p-0 m-0 h-fit">BOSTON, MA - THURSDAY OCTOBER 30, 2025 - FIRST PRESS</p>
      </div>
      <Articles />
    </div>
  );
}