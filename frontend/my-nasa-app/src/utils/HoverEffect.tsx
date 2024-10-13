import React from 'react'

interface HoverEffectProps {
    nasaId: string;
    keywords: string[];
}

const HoverEffect:React.FC<HoverEffectProps> = ({nasaId,keywords}) => {
  return (
    <div className='hover-content absolute inset-0 bg-black bg-opacity-60 opacity-0 hover:opacity-100 transition-opacity duration-300 text-white flex flex-col justify-center items-center p-2'>
        <p className='text-sm'>NASA ID:{nasaId}</p>
        <p className="text-xs">{keywords?.join(', ')}</p>

    </div>
  )
}

export default HoverEffect