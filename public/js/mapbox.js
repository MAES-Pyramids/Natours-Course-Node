/* eslint-disable */
const mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');
//-------------------------------------------//
export const displayMap = locations => {
  mapboxgl.accessToken =
    'pk.eyJ1IjoiYWJvZWxzZW91ZCIsImEiOiJjbGdtZDhhdDUwM3JjM2dzOXk2a241b2ljIn0.iSmtcIdR8rqUB0CPqK4hpA';
  var map = new mapboxgl.Map({
    container: 'map',
    // style: 'mapbox://styles/aboelseoud/clgmrhdhm00cf01pjbdia2c6r',
    style: 'mapbox://styles/aboelseoud/clgmru9xq00d901qyd2o1f9xh',
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
};
