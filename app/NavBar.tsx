"use client";

import { Avatar, Box, Container, DropdownMenu, Flex } from "@radix-ui/themes";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { AiFillBug } from "react-icons/ai";
import Skeleton from "./components/Skeleton";

const NavBar = () => {
  // y or horizontal -> patayo (top and bottom)
  // x or vertical  -> pahinga (left and right)

  return (
    <nav className="border-b mb-5 px-5 py-3">
      <Container>
        <Flex justify="between">
          <Flex align="center" gap="3">
            <Link href="/">
              <AiFillBug />
            </Link>
            <NavLinks />
          </Flex>
          <AuthStatus />
        </Flex>
      </Container>
    </nav>
  );
};

const AuthStatus = () => {
  const { status, data: session } = useSession();

  if (status === "loading") return <Skeleton width="3rem" />;
  if (status === "unauthenticated")
    return (
      <Link
        className="text-zinc-500
 hover:text-zinc-800 transition-colors"
        href="/api/auth/signin"
      >
        Login
      </Link>
    );

  return (
    <Box>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Avatar
            radius="full"
            size="2"
            src={session!.user!.image!}
            fallback="?"
            className="cursor-pointer"
          />
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Label>{session!.user!.email}</DropdownMenu.Label>
          <Link
            className="text-zinc-500
 hover:text-zinc-800 transition-colors"
            href="/api/auth/signout"
          >
            Logout
          </Link>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </Box>
  );
};

const NavLinks = () => {
  const currentPath = usePathname();

  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues" },
  ];

  return (
    <ul className="flex space-x-6">
      {links.map((l) => (
        <li key={l.label}>
          <Link
            className={`${
              l.href === currentPath ? "text-zinc-900" : "text-zinc-500"
            } hover:text-zinc-800 transition-colors`}
            href={l.href}
          >
            {l.label}
          </Link>
        </li>
      ))}
    </ul>
  );
};
export default NavBar;
