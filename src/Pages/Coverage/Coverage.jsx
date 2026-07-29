import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import '../../../node_modules/leaflet/dist/leaflet.css'
import { useLoaderData } from "react-router";
import { useRef } from "react";
import { Helmet } from "react-helmet-async";

const Coverage = () => {
    const position = [23.6850, 90.3563]
    const warehouses = useLoaderData()
    const mapRef = useRef(null)

    const handleSearch = e =>{
        e.preventDefault()

        const location = e.target.location.value;

        const serviceHouse = warehouses.find(cen =>cen.district.toLowerCase().includes(location.toLowerCase()))
        if(serviceHouse){
            const houses = [serviceHouse.latitude, serviceHouse.longitude]
            mapRef.current.flyTo(houses, 13)
        }
    }
    return (
        <div className="my-8">
            <Helmet>
                <title>Dashboard | Coverage</title>
            </Helmet>

            <h1 className="text-4xl font-bold text-center">We are available in 64 districts</h1>
            <form onSubmit={handleSearch}>
                <input type="text" placeholder="Type here" name="location" className="input my-4" />
            </form>

            <MapContainer
                center={position} zoom={9}
                scrollWheelZoom={false}
                className="border-2 h-100 my-3"
                ref={mapRef}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {
                    warehouses.map((house, index) =>
                        <Marker eventHandlers={{mouseover: e =>{e.target.openPopup()}}} position={[house.latitude, house.longitude]} key={index}>
                            <Popup>
                                {house.district} <br /> {house.covered_area.join(", ")}
                            </Popup>
                        </Marker>
                    )
                }
            </MapContainer>
        </div>
    )
}
export default Coverage;