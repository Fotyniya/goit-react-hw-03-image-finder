import styled from 'styled-components';

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 1200;
`
export const ModalWindow = styled.div`
  position: relative;
  max-width: calc(100vw - 48px);
  max-height: calc(100vh - 24px);
`
export const LargeImg = styled.img`
  width: 100%;
  height: 360px;
  object-fit: cover;
`
export const Btn = styled.button`
  display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 8px;
    right: 8px;
    width: 30px;
    height: 30px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 50%;
    background-color: transparent;
    padding: 0;
`

