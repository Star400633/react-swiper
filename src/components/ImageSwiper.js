/**
 * Created by shemei on 16/12/7.
 * 公用组件 - 内容切换
 */

import React, { Component } from 'react'

import ReactSwipe from 'react-swipe'

export default class ImageSwiper extends Component {
    constructor(props) {
        super(props)
        // 自定义事件
        this.prev = this.prev.bind(this)
        this.next = this.next.bind(this)
    }

    // 图片向后滑动
    next = () => {
        this.refs.reactSwipe.swipe.next()
    }

    // 图片向前滑动
    prev = () => {
        this.refs.reactSwipe.swipe.prev()
    }

    render() {
        const { hideImage, imageIndex, imagesList } = this.props
        const options = {startSlide: imageIndex}
        // 图片列表
        const imgeListView = imagesList.map(function(item, index) {
            return (
                <div className="item-box" key={`item-${index}`}>
                    <img src={item} />
                </div>
            );
        });

        return (
            <div className="swiper-full">
                <div onClick={this.props.hideImage} className="swiper-box">
                    <ReactSwipe ref="reactSwipe"
                                className="swiper-item"
                                continuous={false}
                                swipeOptions={options} >
                        {imgeListView}
                    </ReactSwipe>
                </div>
                <div className="left-button button" onClick={this.prev.bind(this)}></div>
                <div className="right-button button" onClick={this.next.bind(this)}></div>
            </div>
        );
    }
}
