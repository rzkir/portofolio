import { Fragment } from 'react'

import { fetchHomeContents } from '@/utils/FetchHome';

import Home from '@/components/content/Home/Home';

import About from '@/components/content/About/About';

import Achievements from '@/components/content/achievements/Achievements';

import Youtube from '@/components/content/youtube/Youtube';

import Projects from '@/components/content/projects/Projects';

import Skills from '@/components/content/skills/Skils';

import Contact from '@/components/content/contact/Contact';

import { fetchAboutContents } from "@/utils/FetchAbout";

import { fetchYoutubeContents } from "@/utils/FetchYoutube";

import { fetchProjectsContents } from "@/utils/FetchProjects";

import { fetchSkillsContents } from "@/utils/FetchSkils";

import { fetchAchievementsContents } from "@/utils/FetchAchievements";

export default async function HomePage() {
  const homeData = await fetchHomeContents();
  const aboutData = await fetchAboutContents();
  const achievementsData = await fetchAchievementsContents();
  const youtubeData = await fetchYoutubeContents();
  const projectsData = await fetchProjectsContents();
  const skillsData = await fetchSkillsContents();

  return (
    <Fragment>
      <Home homeData={homeData} />
      <About aboutData={aboutData} />
      <Achievements achievementsData={achievementsData} />
      <Youtube youtubeData={youtubeData} />
      <Projects projectsData={projectsData} />
      <Skills skillsData={skillsData} />
      <Contact />
    </Fragment>
  );
}
