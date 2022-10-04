import React, { useState,useMemo, createContext, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useLocalStorage } from './Storage/LocalStorage';

//import App from './App';

export const ColorModeContext = createContext({ toggleColorMode: () => {} });

export default function ToggleColorMode({_child}) {
    let _screenMode = 'dark';

    const [mode, setMode] = useState(_screenMode);
    const [primaryColor, setPrimaryColor] = useState('rgb(var(--primary-decimal))');
    const [secondaryColor, setSecondaryColor] = useState('rgb(var(--secondary-decimal))');

    useEffect( () => {
      let screenMode = 'dark';
      if( window.localStorage.getItem('screenMode') !== null ){
        screenMode = window.localStorage.getItem('screenMode');
      }

      document.documentElement.setAttribute("data-theme", screenMode);
      setMode(screenMode);
      setPrimaryColor('rgb(var(--primary-decimal))');
      setSecondaryColor('rgb(var(--secondary-decimal))');
    }, [mode]);

    const black = "rgb(" + 0 + "," + 0 + "," + 0 + ")"; // black
    const blackDecimal = "var(--black-decimal)"; // black
    const white = "rgb(" + 255 + "," + 255 + "," + 255 + ")"; // white
    const whiteDecimal = "var(--white-decimal)"; // black

    const red = "rgb(255,0,0)";
    const orange = "rgb(255,165,0)";
    const green = "rgb(0,128,0)";

    const blueBabytoshi = "rgb(" + 20 + "," + 147 + "," + 239 + ")";// blue babytoshi
    const orangeBabytoshi = "rgb(" + 247 + "," + 147 + "," + 27 + ")"; // orange babytoshi
    const yellow = "#FFFF00";

    const grey = "var(--grey)";
    const greyDark = 'var(--grey-dark)';
    const blueTwitter = 'rgb(29, 155, 240)';

    const primaryDecimal = 'var(--primary-decimal)';
    const brownWinno = 'var(--brown-winno)';
    const brownWinnoDecimal = 'var(--brown-winno-decimal)';
    const greyLight = 'var(--grey-light)';

    const shadowLightDecimal = '37, 44, 97';
    const shadowParchmentDecimal = '136, 144, 195';
    const greyDarkEthereum = 'var(--grey-dark-ethereum)';

    const colorMode = useMemo(
      () => ({
        toggleColorMode: () => {
          let newScreenMode = mode === 'dark' ? 'light' : 'dark';
          setMode((prevMode) => (prevMode === 'dark' ? 'light' : 'dark'));
          document.documentElement.setAttribute("data-theme", newScreenMode);
        },
      }),
      [],
    );
  
    const theme = useMemo(
      () =>
        createTheme({
          palette: {
              blackDecimal : {
                  main: blackDecimal,
              },
              whiteDecimal : {
                main: whiteDecimal,
              },
              greyDark: {
                main: greyDark,
                contrastText: white,
              },
              greyLight: {
                main: greyLight,
                contrastText: white,
              },
              brownwinno: {
                main: brownWinno,
                contrastText: white,
              },
              brownwinnodecimal: {
                main: brownWinnoDecimal,
                contrastText: white,
              },
              brownbear: {
                main: "#872222",
                contrastText: '#fff',
              },
              brownbeardark: {
                main: "#571616",
                contrastText: '#fff',
              },
              bluewinno: {
                main: "#0099DB",
                contrastText: '#fff',
              },
              bluetwitter: {
                //main: "#1D9BF0",
                main:blueTwitter,
                contrastText: '#fff',
              },
              secondary: {
                main: "rgb(" + 247 + "," + 147 + "," + 27 + ")", // orange babytoshi
                light: "rgb(" + 247 + "," + 147 + "," + 27 + ")", // orange babytoshi
                dark: "rgb(" + 247 + "," + 147 + "," + 27 + ")", // orange babytoshi
                disabled:"rgb(" + 255 + "," + 255 + "," + 255 + ")",
                contrastText: "rgb(" + 255 + "," + 255 + "," + 255 + ")",
              },
              error: {
                main: "#d32f2f", // orange babytoshi
                light: '#ef5350', // orange babytoshi
                dark: "#c62828", // orange babytoshi
                disabled:"rgb(" + 255 + "," + 255 + "," + 255 + ")",
                contrastText: "rgb(" + 255 + "," + 255 + "," + 255 + ")",
              },
              white: {
                main: "rgb(" + 255 + "," + 255 + "," + 255 + ")",
                light: white,
                dark: white,
                contrastText: "rgb(" + 0 + "," + 0 + "," + 0 + ")",
              },
              grey: {
                main: grey,
                contrastText: white,
              },
              blue: {
                main: blueBabytoshi,
                contrastText: white,
              },
              orange: {
                main: orangeBabytoshi,
                contrastText: white,
              },
              red: {
                main: red,
                contrastText: white,
              },
              green: {
                main: green,
                contrastText: white,
              },
              yellow: {
                main: yellow,
                contrastText: white,
              },
              //white: "rgb(" + 255 + "," + 255 + "," + 255 + ")",
              black: {
                main: "rgb(" + 0 + "," + 0 + "," + 0 + ")",
                //light: "rgb(" + 247 + "," + 147 + "," + 27 + ")", // orange babytoshi
                //dark:"rgb(" + 255 + "," + 255 + "," + 255 + ")",
                contrastText: "rgb(" + 255 + "," + 255 + "," + 255 + ")",
              },
              brown: {
                main: "rgb(33,16,0)",
                light: "rgb(" + 247 + "," + 147 + "," + 27 + ")", // orange babytoshi
                darker: "rgb(" + 247 + "," + 147 + "," + 27 + ")", // orange babytoshi
                contrastText: "rgb(" + 255 + "," + 255 + "," + 255 + ")",
              },
              blueLight: {
                main: "rgb(160,248,252)",
                light: "rgb(160,248,252)",
                darker: "rgb(160,248,252)",
                contrastText: "rgb(" + 0 + "," + 0 + "," + 0 + ")",
              },
              colorLiquidity: { // brown
                main: "rgb(33,16,0)",
                light: "rgb(33,16,0)",
                dark: "rgb(33,16,0)",
                contrastText: "rgb(" + 255 + "," + 255 + "," + 255 + ")", // white
              },
              colorMarketing: { // brown
                main: blueBabytoshi,
                light: blueBabytoshi,
                dark: blueBabytoshi,
                contrastText: "rgb(" + 255 + "," + 255 + "," + 255 + ")", // white
              },
              colorLuckyPlayer: { // brown
                main: orangeBabytoshi,
                light: orangeBabytoshi,
                dark: orangeBabytoshi,
                contrastText: "rgb(" + 255 + "," + 255 + "," + 255 + ")", // white
              },
              colorBurn: { // brown
                main: black,
                light: black,
                dark: black,
                contrastText: white, // white
              },
              divider: grey,
            mode,
            ...(mode === 'light'
            ? {  
                primary: {
                    main: primaryColor,
                    contrastText: black,
                  }, 
                  secondary: {
                    main: secondaryColor,
                    contrastText: white,
                  }, 
                  primarydecimal: {
                    main: primaryDecimal,
                    contrastText: black,
                  },
                colorChip: {
                    main: black,
                    contrastText: white,
                  },             
                background: {
                    default: white,
                    reverse: black,
                    menu: greyLight,
                    footer: greyLight,
                    card: white,
                    border:greyLight,
                    parchment: white,
                    cardDecimal:whiteDecimal,
                    badge: greyLight,
                    roleTeam: black,
                    shadow:shadowLightDecimal,
                    shadowParchment:shadowParchmentDecimal,
                    //paper: greyDarkEthereum,
                },
                text: {
                    primary: black,
                    secondary: white,
                },
                backgroundStory :{
                    default:red,
                    reverse:green,
                }
                }
            : {
                primary: {
                    main: primaryColor,
                    contrastText: black,
                  },
                  secondary: {
                    main: secondaryColor,
                    contrastText: white,
                  }, 
                  primarydecimal: {
                    main: primaryDecimal,
                    contrastText: black,
                  },
                  colorChip: {
                    main: white,
                    contrastText: black,
                  },
                  error : {
                    main: red,
                  },
                  warning : {
                    main:orange,
                  },
                  success : {
                    main:green,
                  },
                  brownbear: {
                    main: "#872222",
                    contrastText: '#fff',
                  },
                  brownbeardark: {
                    main: "#571616",
                    contrastText: '#fff',
                  },
                  bluewinno: {
                    main: "#0099DB",
                    contrastText: '#fff',
                  },

                colorLiquidity: {
                  main: white,
                  light: white,
                  darker: white,
                  contrastText: white,
                },
                colorBurn: { // brown
                  main: white,
                  light: white,
                  dark: white,
                  contrastText: black, // white
                },
                // palette values for dark mode
                //backgroundColor: "rgb(" + 0 + "," + 0 + "," + 0 + ")",
                //primary: deepOrange,
                //divider: orangeBabytoshi,
                background: {
                    default: black,
                    reverse: greyLight,
                    menu:greyDark,
                    footer:greyDark,
                    card: greyDark,
                    border:greyDarkEthereum,
                    parchment: greyDark,
                    cardDecimal: blackDecimal,
                    badge: black,
                    roleTeam: black,
                    shadow: whiteDecimal,
                    shadowParchment:whiteDecimal,
                    //story: greyDarkEthereum,
                    //card: red,
                },
                text: {
                    primary: white,
                    secondary: black,
                },
                backgroundStory :{
                    default:greyDarkEthereum,
                    reverse:red,
                }
                }),
          },
        }),
      [mode],
    );
  
    return (
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>          
          {_child}
        </ThemeProvider>
      </ColorModeContext.Provider>
    );
  }