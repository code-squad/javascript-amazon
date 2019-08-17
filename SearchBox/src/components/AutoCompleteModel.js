class AutoCompleteModel {
  constructor() {
    this.URL =
      "https://h3rb9c0ugl.execute-api.ap-northeast-2.amazonaws.com/develop/amazon_autocomplete";
  }
  async getData({ keyword }) {
    try {
      console.log(keyword);
      const { statusCode, body } = await fetch(
        `${this.URL}?query=${keyword}`
      ).then(data => data.json());
      switch (statusCode) {
        case 200:
          return body.suggestions;

        case 404:
          throw new Error("검색 결과가 없습니다.");
      }
    } catch (err) {
      console.log(err);
      return [];
    }
  }

  extractValue({ results }) {
    return results.map(result => result.value);
  }
}

export default AutoCompleteModel;
