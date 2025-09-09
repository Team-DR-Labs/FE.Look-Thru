import { Toaster } from "react-hot-toast";
import "../globals.css";

export default function SelectClothesLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div>
            <Toaster />
            {children}
        </div>
    );
}
