import { ReactNode } from "react";
import icons from "../Icon/icons";

export type NavLinkProps = {
	children: ReactNode;
	url?: string;
	icon: keyof typeof icons;
	className?: string;
	unread?: boolean;
	danger?: boolean;
	onClick?: () => void;
}
