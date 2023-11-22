import { useState } from 'react';
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  InfoWindow,
} from '@vis.gl/react-google-maps';

export default function Intro() {
  const position = { lat: 50.068149, lng: 19.9410266 };
  const [open, setOpen] = useState(false);

  return (
    <APIProvider apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
      <div className="contact__map">
        <Map zoom={15} center={position} mapId={process.env.REACT_APP_MAP_ID}>
          <AdvancedMarker position={position} onClick={() => setOpen(true)}>
            <Pin background={'red'} borderColor={'red'} glyphColor={'white'} />
          </AdvancedMarker>

          {open && (
            <InfoWindow position={position} onCloseClick={() => setOpen(false)}>
              <p>
                31-150 Kraków,
                <br />
                Świętego Filipa 17
              </p>
            </InfoWindow>
          )}
        </Map>
      </div>
    </APIProvider>
  );
}
