import styled from 'styled-components';

export const ModalStyle = styled.div`

position: fixed;
overflow: auto;
z-index: 2;
left: 0;
top: 0;
width: 100%;
height: 100%;
background-color: rgba(130, 130, 130, 0.5);
`
export const ImageStyle = styled.img`
z-index: 3;
display: block;
margin: 3% auto;
margin-bottom: 20px;
width: 80%;
height: 80%;
object-fit: scale-down;
border-radius: 5px;
`