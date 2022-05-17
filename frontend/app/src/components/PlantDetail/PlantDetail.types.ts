import { ReactNode } from "react";

export type PlantDetailProps = {
	children: ReactNode;
	className?: string;
	id: string;
	type: string;
	image: string;
	health?: number;
	hydration?: number;
	waterNeeded?: number;
}
