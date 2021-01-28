import './App.css';
import React, { Component } from 'react';
const { Kakao } = window;

class App extends Component {
  state = {
    isLogin:false,
  }

  loginWithKakao = () =>{
    console.log("로그인 버튼클릭됨!");
    Kakao.Auth.login({
      success: (auth) => {
        console.log("정상적인 로그인 성공!");
        this.setState({
          isLogin:true
        })
      },
      fail:(err) => {
        console.error(err)
      }
    })
  }

  logoutWithKakao = () => {
    console.log("로그아웃 버튼클릭됨!");
    if(Kakao.Auth.getAccessToken()){
      console.log('카카오 인증 액세스 토큰 존재',Kakao.Auth.getAccessToken());
      Kakao.Auth.logout (() => {
        console.log("로그아웃 되었음!",Kakao.Auth.getAccessToken());
        this.setState({
          isLogin:false
        })
      })
    }
  }

  render(){
    return (
      <div>
        <p>로그인화면</p>
        <button onClick={this.loginWithKakao}>카카오 로그인</button>

        <p>메인화면</p>
        <button onClick={this.logoutWithKakao}>카카오 로그아웃</button>

      </div>
    );
  }

  componentDidMount(){
    console.log("componentDidMount :::: 작동됨");
    Kakao.init('7c768993f188e7f200b17c0bac85ca81');

    if(Kakao.Auth.getAccessToken()){
      console.log("액세스 토큰이 존재합니다. 세션을 유지합니다.");
      this.setState({
        isLogin:true
      })
    }
  }
}

export default App;
