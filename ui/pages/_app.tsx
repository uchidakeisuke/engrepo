import { NextWebVitalsMetric } from 'next/dist/next-server/lib/utils';
import '../styles/globals.css';

export function reportWebVitals(metric: NextWebVitalsMetric) {
	console.log(metric);
}

function MyApp({ Component, pageProps }) {
	return <Component {...pageProps} />;
}

export default MyApp;
