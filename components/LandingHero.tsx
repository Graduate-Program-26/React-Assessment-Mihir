import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";

export function LandingHero() {
    return (
        <div className="min-h-screen font-mono flex flex-col items-center justify-center p-6 relative overflow-hidden">

            <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
                    backgroundSize: "40px 40px",
                }}
            />

            <div className="relative z-10 flex flex-col items-center text-center max-w-lg gap-8">
                <div className="inline-flex items-center gap-2 border border-emerald-500/20 bg-emerald-500/5 text-emerald-400 text-xl px-3 py-1.5 rounded-full">
                    Built with the GitHub API
                </div>

                <div className="space-y-2">
                    <h1 className="text-4xl sm:text-5xl font-boldleading-tight tracking-tight">
                        GitHub portfolios,
                    </h1>
                    <h1 className="text-4xl sm:text-5xl font-bold leading-tight tracking-tight text-emerald-400">
                        done better.
                    </h1>
                </div>

                <p className="text-[#555] text-sm sm:text-base max-w-sm leading-relaxed">
                    Search any GitHub user and instantly view their repositories, contributions, and activity in one clean view.
                </p>

                <Link
                    href="/login"
                    className="inline-flex items-center justify-center border gap-2 text-sm font-bold px-6 py-3 rounded-lg hover:bg-emerald-400 transition-colors duration-200"
                >
                    Continue to Login <FaArrowRight size={20} />
                </Link>

                <div className="flex flex-wrap justify-center gap-2">
                    {["Top repositories", "Contribution graph", "Activity feed"].map((f) => (
                        <span
                            key={f}
                            className="text-xs border px-3 py-1 rounded-full"
                        >
                            {f}
                        </span>
                    ))}
                </div>

            </div>

        </div>
    );
}