import React from "react";

import Header from '../components/Header/Header';
import Story from '../components/Story/Story';
import About from '../components/About/About';
import Features from '../components/Features/Features';

import Team from '../components/Team/Team';
import ContainerComponent from '../components/Container';


export default function Home({contractInfo, links, config, rarity, images, rarities,}) {
  return (
    <>
      <ContainerComponent about={true} config={config} links={links}>
        <Header contractInfo={contractInfo} />
        <Story />
        <About contractInfo={contractInfo} images={images} rarity={rarity} rarities={rarities} />
        <Features contractInfo={contractInfo} links={links} />
        <Team />
      </ContainerComponent>
    </>
  )
}

/*
Essentially, getStaticProps allows you to tell Next.js: “Hey, this page has some data dependencies — so when you pre-render this page at build time, make sure to resolve them first!”
*/


