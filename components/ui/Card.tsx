export function Card({ children, className = '' }: any) {
    return <div className={`rounded-2xl shadow-md bg-white ${className}`}>{children}</div>;
}

export function CardContent({ children, className = '' }: any) {
    return <div className={`p-4 ${className}`}>{children}</div>;
}
