import React from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    size?: ButtonSize;
    label?: string;
    children: React.ReactNode;
}

const variantClasses: Record<ButtonVariant, string> = {
    primary:
        'bg-primary text-white hover:bg-primary/90 focus:ring-primary/50 dark:bg-primary dark:hover:bg-primary/80',
    secondary:
        'bg-secondary text-white hover:bg-secondary/90 focus:ring-secondary/50 dark:bg-secondary dark:hover:bg-secondary/80',
    danger:
        'bg-error text-white hover:bg-error/90 focus:ring-error/50 dark:bg-error dark:hover:bg-error/80',
    ghost:
        'bg-transparent text-primary border border-primary hover:bg-primary/10 focus:ring-primary/30 dark:text-secondary dark:border-secondary dark:hover:bg-secondary/10',
};

const sizeClasses: Record<ButtonSize, string> = {
    sm: 'px-3 py-1.5 text-sm rounded-md',
    md: 'px-4 py-2   text-base rounded-lg',
    lg: 'px-6 py-3   text-lg  rounded-xl',
};

const Button: React.FC<ButtonProps> = ({
    variant = 'primary',
    size = 'md',
    label,
    children,
    className = '',
    ...rest
}) => {
    return (
        <button
            aria-label={label}
            className={[
                'inline-flex items-center justify-center font-medium',
                'transition-colors duration-150 cursor-pointer',
                'focus:outline-none focus:ring-2 focus:ring-offset-2',
                'disabled:opacity-50 disabled:cursor-not-allowed',
                variantClasses[variant],
                sizeClasses[size],
                className,
            ].join(' ')}
            {...rest}
        >
            {children}
        </button>
    );
};

export default Button;
