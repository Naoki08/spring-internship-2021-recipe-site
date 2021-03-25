import { AppProps } from 'next/app';
import Head from 'next/head';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'

const App = ({ Component, pageProps }: AppProps) => (
    <>
        <Head>
            <meta
                name="viewport"
                content="width=device-width, initial-scale=1, shrink-to-fit=no"
            />
        </Head>
    <Component {...pageProps} />
    </>
)
export default App;