import { GitHubUser } from "@/types/github";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";

interface UserGridProps {
    users: GitHubUser[];
}

export function UserGrid({ users }: UserGridProps) {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4 mt-4">
            {users.map((user) => (
                <Card key={user.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader className="flex justify-center">
                        <Link
                            href={user.html_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-medium hover:underline"
                        >
                            <div className="relative w-24 h-24">
                                <Image
                                    src={user.avatar_url}
                                    alt={user.login}
                                    fill
                                    className="rounded-full object-cover"
                                />
                            </div>
                        </Link>
                    </CardHeader>
                    <CardContent className="text-center">
                        {user.login}
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}