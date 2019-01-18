# javascript-amazon
레벨3

## STEP 4 [Carousel Slide]
- Debounce 적용 경험 블로그 기록
> - https://medium.com/@feanar729/debounce%EB%9E%80-%EB%AD%98%EA%B9%8C%EC%9A%94-82204c8b953f 



## STEP 7 [메가 드롭 다운 메뉴]
- 마우스에 상위 메뉴에 있는 각 content 메뉴를(outer-layer > content-layer) hover시 하위 메뉴 open 
- 마우스에 content 메뉴에 일정시간(300ms) 머무를시 마우스 위치값 저장
- content 메뉴에서 하위 메뉴(inner-layer)로 대각선 이동시 확인(대각선 값 확인)
  - 이동 각도 라면 삼각형 범위 계산 event 정지
  - 아니라면 삼각형 마우스 값 초기화 [=> 삼각형 마우스 계산시 초기화 값(x:0 ,y:0)일 시 예외 처리(return false)]

### 버그 및 수정 사항
  1. 중간 상품영역 대각선 이동시 삼각형 알고리즘 on상태에 해당 상하상품 영역 hover기능 작동 X 버그 
  2. 서브메뉴 영역(inner-layer) hover 이후 완전히 나갈시(department 탐색 중단의 경우) 서브메뉴 display : none 초기화 필요

