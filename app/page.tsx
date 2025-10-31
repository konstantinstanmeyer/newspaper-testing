import Articles from "@/app/components/Articles";

export default function Home() {
  console.log('asdf')
  return (
    <div className="bg-[#f9f7f1] text-[#2f2f2f] flex flex-col relative playfair font-black">
      <div className="relative w-full flex justify-center items-center">
        <header className="text-[80px]">NEWS POST</header>
      </div>
      <div className="w-full h-10 border-t-[2px] border-b-[2px] border-[#2f2f2f] flex items-center justify-center mb-8">
        <p className="text-sm font-semibold">BOSTON, MA - THURSDAY OCTOBER 30, 2025 - FIRST PRESS</p>
      </div>
      <Articles />
    </div>
  );
}
