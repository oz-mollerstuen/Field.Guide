import styled from "@emotion/styled";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { AuthUserContext } from "../components/Session";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const customTheme = extendTheme({
  styles: {
    global: ({ theme }) => ({
      root: {
        height: '100vh',
      },
      image: {
        backgroundImage: 'url(https://source.unsplash.com/collection/8172461/1500xauto)',
        backgroundRepeat: 'no-repeat',
        backgroundColor:
          theme.palette.type === 'dark' ? theme.palette.grey[900] : theme.palette.grey[50],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      },
      box: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      },
      avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
      },
      form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
      },
      submit: {
        margin: theme.spacing(3, 0, 2),
      },
      logo: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '2em',
      },
      logoText: {
        fontWeight: 'bold',
      },
      error: {
        color: 'red',
      },
    }),
  },
});

const useStylesInUp = styled.div(({ theme }) => ({
  ...theme.styles.global({ theme }),
}));

export default useStylesInUp;