import React from "react"
import BackgroundImage from "../../layout/Background/BackgroundImage"
import Hero from "../../layout/Hero/Hero"
import Carousel from "../../layout/Carousel/Carousel"
import GlobeWrapper from "../../layout/GlobalParent/GlobalParent"
import GlobeDetailsWrapper from "../../layout/GlobeDetailsWrapper/GlobeDetailsWrapper"



const Home = () => {
  return (
    <div>
     <BackgroundImage/>
    <Hero
  title="NASA's Artemis Mission"
  subtitle="Returning Humans to the Moon"
  backgroundImageUrl="https://d1o72l87sylvqg.cloudfront.net/blue-origin/BlueMoon_Home-Hero.png"
  altText="NASA's Artemis mission aiming to return humans to the Moon."
  buttonText="Learn More"
  buttonLink="/missions/artemis"
/>
<Carousel/>
<GlobeWrapper/>
<GlobeDetailsWrapper/>
    </div>
  )
}

export default Home