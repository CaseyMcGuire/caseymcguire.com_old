
class DataService {

  public getInitialData() {
    const data = document.getElementById("params");
    let initialState;
    if (data) {
      initialState = JSON.parse(data.getAttribute("data-initial-data") || '{}');
    }
    else {
      initialState = {};
    }
    return initialState;
  }
}

export default new DataService();