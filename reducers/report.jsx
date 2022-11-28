import produce from '../util/produce';

export const initialState = {
    reportLabels: [],
    addReportLabelLoading: false,
    addReportLabelDone: false,
    addReportLabelError: false,
    reportArticleLoading: false,
    reportArticleDone: false,
    reportArticleError: false,
    getReportedArticlesLoading: false,
    getReportedArticlesDone: false,
    getReportedArticlesError: false,
};

export const ADD_REPORT_LABEL_REQUEST = 'ADD_REPORT_LABEL_REQUEST';
export const ADD_REPORT_LABEL_SUCCESS = 'ADD_REPORT_LABEL_SUCCESS';
export const ADD_REPORT_LABEL_FAILURE = 'ADD_REPORT_LABEL_FAILURE';

export const REPORT_ARTICLE_REQUEST = 'REPORT_ARTICLE_REQUEST';
export const REPORT_ARTICLE_SUCCESS = 'REPORT_ARTICLE_SUCCESS';
export const REPORT_ARTICLE_FAILURE = 'REPORT_ARTICLE_FAILURE';

export const GET_REPORTED_ARTICLES_REQUEST = 'GET_REPORTED_ARTICLES_REQUEST';
export const GET_REPORTED_ARTICLES_SUCCESS = 'GET_REPORTED_ARTICLES_SUCCESS';
export const GET_REPORTED_ARTICLES_FAILURE = 'GET_REPORTED_ARTICLES_FAILURE';

const reducer = (state = initialState, action) => {
    return produce(state, (draft) => {
        switch (action.type) {
            case ADD_REPORT_LABEL_REQUEST:
                draft.addReportLabelLoading = true;
                draft.addReportLabelDone = false;
                draft.addReportLabelError = null;
                break;
            case ADD_REPORT_LABEL_SUCCESS:
                draft.reportLabels = action.data;
                draft.addReportLabelDone = true;
                draft.addReportLabelLoading = false;
                break;
            case ADD_REPORT_LABEL_FAILURE:
                draft.addReportLabelLoading = false;
                draft.addReportLabelError = action.error;
                break;
            case REPORT_ARTICLE_REQUEST:
                draft.reportArticleLoading = true;
                draft.reportArticleDone = false;
                draft.reportArticleError = null;
                break;
            case REPORT_ARTICLE_SUCCESS:
                draft.reportArticleDone = true;
                draft.reportArticleLoading = false;
                break;
            case REPORT_ARTICLE_FAILURE:
                draft.reportArticleLoading = false;
                draft.reportArticleError = action.error;
                break;
            case GET_REPORTED_ARTICLES_REQUEST:
                draft.getReportedArticlesLoading = true;
                draft.getReportedArticlesDone = false;
                draft.getReportedArticlesError = null;
                break;
            case GET_REPORTED_ARTICLES_SUCCESS:
                draft.getReportedArticlesDone = true;
                draft.getReportedArticlesLoading = false;
                break;
            case GET_REPORTED_ARTICLES_FAILURE:
                draft.getReportedArticlesLoading = false;
                draft.getReportedArticlesError = action.error;
                break;
        };
    });
};

export default reducer;