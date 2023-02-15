import React, { useEffect, useState } from "react";
import { Carousel } from "react-bootstrap";
import slider1 from "../../../../assets/icons/slider1.png";
import slider2 from "../../../../assets/icons/slider2.png";
import slider3 from "../../../../assets/icons/slider3.png";
const Slider = ({ loarMoreOffers, fetchOfferDetails, ...props }) => {

  const [index, setIndex] = React.useState(0);
  const delay = 2500;
  const colors = ["#0088FE", "#00C49F", "#FFBB28"];
  const timeoutRef = React.useRef(null);
  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(() => setIndex((prevIndex) => (prevIndex === colors.length - 1 ? 0 : prevIndex + 1)), delay);
    return () => {
      resetTimeout();
    };
  }, [index]);
  return (
    <Carousel>

      {
        // props.offerImages.map(offerImg => (
        //   <Carousel.Item>
        //     <img
        //       className="d-block w-100"
        //       src={offerImg.offerImage}
        //       alt="First slide"
        //       style={{
        //         height: '120px'
        //       }}
        //     />
        //     <Carousel.Caption>
        //       {/* <p><h2 style={{color: 'white'}}>{offerImg.offerTitle}</h2></p> */}
        //     </Carousel.Caption>
        //   </Carousel.Item>
        // ))
        loarMoreOffers.length > 0 && loarMoreOffers.map(item => {

          return (
            <Carousel.Item onClick={() => fetchOfferDetails(item)}>
              {item.offerImage && <img
                className="d-block w-100"
                src={item.offerImage}
                alt="First slide"
                style={{
                  height: '120px'
                }}
              />
                // :
                //   <div onClick={() => fetchOfferDetails(item)}>
                //     <p><h2  >{item.offerTitle ? item.offerTitle : "Discount"}</h2></p>
                //   </div>
              }
              <Carousel.Caption>
                {/* <p><h2 style={{color: 'white'}}>{offerImg.offerTitle}</h2></p> */}
              </Carousel.Caption>
            </Carousel.Item>
          )
        })
      }


    </Carousel>
    // <div>
    //   <div className="slideshow">
    //     <div className="slideshowSlider" style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}>
    //       {props.offerImages.map((offerImg, index) => (
    //         offerImg !== '' &&
    //         (<div className="slide" key={index} style={{  }}>
    //           <img className="mobile_ad_image_slider" src={offerImg} width="100%" />
    //         </div>)
    //       ))}
    //     </div>

    //     <div className="slideshowDots">
    //       {props.offerImages.map((_, idx) => (
    //         <div
    //           key={idx}
    //           className={`slideshowDot${index === idx ? " active" : ""}`}
    //           onClick={() => {
    //             setIndex(idx);
    //           }}
    //         ></div>
    //       ))}
    //     </div>
    //   </div>
    // </div>
  );
};

export default Slider;
