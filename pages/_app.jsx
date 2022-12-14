import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { BackTop } from 'antd';
import 'antd/dist/antd.css';
import '../scss/basic.scss';
import '../scss/admin.scss';
import AppLayout from '../components/AppLayout';
import wrapper from '../store/configureStore';
import Head from 'next/head';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/ko';
dayjs.extend(relativeTime);
dayjs.locale('ko');
import { useRouter } from 'next/router';
import * as gtag from '../lib/gtag';
React.useLayoutEffect = React.useEffect;

const App = ({ Component }) => {
    const router = useRouter();
    useEffect(() => {
        const handleRouteChange = (url) => { gtag.pageview(url) };
        router.events.on('routeChangeComplete', handleRouteChange);
        return () => {
            router.events.off('routeChangeComplete', handleRouteChange)
        };
    }, [router.events]);

    return (
        <Fragment>
            <Head>
                <meta name="naver-site-verification" content="87fd62dae7bf8be269b0d304ef296d6973ed9e0e" /> 
                <meta name="naver-site-verification" content="b6a6791901d49d1e344b7a7fb2b30249dc920d07" />
                <meta name="google-site-verification" content="D255Tc4guakthKOk3pAZG-VOoqn_LOcn_JMiq-MbZ8o" />
                <meta name='viewport' content='initial-scale=1.0,user-scalable=no,maximum-scale=1,width=device-width' />
            </Head>
            <AppLayout>
                <Component />
            </AppLayout>
            <BackTop />
        </Fragment>
    );
};

App.propTypes = {
    Component: PropTypes.elementType.isRequired,
};

export default wrapper.withRedux(App);