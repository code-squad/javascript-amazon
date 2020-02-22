// 선언부
const getApiAddress = (url, params) => { // 서버의 역할(서버에서 오는 정보) 서버는 DB에 접근
  ///url = v1/id , params = { phone: '01012344000' }
  const user = params.phone === '01012344000' ? '김모모' : '김콩이'; // 김모모
  const data = {
    user: user, // 김모모
    serverAddress: `https://www.serverAPI${url}?${params.phone}`
  };
  return data; // 4~7에서 조합된 객체리턴
};

// 선언부
const getFetch = (url, params) => { // 프라미스(객체형태)를 리턴.)
  return new Promise((resolve, reject) => { // return 으로 프라미스 객체생성 constructor는 함수(resolve, reject인자 고정)
    // 비동기함수 뭔가를 할꺼야.
    ///url = v1/id , params = { phone: '01012344000' }
    const userData = getApiAddress(url, params); // 즉 객체형태인 data // 서버에 요청 날려서 받음

    if (userData) {
      resolve(userData);
    } else {
      const error = {
        status: 500,
        message: 'api통신에러'
      };
      reject(error);
    }
  });
};


// (프라  미스 객체)실행부
getFetch('/v1/id', {phone: '01012344000'}).then((response) => { // resolve - then
  console.log('나는 리졸브되서 완성이됐어!!', response);
}).catch((err) => { // reject - catch
  console.log('나는 실패해버렸어 ㅠㅠ', err.status, err.message)
});


// 비동기