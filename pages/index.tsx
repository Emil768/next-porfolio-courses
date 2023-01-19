import { Home, AboutBlock } from "components";
import Head from "next/head";

const About = () => {
  return (
    <section>
      <Head>
        <title>Extra school – английский для начинающих</title>
        <meta
          name="description"
          content="Меня зовут Эльнара,уже более 10 лет преподаю английский язык в своей онлайн школе Extra Engl. Имею десятки благодарных студентов, с которыми и по сей день остаюсь на связи."
        />
        <meta
          property="og:title"
          content="Extra school – английский для начинающих"
        />
        <meta
          property="og:description"
          content="Меня зовут Эльнара,уже более 10 лет преподаю английский язык в своей онлайн школе Extra Engl. Имею десятки благодарных студентов, с которыми и по сей день остаюсь на связи."
        />
        <meta
          property="og:image"
          content={
            "https://res.cloudinary.com/dl4ooiriz/image/upload/v1672837860/checklists_cover_m1f4zm.png"
          }
        />
        <meta property="og:type" content="website" />
      </Head>
      <Home />
      <AboutBlock />
    </section>
  );
};

export default About;
