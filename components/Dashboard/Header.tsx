"use client";

import { Menu, User } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { logout } from "@/actions/authActions";
import Link from "next/link";

export default function DashboardHeader() {
  const { data: session } = useSession();

  return (
    <header className="h-16 border-b flex items-center px-6 justify-between bg-gray-100 backdrop-blur-md shadow-sm">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6 text-gray-950" />
        </Button>
        <Link
          href="/"
          className="text-lg md:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
        >
          WalletManager
        </Link>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div>
            {session?.user?.image ? (
              <Image
                src={session?.user?.image}
                alt={session.user.name || ""}
                width={32}
                height={32}
                className="rounded-full border border-gray-900"
              />
            ) : (
              <User className="h-6 w-6 text-black" />
            )}
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem className="font-medium">
            {session?.user?.name}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => logout()}>Log out</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
