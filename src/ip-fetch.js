let map;
class UI {
  constructor() {}
  fetchIP() {
    this.userinput = document.querySelector("#input-box").value;
    this.key = "at_DdWQPKE8vRnpQ6aXLrvGBdmC0kjRw";
    const reg = /^[1-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}$/;
    if (reg.test(this.userinput)) {
      fetch(
        `https://geo.ipify.org/api/v2/country,city?apiKey=${this.key}&ipAddress=${this.userinput}`
      )
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          ui.displayIpInfo(res);
          return res;
        })
        .then((res) => {
          ui.displayMap(res.location.lng, res.location.lat);
        });
    } else {
      ui.displayError("Please enter valid IP address", "error");
      ui.clearErrorMsg();
    }
  }
  displayIpInfo(obj) {
    this.ip_box = document.querySelector("#ip-address");
    this.location_box = document.querySelector("#ip-location");
    this.timezone_box = document.querySelector("#ip-timezone");
    this.isp_box = document.querySelector("#ip-isp");
    //------------------------------------------------//
    this.ip_box.innerText = obj.ip;
    this.location_box.innerText = `${obj.location.region} ${obj.location.city}`;
    this.timezone_box.innerText = `UTC ${obj.location.timezone}`;
    this.isp_box.innerText = obj.isp;
  }
  displayMap(long, lat) {
    if (map) {
      (map = map.off()), (map = map.remove());
    }
    map = L.map("map").setView([lat, long], 13);
    let addTile = L.tileLayer(
      "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
      {
        maxZoom: 19,
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }
    );
    let pointer = L.marker([lat, long]);
    addTile.addTo(map);
    pointer.addTo(map);
  }
  displayError(errorMsg, errorClass) {
    if (document.querySelector(".error")) {
      document.querySelector(".error").remove();
    }
    const div = document.createElement("div");
    div.innerText = errorMsg;
    div.className = errorClass;
    const container = document.querySelector(".container");
    container.appendChild(div);
  }
  clearErrorMsg() {
    setTimeout(() => {
      document.querySelector(".error").remove();
    }, 1800);
  }
}

export const ui = new UI();
