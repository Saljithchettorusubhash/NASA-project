import React from 'react'
import ImageGallery from '../../layout/ImageGallery/ImageGallery'
import VideoGallery from '../../layout/VideoGallery/VideoGallery'


const NasaImage:React.FC = () => {
  return (
    <div>
        <ImageGallery/>
        <VideoGallery/>
    </div>
  )
}

export default NasaImage