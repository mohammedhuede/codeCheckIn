import React from 'react';
import ImageGallery from 'react-image-gallery';

class HospitalImageGallery extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      images: []
    }
  }

  componentDidMount() {
    if (this.props.images) {
      const imagesArr = this.props.images?.map(img => {
        return {
          original: img,
          thumbnail: img
        }
      })

      this.setState({
        images: imagesArr
      })
    }

  }

  render() {
    return (
      <>
        {this.state.images.length > 0 ? <ImageGallery items={(this.state.images)} /> : null}
      </>
    )
  }
}

export default HospitalImageGallery;