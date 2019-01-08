/*
[Core Functions]
- [V] [View] input update => call controller.query
- [V] [Model] well fetches API data >> { apiURI: 'http://crong.codesquad.kr:8080/amazon-ac/' }
- [V] [Model] updation notifies controller templating well
- [V] [Controller] templating method returns good result // highlighted, well set URL
- [V] [View] well updates View with new template given by controller
 */

/*
 [UX Improvement on View]
 - [V] Basic UI - height, color, margin/padding...
 - [ ] Background dim on auto suggestion
 - [ ] highlight text matching search word
 - [ ] Block query when user clears input

 - [ ] Can navigate with keyboard arrow keys
    >> Reference: https://stackoverflow.com/questions/33790668/arrow-keys-navigation-through-li-no-jquery/34420491
 - [ ] focus made by arrow key highlights suggestion
 - [ ] Input value updates on navigation with keyboard
 - [ ] Enter key on suggestion list focus initiate search
 - [ ] Clicking Search btn closes suggestion bar
  */
