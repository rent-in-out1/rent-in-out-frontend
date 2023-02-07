import React from 'react'
import {MapContainer, TileLayer, Marker, Popup, Tooltip} from 'react-leaflet';

const mapComponent = () => {
    return (
        <MapContainer center={[31.777, 35.235]} zoom={15} scrollWheelZoom={true}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker
                // where to put the marker
                position={[31.777, 35.235]}>
                {/*will open popup on click */}
                <Popup></Popup>
                {/* will open Tool tip on mouse over */}
                <Tooltip>hello</Tooltip>
            </Marker>
        </MapContainer>
    )
}

export default mapComponent