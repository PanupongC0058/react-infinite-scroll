import React, { useState, useEffect } from "react"
import { Card, CardContent } from "@material-ui/core"
import styled from "styled-components"

 import { getAPIsBase } from "./api"
import './App.css';

// Set Base style of tag dev 
const Div = styled.div`
  margin: 0 auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  div {
    width: 50%;
    height: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 3px;
    color: white;
  }
`;
// ส่วนการตรวจสอบการทำงานของ Project เริ่มต้นให้ loadding ข้อมูลชุดละเท่าไหร่
let   baseLoaddingEle = 1 ;

const Posts = () => {
  const [totalPosts, settotalPosts] = useState(null)
  const [displayPosts, setdisplayPosts] = useState(null)
  const [observedEl, setObservedEl] = useState(null);
  const loadMore = posts => {
    setTimeout(() => {
      // console.log(posts)
      setdisplayPosts([
        ...displayPosts,
        ...posts.slice(
          displayPosts.length,
          posts.length > displayPosts.length + baseLoaddingEle
            ? displayPosts.length + baseLoaddingEle
            : posts.length
        )
      ])
    }, 500)
  }

  
  const observer = new IntersectionObserver(
    items => {
      if (items[0].isIntersecting) {
        // if more data, load more
        loadMore(totalPosts)
      }
    },
    { threshold: 1 }
  )

  // CallData from Backend
  useEffect(() => {
    const getData = async () => {
       const posts = await getAPIsBase()
      settotalPosts(posts)
    }
    getData()
  }, [])

  // Set first display depending on the posts (totalPosts) the received from backend
  useEffect(() => {
    if (totalPosts){
      setdisplayPosts(totalPosts.slice(0, 10))
    } 
  }, [totalPosts])

  useEffect(() => {
    if (observedEl) {
      observer.observe(observedEl)
    }

    return () => {
      if (observedEl) {
        observer.unobserve(observedEl)
      }
    }
  }, [observedEl, observer])

  return (
    <>
      {!displayPosts ? (
        <p>Loading...</p>
      ) : (
        displayPosts.map(post => (
          <div key={post.id} className='p-3'>
            <Card className="bg-secondary p-3">
            {post.id} <img src={post.thumbnailUrl} className="card-img-top m-3 " alt="..."/>
              <CardContent className="text-center"> {post.title}</CardContent>
            </Card>
          </div>
        ))
      )}

      {(totalPosts && totalPosts.length) >
        (displayPosts && displayPosts.length) && (
        <p ref={setObservedEl}>Loading more...</p>
      )}
    </>
  )
}

const changeLoadding = (e)=>{
  // console.log(e.target.value);
  // setbaseLoaddingEle(e.target.value);
  baseLoaddingEle =  parseInt(e.target.value);

}

// ส่วน Component Droup Down Render การแสดงผล 
function DroupDown(){
  return (
    <div >
      
      <select className="form-select w-50" aria-label="Default select example " onChange={changeLoadding}>
      <option selected>1</option>
      <option value="5">5</option>
      <option value="10">10</option>
      <option value="30">30</option>
    </select>
    </div>
  )
}


function App() {
  return (

    <Div >
      
      <h3 className="p-3">Infinity Loadding Components</h3>
      <hr className="bg-dark"></hr>
      <label htmlFor="" className="text-right">selected fetch data from api </label>
      <DroupDown/>

      <Posts  className='m-5'/>
    </Div>
  )
}

  

export default App
