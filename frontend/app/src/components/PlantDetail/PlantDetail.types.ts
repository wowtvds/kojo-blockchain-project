import { ReactNode } from "react";

export type PlantDetailProps = {
	children?: ReactNode;
	className?: string;
	type?: string;
	image?: string;
	health?: number;
	growth?: number;
	hydration?: number;
	waterNeeded?: number;
}
