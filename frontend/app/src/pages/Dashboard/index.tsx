import { useContext, useEffect, useState } from "react";
import {
	Button,
	EmptyState,
	Layout,
	Loader,
	PlantCard,
	PlayerStats,
	StatType,
	Tokens,
} from "../../components";
import { SessionContext } from "../../context";
import { formatPlant } from "../../helpers";
import { useTranslation } from "../../hooks";
import { Plant } from "../../types";
import Icon from "../../components/Icon/Icon";
import { IonRouterLink } from "@ionic/react";


const DashboardPage = () => {
	const [latestPlant, setLatestPlant] = useState<Plant | null>(null);
	const [loading, setLoading] = useState<boolean>(false);
	const {
		balance,
		participant,
		contract,
		ranking,
	} = useContext(SessionContext);
	const { t, ts } = useTranslation();

	const getLatestPlant = async () => {
		setLoading(true);

		try {
			const plantIds = participant.plantIds || [];

			if (plantIds.length > 0) {
				const latestPlantId = plantIds[plantIds.length - 1];

				const data = await contract!.handleReadPlant(latestPlantId);
				const uri = await contract!.uri(latestPlantId);

				if (data && data.isPresent) {
					setLatestPlant(await formatPlant(latestPlantId, data, uri));
				}
			}
		} catch (error: any) {
			throw error;
		} finally {
			setLoading(false);
		}
	};

	const data: StatType[] = [
		{
			label: t("leaderboard.level"),
			value: `${participant?.level || 1}`,
		},
		{
			label: t("leaderboard.xp"),
			value: `${participant?.experiencePoints || 0}`,
		},
		{
			label: t("leaderboard.plants"),
			value: !!participant?.plantIds?.length ? `${participant?.plantIds?.join(", ")}` : ts("leaderboard.plantsEmpty"),
		},
		{
			label: t("leaderboard.ranking"),
			value: `${ranking || "/"}`,
		},
	];

	useEffect(() => {
		if (participant && participant.isPresent) {
			getLatestPlant();
		}
	}, [participant]); // eslint-disable-line react-hooks/exhaustive-deps

	const renderLatestPlant = () => {
		return latestPlant ? (
			<div className="grid lg:grid-cols-2">
				<PlantCard
					id={latestPlant.id}
					type={latestPlant.type}
					waterNeeded={latestPlant.waterNeeded}
					growth={latestPlant.growth}
					hydration={latestPlant.hydration}
					image={latestPlant.image}
				/>
			</div>
		) : (
			<EmptyState
				message={t("dashboard.mint")}
				icon="Seeds"
				className=" min-h-[40rem]"
			>
				<Button
					url="/new-seed"
					compact
				>
					{t("dashboard.mintCta")}
				</Button>
			</EmptyState>
		)
	}

	return (
		<Layout
			title={t("dashboard.title")}
			description={t("dashboard.description.1", <b className="font-bold">{t("dashboard.description.2")}</b>)}
		>
			<div className="grid xl:grid-cols-2 gap-x-8 gap-y-8 w-full">
				<Tokens compact={false} />

				{(!balance || !!participant.allowedTokenBalance) && (
					<div
					className="bg-black p-8 border border-border text-background rounded-md flex flex-col items-center justify-center"
				>
					<Icon
							name="Token"
							className="text-background flex-shrink-0 mb-2 mt-4"
							size={48}
						/>

					<p
						// className={cn("text-gray-600 max-w-prose font-text text-xs", {
						// 	"mt-2 text-center": !compact,
						// })}
						className="text-center font-text text-xs py-2 leading-6"
					>
						{ t("dashboard.claim") }
					</p>

					<div
							// className={cn({
							// 	"mt-6": !compact,
							// })}
						>
							<IonRouterLink
				routerLink="/claim"
			className='font-title uppercase text-xs text-kojo-light'
		>
			{t("dashboard.claimCta")}
		</IonRouterLink>

						</div>
				</div>

				)}

				<PlayerStats
					title='Progress'
					data={data}
				/>

				<div className="xl:col-span-2 grid sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-0 gap-x-8 gap-y-12 w-full">
					<div className="lg:col-span-2">
						{/* <h2 className="font-bold text-xl lg:text-2xl mb-4">
							{ t("dashboard.plants") }
						</h2> */}

						{loading ? (
							<Loader />
						) : renderLatestPlant()}
					</div>
				</div>
			</div>
		</Layout>
	)
}

export default DashboardPage;
