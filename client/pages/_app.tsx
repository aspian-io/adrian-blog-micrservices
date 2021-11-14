import App, { AppContext, AppInitialProps, AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { useStore } from '../src/app/store';
import { appWithTranslation } from 'next-i18next';
import Layout from '../components/layout';
import '../src/styles/vendors/bootstrap/ltr/bootstrap-ltr.css';
import '../src/styles/vendors/bootstrap/rtl/bootstrap-rtl.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../styles/globals.scss';
import { authAgent } from '../src/app/api/agent';

const MyApp = ({ Component, pageProps }: AppProps) => {
  const store = useStore(pageProps.initialReduxState);
  return (
    <Provider store={store}>
      <Layout {...pageProps}>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
};

MyApp.getInitialProps = async (appContext: AppContext) => {
  const appProps: AppInitialProps = await App.getInitialProps(appContext);
  try {
    const axiosRes = await authAgent.refreshToken(
      appContext.ctx.req?.headers as Record<string, string>
    );
    appContext.ctx.res?.setHeader('set-cookie', axiosRes.headers['set-cookie']);
    appContext.ctx.res?.setHeader('authorization', axiosRes.data.jwtToken);
    appProps.pageProps.currentUser = axiosRes.data;
  } catch (error) {
    console.error('Something went wrong getting the current user');
    appProps.pageProps.currentUser = null;
  }
  if (appContext.Component.getInitialProps) {
    appProps.pageProps = await appContext.Component.getInitialProps(
      appContext.ctx
    );
  }
  return {
    ...appProps,
  };
};

export default appWithTranslation(MyApp);
