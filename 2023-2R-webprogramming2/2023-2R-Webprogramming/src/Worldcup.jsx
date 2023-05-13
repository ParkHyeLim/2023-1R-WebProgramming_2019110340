import p01 from './assets/광개토대왕.jpeg'
import p02 from './assets/김구.jpeg'
import p03 from './assets/김유신.jpeg'
import p04 from './assets/김정호.jpeg'
import p05 from './assets/대조영.jpeg'
import p06 from './assets/방정환.jpeg'
import p07 from './assets/안중근.jpeg'
import p08 from './assets/원효.jpeg'
import p09 from './assets/윤동주.jpeg'
import p10 from './assets/이성계.jpeg'
import p11 from './assets/이순신.jpeg'
import p12 from './assets/장영실.jpeg'
import p13 from './assets/정도전.jpeg'
import p14 from './assets/정몽주.jpeg'
import p15 from './assets/정조.jpeg'
import p16 from './assets/한명회.jpeg'
import './Worldcup.css'
import { useEffect, useState } from 'react'

function Worldcup() {
  const candidate = [
    { name: '광개토대왕', src: p01 },
    { name: '김구', src: p02 },
    { name: '김유신', src: p03 },
    { name: '김정호', src: p04 },
    { name: '대조영', src: p05 },
    { name: '방정환', src: p06 },
    { name: '안중근', src: p07 },
    { name: '원효', src: p08 },
    { name: '윤동주', src: p09 },
    { name: '이성계', src: p10 },
    { name: '이순신', src: p11 },
    { name: '장영실', src: p12 },
    { name: '정도전', src: p13 },
    { name: '정몽주', src: p14 },
    { name: '정조', src: p15 },
    { name: '한명회', src: p16 }
  ];

  // 결승전, 2강, 4강, 8강, 16강에 이미지가 들어가는 배열
  const [game, setGame] = useState([]);
  // 몇강인가?
  const [round, setRound] = useState(0);
  // 다음 게임 이미지 저장 배열
  const [nextGame, setNextGame] = useState([]);
  // 선택된 이미지
  const divs = document.getElementsByTagName('div');

  useEffect(() => {
    setGame(
      candidate.map(c => {
        return { name: c.name, src: c.src, order: Math.random() }
      }).sort((l, r) => {
        return l.order - r.order;
      }));
    console.log(game);
    console.log(nextGame);
  }, []);

  useEffect(() => {
    if (game.length > 1 && round + 1 > game.length / 2) {
      setGame(nextGame);
      setNextGame([]);
      setRound(0);
    }
  }, [round]);

  // 마지막 결승전
  if (game.length === 0 || round + 1 > game.length / 2) {
    if (game.length === 1) { return <div id='body'><p>승자</p><img src={game[0].src} /><p>{game[0].name}</p></div> }
    return <p>승자</p>
  }

  // 이미지 선택시 선택되지 않은 이미지 삭제 코드
  const hideImage = (idx) => {
    if (idx % 2 === 0) {
      divs[4].style.display = 'none';
      divs[3].style.margin = '0 auto';
      document.getElementById('vs').style.visibility = 'hidden';
    }
    else {
      divs[3].style.display = 'none';
      divs[4].style.margin = '0 auto';
      document.getElementById('vs').style.visibility = 'hidden';
    }
  }

  return (
    <div id='body'>
      <p>이상형 월드컵</p>
      <div id='img_set'>
        <p id='title'>과거로 돌아간다면, 살아보고 싶은 인물 <span>{game.length == 2 ? '결승전' : game.length + '강'}</span> {round + 1}/{game.length / 2} </p>
        <div>
          <img
            src={game[round * 2].src}
            onClick={() => {
              setNextGame((prev) => prev.concat(game[round * 2]));
              hideImage(round * 2);
              setTimeout(() => {
                divs[4].style.display = 'block';
                document.getElementById('vs').style.visibility = 'visible';
                setRound((r) => r + 1);
              }, 3000);
            }}
          />
          <p className='text'>{game[round * 2].name}</p>
        </div>
        <p id='vs'>vs</p>
        <div>
          <img
            src={game[round * 2 + 1].src}
            onClick={() => {
              setNextGame((prev) => prev.concat(game[round * 2]));
              hideImage(round * 2 + 1);
              setTimeout(() => {
                divs[3].style.display = 'block';
                document.getElementById('vs').style.visibility = 'visible';
                setRound((r) => r + 1);
              }, 3000);
            }}
          />
          <p className='text'>{game[round * 2 + 1].name}</p>
        </div>
      </div>
    </div>
  )
}

export default Worldcup;