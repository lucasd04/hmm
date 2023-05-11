import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Location.css';

export const Location = (props) => {
    const [reviews, setReviews] = useState([]);

    let locationData = [
        {
        locationName: 'Erasmusbrug',
        locationDescription: 'De Erasmusbrug is naast de Willemsbrug de tweede brug over de Nieuwe Maas in het centrum van de Nederlandse stad Rotterdam. Hij is vernoemd naar de Nederlandse priester en humanist Erasmus. De brug verbindt de wijk Kop van Zuid met het centrum aan de noordzijde van de rivier.',
        locationImage: 'https://lh5.googleusercontent.com/p/AF1QipNXi1PZE9pNu0qSbSD8yr4yKJEAUJNVDbYL0NZg=w243-h174-n-k-no-nu',
        locationReviews: []
        },
        {
        locationName: 'Euromast',
        locationDescription: 'Hier geniet je van het mooiste uitzicht, word je culinair verrast in onze brasserie of ontwaak je in één van de suites naast de liefde van je leven. Wil je je bezoek naar een nóg hoger niveau brengen? Neem dan de Euroscoop helemaal naar de top. Een echte durfal? Ga dan niet met de lift naar beneden, maar met een touw! Vanaf de Euromast beleef je de hoogste abseil van Europa.',
        locationImage: 'https://cdn.getyourguide.com/img/location/5d6fb4080b9b2.jpeg/68.jpg',
        locationReviews: []
        },
        {
        locationName: 'Markthal',
        locationDescription: 'De Markthal te Rotterdam is een woon- en winkelgebouw met inpandige markthal, gesitueerd tussen de straten Dominee Jan Scharpstraat, Grotemarkt, Westnieuwland en Verlengde Nieuwstraat. De opening vond op 1 oktober 2014 plaats door koningin Máxima.',
        locationImage: 'https://upload.wikimedia.org/wikipedia/commons/b/b3/Markthal_Rotterdam_bij_avond.jpg',
        locationReviews: []
        },
        {
        locationName: 'Stadhuis',
        locationDescription: 'Het stadhuis aan de Rotterdamse Coolsingel is gebouwd tussen 1914 en 1920 naar een ontwerp van Henri Evers. Het is een van de weinige gebouwen in het centrum van Rotterdam die het bombardement van 14 mei 1940 hebben doorstaan.',
        locationImage: 'https://lh5.googleusercontent.com/p/AF1QipNHEg0YqU7-_LdfbxOPDME0eVkun9yEtjzfJGHd=w243-h174-n-k-no-nu',
        locationReviews: []
        },
        {
        locationName: 'Feyenoord',
        locationDescription: 'Stadion Feijenoord, in de volksmond De Kuip, is een voetbalstadion in Rotterdam-Zuid. De Nederlandse betaaldvoetbalclub Feyenoord speelt zijn thuiswedstrijden in het stadion en ook het Nederlands voetbalelftal speelt er regelmatig.',
        locationImage: 'https://lh3.googleusercontent.com/p/AF1QipNGp1Fov8IW92wALUnXYSZ4GiLjUasm081lkkQN=s1360-w1360-h1020',
        locationReviews: []
        },
    ];

    // Inf loop because setState cause rerender which cause this function to fire again
    async function fetchData() {
        try {
            // const response = await axios.get(`http://localhost:1337/api/reviews?filters[location]=${props.name}&populate=*`);
            // const newReviews = response.data.data.map(obj => obj.attributes);
            // setReviews([...reviews, ...newReviews]);

            const response = await axios.get(`https://dummyjson.com/carts`);
            console.log(response.data)
            const newReviews = response.data.carts.map(obj => obj);
            setReviews([...newReviews]);


            console.log(newReviews)

            // Overridde de vorige [bug]!!!!!!!!!!!!
            // ADD OVERFLOW

            // setReviews([
            //     {
            //         attributes: {
            //             title: 'Bus 1',
            //             description: 'desc 2',
            //             user: {
            //                 data: {
            //                     attributes: {
            //                         username: 'username 3'
            //                     }
            //                 }
            //             }
            //         }
            //     }
            // ])
        } catch (error) {
            console.log('An error occurred:', error.response);
        }
    }

    useEffect(() => {
        fetchData();
    },[])
    

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
        .post('http://localhost:1337/api/reviews', { 
        headers: {
            Authorization:
                sessionStorage.getItem('token'),
        },
        data: {
          location: props.name,
          title: e.target[1].value,
          description: e.target[2].value,
          user: sessionStorage.getItem('id')
        }})
        .then(response => {
            console.log('succes')
        })
        .catch(error => {
          console.log('An error occurred:', error.response);
        });
        
        // Clear input field values
        e.target[1].value = '';
        e.target[2].value = '';
    }

    return (
    <div className='location-container'>
        <div className='information'>
            <h3>Information</h3>
            <h4 className='location-name'>{locationData[props.id]?.locationName}</h4>
            <p className='location-description'>{locationData[props.id]?.locationDescription}</p>
        </div>
        <div className='image'>
            <h3>Image</h3>
            <img className='location-image' src={locationData[props.id]?.locationImage} alt={locationData[props.id]?.locationName}/>
        </div>
        <div className='reviews'>
            <h3>Reviews</h3>
            {/* {console.log(locationData[props.id].locationReviews)} */}
            {console.log(reviews)}
            {/* {locationData[props.id].locationReviews.map(val => (<div className='review'>
                <h3>Reviews</h3>
                <p>{val.title}</p>
                <p>{val.username}</p>
                <p>{val.description}</p>
            </div>)
        )} */}
        {/* Render alleen als reviews een waarde heeft */}
            {reviews.length > 0 && reviews.map(val => (<div className='review'>
                {/* <p>{val.attributes.title}</p>
                <p>{val.attributes.user.data.attributes.username}</p>
                <p>{val.attributes.description}</p> */}

                <p>{val.id}</p>
                <p>{val.userId}</p>
                <hr />
            </div>)
            )}
        <form onSubmit={(e) => handleSubmit(e)}>
            <input type="hidden" value={props.name} />
            {sessionStorage.getItem('token') ? 
            <>
                <input type='textarea' placeholder='Titel' style={{display: 'block', width: '20%'}} required/>
                <input type='textarea' placeholder='Schrijf een review' required/>
            </>
            : 
            <>
                <input type='text' placeholder='Eerst inloggen' style={{display: 'block', width: '20%'}} disabled />
                <input type='text' placeholder='Eerst inloggen' disabled />
            </>}
            <button type='submit'>Stuur</button>
        </form>
        </div>
    </div>
    )
};
