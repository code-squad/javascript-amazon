window.addEventListener('DOMContentLoaded', () => {
  const eventController = new EventController(new Slide(), new Card());

  eventController.setLoad();
  eventController.slideMoveHandler();
});
