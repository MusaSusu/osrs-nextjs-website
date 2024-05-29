"use client";
import React from "react";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import {
  signIn,
  signOut,
  useSession,
  getProviders,
  LiteralUnion,
  ClientSafeProvider,
} from "next-auth/react";

import { MouseEventHandler } from "react";

// Assuming the signOut function has a signature similar to:
// <R extends boolean = true>(options?: SignOutParams<R> | undefined) => Promise<R extends true ? undefined : SignOutResponse>
const signOutHandler: MouseEventHandler<HTMLButtonElement> = async (event) => {
  // Call the signOut function here
  try {
    await signOut();
  } catch (error) {
    // Handle errors if necessary
    console.error("Error occurred during sign out:", error);
  }
};

const AuthButton = () => {
  const [providers, setProviders] = React.useState<ClientSafeProvider[] | null>(
    null
  );

  React.useEffect(() => {
    async function getProvidersValue() {
      const p = await getProviders();
      setProviders(Object.values(p ?? {}));
    }
    getProvidersValue();
  }, []);

  return (
    <>
      {providers &&
        Object.values(providers).map((provider) => (
          <button
            type="button"
            key={provider.name}
            onClick={() => {
              signIn(provider.id);
            }}
            className="black_btn"
          >
            Sign in
          </button>
        ))}
    </>
  );
};

export const Nav = () => {
  const { data: session } = useSession();
  const [toggleDropdown, setToggleDropdown] = useState(false);

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src="/assets/images/logo.svg"
          alt="Logo"
          width={30}
          height={30}
          className="object-contain"
        />
        <p className="logo_text"> Promptopia </p>
      </Link>

      {/*Desktop navigation */}
      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-prompt" className="black_btn">
              Create Post
            </Link>

            <button
              type="button"
              onClick={signOutHandler}
              className="outline_btn"
            >
              Sign Out
            </button>

            <Link href="/profile">
              <Image
                src={session?.user?.image ?? "/assets/images/logo.svg"}
                width={30}
                height={37}
                className="rounded-full"
                alt="profile"
              />
            </Link>
          </div>
        ) : (
          <>
            <AuthButton />
          </>
        )}
      </div>

      {/*Mobile navigation */}
      <div className="sm:hidden flex relative">
        {session?.user ? (
          <div className="flex">
            <Image
              src="/assets/images/logo.svg"
              width={37}
              height={37}
              className="rounded-full"
              alt="profile"
              onClick={() => setToggleDropdown(!toggleDropdown)}
            />

            {toggleDropdown && (
              <div className="dropdown">
                <Link
                  href="/profile"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  My Profile
                </Link>
                <Link
                  href="/create-prompt"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  Create Prompt
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setToggleDropdown(false);
                    signOut();
                  }}
                  className="mt-5 w-full black_btn"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            <AuthButton />
          </>
        )}
      </div>
    </nav>
  );
};
