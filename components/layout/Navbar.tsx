"use client";
import { Button } from "../ui/button";
import { signOut } from "next-auth/react";

const Navbar = () => {
  return (
    <div className="flex justify-end w-full m-3">
      <Button type="button" variant={"destructive"} onClick={() => signOut()}>
        Sign Out
      </Button>
    </div>
  );
};

export default Navbar;
