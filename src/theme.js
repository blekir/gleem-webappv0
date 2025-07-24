// color design tokens export
export const tokensDark = {
  backgrounds: {
    0: "#DDDDE4",
    50: "#ffffff80",
    70: "#ffffffb3", // 70% opacity of white
  },

  primary: {
    100: "#F8F9FA",
    200: "#E9ECEF",
    300: "#DEE2E6",
    400: "#CED4DA",
    500: "#ADB5BD",
    600: "#6C757D",
    700: "#495057",
    770: "#3D4755B2", // 70% opacity of color 700
    800: "#343A40",
    900: "#212529",
  },

  grey: {
    0: "#DDDDE4", // manually adjusted
    10: "#f6f6f6", // manually adjusted
    50: "#fff", // manually adjusted
    100: "#e0e0e0",
    200: "#c2c2c2",
    300: "#a3a3a3",
    400: "#858585",
    500: "#666666",
    600: "#525252",
    700: "#3d3d3d",

    800: "#292929",
    900: "#141414",
    1000: "#000000", // manually adjusted
  },

  yellows: {
    // yellow
    50: "#2380FB", // manually adjusted
    100: "#0F75FA",
    200: "#056BF0",
    300: "#0462DC",
    400: "#0459C8",
    500: "#0450B4",
    600: "#0347A0",
    700: "#033E8C",
    800: "#033E8C",
    900: "#023578",
  },
  secondary: {
    50: "#f0f0f0",
    100: "#fefdfe",
    200: "#fcfcfd",
    300: "#fbfafb",
    400: "#f9f9fa",
    500: "#f8f7f9",
    600: "#c6c6c7",
    700: "#959495",
    800: "#636364",
    900: "#323132",
  },
  // secondary: {
  //   50: '#f0f0f0',
  //   100: '#fdfbde',
  //   200: '#fcf7bd',
  //   300: '#faf49b',
  //   400: '#f9f07a',
  //   500: '#f7ec59',
  //   600: '#c6bd47',
  //   700: '#948e35',
  //   800: '#635e24',
  //   900: '#312f12',
  // },
};

// function that reverses the color palette
function reverseTokens(tokensDark) {
  const reversedTokens = {};
  Object.entries(tokensDark).forEach(([key, val]) => {
    const keys = Object.keys(val);
    const values = Object.values(val);
    const length = keys.length;
    const reversedObj = {};
    for (let i = 0; i < length; i++) {
      reversedObj[keys[i]] = values[length - i - 1];
    }
    reversedTokens[key] = reversedObj;
  });
  return reversedTokens;
}
export const tokensLight = reverseTokens(tokensDark);

// mui theme settings
export const themeSettings = (mode) => {
  return {
    palette: {
      mode: mode,
      ...(mode === "dark"
        ? {
            // palette values for dark mode
            primary: {
              ...tokensDark.primary,

              main: tokensDark.primary[700],
              light: tokensDark.primary[700],
            },
            secondary: {
              ...tokensDark.secondary,
              main: tokensDark.secondary[900],
            },
            neutral: {
              ...tokensDark.grey,
              main: tokensDark.grey[500],
            },
            background: {
              default: tokensDark.primary[800],
              alt: tokensDark.primary[900],
            },
            yellows: {
              ...tokensDark.yellows,
              main: tokensDark.yellows[300],
            },
          }
        : {
            // palette values for light mode
            primary: {
              ...tokensLight.primary,

              main: tokensDark.grey[700],
              light: tokensDark.grey[100],
            },
            secondary: {
              ...tokensLight.secondary,
              main: tokensDark.secondary[600],
              light: tokensDark.secondary[700],
            },
            neutral: {
              ...tokensLight.grey,
              main: tokensDark.grey[500],
            },
            background: {
              default: tokensDark.backgrounds[0],
              alt: tokensDark.backgrounds[50],
              borders: tokensDark.backgrounds[100],
            },
            yellows: {
              ...tokensLight.yellows,
              main: tokensLight.yellows[300],
            },
          }),
    },
    typography: {
      fontFamily: ["Manrope", "sans-serif"].join(","),
      fontSize: 12,
      h1: {
        fontFamily: ["Manrope", "sans-serif"].join(","),
        fontSize: 40,
      },
      h2: {
        fontFamily: ["Manrope", "sans-serif"].join(","),
        fontSize: 32,
      },
      h3: {
        fontFamily: ["Manrope", "sans-serif"].join(","),
        fontSize: 24,
      },
      h4: {
        fontFamily: ["Manrope", "sans-serif"].join(","),
        fontSize: 20,
      },
      h5: {
        fontFamily: ["Manrope", "sans-serif"].join(","),
        fontSize: 16,
      },
      h6: {
        fontFamily: ["Manrope", "sans-serif"].join(","),
        fontSize: 14,
      },
    },
  };
};
