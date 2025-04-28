import {
  ClerkLoaded,
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import {
  ChevronDown,
  FileText,
  GraduationCap,
  LayoutDashboard,
  PenBox,
  StarsIcon,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { createUser } from "@/lib/createUser";

const Header = async () => {
  await createUser(); // everytime a user logs in it will store the data in db, if the user is already created it will return the loggedInUser.
  return (
    <header className="fixed top-0 w-full border-b bg-background/80 backdrop-blur-md z-50 supports-[backdrop-filter]:bg-background/60">
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href={"/"}>
          <Image
            src="/logo.png"
            alt="logo"
            width={200}
            height={60}
            className="h-12 py-1 object-contain w-auto"
          />
        </Link>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2 md:space-x-4">
          <ClerkLoaded>
            <SignedIn>
              <Link href="/dashboard">
                <Button variant="outline">
                  <LayoutDashboard className="h-4 w-4" />
                  <span className="hidden md:block">Industry Insights</span>
                </Button>
              </Link>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button>
                    <StarsIcon className="h-4 w-4" />
                    <span className="hidden md:block">Growth Tools</span>
                    <ChevronDown />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>
                    <Link href={"/resume"} className="flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      <span className="">Build Resume</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link
                      href={"/ai-cover-letter"}
                      className="flex items-center gap-2"
                    >
                      <PenBox className="h-4 w-4" />
                      <span className="">Cover Letter</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link
                      href={"/interview"}
                      className="flex items-center gap-2"
                    >
                      <GraduationCap className="h-4 w-4" />
                      <span className="">Interview Prep</span>
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SignedIn>
            {/* Auth Buttons */}
            <SignedOut>
              <SignInButton>
                <Button variant="outline">Sign In</Button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: "w-10 h-10",
                    userButtonPopoverCard: "shadow-xl",
                    userPreviewMainIdentifier: "font-semibold",
                  },
                }}
              />
            </SignedIn>
          </ClerkLoaded>
        </div>
      </nav>
    </header>
  );
};

export default Header;
