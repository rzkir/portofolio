import { Fragment } from 'react'

import { fetchHomeContents } from '@/utils/FetchHome';

import Home from '@/components/content/home/Home';

import About from '@/components/content/about/About';

import Achievements from '@/components/content/achievements/Achievements';

import Youtube from '@/components/content/youtube/Youtube';

import Projects from '@/components/content/projects/Projects';

import Skills from '@/components/content/skills/Skils';

import Articles from '@/components/content/articles/Articles';

import { fetchAboutContents } from "@/utils/FetchAbout";

import { fetchYoutubeContents } from "@/utils/FetchYoutube";

import { fetchProjectsContents } from "@/utils/FetchProjects";

import { fetchSkillsContents } from "@/utils/FetchSkils";

import { fetchAchievementsContents } from "@/utils/FetchAchievements";

import { fetchArticlesContents } from "@/utils/FetchArticles"

export default async function HomePage() {
  const homeData = await fetchHomeContents();
  const aboutData = await fetchAboutContents();
  const achievementsData = await fetchAchievementsContents();
  const youtubeData = await fetchYoutubeContents();
  const projectsData = await fetchProjectsContents();
  const skillsData = await fetchSkillsContents();
  const articlesData = await fetchArticlesContents();

  return (
    <Fragment>
      <Home homeData={homeData} />
      <About aboutData={aboutData} />
      <Achievements achievementsData={achievementsData} />
      <Skills skillsData={skillsData} />
      <Projects projectsData={projectsData} />
      <Youtube youtubeData={youtubeData} />
      <Articles articlesData={articlesData} />
    </Fragment>
  );
}
