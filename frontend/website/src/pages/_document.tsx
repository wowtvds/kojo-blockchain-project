import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
	render() {
		return (
			<Html>
				<Head>
					<link
						href="https://fonts.googleapis.com/css2?family=Abhaya+Libre:wght@400;700&family=Plus+Jakarta+Sans:wght@400;700&display=swap"
						rel="stylesheet"
					/>
					<link rel="shortcut icon" href="/favicon.ico" />
				</Head>

				<body>
					<Main />

					<NextScript />
				</body>
			</Html>
		)
	}
}

export default MyDocument;
