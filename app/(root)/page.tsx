import Carousel from "@/components/Carousel";
import CreateRecipes from "@/components/CreateRecipes";
import Welcome from "@/components/Welcome";
import HomeCollection from "@/components/collections/HomeCollection";

export default function Home() {
  return (
    <>
      <Carousel />
      <Welcome />
      <HomeCollection />
      <CreateRecipes />
    </>
  );
}
