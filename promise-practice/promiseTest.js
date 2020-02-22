// 선언부
const getApiForMenuList = () => { // 서버의 역할(서버에서 오는 정보) 서버는 DB에 접근
  const navigationMenuList = {
    oneDepth: [
      'Amazon Video',
      'Amazon Music',
      'Appstore For Android',
      'Echo & Alexa',
      'Fire Tablets'
    ]
  };
  return navigationMenuList; // 4~7에서 조합된 객체리턴
};

// 선언부
const getFetch = () => { // 프라미스(객체형태)를 리턴..)
  return new Promise((resolve, reject) => { // return 으로 프라미스 객체생성 constructor는 함수(resolve, reject인자 고정)
    // 비동기함수 뭔가를 할꺼야.
    ///url = v1/id , params = { phone: '01012344000' }
    const menuList = getApiForMenuList(); // 즉 객체형태인 data // 서버에 요청 날림

    if (menuList) {
      resolve(menuList);
    } else {
      const error = {
        status: 500,
        message: 'api통신에러'
      };
      reject(error);
    }
  });
};


// (프라이스 객체)실행부
getFetch().then((response) => { // resolve - then
  console.log('나는 리졸브되서 완성이됐어!!', response.oneDepth);
}).catch((err) => { // reject - catch
  console.log('나는 실패해버렸어 ㅠㅠ', err.status, err.message)
});
