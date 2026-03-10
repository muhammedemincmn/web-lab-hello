import React from 'react';

type CardVariant = 'elevated' | 'outlined' | 'filled';

interface CardProps {
    variant?: CardVariant;
    title?: string;
    imageSrc?: string;
    imageAlt?: string;
    footer?: React.ReactNode;
    children?: React.ReactNode;
    className?: string;
}

const variantClasses: Record<CardVariant, string> = {
    elevated:
        'bg-white dark:bg-gray-800 shadow-md hover:shadow-lg border border-transparent',
    outlined:
        'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-none',
    filled:
        'bg-surface dark:bg-gray-900 border border-transparent shadow-none',
};

const Card: React.FC<CardProps> = ({
    variant = 'elevated',
    title,
    imageSrc,
    imageAlt = '',
    footer,
    children,
    className = '',
}) => {
    return (
        <article
            className={[
                'rounded-xl overflow-hidden transition-shadow duration-200',
                variantClasses[variant],
                className,
            ].join(' ')}
        >
            {/* Card Image */}
            {imageSrc && (
                <img
                    src={imageSrc}
                    alt={imageAlt}
                    className="w-full h-48 object-cover block"
                />
            )}

            {/* Card Body */}
            <div className="p-5">
                {title && (
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        {title}
                    </h3>
                )}
                <div className="text-sm text-muted dark:text-gray-400">
                    {children}
                </div>
            </div>

            {/* Card Footer */}
            {footer && (
                <div className="px-5 py-3 border-t border-gray-100 dark:border-gray-700">
                    {footer}
                </div>
            )}
        </article>
    );
};

export default Card;
