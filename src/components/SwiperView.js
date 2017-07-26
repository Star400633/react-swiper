import React, { Component } from 'react';
import ImageSwiper from './ImageSwiper.js';
import SwiperActions from '../actions/SwiperActions.js';
import SwiperStore from '../stores/SwiperStore.js';

import '../../css/App.css';
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imageDetail: {},
            imagesList: [
                "http://zmfile.2dfire-daily.com/upload_files/99928938/menu/007c58ba87904a2abfa8037f3ed8d879.png",
                "http://zmfile.2dfire-daily.com/upload_files/99928938/menu/dcfffe5d4add42639146a0e01e49a28b.png",
                "http://zmfile.2dfire-daily.com/upload_files/99928938/menu/026a20cdb81649f593942b56247a0bde.png"
            ]
        };
        this._onLoadDate = this.onLoadDate.bind(this);
    }

    componentDidMount() {
        SwiperStore.addChangeListener(this._onLoadDate.bind(this));
    }

    componentWillUnmount() {
        SwiperStore.removeChangeListener(this._onLoadDate.bind(this));
    }

    onLoadDate() {
        this.setState({
            imageDetail: SwiperStore.getImageDetail()
        });
    }

    _clickImage(isShow, imageIndex) {
        SwiperActions.clickImage(isShow, imageIndex);
    }

    render() {
        let self = this;
        let {imagesList, imageDetail} = this.state;
        let fullScreenView = null;
        if(imageDetail.isShow) {
            fullScreenView = (
                <ul className="swiper-full">
                    <ImageSwiper 
                        hideImage={self._clickImage.bind(this, false)}
                        imageIndex={imageDetail.imageIndex}
                        imagesList={imagesList}
                    />
                </ul>
            );
        }
        let imgView = [];

        imagesList.map(function(item, index) {
            return imgView.push(                
                <li key={ `item-${index}`} 
                    style={{backgroundImage: 'url(' + item + ')', backgroundSize: 'cover'}}
                    onClick={self._clickImage.bind(this, true, index)}></li>
            );
        });

        return ( 
            <div className="swiper-container">
                <ul className="swiper-origin">
                    {imgView}
                </ul>
                {fullScreenView}
            </div>
        );
    }
}

export default App;