import React, {Component} from "react";
import {Card} from "antd";
import Carousel, {Modal, ModalGateway} from "react-images";
import {FooterCaption} from "./FooterCaption";

// const images = [
//     {
//         author: 'lrh',
//         caption: 'caption text',
//         source: 'http://h1.ioliu.cn/bing/VernalFalls_ZH-CN2664125316_1920x1080.jpg?imageslim'
//     },
// ];


function getAuthorName({author}) {
    if (!author) return null;
    return typeof author === 'string' ? author : author.name;
}

function getAltText({data, index}) {
    if (data.caption) return data.caption;

    const author = getAuthorName(data);

    return author ? `Photo by ${author}` : `Image ${index + 1}`;
}


const gridStyle = {
    width: '33.333333334%',
    textAlign: 'center',
};

class Album extends Component {

    constructor(props) {
        super(props);
        this.toggleLightbox = this.toggleLightbox.bind(this);
        this.isLoading = false;
    }


    state = {
        selectedIndex: 0,
        lightboxIsOpen: false,
    };

    toggleLightbox = (selectedIndex) => {
        this.setState(state => ({
            lightboxIsOpen: !state.lightboxIsOpen,
            selectedIndex: selectedIndex,
        }));
    };


    render() {

        return (
            <div>
                <Card title={'lrh'}>
                    {this.props.images ?
                        this.props.images.map((image, idx) => {
                            return (
                                <Card.Grid style={gridStyle} onClick={() => this.toggleLightbox(idx)}>
                                    <Card
                                        size={"small"}
                                        cover={<img alt="it's a picture" src={image.source}/>}
                                    >
                                    </Card>
                                </Card.Grid>
                            )
                        }) : ''}
                </Card>


                <ModalGateway>
                    {this.state.lightboxIsOpen && !this.isLoading ? (
                        <Modal onClose={this.toggleLightbox}>
                            <Carousel
                                components={{FooterCaption}}
                                currentIndex={this.state.selectedIndex}
                                formatters={{getAltText}}
                                frameProps={{autoSize: 'height'}}
                                views={this.props.images}
                            />
                        </Modal>
                    ) : null}
                </ModalGateway>
            </div>
        );
    }
}

export default Album;