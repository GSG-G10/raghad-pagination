import React, { useState, useEffect } from "react";
import { Pagination, Card } from "antd";
import "antd/dist/antd.css";
import "./App.css";

function App() {
  const [pageNum, setPageNum] = useState(1);
  const [imgUrl, setImgUrl] = useState([]);
  const { Meta } = Card;

  useEffect(() => {
    const myAbortController = new AbortController();
    fetch(
      `https://api.unsplash.com/search/collections?page=${pageNum}&limit=10&query=cat&client_id=kQ_rA8Dd9Tb-JZ80Nx6RyFBtaoIFyaP5kdLn5EmGkVM`,
      {
        signal: myAbortController.signal,
      }
    )
      .then((res) => res.json())
      .then((data) => {
        const newArr = data.results.map((elem) => {
          return elem.cover_photo.urls.thumb;
        });
        setImgUrl(newArr);
      });
    return () => {
      myAbortController.abort();
    };
  }, [pageNum]);

  return (
    <div className="App">
      {/* {imgUrl.map((elem) =>   )} */}
      <Card
        hoverable
        style={{ width: 240 }}
        cover={
          <img
            alt="example"
            src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
          />
        }
      >
        <Meta title="Europe Street beat" description="www.instagram.com" />
      </Card>
      <Pagination
        defaultCurrent={1}
        total={100}
        onChange={(current) => {
          setPageNum(current);
        }}
      />
    </div>
  );
}

export default App;
