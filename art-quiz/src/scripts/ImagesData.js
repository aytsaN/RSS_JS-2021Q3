export class ImagesData {
  constructor(startNum, endNum) {
    this.startNum = startNum;
    this.endNum = endNum;

    this.url = './assets/json/en-images.json';
  }

  async getQuizData() {
    const response = await fetch(this.url);
    const json = await response.json();

    const data = [...json].slice(this.startNum, this.endNum);

    return data;
  }
}
