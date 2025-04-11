export function Skeleton({ className = '' }: any) {
    return (
        <div
            className={`animate-pulse rounded-md bg-gray-200 dark:bg-gray-800 ${className}`}
        />
    );
}
