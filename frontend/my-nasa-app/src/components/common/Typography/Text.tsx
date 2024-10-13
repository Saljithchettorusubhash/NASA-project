import clsx from 'clsx';
import React from 'react'

interface TextProps {
    children:React.ReactNode;
    size?:'small' | 'medium' | 'large';
    className?: string;

}

const Text:React.FC<TextProps>= ({children,size='medium',className}) => {

    const baseStyle = clsx(
        {
            'text-sm': size === 'small',
            'text-base': size === 'medium',
            'text-lg': size === 'large',
          },
        'text-gray-300',
        className
    )

    return <span className={baseStyle}>{children}</span>;


}

export default Text