import { useIonToast } from "@ionic/react";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Error, ErrorType } from "../types";

const useWeb3 = () => {
	const [present] = useIonToast();
	const history = useHistory();
	const [network, setNetwork] = useState<any | null>(null);
	const [provider, setProvider] = useState<any | null>(null);
	const [address, setAddress] = useState<string | null>(null);
	const [isLoading] = useState(false);
	const [error, setError] = useState<Error | null>(null);

	useEffect(() => {
		if (!provider) {
			return;
		}

		initAccount();
		initNetwork();

		// Events
		provider!.on("accountsChanged", initAccount);
		provider!.on("disconnect", disconnect);
		provider!.on("chainChanged", window.location.reload);

		return () => {
			provider!.removeAllListeners();
		}
	}, [provider]); // eslint-disable-line react-hooks/exhaustive-deps

	const initAccount = async (): Promise<void> => {
		const [address] = await provider!.listAccounts();

		if (address) {
			setAddress(address);
		} else {
			setAddress(null);
		}
	}

	const initNetwork = async (): Promise<void> => {
		const newNetwork = await provider!.getNetwork();

		if (newNetwork) {
			setNetwork(newNetwork);
		}
	}

	const disconnect = async (code?: string, reason?: string): Promise<void> => {
		if (code && reason) {
			present({
				color: "tertiary",
				duration: 6000,
				position: "top",
				message: `Error ${code} - ${reason}`,
			});
		}

		try {
			if (provider!.disconnect) {
				provider!.disconnect();
			}

			setAddress(null);
			history.push("/");
		} catch (error: any) {
			present({
				color: "danger",
				duration: 6000,
				position: "top",
				message: error.message,
			});

			setError({
				type: ErrorType.GENERAL,
				message: error.message,
			});
		}
	}

 	return {
		network,
		address,
		isLoading,
		error,
		setProvider,
		disconnect,
	 };
};


export default useWeb3;