import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [row, setRow] = useState([]);

  function load() {
    if( row.length === 0 ) {
      fetch('http://openapi.seoul.go.kr:8088/4b6376464f616a743939716a446472/json/RealtimeCityAir/1/25/').
        then(function(res){
          res.json().then(function (res2) {
            setRow(res2.RealtimeCityAir.row);
        })
      })
    }
  }

  return (
    <>
      <div>
        <button onClick={load}>미세먼지 데이터 불러오기</button>
        <table>
          <thead>
            <th>지역명</th>
            <th>PM10</th>
            <th>PM25</th>
            <th>O3</th>
            <th>SO2</th>
            <th>미세먼지농도</th>
            <th>통합대기지수</th>
          </thead>
          <tbody>
            {row.map(function(obj) {
              return <tr>
                <td>{obj.MSRSTE_NM}</td>
                <td>{obj.PM10}</td>
                <td>{obj.PM25}</td>
                <td>{obj.O3}</td>
                <td>{obj.SO2}</td>
                <td>{obj.IDEX_NM}</td>
                <td>{obj.IDEX_MVL}</td>
              </tr>
              })
            }
          </tbody>
        </table>
      </div>
    </>
  )}

export default App