

import React from 'react';
import Carousel, { Modal, ModalGateway } from 'react-images';


const images = [
    {source:'http://h1.ioliu.cn/bing/VernalFalls_ZH-CN2664125316_1920x1080.jpg?imageslim'},
    {source:'http://h1.ioliu.cn/bing/VernalFalls_ZH-CN2664125316_1920x1080.jpg?imageslim'},
];

class ImageBlock extends React.Component {
  state = { modalIsOpen: false }
  toggleModal = () => {
    this.setState(state => ({ modalIsOpen: !state.modalIsOpen }));
  }
  render() {
    const { modalIsOpen } = this.state;

    return (
      <ModalGateway>
        {modalIsOpen ? (
          <Modal onClose={this.toggleModal}>
            <Carousel views={images} />
          </Modal>
        ) : null}
      </ModalGateway>
    );
  }
}


export default ImageBlock;