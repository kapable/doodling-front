import axios from 'axios';
import React from 'react';
import { END } from 'redux-saga';
import { LOAD_MY_INFO_REQUEST } from '../../reducers/user';
import wrapper from '../../store/configureStore';

const YouthProtection = () => {
    return (
        <div className='terms-main-div'>
            두들링 청소년 보호정책
            <br></br><br></br>
            두들링은 각종 청소년 유해정보로부터 청소년을 보호하고자 관련법률에 따라 19세미만의 청소년들이 유해정보에 접근할 수 없도록 청소년 보호정책을 마련하여 시행하고 있습니다. 또한 두들링은 청소년의 건전한 성장을 저해하는 음란·불법 등의 유해정보와 비윤리적·반사회적 행위에 대해서는 엄격하게 제재하기 위하여 다음과 같이 활동하고 있습니다.
            <br></br><br></br>
            1. 유해정보에 대한 청소년접근제한 및 관리조치
            두들링은 청소년이 아무런 제한장치 없이 유해정보에 노출되지 않도록 청소년유해매체물에 대해서 인증장치를 마련해 적용하고 있으며, 유해정보가 노출되지 않도록 사전예방 차원의 조치를 취합니다.
            <br></br><br></br>
            2. 전체 이용자들의 인식제고를 통한 청소년 보호
            두들링은 서비스이용약관 등을 통하여 불건전한 행위를 할 경우 이용제한 또는 민·형사상의 책임을 받을 수 있음을 고지하고 있으며, 신종 유해정보가 발생했을 경우 공지사항을 통하여 이를 신속히 전파함으로써 청소년 및 전체 이용자를 보호하고 있습니다.
            <br></br><br></br>
            3. 유해정보로 인한 피해상담 및 고충처리
            두들링은 청소년 유해정보로 인한 피해상담 및 고충처리를 위한 전문인력을 배치하여 그 피해가 확산되지 않도록 노력하고 있습니다. 하단에 명시한 청소년보호 책임자의 소속과 연락처를 참고하여 메일을 통해 피해상담 및 고충처리를 요청할 수 있습니다.
            <br></br><br></br>
            4. 청소년보호 책임자 지정
            청소년 유해매체물의 신고 및 피해상담, 고충처리 등 청소년보호와 관련한 문제는 아래의 청소년보호 책임자 및 담당자에게 연락하여 주시면 신속하고 공정하게 처리하도록 하겠습니다.
            <br></br><br></br>
            · 청소년 보호 관리 책임자<br></br>
            성명 : 김정빈<br></br>
            메일 : soumy21@naver.com
        </div>
    );
};

export const getStaticProps = wrapper.getStaticProps((store) => async({ req, res }) => {
    const cookie = req ? req.headers.cookie : '';
    axios.defaults.headers.Cookie = '';
    if(req && cookie) {
        axios.defaults.headers.Cookie = cookie;
    };
    store.dispatch({
        type: LOAD_MY_INFO_REQUEST
    });
    store.dispatch(END);

    await store.sagaTask.toPromise();
});

export default YouthProtection;