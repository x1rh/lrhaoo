import React from "react";
import PropTypes from 'prop-types';

import {Card} from "antd";
import Carousel, {Modal, ModalGateway} from "react-images";

import {FooterCaption} from "./FooterCaption";


function getAuthorName({author}) {
    if (!author) return null;
    return typeof author === 'string' ? author : author.name;
}

function getAltText({data, index}) {
    if (data.caption) return data.caption;

    const author = getAuthorName(data);

    return author ? `Photo by ${author}` : `Image ${index + 1}`;
}


class Album extends React.Component {

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
        this.props.hideMenuButton();
    };


    render() {

        const gridStyle = {
            width: '33.333333334%',
            textAlign: 'center',
        };

        return (
            <>
                <Card title={'相册'}>
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
            </>
        );
    }
}

Album.propTypes = {
    images: PropTypes.arrayOf(PropTypes.shape({
        source: PropTypes.string.isRequired,
        author: PropTypes.string.isRequired,
        caption: PropTypes.string.isRequired
    })),
    hideMenuButton: PropTypes.func
};


export default Album;