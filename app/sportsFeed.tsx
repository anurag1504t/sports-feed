import React, { useState, useEffect } from 'react';
import axios from 'axios';
import xml2js from 'xml2js';

function createMarkup(text: string) { return {__html: text}; };

const log = (content: any) => {
    console.log(content);
}

function SportsFeed() {
  const [xmlData, setXmlData] = useState(null);

  useEffect(() => {
    axios.get('https://www.essentiallysports.com/feed/')
      .then(response => {
        const xml: any = response.data;
        xml2js.parseString(xml, (error: any, result: any) => {
          if (error) {
            console.error(error);
          } else {
            setXmlData(result);
          }
        });
      })
      .catch(error => console.error(error));
  }, []);

  if (!xmlData) {
    return <p>Loading...</p>;
  } else {
    const data: any = xmlData;

    return (
        <div>
            <>{console.log(xmlData)}</>
            {/* <div dangerouslySetInnerHTML={xmlData} ></div> */}
            
          {data?.rss?.channel[0]?.item.map((item: any, index: any) => (
            
            <div key={index}>
              <h3>{item.title[0]}</h3>
              <>
              {/* {log(item)} */}
              {/* {log(item["media:content"][0])}
              {log(item["media:content"][0].url)} */}
              {log(item["media:content"][0].$.url)}
              </>
              <img src={item["media:content"][0].$.url} />
              <div dangerouslySetInnerHTML={createMarkup(item.description[0])}></div>
              {/* <p>{}</p> */}
              <a href={item.link[0]}>Read More</a>
            </div>
          ))}
    
        </div>
      );
  }

  
}

export default SportsFeed;
