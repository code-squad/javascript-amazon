// prettier-ignore
/*eslint-disable */
const carouselNav = (data) => 
`
  <ul class="carousel__nav">
    ${data.carouselNav.reduce((acc, curr, index) => {
      acc += 
      `<li class="carousel__nav--item ${index === 0 ? 'active' : ""}" data-index=${index}>
        <p>${curr.title}</p>
      </li>`
      return acc}, '')}
  </ul>
`

export default carouselNav;
