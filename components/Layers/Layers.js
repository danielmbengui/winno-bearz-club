import Parchment from "../Surfaces/Parchment";
const Layers = ({links}) => {
    return(
      <>
      <Parchment 
        title={'Each WinnoBearz NFT contains 8 differents layers -> 194 traits.'}
        content={
          <div className="content_box">
                <div>
                  <ol>
                    <li>Backgrounds (9)</li>
                    <li>Patterns (18)</li>
                    <li>Heads (30)</li>
                    <li>Bandanas (32)</li>
                    <li>Mouths (15)</li>
                    <li>Eyes (44)</li>
                    <li>Sunglasses (19)</li>
                    <li>Hats (27)</li>
                  </ol>
                </div>
              </div>
        }
      />
        {
          /*
          <div className="page-component__bg_image_box" id="text-02-642981">
  <div className="page-component__bg_overlay_box"></div>
  <div className="page-component__wrapper" style={{
            zIndex: 16,
            paddingTop:'50px',
            paddingBottom:'50px',
        }}>
    <section>
      <div className="text--02">
        <div className="container container--mid">
          <div className="text--02__box">
            <div className="text--02__content_box text--02__content_box--bottom"></div>
            <div className="text--02__content_box text--02__content_box--top">
              <div className="text--02__img">
                <img loading="lazy" src="https://ucarecdn.com/c8074e2b-e2ad-4b87-aa74-45ca8370a0ea/bearz-club.png" alt="Bearz club" className="" height="100" />
              </div>
              <h3> Each WinnoBearz NFT contains 8 differents layers</h3>
              <div className="content_box">
                <div>
                  <ol>
                    <li>Backgrounds (9)</li>
                    <li>Patterns (18)</li>
                    <li>Heads (30)</li>
                    <li>Bandanas (32)</li>
                    <li>Mouths (15)</li>
                    <li>Eyes (44)</li>
                    <li>Sunglasses (19)</li>
                    <li>Hats (27)</li>
                  </ol>
                </div>
              </div>
              <div className="text--02__link_box" style={{display:'none'}}>
                <div className="buttons-set">
                  <ul className="buttons-set__list">
                    <li className="buttons-set__item">
                      <a data-stripe-product-id="" data-stripe-mode="payment" data-successful-payment-url="" data-cancel-payment-url="" className="pill-link   pill-link--blue" href={links.OPENSEA_LINK} target="_blank">
                        <span className="pill-link__pill">OpenSea</span>
                        <span className="pill-link__text"> View On </span>
                        <span className="pill-link__icon">
                          <span className="icon">
                            <svg viewBox="0 0 13 10" xmlns="http://www.w3.org/2000/svg">
                              <path d="M12.823 4.164L8.954.182a.592.592 0 0 0-.854 0 .635.635 0 0 0 0 .88l2.836 2.92H.604A.614.614 0 0 0 0 4.604c0 .344.27.622.604.622h10.332L8.1 8.146a.635.635 0 0 0 0 .88.594.594 0 0 0 .854 0l3.869-3.982a.635.635 0 0 0 0-.88z" fillRule="nonzero" fill="#00396B"></path>
                            </svg>
                          </span>
                        </span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</div>
*/
        }
</>
    )
}

export default Layers;