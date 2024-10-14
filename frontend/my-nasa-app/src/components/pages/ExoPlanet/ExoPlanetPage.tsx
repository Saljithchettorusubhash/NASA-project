import React from 'react'
import ExoPlanet from '../../layout/ExpolanentTable/ExoPlanet'
import HabitableChart from '../../layout/HabitableChart/HabitableChart'
import Hero from '../../layout/Hero/Hero'
import exoplanet from '../../../assets/images/exoplanets/exoplanet.jpg'
import Velocity from '../../layout/Velocity/Velocity'


const ExoPlanetPage:React.FC = () => {
  return (
    <div>
        <Hero
  title="Discover New Worlds Beyond Our Solar System"
  subtitle="Join NASA in the search for habitable exoplanets and the quest to answer the age-old question: Are we alone in the universe?"
  backgroundImageUrl={exoplanet}  // Use an appropriate image of an exoplanet or a starry sky
  altText="An artistic rendering of a habitable exoplanet orbiting a distant star."
  buttonText="Explore Exoplanets"
  buttonLink="/explore/exoplanets"
/>
        <ExoPlanet/>
        <HabitableChart/>
        <Velocity/>
    </div>
  )
}

export default ExoPlanetPage