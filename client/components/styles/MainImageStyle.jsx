import styled from 'styled-components';
import ReactTooltip from 'react-tooltip';

export const MainImageStyle = styled.div`
  display: flex;
  width: 100%;
`

export const Wish = styled.span`
  font-family: "Lucida Sans Unicode", "Lucida Grande", sans-serif;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 50px;
  left: 455px;
  font-size: 24px;
  font-weight: bolder;
  width: 40px;
  height: 40px;
  z-index: 1;
  color: gray;
  background-color: white;
  border: 2px solid lightgray;
  border-radius: 50%;
  user-select: none;
  :hover {
    cursor: pointer;
    color: blue;
    border-color: blue;
    user-select: none;
    text-shadow: 0 0 5px gray;
    box-shadow: 0 0 5px gray;
  }
  :active {
    color: white;
    background-color: blue;
  }
`


export const TooltipStyle = styled(ReactTooltip)`
  font-family: "Lucida Sans Unicode", "Lucida Grande", sans-serif;
  padding: 15px;
  border-radius: 8px;

`