import React from 'react';
import axios from 'axios';

/* import styles */
import { AppStyle } from './styles/AppStyle.jsx'

/* import components */
import { MainImage } from './MainImage.jsx';
import { Carousell } from './Carousell.jsx'
import { ImageModal } from './ImageModal.jsx';


export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
      image: '',
      width: 1600,
      height: 1600,
      showModal: false
    }
    this.handleThumbnailClick = this.handleThumbnailClick.bind(this);
    this.updateImageSize = this.updateImageSize.bind(this)
  }

  /* Once components are mounted,
     retrieve images from database */
  componentDidMount() {
    this.fetchImages();
  }

  fetchImages() {
    const productIds = [
      'BES870XL',
      'IVFWCT242DBWH',
      'TOB-135N'
    ]
    var random = Math.floor(Math.random() * productIds.length)

    var ID = productIds[random];
    axios.get('/images' + ID)
    .then(({ data }) => {
      this.setState({
        images: data,
        image: data[0]
      });
    });
  }

  updateImageSize(image) {
    var img = new Image();
    img.src = this.state.image;
    var width = img.naturalWidth*1.2 || 1600;
    var height = img.naturalHeight*1.2 || 1600;

    this.setState({ width, height })
  }

  /* Handle thumbnail click inside carousell */
  handleThumbnailClick(id, modal=false) {
    var image = this.state.images[id];
    this.setState({
      image
    })
    if(modal) {
      this.setState({showModal: true})
    }
    this.updateImageSize();
  }

  render() {
    return (
      <div>

        <ImageModal
        visible={this.state.showModal}
        image={this.state.image}
        images={this.state.images}
        handleClick={this.handleThumbnailClick}
        hideModal={() => this.setState({showModal: false})} />

        <AppStyle>
          <MainImage
          image={this.state.image}
          handleClick={() => this.setState({showModal: true})}
          w={this.state.width}
          h={this.state.height}
          />

          <Carousell
            images={this.state.images}
            selected={this.state.image}
            handleClick={this.handleThumbnailClick} />

        </AppStyle>
      </div>
    )
  }

}