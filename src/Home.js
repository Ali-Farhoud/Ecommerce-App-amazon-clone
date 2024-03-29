import React, { useEffect, useState } from 'react'
import "./Home.css"
import Product from './Product'
import axios from "axios";
// renders products to home page route
// try to use api to fetch random products
function Home() {
  
  const[fdata,setFdata]=useState([]);

  useEffect(() => {
    getData();
  },[]);
  

  /**use axios to fetch product data from api */
  const options = {
    method: 'GET',
    url: 'https://asos2.p.rapidapi.com/products/v2/list',
    params: {
      store: 'US',
      offset: '0',
      categoryId: '4209',
      limit: '48',
      country: 'US',
      sort: 'freshness',
      currency: 'USD',
      sizeSchema: 'US',
      lang: 'en-US'
    },
    headers: {
      'X-RapidAPI-Key': '8389ab690bmsha8961407907339ap1cb4ffjsn0115597e5e1a',
      'X-RapidAPI-Host': 'asos2.p.rapidapi.com'
    }
  };
  
  const getData= ()=>{axios.request(options).then(function (response) {
    
    setFdata(response.data.products)
  }).catch(function (error) {
    console.error(error);
  });
  }
	
  return (
    <div className='home'>
        <div className="home__container">
            <img className='home__image' src="https://images-eu.ssl-images-amazon.com/images/G/31/prime/Gateway/2020/May/gaming_1500x600._CB431281464_.jpg" alt="" />
        </div>
        <div className="home__row">
          <Product id="01"title="PlayStation 5 Console" price={449.99} image="https://m.media-amazon.com/images/I/51QKZfyi-dL._AC_UL320_.jpg" rating={5}/>
          <Product id="02"title="Echo Dot (3rd Gen)" price={29.99} image="https://m.media-amazon.com/images/I/41CRnvYqmqL._DEALSCB_.jpg" rating={5}/>

        </div>
        <div className="home__row">
          <Product  id="03"title="The Lean Startup" price={19.99} image="https://images-na.ssl-images-amazon.com/images/I/81-QB7nDh4L.jpg" rating={5}/>
          <Product id="04"title="Fifa 22 - Xbox One" price={49.99} image="https://m.media-amazon.com/images/I/81cAhbc2DzL._AC_UL320_.jpg" rating={5}/>
          <Product id="05"title="George R.R. Martin's A Game Of Thrones: The Comic Book #19" price={4.39} image="https://m.media-amazon.com/images/I/918XEaCL7ZS._AC_UL320_.jpg" rating={5}/>
          
        </div>
        <div className="home__row">
        <Product 
        id="06"title="Samsung LS24R35AFHNXZA 24 LED-Lit Monitor 75Hz Freesync Dark Blue Grey" price={249.99} image="https://m.media-amazon.com/images/I/819Diw6CNJL._AC_UL320_.jpg" rating={4}/>
  
        </div>
        <div className='home__data'>
          
        {fdata.map(item=>{
          
          return(
            <div className='home__dataDiv'>
          <Product className="metro" key={item.id}id={item.id} title={item.name} price={item.price.current.value} image={`https://${item.imageUrl}`}rating={4}/></div>
        )})}
        
      </div>
    </div>
  )
}

export default Home