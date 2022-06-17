import { FC, memo } from "react";
import cn from "classnames";
import { useRouteMatch } from "react-router-dom";
import { IonRouterLink } from "@ionic/react";

import Icon from "../Icon/Icon";

import { NavLinkProps } from "./NavLink.types";

const NavLink: FC<NavLinkProps> = ({
	className,
	children,
	unread = false,
	danger = false,
	url = "",
	icon = "Dashboard",
	onClick = () => null,
}) => {
	const active = useRouteMatch({
		path: url,
		exact: true,
	});

	const classes = cn(className, "inline-flex space-x-5 lg:space-x-6 whitespace-nowrap items-center text-lg lg:text-xl", {
		"text-kojo": active,
		"text-border-darkest hover:text-black": !active && !danger,
		"text-red-700 hover:text-red-900": danger,
	});

	const renderContent = () => (
		<span className={classes}>
			<span className="relative">
				<Icon name={icon} size={24} />

				{unread && (
					<span className="absolute flex top-0 right-0">
						<span className="animate-ping absolute flex w-full h-full rounded-full bg-red-500 opacity-60"></span>
						<span className="relative flex rounded-full h-3 w-3 border border-white bg-red-500"></span>
					</span>
				)}
			</span>

			<span className="text-xs font-title uppercase font-normal">
				{children}
			</span>
		</span>
	)

	return url ? (
		<IonRouterLink
			routerLink={url}
			routerDirection="root"
		>
			{ renderContent() }
		</IonRouterLink>
	) : (
		<button
			type="button"
			onClick={onClick}
			className="inline-flex"
		>
			{ renderContent() }
		</button>
	)
}

export default memo(NavLink);
