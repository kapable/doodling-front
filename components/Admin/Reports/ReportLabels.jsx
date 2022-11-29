import React from 'react';
import { useSelector } from 'react-redux';

const ReportLabels = () => {
    const { reportLabels } = useSelector((state) => state.report);

    return (
        <div>ReportLabels</div>
    );
};

export default ReportLabels;