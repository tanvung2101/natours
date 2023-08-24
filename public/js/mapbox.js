/*eslint-disable*/


export const displayMap = (locations) => {
  mapboxgl.accessToken = 'pk.eyJ1IjoibGllbnRhbnZ1bmciLCJhIjoiY2xsaHJwb2E0MGg4NzNsdDZveHJwaDEyMCJ9.oj1zKpGmn5sRWNReLcyAEA';
  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/lientanvung/cllhr97x3018f01qs3d47clso',
    scrollZoom: false
  });

  const bounds = new mapboxgl.LngLatBounds();

  locations.forEach(loc => {
    // Create marker
    const el = document.createElement('div');
    el.className = 'marker';

    // Add marker
    new mapboxgl.Marker({
      element: el,
      anchor: 'bottom'
    })
      .setLngLat(loc.coordinates)
      .addTo(map);

    // Add popup
    new mapboxgl.Popup({
      offset: 30
    })
      .setLngLat(loc.coordinates)
      .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
      .addTo(map);

    // Extend map bounds to include current location
    bounds.extend(loc.coordinates);
  });

  map.fitBounds(bounds, {
    padding: {
      top: 200,
      bottom: 150,
      left: 100,
      right: 100
    }
  });
}

  