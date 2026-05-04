import Link from "next/link";

export default function NotFoundPage() {
    return (
        <div className="min-h-screen font-mono flex items-center justify-center p-6">
            <div className="text-center space-y-6">

                <p className="text-xl uppercase tracking-widest">404</p>

                <h1 className="text-6xl font-bold">
                    Not Found
                </h1>

                <p className="text-xl max-w-xs mx-auto">
                    This page does not exist.
                </p>

                <div className="border rounded-xl p-4 text-left text-sm inline-block hover:bg-emerald-800">
                    <Link
                        href="/landing"
                        className="text-emerald-400 hover:underline underline-offset-4"
                    >
                        Go to Landing Page
                    </Link>
                </div>

            </div>
        </div>
    );
}