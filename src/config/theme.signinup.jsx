import styled from "@emotion/styled";
import "firebase/compat/auth";
import "firebase/compat/firestore";



const useStylesInUp = styled.div(({ theme }) => ({
  ...theme.styles.global({ theme }),
}));

export default useStylesInUp;