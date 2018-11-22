/* 
[주요 동작]
검은색 바 - 히든 / 가로 100%
헤더가 화면 벗어났을/들어왔을 때 이벤트가 기록되게 할 수 있나? -> 그러면 이 때 바 숨기고 노출하고 하면 될텐데.

[부가 사항]
검은색 바 안에 링크 -> 링크 클릭하면 레이어가 애니메이션과 함께 펼쳐짐
추가레이어 - 우상단/중앙하단 버튼을 클릭해 닫는다

[요구 사항]
animation은 transition효과를 사용한다.
ES6 Classes 로 하나또는 두개의 클래스로 나눠서 개발한다.

[작업 흐름]
- 검은색 바 만들기
- 검은색 바 애니메이션 구현
- 내부 레이어 만들기
- 내부 레이어 애니메이션 구현

 */

window.addEventListener("scroll", () => {
  const mastheadHeight = document.querySelector(".masthead").clientHeight;
  const headerHeight = document.querySelector(".header").clientHeight;
  const stickyBanner = document.querySelector(".stickyNav");
  if (window.scrollY < mastheadHeight + headerHeight) {
    stickyBanner.style.height = "0";
    return;
  }

  stickyBanner.style.height = "6rem";
});
