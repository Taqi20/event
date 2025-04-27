import React from 'react';
import Image from 'next/image';

interface AvatarProps {
    src?: string | null;
    alt?: string;
    fallback: React.ReactNode;
    size?: 'sm' | 'md' | 'lg';
    className?: string;
}

const getSizeClasses = (size: AvatarProps['size']) => {
    switch (size) {
        case 'sm':
            return 'h-8 w-8 text-xs';
        case 'lg':
            return 'h-16 w-16 text-xl';
        case 'md':
        default:
            return 'h-12 w-12 text-base';
    }
};

export function Avatar({ src, alt = 'Avatar', fallback, size = 'md', className = '' }: AvatarProps) {
    const sizeClasses = getSizeClasses(size);

    return (
        <div
            className={`relative flex items-center justify-center rounded-full overflow-hidden bg-gray-600 text-white ${sizeClasses} ${className}`}
        >
            {src ? (
                <Image
                    src={src}
                    alt={alt}
                    layout="fill"
                    objectFit="cover"
                    onError={(e) => {
                        e.currentTarget.style.display = 'none';
                    }}
                />
            ) : (
                <span className="select-none font-medium">{fallback}</span>
            )}
            {!src && <span className="absolute inset-0 flex items-center justify-center select-none font-medium">{fallback}</span>}
        </div>
    );
}