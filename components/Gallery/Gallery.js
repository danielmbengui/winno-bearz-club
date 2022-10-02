import React from 'react';
import Link from 'next/link';

const gallery =
  [
    {
      src: "/assets/img/Gallery/brown.png", alt: "brown",
    },
    {
      src: "/assets/img/Gallery/grey.png", alt: "grey",
    },
    {
      src: "/assets/img/Gallery/black.png", alt: "black",
    },
    {
      src: "/assets/img/Gallery/green.png", alt: "green",
    },
    {
      src: "/assets/img/Gallery/blue.png", alt: "blue",
    },
    {
      src: "/assets/img/Gallery/white.png", alt: "white",
    },
    {
      src: "/assets/img/Gallery/orange.png", alt: "orange",
    },
    {
      src: "/assets/img/Gallery/pink.png", alt: "pink",
    },
    {
      src: "/assets/img/Gallery/red.png", alt: "red",
    },
  ];

const Gallery = ({ links }) => {
  return (
    <div className="page-component__bg_image_box" id="photos-01-214401">
      <div className="page-component__bg_overlay_box"></div>
      <div className="page-component__wrapper" style={{
        zIndex: 14,
        paddingTop: '0.1vh',
        paddingBottom: '50px',
      }}>
        <div className="photos-01">
          <div className="container container--small">
            <div className="title-box title-box--center">
            </div>
          </div>
          <div className="container container--large">
            <div className="photos-01__images_row">
              {
                gallery.map((img, index) => {
                  return(
                  <span key={index} className="photos-01__person">
                    <div className="photos-01__image_box photos-01__link">
                      <img loading="lazy" src={img.src} alt={img.alt} className="photos-01__image" />
                    </div>
                  </span>
                  )
                })
              }
              </div>
            <div className="bottom_cta">
              <div className="buttons-set">
                <ul className="buttons-set__list">
                  <li className="buttons-set__item">
                    <Link href={links.opensea.URL}>
                      <a data-stripe-product-id="" data-stripe-mode="payment" data-successful-payment-url="" data-cancel-payment-url="" className="pill-link pill-link--opensea" target="_blank">
                        <span className="pill-link__pill">Opensea</span>
                        <span className="pill-link__text">View Collection</span>
                        <span className="pill-link__icon">
                          <span className="icon">
                            <svg viewBox="0 0 13 10" xmlns="http://www.w3.org/2000/svg">
                              <path d="M12.823 4.164L8.954.182a.592.592 0 0 0-.854 0 .635.635 0 0 0 0 .88l2.836 2.92H.604A.614.614 0 0 0 0 4.604c0 .344.27.622.604.622h10.332L8.1 8.146a.635.635 0 0 0 0 .88.594.594 0 0 0 .854 0l3.869-3.982a.635.635 0 0 0 0-.88z" fillRule="nonzero" fill="#00396B"></path>
                            </svg>
                          </span>
                        </span>
                      </a>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Gallery;