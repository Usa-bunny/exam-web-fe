"use client";

import { ListIcon } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment } from "react";

export interface HeaderProps {
  onMenuClick?: () => void;
}

export interface BreadcrumbItem {
  label: string;
  path?: string;
}

const Header = ({ onMenuClick }: HeaderProps) => {
  const pathName = usePathname();
  const whiteLogo = "/logo.svg";

  const getBreadCrumbs = () => {
    const crumbs: BreadcrumbItem[] = [{ label: "Menu", path: "/" }];

    if (pathName && pathName.includes("/")) {
      crumbs.push({ label: "Home" });
    }
    return crumbs;
  };

  const breadcrumbs = getBreadCrumbs();
  const currentLabel = breadcrumbs[breadcrumbs.length - 1]?.label;

  return (
    <header className="w-full">
      <div className="w-full bg-[#435EFE] h-14 rounded-[18px] flex items-center justify-between px-6 shadow-[0_8px_20px_-6px_rgba(67,94,254,0.3)]">
        <div className="lg:hidden flex items-center gap-3">
          <Image
            width={7}
            height={7}
            src={whiteLogo}
            alt="Logo"
            className="w-7 h-7 object-contain"
          />
          <span className="text-white font-semibold text-sm tracking-wide">
            {currentLabel}
          </span>
        </div>

        <div className="hidden lg:flex items-center gap-2 text-white/80 text-[14px] font-normal">
          {breadcrumbs.map((crumb, idx) => (
            <Fragment key={idx}>
              {idx > 0 && <span className="opacity-50 text-white/60">/</span>}

              <span
                className={`tracking-wider ${
                  idx === breadcrumbs.length - 1
                    ? "text-white font-medium"
                    : "hover:text-white cursor-pointer transition-colors"
                }`}
              >
                {crumb.path ? (
                  <Link href={crumb.path}>{crumb.label}</Link>
                ) : (
                  <span>{crumb.label}</span>
                )}
              </span>
            </Fragment>
          ))}
        </div>

        <button
          onClick={onMenuClick}
          className="lg:hidden cursor-pointer p-2 -mr-2 text-white/80 hover:text-white transition-colors ml-auto"
          aria-label="Toggle Menu"
        >
          <ListIcon size={24} weight="bold" />
        </button>
      </div>
    </header>
  );
};

export default Header;
