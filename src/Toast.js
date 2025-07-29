import React, { useState, useEffect } from 'react';
import { CheckCircle, AlertTriangle, XCircle, Info, X } from 'lucide-react';

const Toast = ({
    type = 'info',
    message,
    isVisible,
    onClose,
    duration = 5000,
}) => {
    const [progress, setProgress] = useState(100);

    useEffect(() => {
        if (!isVisible) return;

        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev <= 0) {
                    onClose();
                    return 0;
                }
                return prev - 100 / (duration / 100);
            });
        }, 100);

        return () => clearInterval(interval);
    }, [isVisible, duration, onClose]);

    const getIcon = () => {
        switch (type) {
            case 'success':
                return <CheckCircle className="w-5 h-5" />;
            case 'warning':
                return <AlertTriangle className="w-5 h-5" />;
            case 'error':
                return <XCircle className="w-5 h-5" />;
            default:
                return <Info className="w-5 h-5" />;
        }
    };

    const getStyles = () => {
        switch (type) {
            case 'success':
                return 'border-green-500/50 bg-green-900/30 text-green-200';
            case 'warning':
                return 'border-yellow-500/50 bg-yellow-900/30 text-yellow-200';
            case 'error':
                return 'border-red-500/50 bg-red-900/30 text-red-200';
            default:
                return 'border-blue-500/50 bg-blue-900/30 text-blue-200';
        }
    };

    const getProgressColor = () => {
        switch (type) {
            case 'success':
                return 'bg-green-500';
            case 'warning':
                return 'bg-yellow-500';
            case 'error':
                return 'bg-red-500';
            default:
                return 'bg-blue-500';
        }
    };

    if (!isVisible) return null;

    return (
        <div
            className={`fixed top-4 right-4 z-50 glass-enhanced rounded-xl border p-4 min-w-80 max-w-sm shadow-2xl transform transition-all duration-300 ${
                isVisible
                    ? 'translate-x-0 opacity-100'
                    : 'translate-x-full opacity-0'
            } ${getStyles()}`}
        >
            <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">{getIcon()}</div>
                <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-relaxed">
                        {message}
                    </p>
                </div>
                <button
                    onClick={onClose}
                    className="flex-shrink-0 p-1 rounded-md hover:bg-white/10 transition-colors duration-200"
                >
                    <X className="w-4 h-4" />
                </button>
            </div>

            {/* Progress bar */}
            <div className="mt-3 w-full bg-gray-700/50 rounded-full h-1">
                <div
                    className={`h-1 rounded-full transition-all duration-100 ${getProgressColor()}`}
                    style={{ width: `${progress}%` }}
                ></div>
            </div>
        </div>
    );
};

export default Toast;
