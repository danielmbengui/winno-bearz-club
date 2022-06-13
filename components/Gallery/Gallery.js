import Link from 'next/link';

const Gallery = ({links}) => {
    return(
        <div className="page-component__bg_image_box" id="photos-01-214401">
  <div className="page-component__bg_overlay_box"></div>
  <div className="page-component__wrapper" style={{
            zIndex: 14,
            paddingTop:'0.1vh',
            paddingBottom:'50px',
        }}>
    <div className="photos-01">
      <div className="container container--small">
        <div className="title-box title-box--center">
          {/* <h2 className="heading ">GALLERY</h2> */}
        </div>
      </div>
      <div className="container container--large">
        <div className="photos-01__images_row">
          <span className="photos-01__person">
            <div className="photos-01__image_box photos-01__link">
              <img loading="lazy" src="/assets/img/nft/brown.png" alt="gallery-one" className="photos-01__image" />
            </div>
          </span>
          <span className="photos-01__person">
            <div className="photos-01__image_box photos-01__link">
              <img loading="lazy" src="/assets/img/nft/grey.png" alt="gallery-five" className="photos-01__image" />
            </div>
          </span>
          <span className="photos-01__person">
            <div className="photos-01__image_box photos-01__link">
              <img loading="lazy" src="/assets/img/nft/black.png" alt="gallery-three" className="photos-01__image" />
            </div>
          </span>
          
          <span className="photos-01__person">
            <div className="photos-01__image_box photos-01__link">
              <img loading="lazy" src="/assets/img/nft/green.png" alt="gallery-seven" className="photos-01__image" />
            </div>
          </span>
          <span className="photos-01__person">
            <div className="photos-01__image_box photos-01__link">
              <img loading="lazy" src="/assets/img/nft/blue.png" alt="gallery-two" className="photos-01__image" />
            </div>
          </span>
          <span className="photos-01__person">
            <div className="photos-01__image_box photos-01__link">
              <img loading="lazy" src="/assets/img/nft/white.png" alt="gallery-four" className="photos-01__image" />
            </div>
          </span>
          
          <span className="photos-01__person">
            <div className="photos-01__image_box photos-01__link">
              <img loading="lazy" src="/assets/img/nft/orange.png" alt="gallery-seven" className="photos-01__image" />
            </div>
          </span>
          
          <span className="photos-01__person">
            <div className="photos-01__image_box photos-01__link">
              <img loading="lazy" src="/assets/img/nft/pink.png" alt="gallery-six" className="photos-01__image" />
            </div>
          </span>
          
          
          <span className="photos-01__person">
            <div className="photos-01__image_box photos-01__link">
              <img loading="lazy" src="/assets/img/nft/red.png" alt="gallery-seven" className="photos-01__image" />
            </div>
          </span>
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