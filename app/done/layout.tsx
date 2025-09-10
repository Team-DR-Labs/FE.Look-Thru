import { Toaster } from "react-hot-toast";
import "../globals.css";

export default function DoneLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="h-dvh">
            <Toaster />
            {children}
        </div>
    );
}
