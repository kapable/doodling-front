import { Collapse, Divider, Input, Tag } from 'antd';
import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_REPORT_LABEL_REQUEST } from '../../../reducers/report';
import useInput from '../../../hooks/useInput';

const { Panel } = Collapse;

const ReportLabels = () => {
    const dispatch = useDispatch();
    const { reportLabels, addReportLabelError } = useSelector((state) => state.report);
    const [newLabel, onNewLabelChange ,setNewLabel] = useInput("");

    useEffect(() => {
        if(addReportLabelError) {
            return alert(addReportLabelError);
        }
    }, [addReportLabelError]);
    
    const onClickCreateButton = useCallback(() => {
        dispatch({
            type: ADD_REPORT_LABEL_REQUEST,
            data: { label : newLabel }
        });
        alert('새로운 레이블 등록이 완료됐습니다.');
        setNewLabel("");
    }, [newLabel]);

    return (
        <div className='admin-report-label-main-div'>
            <Collapse>
                <Panel header="신고 레이블 관리" key="1">
                    {/* Report labels list */}
                    {reportLabels && reportLabels.map((label) => (
                        <Tag key={`${label.label}-tag`} >{label.label}</Tag>
                    ))}
                    <Divider />
                    {/* Create New label form */}
                    <Input.Search
                        placeholder='새로운 레이블을 입력해주세요.'
                        allowClear
                        onSearch={onClickCreateButton}
                        enterButton="생성"
                        value={newLabel}
                        onChange={onNewLabelChange}
                    />
                </Panel>
            </Collapse>
        </div>
    );
};

export default ReportLabels;