import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { BackTop } from 'antd';
import 'antd/dist/antd.css';
import '../scss/basic.scss';
import '../scss/sign.scss';
import AppLayout from '../components/AppLayout';
import Head from 'next/head';

const App = ({ Component }) => {
    return (
        <Fragment>
            <Head>
                <meta name="naver-site-verification" content="87fd62dae7bf8be269b0d304ef296d6973ed9e0e" /> 
                <meta name="naver-site-verification" content="b6a6791901d49d1e344b7a7fb2b30249dc920d07" />
                <meta name="google-site-verification" content="D255Tc4guakthKOk3pAZG-VOoqn_LOcn_JMiq-MbZ8o" />
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
}

export default App;