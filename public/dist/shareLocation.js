// const { stringToHtml } = require("./socket");

function getLocation() {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      // geo width and height
      const { latitude: lat, longitude: long } = position.coords;
      const latlong = new google.maps.LatLng(lat, long);
      const li = stringToHtml(`
      <li class="sent">
          <img src="https://static.vecteezy.com/system/resources/previews/020/765/399/non_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg"
              alt="" />
        
       </li>
    `);
      const p = stringToHtml(
        `  <p id="location-me" style="width:200 px;height : 150 px;"></p>`
      );
      const myOption = {
        center: latlong,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        mapTypeControl: false,
        navigationControlOptions: {
          style: google.maps.NavigationControlStyle.SMALL,
        },
      };
      const map = new google.maps.Map(p, myOption);
      li.appendChild(p);
      document.querySelector(".messages ul").appendChild(li);
      new google.maps.Marker({
        position: lat,
        map,
        title: "You are here",
      });
    },
    (error) => {
      const li = stringToHtml(`
      <li class="sent">
          <img src="https://static.vecteezy.com/system/resources/previews/020/765/399/non_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg"
              alt="" />
        
       </li>
    `);
      const p = stringToHtml(
        `  <p id="location-me" style="width:200 px;height : 150 px;">${error.message}</p>`
      );
      li.appendChild(p);
      document.querySelector(".messages ul").appendChild(li);
    }
  );
}
