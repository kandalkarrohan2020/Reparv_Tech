"use client";
import React, { useState } from "react";
import { AlignJustify } from "lucide-react";
import LogoSvg from "../assets/logo"; // Adjust path as needed
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { NavLink } from "react-router-dom";

export default function Header() {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex z-10 flex-row justify-between items-center p-5 lg:px-38 fixed w-full h-[70px] lg:h-[90px] top-0 left-0 bg-white shadow-[0px_1px_2px_rgba(0,_0,_0,_0.3),_0px_1px_3px_1px_rgba(0,_0,_0,_0.15)]">
      <div className="logo">
        <LogoSvg />
      </div>

      {/* Mobile Menu */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger>
          <div className="flex lg:hidden px-1 py-2">
            <AlignJustify size={30} onClick={() => setOpen(true)} />
          </div>
        </SheetTrigger>
        <SheetContent side="left">
          <SheetHeader>
            <SheetTitle>
              <div className="border-b p-5">
                <LogoSvg />
              </div>
            </SheetTitle>
          </SheetHeader>
          <ul className="flex flex-col p-3 gap-5">
            {[
              { href: "/", label: "Sales Partner" },
              { href: "/territorypartner", label: "Territory Partner" },
              { href: "/onboardingpartner", label: "Onboarding Partner" },
              { href: "/projectpartner", label: "Project Partner" },
            ].map((link) => (
              <SheetTrigger onClick={() => setOpen(false)}>
                <NavLink
                  key={link.href}
                  to={link.href}
                  className="font-inter font-medium text-[16px] leading-[36px] capitalize text-black hover:text-[#0BB501]"
                >
                  {link.label}
                </NavLink>
              </SheetTrigger>
            ))}
          </ul>
        </SheetContent>
      </Sheet>

      {/* Desktop Menu */}
      <div className="hidden lg:flex flex-row p-0 gap-10">
        {[
          { href: "/", label: "Sales Partner" },
          { href: "/territorypartner", label: "Territory Partner" },
          { href: "/onboardingpartner", label: "Onboarding Partner" },
          { href: "/projectpartner", label: "Project Partner" },
        ].map((link) => (
          <NavLink
            key={link.href}
            to={link.href}
            className="font-inter font-medium text-[16px] leading-[36px] capitalize text-black hover:text-[#0BB501]"
          >
            {link.label}
          </NavLink>
        ))}
      </div>
    </div>
  );
}
