window.addEventListener('DOMContentLoaded', () => {
  const eventController = new EventController(new Slide(), new Card(), new Button());

  eventController.setLoad();
});
