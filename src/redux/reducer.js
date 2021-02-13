const initialState = {
    user: {
        token: null
    },
    videos: null,
    search: '',
    addOrder: false,
    orders: [],
    order: null,
    useSearch: '',
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOG_IN':
            return {
                ...state,
                user: action.data,
            };
        case 'EXIT':
            return {
                user: {
                    token: null
                },
                videos: null,
                search: '',
                addOrder: false,
                orders: [],
                order: null
            };
        case 'VIDEO_SEARCH':
            return {
                ...state,
                videos: action.data,
            };
        case 'SEARCH_LIKE':
            return {
                ...state,
                search: action.data,
            }
        case 'ADD_ORDER':
            return {
                ...state,
                addOrder: action.data
            };
        case 'NEW_FAV_ORDER':
            return {
                ...state,
                orders: [
                    ...state.orders,
                    action.data
                ]
            };
        case 'LOCAL_STORE':
            return {
                ...state,
                orders: action.data
            };
        case 'EDIT_ORDER':
            return {
                ...state,
                order: action.data
            };
        case 'EDIT_FAV_ORDER':
            const index = action.id;
            return {
                ...state,
                orders: [
                    ...state.orders.slice(0, index),
                    action.data,
                    ...state.orders.slice(index + 1)
                ]
            };
        case 'DELETE_ORDER':
            const id = action.data;
            return {
                ...state,
                orders: [
                    ...state.orders.slice(0, id),
                    ...state.orders.slice(id + 1)
                ]
            };
        case 'USE_SEARCH':
            return {
                ...state,
                useSearch: action.data
            }
        default:
            return state;
    }
};

export default reducer;
