/**
 * Created by hongpao on 2016/12/1.
 */

import AppDispatcher from '../dispatcher/AppDispatcher'
import AppConstants from '../constants/AppConstants'


const SwiperActions = {
    /**
     * 点击评论图片大图
     */
    clickImage: function (isShow, imageIndex) {
        AppDispatcher.dispatch({
            actionType: AppConstants.IMAGE_CLICKED,
            data: {
                isShow: isShow,
                imageIndex: imageIndex
            }
        });
    },


};

export default SwiperActions;
