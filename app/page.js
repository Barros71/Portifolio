
import Hero from "./_components/hero";
import Menu from "./_components/menu";
import Projetos from "./_components/projetos";

export default function Home() {
  return (
    <div className="flex flex-col justify-center ">
      <Menu />
      <Hero />
      <Projetos />

    </div>
  );
}
