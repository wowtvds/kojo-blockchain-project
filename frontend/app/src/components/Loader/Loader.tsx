import { FC, memo } from "react";
import cn from "classnames";

import Icon from "../Icon/Icon";

import { LoaderProps } from "./Loader.types";
import { useTranslation } from "../../hooks";

const Loader: FC<LoaderProps> = ({ className }) => {
	const { t } = useTranslation();

	return (
		<div
			className={cn(className, "w-full h-full flex flex-col items-center justify-center px-8 py-16 text-black space-y-4")}
		>
			<Icon name="Spinner" size={32} className="animate-spin" />

			<p className="text-xs font-text">
				{ t("general.loading") }
			</p>
		</div>
	)
}

export default memo(Loader);
