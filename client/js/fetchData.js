import { TemplateData } from "./templateData.js";

const fetchData = () => {
  fetch("/users")
    .then(response => response.json())
    .then(mockData => {
      const templateData = new TemplateData(mockData);
    });
};

export { fetchData };
