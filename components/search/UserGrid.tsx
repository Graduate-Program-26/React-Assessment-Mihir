import { GitHubUser } from "@/types/github";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import { saveRecentUser } from "@/app/lib/utils";

interface UserGridProps {
    users: GitHubUser[];
}

export function UserGrid({ users }: UserGridProps) {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4 mt-4">
            {users.map((user) => (
                <Card key={user.id} className="hover:shadow-lg transition-shadow">
                    <Link
                        href={`/users/${user.login}`}
                        className="font-medium hover:underline"
                        onClick={() =>
                            saveRecentUser({
                                login: user.login,
                                avatar_url: user.avatar_url,
                            })
                        }
                    >
                        <CardHeader className="flex justify-center">
                            <div className="relative w-24 h-24">
                                <Image
                                    src={user.avatar_url}
                                    alt={user.login}
                                    width={128}
                                    height={128}
                                    className="rounded-full mx-auto"
                                />
                            </div>
                        </CardHeader>
                        <CardContent className="text-center">
                            {user.login}
                        </CardContent>
                    </Link>
                </Card>
            ))
            }
        </div >
    );
}