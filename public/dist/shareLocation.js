function getLocation() {
  navigator.geolocation.getCurrentPosition(
    (position) => {
        // geo width and height
      const { latitude: lat, longitude: long } = position.coords;
    },
    (error) => {}
  );
}
