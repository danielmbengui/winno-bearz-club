import React from 'react';
import { useTheme, } from '@mui/material/styles';
import styleExtras from "./Extras.module.css";
import Link from 'next/link';
import Image from 'next/image';

const PATH_PAGE_IMG = "/extras/winnoandbees/img/";
const myLoader = ({ src, width, quality }) => {
  return `${PATH_PAGE_IMG}${src}?w=${width}&q=${quality || 75}`
}
const winnoandbees_img = "game-preview.gif";

const Extras = () => {
  const theme = useTheme();
  const extras = [
    { image_path: winnoandbees_img, title: "Winno&Bees", href: '/extras/winnoandbees'},
  ]
  const styleBoxPerson = {
    backgroundColor: theme.palette.background.card,
    boxShadow: `0px 5px 15px 0 rgba(${theme.palette.background.shadow}, ${theme.palette.mode === 'light' ? 0.1 : 0.1})`,
  }

    return(
        <div className="page-component__bg_image_box bg-white-color" id="extra-02-602551">
  <div className="page-component__bg_overlay_box"></div>
  <div className="page-component__wrapper" style={{
            zIndex: 12,
            paddingTop:'50px',
            paddingBottom:'70px',
            background: theme.palette.background.default,
            color:theme.palette.text.primary
        }}>
    <div className="team-02">
      <div className="container container--xlarge">
        <ul className={`${styleExtras['extra-02__list']}`}>
          {
            extras.map( (member, index) => {
              return(
                <Link href={member.href} key={index}>
                <a target={'_blank'}>
                <li  className={`${styleExtras['extra-02__person']}`} style={styleBoxPerson}>
                  <div className="">
                    <div className={`${styleExtras['extra-02__person_img_box']}`}>
                    <Image
                          className={`${styleExtras['extra-02__person_img']}`}
                          loader={myLoader}
                          priority
                          layout="responsive"
                          src={member.image_path}
                          quality={100}
                          alt="Winno&Bees teaser"
                          width={'5vw'}
                          height={'3vw'}
                        />
                    </div>
                    <div className={`${styleExtras['extra-02__person_tag']}`}>
                      <span className={`tag color-main bg-light ${styleExtras['extra-role']}`}>
                        <span className="">{member.title}</span>
                      </span>
                    </div>
                  </div>
                </li>
                </a>
                </Link>
              )
            })
          }
        </ul>
        <div className="bottom_cta"></div>
      </div>
    </div>
  </div>
</div>
    )
}

export default Extras;