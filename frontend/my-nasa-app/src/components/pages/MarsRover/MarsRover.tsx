import React from 'react'
import Hero from '../../layout/Hero/Hero'
import marsRover from '../../../assets/images/MarsRover/MarsRover.jpg'
import RoverSection from '../../layout/RoverSection/RoverSection'

const MarsRover:React.FC = () => {
  return (
    <div>
        <Hero
  title="NASA's Perseverance Rover"
  subtitle="Exploring the Red Planet for Signs of Ancient Life"
  backgroundImageUrl={marsRover}
  altText="NASA's Perseverance Rover exploring Mars."
  buttonText="Discover the Mission"
  buttonLink="/missions/perseverance"
/>
<RoverSection roverName='CURIOSITY'/>

<RoverSection roverName='PERSEVERANCE'/>

    </div>
  )
}

export default MarsRover