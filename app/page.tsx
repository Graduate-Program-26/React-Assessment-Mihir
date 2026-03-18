import { SearchBar } from "@/components/SearchBar";

export default function Home() {
  return (
    <>
      <h1>Landing Page</h1>
      <div className="flex mt-4 ml-4 w-full justify-self-center">
        <SearchBar />
      </div>
    </>
  );
}
