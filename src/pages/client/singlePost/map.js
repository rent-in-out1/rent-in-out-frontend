import React from 'react'
import { MapContainer, TileLayer, Marker, Popup , Tooltip } from 'react-leaflet';
import { Icon } from 'leaflet'

const myIcon = new Icon({
    iconUrl:"" ,
    iconSize : [30,45],
    //reloacte icon
    iconAnchor: [30,45],
    //reloacte popup
    popupAnchor: [0,-35],
    //reloacte tooltip
    tooltipAnchor: [0,-35]
})

const Map = () => {
  return (
    <MapContainer center={[31.777, 35.235]} zoom={15} scrollWheelZoom={true}>
    <TileLayer
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    />
    <Marker 
    // where to put the marker
    position={[31.777, 35.235]}

    // to replace icon
    // icon={myIcon}

    // to create event
    //eventHandler= {{
    //     click:(e) =>{
    //         alert("hello from event")
    //     } 
    // }}
    >
        {/*will open popup on click */}
        <Popup></Popup>
        {/* will open Tool tip on mouse over */}
        <Tooltip>hello</Tooltip>
    </Marker>
  </MapContainer>
  )
}

export default Map