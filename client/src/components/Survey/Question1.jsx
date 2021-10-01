import React from 'react';
import useWidthSize from '../../hooks/useWidthSize';

import '../styles/QuestionCard.scss';

const Question1 = ({ onClickSound }) => {
  // const audio1 = new Audio('/click.mp3');
  // const audio2 = new Audio('/click.mp3');
  // const audio3 = new Audio('/click.mp3');

  const width = useWidthSize(768);

  const audio4 = new Audio('/click.mp3');

  const playAudio = () => {
    audio4.play();
  };

  const stopAudio = () => {
    audio4.pause();
  };

  return (
    <>
      <div className="question-header">
        <h2 className="question-title">
          <div>가장 마음에 드는 소리를 알려주세요.</div>
        </h2>
        {width > 768 ? (
          <div className="question-description">
            이미지에 마우스를 올리면 소리가 재생됩니다.
          </div>
        ) : null}
      </div>
      <div className="card-container question1">
        <div className="card" onClick={() => onClickSound(1)}>
          <div className="image-wrapper">
            <img src="/no-image.png" alt="" />
          </div>
          <div className="text-wrapper">
            <div className="description">찌개 끓는 소리</div>
            <div className="title">보글보글</div>
          </div>
        </div>
        <div className="card" onClick={() => onClickSound(2)}>
          <div className="image-wrapper">
            <img src="/no-image.png" alt="" />
          </div>
          <div className="text-wrapper">
            <div className="description">초콜릿 부러뜨리는 소리</div>
            <div className="title">
              도각도각
              <div className="mp3-icon">{width > 768 ? null : '띡'}</div>
            </div>
          </div>
        </div>
        <div className="card" onClick={() => onClickSound(3)}>
          <div className="image-wrapper">
            <img src="/no-image.png" alt="" />
          </div>
          <div className="text-wrapper">
            <div className="description">서걱의 정체는 무엇인가?</div>
            <div className="title">서걱서걱 </div>
          </div>
        </div>
        <div
          className="card"
          onClick={() => onClickSound(4)}
          onMouseEnter={() => playAudio()}
          onMouseLeave={() => stopAudio()}
        >
          <div className="image-wrapper">
            <img src="/gaming.png" alt="" />
          </div>
          <div className="text-wrapper">
            <div className="description">PC방 키보드 소리</div>
            <div className="title">찰칵찰칵</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Question1;
