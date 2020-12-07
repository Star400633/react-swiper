import AppConstants from "../constants/AppConstants"
import AppDispatcher from "../dispatcher/AppDispatcher"
const EventEmmitter = require('events').EventEmitter
import assign from 'object-assign'

const CHANGE_EVENT = "change";

const SwiperStore = assign({}, EventEmmitter.prototype, {
	imageDetail: {},
    /*
     * 查看大图&隐藏大图
     * */
    _setImageClicked: function (param) {
        this.imageDetail = param;
        this.emit(CHANGE_EVENT);
    },
    getImageDetail: function () {
        return this.imageDetail;
    },

    addChangeListener: function (callback) {
        this.on(CHANGE_EVENT, callback);
    },
    removeChangeListener: function (callback) {
        this.removeListener(CHANGE_EVENT, callback);
    },
});

AppDispatcher.register(function (action) {
    switch (action.actionType) {
        case AppConstants.IMAGE_CLICKED:
            SwiperStore._setImageClicked(action.data);
            break;
        default:
    }
});

export default SwiperStore;
