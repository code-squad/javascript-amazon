// prettier-ignore
/*eslint-disable */
const carouselHeader = (data) => 
`
  <ul class="carousel__header">
    ${data.carouselHeader.reduce((acc, curr, index) => {
      acc += 
      `<li class="carousel__header--item ${index === 0 ? 'active' : ""}" data-index="${index}">
        <p>${curr.title}</p>
      </li>`
      return acc}, '')}
  </ul>
`

export default carouselHeader;
