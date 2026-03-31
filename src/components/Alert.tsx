import React, { useState } from 'react';

type AlertVariant = 'info' | 'success' | 'warning' | 'error';

interface AlertProps {
    variant?: AlertVariant;
    title?: string;
    children: React.ReactNode;
    dismissible?: boolean;
    className?: string;
}

const config: Record<AlertVariant, { bg: string; border: string; icon: string; text: string }> = {
    info: {
        bg: 'bg-blue-50 dark:bg-blue-950/40',
        border: 'border-blue-300 dark:border-blue-700',
        icon: 'ℹ️',
        text: 'text-blue-800 dark:text-blue-200',
    },
    success: {
        bg: 'bg-green-50 dark:bg-green-950/40',
        border: 'border-green-300 dark:border-green-700',
        icon: '✅',
        text: 'text-green-800 dark:text-green-200',
    },
    warning: {
        bg: 'bg-yellow-50 dark:bg-yellow-950/40',
        border: 'border-yellow-300 dark:border-yellow-700',
        icon: '⚠️',
        text: 'text-yellow-800 dark:text-yellow-200',
    },
    error: {
        bg: 'bg-red-50 dark:bg-red-950/40',
        border: 'border-red-300 dark:border-red-700',
        icon: '❌',
        text: 'text-red-800 dark:text-red-200',
    },
};

const Alert: React.FC<AlertProps> = ({
    variant = 'info',
    title,
    children,
    dismissible = false,
    className = '',
}) => {
    const [dismissed, setDismissed] = useState(false);

    if (dismissed) return null;

    const { bg, border, icon, text } = config[variant];

    return (
        <div
            role="alert"
            aria-live="polite"
            className={[
                'flex items-start gap-3 rounded-xl border p-4 text-sm transition-all',
                bg,
                border,
                text,
                className,
            ].join(' ')}
        >
            {/* Icon */}
            <span className="text-base shrink-0 mt-0.5" aria-hidden="true">{icon}</span>

            {/* Content */}
            <div className="flex-1 min-w-0">
                {title && <p className="font-semibold mb-0.5">{title}</p>}
                <div>{children}</div>
            </div>

            {/* Dismiss button */}
            {dismissible && (
                <button
                    type="button"
                    aria-label="Uyarıyı kapat"
                    onClick={() => setDismissed(true)}
                    className="shrink-0 text-lg leading-none hover:opacity-70 focus:outline-none focus:ring-2 focus:ring-current rounded"
                >
                    ×
                </button>
            )}
        </div>
    );
};

export default Alert;
