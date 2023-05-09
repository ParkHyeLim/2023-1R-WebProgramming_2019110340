import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [row, setRow] = useState([]);
  const [count, setCount] = useState(0);

  const clicked = () => {
    setCount((click) => click += 1); 
  }

  useEffect(()=>{
    console.log("mount or update")
  });

  useEffect(()=>{
    fetch('http://openapi.seoul.go.kr:8088/4b6376464f616a743939716a446472/json/RealtimeCityAir/1/25/').
      then(function(res){
        res.json().then(function (res2) {
          setRow(res2.RealtimeCityAir.row);
        })
      })
  },[]);

  useEffect(()=>{
    document.title = `You clicked ${count} times`
    return () => {
      document.title = "우리 프로그램"
    }
  },[count]);

  return (
    <>
      <div>
        <button onClick={clicked}>Title Count Click</button>
        <h4>서울시 실시간 대기환경</h4>
        <table>
          <thead>
            <tr>
            <th>지역명</th>
            <th>PM10</th>
            <th>PM25</th>
            <th>O3</th>
            <th>SO2</th>
            <th>미세먼지농도</th>
            <th>통합대기지수</th>
            </tr>
          </thead>
          <tbody>
            {row.map((gu, index) => {
              return <tr key={index}>
                <td>{gu.MSRSTE_NM}</td>
                <td>{gu.PM10}</td>
                <td>{gu.PM25}</td>
                <td>{gu.O3}</td>
                <td>{gu.SO2}</td>
                <td>{gu.IDEX_NM}</td>
                <td>{gu.IDEX_MVL}</td>
              </tr>
              })
            }
          </tbody>
        </table>
      </div>
    </>
  )}

export default App
