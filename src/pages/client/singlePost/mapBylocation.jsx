import { MapContainer, Marker, TileLayer, Tooltip } from "react-leaflet";

const MapBylocation = ({ results, center }) => {
    return (
        <MapContainer center={[center?.y, center?.x]} zoom={15} scrollWheelZoom={false}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            {results?.length > 0 && results?.map((res, i) => {
                return (<Marker key={i} position={[res?.y, res?.x]}>
                    <Tooltip>{res?.label}</Tooltip>
                </Marker>);
            })}
        </MapContainer>
    );
};

export default MapBylocation;
