import { FunctionComponent } from 'react';
import Image from "next/image";
import cn from "classnames";

import { FooterProps } from "./types";
import { useTranslation } from "@/hooks";
import {
	Button,
	Link,
	MBottomBar,
} from '@/components';

import footerImage from "@/assets/img/footer.png"

const Footer: FunctionComponent<FooterProps> = ({ className, domain = "" }) => {
	const { t } = useTranslation();

	return (
		<footer className={cn(className, 'px-6 sm:px-10 bg-gray-100')}>
			<div className='max-w-screen-xl mx-auto flex flex-col md:flex-row items-center gap-x-24 gap-y-12 py-10 sm:py-16'>
				<div className="flex flex-col items-center md:items-start">
					<h1 className="font-serif text-center md:text-left text-emerald-900 text-3xl leading-tight md:text-4xl md:leading-tight xl:text-5xl xl:leading-tight">
						{ t('footer.title') }
					</h1>

					<Button
						url="#"
						compact
						className="mt-6 md:mt-8"
					>
						{ t('navigation.download') }
					</Button>
				</div>

				<Image
					src={footerImage}
					alt="Water management for plants"
					placeholder="blur" // Optional blur-up while loading
				/>
			</div>

			<MBottomBar
				className="max-w-screen-2xl mx-auto"
				domain={domain}
			/>
		</footer>
	)
}

export default Footer;
