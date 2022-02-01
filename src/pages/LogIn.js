import React from 'react';
import Header from '../components/Header';
import LoginModal from '../components/LoginModal';
import styled from 'styled-components'
import ImageBg from '../static/img/loginbg.png';
import Footer from '../components/Footer';


const Container = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    position: relative;
    overflow: hidden;
`

const ImgContainer = styled.div`
    flex: 1;
    height: 100%;
    display: flex;
    justify-content: center;
`
const Image = styled.img`
    width: 100%;
    object-fit: fill;
`

const LogIn = () => {

  return (
      <Container>
          <ImgContainer>
                <Image src={ImageBg}/>
          </ImgContainer>
          <Header/>
        <LoginModal/>
        <Footer/>
      </Container>    
  );
};

export default LogIn;
