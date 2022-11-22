import axios from 'axios';
import Head from 'next/head';
import React from 'react';
import { END } from 'redux-saga';
import { LOAD_MY_INFO_REQUEST } from '../../reducers/user';
import wrapper from '../../store/configureStore';

const Privacy = () => {
    return (
        <div className='terms-main-div'>
            <Head>
                <title>개인정보처리방침 - 두들링</title>
                <link rel='main-url' href='https://doodling.kr/privacy' />
                <link rel='shortcut icon' href='/doodling-favicon.png'/>
                <meta charSet='utf-8'/>
                <meta name="language" content="Korean" />
                <meta name="author" content="쿠키로켓" />
                <meta name="description" content="개인정보처리방침 - 두들링 - MBTI 기반 커뮤니티" />
                <meta name="keywords" content="MBTI, 커뮤니티" />

                {/* <!-- Open Graph / Facebook --> */}
                <meta property="og:type" content="website"/>
                <meta property="og:url" content='https://doodling.kr/privacy' />
                <meta property="og:title" content='개인정보처리방침 - 두들링'/>
                <meta property="og:description" content="개인정보처리방침 - 두들링 - MBTI 기반 커뮤니티"/>
                <meta property="og:image" content="/doodling-favicon.png"/>
                <meta property="og:image:width" content="800"/>
                <meta property="og:image:height" content="400"/>
                <meta property="og:image:alt" content="개인정보처리방침 - 두들링 - MBTI 기반 커뮤니티" />
                <meta property='og:site_name' content='개인정보처리방침 - 두들링' />

                {/* <!-- Twitter --> */}
                <meta property="twitter:card" content="summary_large_image"/>
                <meta property="twitter:url" content='https://doodling.kr/privacy'/>
                <meta property="twitter:title" content='개인정보처리방침 - 두들링'/>
                <meta property="twitter:description" content="개인정보처리방침 - 두들링 - MBTI 기반 커뮤니티"/>
                <meta property="twitter:image" content="/doodling-favicon.png"/>
                <meta property="twitter:image:width" content="800"/>
                <meta property="twitter:image:height" content="400"/>
                <meta property="twitter:image:alt" content="개인정보처리방침 - 두들링 - MBTI 기반 커뮤니티" />
                <meta property='og:site_name' content='개인정보처리방침 - 두들링' />
            </Head>
            두들링
            <br></br><br></br>
            개인정보처리방침
            <br></br>
            [두들링](이하 ‘회사’라 함)는 개인정보보호법 제30조에 따라 정보주체(이용자)의 개인정보를 보호하고 이와 관련한 고충을 신속하고 원활하게 처리할 수 있도록 하기 위하여 다음과 같이 개인정보 처리지침을 수립·공개합니다.
            <br></br><br></br>
            <strong>제1조 수집하는 개인정보의 항목 및 방법</strong>
            <br></br>
            회사는 원활한 서비스의 제공을 위해 회원가입시 아래의 개인정보를 수집하며, 회원가입 시(약관동의 필수) 수집되는 내용은 아래와 같습니다.<br></br>
            1. 수집하는 개인정보의 항목<br></br>
            ① 회원 가입 과정에서 아래 정보가 수집됩니다.<br></br>
            - 아이디, 비밀번호, 닉네임, 이메일주소, 개인식별용 키값 정보, 만 14세 미만의 경우 법정대리인의 개인식별용 키값<br></br>
            ② 본인인증과정에서 인증 서비스 업체에 개인식별 정보가 수집됩니다.<br></br>
            ③ 서비스 이용 시 아래 정보가 생성되어 수집될 수 있습니다.<br></br>
            - IP주소, 쿠키, 서비스 이용기록, 회원조치이력<br></br>
            ④ 이벤트 진행 시 아래 정보가 수집됩니다.<br></br>
            - 이름, 연락처, 이메일주소, 주소 등 해당 이벤트 당첨자 배송에 필요한 정보<br></br>
            2. 개인정보 수집방법<br></br>
            - 회원가입, 정보수정, 생성정보 수집툴을 통한 수집
            <br></br><br></br>
            <strong>제2조 개인정보의 수집 및 이용목적</strong><br></br>
            회사는 다음의 목적을 위하여 개인정보를 처리하고 있으며, 다음 목적 이외의 용도로는 이용하지 않습니다.<br></br>
            1. 회원제 서비스이용에 따른 본인 확인, 개인 식별, 불량회원의 부정 이용방지 및 비인가 사용방지, 가입의사 확인, 각종 민원처리, 고지사항 전달, 1인 2개 이상의 ID 소유 제한, ID 중복가입 제한<br></br>
            2. 광고 게재 및 이벤트 정보 제공 및 참여기회 제공, 접속 빈도 파악 또는 회원의 서비스 이용에 대한 통계
            <br></br><br></br>
            <strong>제3조 개인정보의 제3자 제공</strong><br></br>
            회사는 원칙적으로 정보주체의 개인정보를 제2조(개인정보의 수집 및 이용목적)에서 명시한 범위 내에서만 처리하며, 정보주체의 사전 동의 없이 본래의 범위를 초과하여 처리하거나 제3자에게 제공하지 않습니다. 다만, 다른 법률에 특별한 규정이 있는 경우 또는 범죄의 수사와 같이 개인정보보호법 제18조에 해당하는 경우는 예외로 처리됩니다.
            <br></br><br></br>
            <strong>제4조 개인정보처리의 위탁</strong><br></br>
            1. 회사는 원활한 서비스 제공을 위해서 다음과 같이 개인정보 처리업무를 외부 업체에 위탁하고 있으며, 관계 법령에 따라 위탁계약 시 개인정보가 안전하게 관리될 수 있도록 필요한 사항을 규정하고 있습니다.<br></br>
            ① 수탁업체: 코리아크레딧뷰로(KCB) ㈜<br></br>
            ② 위탁하는 업무의 내용 : 실명확인 및 본인인증<br></br>
            ③ 개인정보 보유 및 이용기간: 해당업체에서 이미 보유하고 있는 개인정보이기 때문에 별도 저장하지 않음<br></br>
            2. 회사는 위탁계약 체결시 개인정보보호법 제26조에 따라 위탁업무 수행목적 외 개인정보 처리금지, 재위탁 제한, 수탁자에 대한 관리․감독, 책임에 관한 사항을 문서에 명시하고, 수탁자가 개인정보를 안전하게 처리하는지를 감독하고 있습니다.
            <br></br><br></br>
            <strong>제5조 개인정보의 처리 및 보유기간</strong><br></br>
            회사는 원칙적으로, 개인정보 수집 및 이용목적이 달성된 후에는 해당 정보를 지체없이 파기합니다. 다만 필요한 경우 회사는 개인정보를 보관할 수 있으며, 구체적인 개인정보 처리 및 보유 기간은 다음과 같습니다.<br></br>
            1. 회사 내부 방침에 의한 정보보유 사유<br></br>
            ① 회원이 탈퇴한 경우에도 회사는 원활한 서비스의 제공 및 부정한 서비스의 이용을 방지하기 위하여 회사는 아래와 같이 관련 정보를 보존 기간 동안 보관합니다.<br></br>
            가. 닉네임, 이메일, 중복 가입 방지 식별용 키값 DI<br></br>
            - 보존 이유 : 서비스 이용의 혼선방지, 분쟁해결 및 수사기관의 요청에 따른 협조<br></br>
            - 보존 기간 : 탈퇴일로부터 3개월<br></br>
            나. 부정/불량 이용자의 중복 가입 방지 식별용 키값 DI 및 회원조치 이력<br></br>
            - 보존 이유 : 부정 및 불량 이용자의 서비스 이용 제한과 조치 이력 보관으로 악의적 이용의 재발 방지<br></br>
            - 보존 기간 : 탈퇴일로부터 5년<br></br>
            2. 관련 법령에 의한 정보보유 사유<br></br>
            ① 보존 항목 : 서비스 이용 및 방문 기록, 접속 로그 기록, 접속IP 정보<br></br>
            ② 보존 근거 : 통신비밀보호법<br></br>
            ③ 보존 기간 : 3개월
            <br></br><br></br>
            <strong>제6조 이용자와 법정대리인의 권리·의무 및 행사방법</strong><br></br>
            1. 이용자 및 법정대리인은 회사에 대해 언제든지 이용자 본인의 개인정보 열람 요구, 오류등에 대한 정정 요구, 삭제요구, 처리정지 요구 등 개인정보 보호 관련 권리를 행사할 수 있습니다.<br></br>
            2. 이용자의 개인정보 조회, 수정을 위해서는 ‘개인정보변경’(또는 ‘회원정보수정’ 등)을, 가입해지(동의철회)를 위해서는 “회원탈퇴”를 클릭하여 본인 확인 절차를 거치신 후 직접 열람, 정정 또는 탈퇴가 가능합니다.
            <br></br><br></br>
            <strong>제7조 처리하는 개인정보의 파기</strong><br></br>
            회사는 개인정보 수집 및 이용목적이 달성된 후 전자적 파일형태로 저장된 개인정보는 기록을 재생할 수 없는 기술적 방법을 사용하여 삭제하고, 그 밖에 기록물, 인쇄물, 서면 등은 분쇄하거나 소각하여 파기합니다.
            <br></br><br></br>
            <strong>제8조 개인정보 자동 수집 장치의 설치∙운영 및 거부에 관한 사항  </strong><br></br>
            1. 회사는 이용자에게 개별적인 맞춤서비스를 제공하기 위해 이용정보를 저장하고 수시로 불러오는 ‘쿠키(cookie)’를 사용합니다.<br></br>
            2. 쿠키는 웹사이트를 운영하는데 이용되는 서버(http)가 이용자의 컴퓨터 브라우저에게 보내는 소량의 정보이며 이용자들의 PC 컴퓨터내의 하드디스크에 저장되기도 합니다. 이용자는 쿠키 설치에 대한 선택권을 가지고 있습니다.<br></br>
            ① 쿠키의 사용목적: 이용자가 방문한 각 서비스와 웹 사이트들에 대한 방문 및 이용형태, 자취 등을 파악하여 이용자에게 최적화된 정보 제공을 위해 사용됩니다.<br></br>
            ② 쿠키의 설치∙운영 및 거부 : 이용자는 웹브라우저 상단의 도구 - 인터넷 옵션 - 개인정보 메뉴의 옵션 설정을 통해 쿠키 설치를 거부할 수 있습니다.<br></br>
            ③ 쿠키 설치를 거부할 경우 일부 서비스 이용에 어려움이 발생할 수 있습니다.
            <br></br><br></br>
            <strong>제9조 만 14세 미만 아동의 개인정보</strong><br></br>
            회사는 만 14세 미만의 아동의 회원 가입 시 법정대리인의 동의를 확인하기 위하여 필요한 최소한의 정보(법정 대리인의 개인정보)를 수집, 이용할 수 있습니다. 회사는 수집된 법정대리인의 개인정보를 해당 법정대리인의 동의 여부를 확인하는 목적 외의 용도로 이용하거나 제3자에게 제공하지 않습니다.
            <br></br><br></br>
            <strong>제10조 개인정보의 기술적/관리적 보호 대책</strong><br></br>
            회사는 이용자의 개인정보를 취급함에 있어 개인정보가 분실, 도난, 유출, 변조 또는 훼손되지 않도록 안전성 확보를 위해 기술적, 관리적 보호조치를 마련하고 있습니다. 회사가 개인정보보호 의무를 다 하였음에도 불구하고 기기분실, ID/비밀번호 공유, 안전성 낮은 비밀번호 설정 등 회원 본인의 부주의로 중요 개인정보가 유출해 발생한 문제에 대해 회사는 일체의 책임을 지지 않습니다.<br></br>
            1. 회사는 이용자의 개인정보 및 인증정보를 송·수신할 때에는 안전하게 전송될 수 있도록 웹서버에 SSL(Secure Socket Layer) 인증서를 설치하고 있습니다.<br></br>
            2. 회사는 해킹이나 컴퓨터 바이러스 등에 의해 회원의 개인정보가 유출되거나 훼손되는 것을 막기 위해 최선을 다하고 있습니다.<br></br>
            3. 회사는 회원의 개인정보 보호를 위하여 6개월마다 직접 본인의 비밀번호를 변경하도록 조치하고 있습니다.<br></br>
            4. 회원의 개인정보는 기본적으로 비밀번호에 의해 보호되므로 누구에게도 비밀번호를 공개해서는 안됩니다. 비밀번호는 시스템 적으로 암호화되어 운영자도 회원 개개인의 비밀번호를 알 수 없습니다. 이용자 본인 스스로 타인에게 비밀번호 등이 노출되지 않도록 주의하셔야 하며, 회원은 특히 다른 사람과 PC 또는 각종 모바일기기를 공유하여 사용하거나 공공장소 등에서 이용하는 경우 자신의 비밀번호가 노출되지 않도록 유의하시기 바랍니다. 서비스를 이용한 후에는 로그아웃 및 활성화된 모든 웹 브라우저를 종료하시길 권장합니다.
            <br></br><br></br>
            <strong>제11조 개인정보보호 책임자</strong><br></br>
            회사는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 정보주체의 불만처리 및 피해구제를 처리하기 위하여 아래와 같이 개인정보 보호책임자를 지정하고 있습니다. 이용자는 아래의 담당부서에 개인정보보호 관련 문의, 불만, 조언이나 기타 사항을 연락해 주시기 바랍니다.
            <br></br><br></br>
            - 개인정보 보호책임자 <br></br>
            성명 : 김정빈<br></br>
            메일 : soumy21@naver.com
            <br></br><br></br>
            기타 개인정보침해에 대한 신고나 상담이 필요하신 경우에는 아래 기관에 문의하시기 바랍니다.<br></br>
            개인정보침해신고센터 (http://privacy.kisa.or.kr/ 국번없이 118)<br></br>
            대검찰청 사이버수사과 (http://www.spo.go.kr/ 국번없이 1301)<br></br>
            경찰청 사이버안전국 (http://cyberbureau.police.go.kr/ 국번없이 182)
            <br></br><br></br>
            <strong>제12조 개인정보 처리방침 변경</strong><br></br>
            본 개인정보 처리방침은 2019. 10. 14. 부터 적용됩니다. 회사는 향후 개인정보취급방침을 개정하는 경우 사이트 공지사항 게시판을 통하여 게시할 것입니다.<br></br>
            단, 인증서비스 및 비밀번호 변경에 관한 약관(제1조 1항 일부, 제4조, 제5조 1항 ②번 일부, 제5조 1항 ③번, 제10조 3항)은 2019. 10. 23일 이후 서비스 도입 시점부터 적용됩니다.
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

export default Privacy;