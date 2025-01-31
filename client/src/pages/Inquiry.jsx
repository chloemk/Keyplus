import React, { useState } from 'react';
import './styles/Inquiry.scss';
import exceptionAxios from 'axios';
import { message } from 'antd';
import { EmailValidation } from '../utils/validation';

const Inquiry = () => {
  const initialState = {
    email: '',
    name: '',
    title: '',
    contents: '',
  };
  const [updateState, setUpdateState] = useState(initialState);

  const options = [
    '키보드 추가 요청',
    '키보드 추천 요청',
    '버그 제보',
    '그 외',
  ];
  const [updateOption, setUpdateOption] = useState(options[0]);

  const onChangeUpdateState = (e) => {
    const { name, value } = e.target;
    setUpdateState({ ...updateState, [name]: value });
  };

  const { email, name, title, contents } = updateState;

  const onClickSendBtn = async (e) => {
    // Prevents page refresh on submit
    e.preventDefault();
    try {
      if (email === '' || name === '' || title === '' || contents === '') {
        return message.warning('양식을 채워주세요');
      }

      if (!EmailValidation(email)) {
        setValidEmail(false);
        return message.warning('올바르지 않은 이메일 형식입니다');
      }

      await exceptionAxios.post('/inquiries', {
        data: { ...updateState, category: updateOption },
      });
      message.success('이메일 전송이 완료되었습니다');
      setUpdateState(initialState);
    } catch (err) {
      message.warning('이메일 전송에 실패했습니다. 다시 시도해주세요');
      throw err;
    }
  };

  return (
    <>
      <section className="inquiry-container">
        <div className="inquiry-main">
          <h2 className="title">문의하기</h2>
          <form onSubmit={onClickSendBtn}>
            <select
              className="inquiry-select"
              onChange={(e) => setUpdateOption(e.target.value)}
              value={updateOption}
            >
              {options.map((category) => (
                <option value={category} key={category}>
                  {category}
                </option>
              ))}
            </select>

            <div className="inquiry-input-box">
              <label htmlFor="email">이메일</label>
              <input
                type="email"
                name="email"
                placeholder="example@example.com"
                value={email}
                onChange={onChangeUpdateState}
              />
            </div>

            <div className="inquiry-input-box">
              <label htmlFor="name">이름</label>
              <input
                type="text"
                name="name"
                placeholder="name"
                value={name}
                onChange={onChangeUpdateState}
              />
            </div>

            <div className="inquiry-input-box">
              <label htmlFor="title">제목</label>
              <input
                type="text"
                name="title"
                placeholder="title"
                value={title}
                onChange={onChangeUpdateState}
              />
            </div>

            <div className="inquiry-input-box">
              <label htmlFor="contents">내용</label>

              <textarea
                name="contents"
                id="contents"
                placeholder="contents"
                cols="80"
                rows="10"
                value={contents}
                onChange={onChangeUpdateState}
              />
            </div>
            <div className="inquiry-input-box">
              <button type="submit">메일 전송</button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default Inquiry;
