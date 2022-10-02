import React from "react";
import Header from "../components/Index/Header/Header";
import Story from '../components/Index/Story/Story';
import About from '../components/Index/About/About';
import Features from '../components/Index/Features/Features';
import Team from '../components/Index/Team/Team';
import ContainerComponent from '../components/Container/ContainerComponent';


export default function Home({contractInfo, links, config, rarity, images, rarities,}) {
  return (
      <ContainerComponent about={true} config={config} links={links}>
        <Header contractInfo={contractInfo} />
        <Story />
        <About contractInfo={contractInfo} rarities={rarities} />
        <Features contractInfo={contractInfo} links={links} />
        <Team />
      </ContainerComponent>
  )
}

/*
Essentially, getStaticProps allows you to tell Next.js: “Hey, this page has some data dependencies — so when you pre-render this page at build time, make sure to resolve them first!”
*/


