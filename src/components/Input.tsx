import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    id: string;
    label: string;
    helpText?: string;
    error?: string;
}

const Input: React.FC<InputProps> = ({
    id,
    label,
    helpText,
    error,
    className = '',
    ...rest
}) => {
    const helpId = `${id}-help`;
    const errorId = `${id}-error`;
    const describedBy = [
        helpText ? helpId : '',
        error ? errorId : '',
    ].filter(Boolean).join(' ') || undefined;

    return (
        <div className="flex flex-col gap-1">
            {/* Label */}
            <label
                htmlFor={id}
                className="text-sm font-medium text-gray-700 dark:text-gray-300"
            >
                {label}
            </label>

            {/* Input */}
            <input
                id={id}
                aria-describedby={describedBy}
                aria-invalid={error ? 'true' : undefined}
                className={[
                    'w-full rounded-lg border px-3 py-2 text-base',
                    'bg-white dark:bg-gray-800',
                    'text-gray-900 dark:text-gray-100',
                    'transition-colors duration-150',
                    'focus:outline-none focus:ring-2 focus:ring-offset-1',
                    error
                        ? 'border-error focus:ring-error/50'
                        : 'border-gray-300 dark:border-gray-600 focus:ring-secondary/50 focus:border-secondary',
                    className,
                ].join(' ')}
                {...rest}
            />

            {/* Help text */}
            {helpText && !error && (
                <p id={helpId} className="text-xs text-muted dark:text-gray-400">
                    {helpText}
                </p>
            )}

            {/* Error message */}
            {error && (
                <p id={errorId} role="alert" className="text-xs text-error dark:text-red-400 font-medium">
                    {error}
                </p>
            )}
        </div>
    );
};

export default Input;
