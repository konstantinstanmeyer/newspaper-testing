import Articles from "@/app/components/Articles";

export default async function Home() {

  return (
    <div className="bg-[#f9f7f1] text-[#2f2f2f] flex flex-col relative playfair font-black">
      <div className="relative w-full flex justify-center items-center">
        <header className="text-[80px] mx-4 text-center leading-none mb-2">NEWS POST</header>
      </div>
      <div className="w-full h-10 border-t-[2px] border-b-[2px] border-[#2f2f2f] flex items-center justify-center mb-8">
        <p className="text-sm font-semibold text-center mx-4">BOSTON, MA - THURSDAY OCTOBER 30, 2025 - FIRST PRESS</p>
      </div>
      <Articles />
    </div>
  );
}