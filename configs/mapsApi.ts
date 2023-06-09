const LIBRARIES = ['places'];

const MAP_OPTIONS_DEFAULT = {
    mapTypeControl: true,
    streetViewControl: false,
    fullscreenControl: false,
    zoomControl: true,
    mapTypeId: 'roadmap',
    zoom: 14,
    center: { lat: -37.266919903698266, lng: -56.9869653399663462 },
    styles: [
      {
        featureType: "poi",
        elementType: "labels",
        stylers: [{ visibility: "off" }]
      }]
  }
const GESELL = { lat: -37.266919903698266, lng: -56.9869653399663462 }
const MADARIAGA ={ lat: -37.001944, lng: -57.136111}

const GoogleMapsConfig = {
  scriptInit: {
    googleMapsApiKey: "AIzaSyATNDswrRQLqhoxDwYh9B9W0Jp90NVGcEY",
    libraries: LIBRARIES,
  },
  LIBRARIES:LIBRARIES,
  MAP_OPTIONS_DEFAULT:MAP_OPTIONS_DEFAULT,
  GESELL:GESELL,
  MADARIAGA:MADARIAGA
}

export default GoogleMapsConfig