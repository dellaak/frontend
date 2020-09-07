import styled from "styled-components"
import AppBar from '@material-ui/core/AppBar';
import keyframes from "styled-components"


export const StyledNavbar = styled(AppBar)`
padding:10px;
position: fixed !important;
background-color: ${props => props.scrolled ? '#00000066' : 'transparent' } !important;
box-shadow:none !important;

`

