import type { User } from "../auth";
import { HomeHero } from "../components/HomeHero";
import { HomeShortcuts } from "../components/HomeShortcuts";
import { HomeFocus } from "../components/HomeFocus";
import { HomeDeadlines } from "../components/HomeDeadlines";
import { HomeSharing } from "../components/HomeSharing";

type HomePageProps = {
  user: User | null;
  language: "pl" | "en";
};

const HomePage = ({ user, language }: HomePageProps) => {
  const name = user?.username || (language === "pl" ? "Twórco" : "Maker");
  const greeting =
    language === "pl"
      ? `Cześć ${name}! Jak się dziś czujesz?`
      : `Hi ${name}! How are you today?`;

  return (
    <section className="page home-page">
      <div className="home-grid">
        <HomeHero greeting={greeting} />
        <HomeShortcuts />
        <HomeFocus />
        <HomeDeadlines />
        <HomeSharing />
      </div>
    </section>
  );
};

export default HomePage;
