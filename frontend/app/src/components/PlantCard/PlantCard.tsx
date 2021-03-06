import { FC, memo } from "react";
import cn from "classnames";
import { IonCard } from "@ionic/react";

import Stat from "../Stat/Stat";
import Icon from "../Icon/Icon";

const PlantCard: FC<any> = ({
	className,
	id = 1,
	type = "",
	image = "",
	growth = 1,
	hydration = 0,
	waterNeeded = 2,
	plant = {}
}) => {

	// const getGrowth = (value: number | null): ReactNode => {
	// 	if (value) {
	// 		return t(`growth.${value}`);
	// 	}
	// }

	const renderDrop = (index: number) => {
		const solid = waterNeeded > index;

		return (
			<Icon
				key={index}
				name={solid ? "DropSolid" : "Drop"}
				size={16}
			/>
		)
	}

	return (
		<IonCard
			routerLink={`/plants/${id}`}
			routerDirection="forward"
			className={cn(className, "flex flex-col group m-0 rounded-md overflow-hidden shadow-0 ion-no-card-shadow border border-border")}
		>
			<div className="relative aspect-square overflow-hidden">
				<img
					src={image}
					alt={`${type} plant`}
					className="w-full h-full object-cover lg:group-hover:scale-105 duration-300 ease-out transition-transform"
				/>

				<div className="flex space-x-0.5 absolute top-3 right-3 text-emerald-600 bg-white/80 px-1 py-0.5 rounded">
					{ [...Array(3)].map((_drop, index) => renderDrop(index)) }
				</div>
			</div>

			<h2 className="text-black font-text font-bold text-lg lg:text-xl py-4 px-4 lg:px-6 border-y border-border">
				{ type }
			</h2>

			<div className="grid gap-y-8 px-4 lg:px-6 py-6 max-h-[13rem] overflow-y-scroll">
			<Stat

label="Family"
>
{plant.family}
</Stat>
<Stat

label="Variant"
>
{plant.variant}
</Stat>
<Stat

label="Soil"
>
{plant.soil}
</Stat>
<Stat

label="Pot"
>
{plant.pot}
</Stat>
<Stat

label="Floating"
>
{plant.floating}
</Stat>
<Stat
label="Setting"
>
{plant.setting}
</Stat>
<Stat
label="Mark"
>
{plant.mark}
</Stat>
			</div>
	  	</IonCard>
	)
}

export default memo(PlantCard);
