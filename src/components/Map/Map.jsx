import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import './Map.css';
import { icon } from "leaflet";
import { Location } from '../Location/Location';
import { useState } from 'react';

export const Map = () => {
    // State voor id en informatie om die te laten zien wanneer er voor meer informatie gevraagt wordt
    const [id, setId] = useState(null);
    const [locationName, setLocationName] = useState('');
    const [showInfo, setShowInfo] = useState(false);

    // Ik gebruik een custom icon omdat React Leaftlet een bekende bug in de package heeft
    const markerIcon = icon({
        iconUrl: require('../assets/marker.png'),
        iconSize: [32, 32],
    });

    // Functie die de states set om informatie te laten zien
    const moreInformation = (id, locName) => {
      setId(id);
      setLocationName(locName);
      setShowInfo(true);
    }

    return (<>
    <div className='map-container'>
      <MapContainer center={[51.9090, 4.4871]} zoom={13} scrollWheelZoom={false} style={{ height: 536 }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />


        {/* Erasmusbrug */}
        <Marker icon={markerIcon} position={[51.9090, 4.4871]}>
          <Popup>
            Erasmusbrug <br />

            <a className='meer-info' onClick={() => moreInformation(0, 'Erasmusbrug')}>Meer informatie</a>

          </Popup>
        </Marker>

        {/* Euromast */}
        <Marker icon={markerIcon} position={[51.9054, 4.4666]}>
          <Popup>
            Euromast <br />

            <a className='meer-info' onClick={() => moreInformation(1, 'Euromast')}>Meer informatie</a>

          </Popup>
        </Marker>

        {/* Markthal */}
        <Marker icon={markerIcon} position={[51.9200, 4.4868]}>
          <Popup>
            Markthal <br />

            <a className='meer-info' onClick={() => moreInformation(2, 'Markthal')}>Meer informatie</a>

          </Popup>
        </Marker>

        {/* Stadhuis Rotterdam */}
        <Marker icon={markerIcon} position={[51.9228, 4.4793]}>
          <Popup>
            Stadhuis Rotterdam <br />

            <a className='meer-info' onClick={() => moreInformation(3, 'Stadhuis Rotterdam')}>Meer informatie</a>

          </Popup>
        </Marker>

        {/* Feyenoord Stadium */}
        <Marker icon={markerIcon} position={[51.8939, 4.5231]}>
          <Popup>
            Feyenoord Stadium <br />

            <a className='meer-info' onClick={() => moreInformation(4, 'Feyenoord Stadium')}>Meer informatie</a>

          </Popup>
        </Marker>

      </MapContainer>
    </div>
    
    {/* Wanneer de state verandert wordt het opnieuw gerenderd met de juiste informatie */}
    {showInfo ? <Location id={id} name={locationName} /> : ''}
    </>
    )
};
