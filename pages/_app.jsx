import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { BackTop } from 'antd';
import 'antd/dist/antd.css';
import AppLayout from '../components/AppLayout';

const App = ({ Component }) => {
    return (
        <Fragment>
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