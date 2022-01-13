import Document, {
	Html,
	Head,
	Main,
	NextScript,
	DocumentContext,
} from 'next/document';

class MyDocument extends Document {
	// static async getInitialProps(ctx: DocumentContext) {
	// 	const initialProps = await Document.getInitialProps(ctx);
	// 	return { ...initialProps };
	// }

	render() {
		return (
			<Html className="h-full">
				<Head />
				<body className="bg-japan bg-cover bg-no-repeat bg-center h-full">
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

export default MyDocument;
