import { Mail } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-gray-100 py-6 px-6 text-center text-gray-600 w-full">
            <p className="text-sm">
                This website is part of my school graduation project and is non-profit. Feel free to contact me if you need to remove your video or have any concerns.
            </p>
            <div className="flex justify-center items-center gap-2 mt-2">
                <Mail className="h-5 w-5 text-gray-500" />
                <a href="mailto:lephiphatphat@gmail.com" className="text-primary hover:underline">
                    lephiphatphat@gmail.com
                </a>
            </div>
        </footer>
    );
}
