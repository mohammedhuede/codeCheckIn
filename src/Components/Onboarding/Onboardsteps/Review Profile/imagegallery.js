import React from "react";
import ReactDOM from "react-dom";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

import "./styles.css";

class MyComponent extends React.Component {
  render() {
    const images = [
      {
        original: "https://picsum.photos/id/237/300/150",
        thumbnail: "https://picsum.photos/id/237/300/150"
      },
      {
        original: "https://picsum.photos/id/1/300/150",
        thumbnail: "https://picsum.photos/id/1/300/150"
      },
      {
        original: "https://picsum.photos/id/10/300/150",
        thumbnail: "https://picsum.photos/id/10/300/150"
      },
      {
        original: "https://picsum.photos/id/100/300/150",
        thumbnail: "https://picsum.photos/id/100/300/150"
      },
      {
        original: "https://picsum.photos/id/101/300/150",
        thumbnail: "https://picsum.photos/id/101/300/150"
      },
      {
        original: "https://picsum.photos/id/1000/300/150",
        thumbnail: "https://picsum.photos/id/1000/300/150"
      },
      {
        original: "https://picsum.photos/id/1001/300/150",
        thumbnail: "https://picsum.photos/id/1001/300/150"
      }
    ];

    return (
      <ImageGallery
        items={images}
        showBullets={false}
        showIndex={false}
        showThumbnails={true}
        lazyLoad={false}
        showPlayButton={false}
        showNav={true}
        showFullscreenButton={false}
        thumbnailPosition={"left"}
      />
    );
  }
}
const rootElement = document.getElementById("root");
ReactDOM.render(<MyComponent />, rootElement);
