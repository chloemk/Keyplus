import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from '../utils/customAxios';
import exceptionAxios from 'axios';
import KeyboardCard from '../components/KeyboardCard';
import useWidthSize from '../hooks/useWidthSize';
import useIsMount from '../hooks/useIsMount';
import 'antd/dist/antd.css';
import { Select, Space, Typography, Divider, Checkbox, Radio } from 'antd';
import { FaCheck } from 'react-icons/fa';
import { FiRotateCw } from 'react-icons/fi';
import ScrollArrow from '../components/ScrollArrow';
import './styles/Keyboard.scss';
const { Option } = Select;

const Keyboard = () => {
  const dispatch = useDispatch();
  const [firstLoading, setFirstLoading] = useState(true);
  const [keyboards, setKeyboards] = useState([]);
  const [allKeyboards, setAllKeyboards] = useState([]);
  const [sortingNumber, setSortingNumber] = useState('1');
  const [allCategory, setAllCategory] = useState([]);

  const [brandLogitech, setBrandLogitech] = useState(false);
  const [brandKeychron, setBrandKeychron] = useState(false);
  const [brandAbko, setBrandAbko] = useState(false);
  const [brandLeopold, setBrandLeopold] = useState(false);
  const [brandVarmilo, setBrandVarmilo] = useState(false);
  const [brandHansung, setBrandHansung] = useState(false);
  const [brandCox, setBrandCox] = useState(false);
  const [brandMstone, setBrandMstone] = useState(false);
  const [brandCherry, setBrandCherry] = useState(false);
  const [brandCorsair, setBrandCorsair] = useState(false);

  const [switchBrown, setSwitchBrown] = useState(false);
  const [switchRed, setSwitchRed] = useState(false);
  const [switchBlue, setSwitchBlue] = useState(false);
  const [switchBlack, setSwitchBlack] = useState(false);
  const [switchSilentRed, setSwitchSilentRed] = useState(false);

  const [priceRadio, setPriceRadio] = useState(null);

  const [tenkeyLess, setTenkeyLess] = useState(false);
  const [bluetooth, setBluetooth] = useState(false);
  const [backlight, setBacklight] = useState(false);

  const width = useWidthSize(768);
  const isMount = useIsMount();

  useEffect(async () => {
    try {
      const response = await axios.get('/keyboards');
      if (isMount.current) {
        setKeyboards(
          response.data.data.sort((a, b) => b.likeCount - a.likeCount)
        );
        setAllKeyboards(
          response.data.data.sort((a, b) => b.likeCount - a.likeCount)
        );
        setSortingNumber('1');
        setFirstLoading(false);
      }
    } catch (err) {
      throw err;
    }
  }, []);

  // ! 정렬
  const onClickHeartDescendingBtn = async () => {
    try {
      setSortingNumber('1');
      const response = await exceptionAxios.get('/keyboards');
      setAllKeyboards(
        response.data.data.sort((a, b) => b.likeCount - a.likeCount)
      );
    } catch (err) {
      throw err;
    }
  };
  const onClickHeartAscendingBtn = async () => {
    try {
      setSortingNumber('2');
      const response = await exceptionAxios.get('/keyboards');
      setAllKeyboards(
        response.data.data.sort((a, b) => a.likeCount - b.likeCount)
      );
    } catch (err) {
      throw err;
    }
  };

  const onClickReviewDescendingBtn = async () => {
    setSortingNumber('3');
    setAllKeyboards((keyboards) =>
      [...keyboards].sort((a, b) => b.reviewCount - a.reviewCount)
    );
  };
  const onClickReviewAscendingBtn = async () => {
    setSortingNumber('4');
    setAllKeyboards((keyboards) =>
      [...keyboards].sort((a, b) => a.reviewCount - b.reviewCount)
    );
  };
  const onClickPriceAscendingBtn = async () => {
    setSortingNumber('5');
    setAllKeyboards((keyboards) =>
      [...keyboards].sort((a, b) => a.price - b.price)
    );
  };
  const onClickPriceDescendingBtn = async () => {
    setSortingNumber('6');
    setAllKeyboards((keyboards) =>
      [...keyboards].sort((a, b) => b.price - a.price)
    );
  };
  async function handleChange(value) {
    switch (value) {
      case '1':
        try {
          setSortingNumber('1');
          const response = await exceptionAxios.get('/keyboards');
          setAllKeyboards(
            response.data.data.sort((a, b) => b.likeCount - a.likeCount)
          );
        } catch (err) {
          throw err;
        }
        break;
      case '2':
        try {
          setSortingNumber('2');
          const response = await exceptionAxios.get('/keyboards');
          setAllKeyboards(
            response.data.data.sort((a, b) => a.likeCount - b.likeCount)
          );
        } catch (err) {
          throw err;
        }
        break;
      case '3':
        setSortingNumber('3');
        setAllKeyboards((keyboards) =>
          [...keyboards].sort((a, b) => b.reviewCount - a.reviewCount)
        );
        break;
      case '4':
        setSortingNumber('4');
        setAllKeyboards((keyboards) =>
          [...keyboards].sort((a, b) => a.reviewCount - b.reviewCount)
        );
        break;
      case '5':
        setSortingNumber('5');
        setAllKeyboards((keyboards) =>
          [...keyboards].sort((a, b) => a.price - b.price)
        );
        break;
      case '6':
        setSortingNumber('6');
        setAllKeyboards((keyboards) =>
          [...keyboards].sort((a, b) => b.price - a.price)
        );
        break;
      default:
        break;
    }
  }

  // ! 전체 카테고리, 정렬용 useEffect
  const mountedAllCategory = useRef(false);
  useEffect(async () => {
    if (!mountedAllCategory.current) {
      mountedAllCategory.current = true;
    } else {
      // * 초기화
      setKeyboards([...allKeyboards]);

      if (allCategory.length !== 0) {
        // * 브랜드
        const brands = [];
        if (brandLogitech) brands.push('로지텍');
        if (brandKeychron) brands.push('키크론');
        if (brandAbko) brands.push('앱코');
        if (brandLeopold) brands.push('레오폴드');
        if (brandVarmilo) brands.push('바밀로');
        if (brandHansung) brands.push('한성');
        if (brandCox) brands.push('콕스');
        if (brandMstone) brands.push('엠스톤');
        if (brandCherry) brands.push('체리');
        if (brandCorsair) brands.push('커세어');
        if (brands.length !== 0) {
          setKeyboards((prev) =>
            prev.filter((keyboard) => brands.indexOf(keyboard.brand) !== -1)
          );
        }

        // * 스위치
        const switches = [];
        if (switchBrown) switches.push('갈축');
        if (switchRed) switches.push('적축');
        if (switchBlue) switches.push('청축');
        if (switchBlack) switches.push('흑축');
        if (switchSilentRed) switches.push('저소음적축');
        if (switches.length !== 0) {
          setKeyboards((prev) =>
            prev.filter((keyboard) => {
              let flag = false;
              for (let i = 0; i < switches.length; i++) {
                if (keyboard.switch[switches[i]]) flag = true;
              }
              return flag;
            })
          );
        }

        // * 가격
        if (priceRadio) {
          switch (priceRadio) {
            case '5만원 이하':
              setKeyboards((prev) =>
                prev.filter((keyboard) => keyboard.price <= 50000)
              );
              break;
            case '10만원 이하':
              setKeyboards((prev) =>
                prev.filter((keyboard) => keyboard.price <= 100000)
              );
              break;
            case '15만원 이하':
              setKeyboards((prev) =>
                prev.filter((keyboard) => keyboard.price <= 150000)
              );
              break;
            case '20만원 이하':
              setKeyboards((prev) =>
                prev.filter((keyboard) => keyboard.price <= 200000)
              );
              break;
            case '30만원 이하':
              setKeyboards((prev) =>
                prev.filter((keyboard) => keyboard.price <= 300000)
              );
              break;
            default:
              break;
          }
        }
        if (tenkeyLess) {
          setKeyboards((prev) => prev.filter((keyboard) => !keyboard.tenkey));
        }
        if (bluetooth) {
          setKeyboards((prev) => prev.filter((keyboard) => keyboard.bluetooth));
        }
        if (backlight) {
          setKeyboards((prev) => prev.filter((keyboard) => keyboard.backlight));
        }
      }
    }
    return () => {
      mountedAllCategory.current = false;
    };
  }, [allKeyboards, allCategory, sortingNumber]);

  // ! 브랜드
  const onChangeBrandLogitech = (e) => {
    setBrandLogitech(e.target.checked);
    if (e.target.checked) {
      setAllCategory((prev) => [...prev, '로지텍']);
    } else {
      setAllCategory((prev) =>
        prev.filter((category) => category !== '로지텍')
      );
    }
  };
  const onChangeBrandKeychron = (e) => {
    setBrandKeychron(e.target.checked);
    if (e.target.checked) {
      setAllCategory((prev) => [...prev, '키크론']);
    } else {
      setAllCategory((prev) =>
        prev.filter((category) => category !== '키크론')
      );
    }
  };
  const onChangeBrandAbko = (e) => {
    setBrandAbko(e.target.checked);
    if (e.target.checked) {
      setAllCategory((prev) => [...prev, '앱코']);
    } else {
      setAllCategory((prev) => prev.filter((category) => category !== '앱코'));
    }
  };
  const onChangeBrandLeopold = (e) => {
    setBrandLeopold(e.target.checked);
    if (e.target.checked) {
      setAllCategory((prev) => [...prev, '레오폴드']);
    } else {
      setAllCategory((prev) =>
        prev.filter((category) => category !== '레오폴드')
      );
    }
  };
  const onChangeBrandVarmilo = (e) => {
    setBrandVarmilo(e.target.checked);
    if (e.target.checked) {
      setAllCategory((prev) => [...prev, '바밀로']);
    } else {
      setAllCategory((prev) =>
        prev.filter((category) => category !== '바밀로')
      );
    }
  };
  const onChangeBrandHansung = (e) => {
    setBrandHansung(e.target.checked);
    if (e.target.checked) {
      setAllCategory((prev) => [...prev, '한성']);
    } else {
      setAllCategory((prev) => prev.filter((category) => category !== '한성'));
    }
  };
  const onChangeBrandCox = (e) => {
    setBrandCox(e.target.checked);
    if (e.target.checked) {
      setAllCategory((prev) => [...prev, '콕스']);
    } else {
      setAllCategory((prev) => prev.filter((category) => category !== '콕스'));
    }
  };
  const onChangeBrandMstone = (e) => {
    setBrandMstone(e.target.checked);
    if (e.target.checked) {
      setAllCategory((prev) => [...prev, '엠스톤']);
    } else {
      setAllCategory((prev) =>
        prev.filter((category) => category !== '엠스톤')
      );
    }
  };
  const onChangeBrandCherry = (e) => {
    setBrandCherry(e.target.checked);
    if (e.target.checked) {
      setAllCategory((prev) => [...prev, '체리']);
    } else {
      setAllCategory((prev) => prev.filter((category) => category !== '체리'));
    }
  };
  const onChangeBrandCorsair = (e) => {
    setBrandCorsair(e.target.checked);
    if (e.target.checked) {
      setAllCategory((prev) => [...prev, '커세어']);
    } else {
      setAllCategory((prev) =>
        prev.filter((category) => category !== '커세어')
      );
    }
  };

  // ! 스위치
  const onChangeSwitchBrown = (e) => {
    setSwitchBrown(e.target.checked);
    if (e.target.checked) {
      setAllCategory((prev) => [...prev, '갈축']);
    } else {
      setAllCategory((prev) => prev.filter((category) => category !== '갈축'));
    }
  };

  const onChangeSwitchRed = (e) => {
    setSwitchRed(e.target.checked);
    if (e.target.checked) {
      setAllCategory((prev) => [...prev, '적축']);
    } else {
      setAllCategory((prev) => prev.filter((category) => category !== '적축'));
    }
  };

  const onChangeSwitchBlue = (e) => {
    setSwitchBlue(e.target.checked);
    if (e.target.checked) {
      setAllCategory((prev) => [...prev, '청축']);
    } else {
      setAllCategory((prev) => prev.filter((category) => category !== '청축'));
    }
  };
  const onChangeSwitchBlack = (e) => {
    setSwitchBlack(e.target.checked);
    if (e.target.checked) {
      setAllCategory((prev) => [...prev, '흑축']);
    } else {
      setAllCategory((prev) => prev.filter((category) => category !== '흑축'));
    }
  };
  const onChangeSwitchSilentRed = (e) => {
    setSwitchSilentRed(e.target.checked);
    if (e.target.checked) {
      setAllCategory((prev) => [...prev, '저소음적축']);
    } else {
      setAllCategory((prev) =>
        prev.filter((category) => category !== '저소음적축')
      );
    }
  };

  // ! 가격
  const onChangePriceRadio = (e) => {
    setAllCategory((prev) =>
      prev.filter((category) => !category.endsWith('이하'))
    );
    setPriceRadio(e.target.value);
    setAllCategory((prev) => [...prev, e.target.value]);
  };

  const onClickPriceRadio = (e) => {
    if (priceRadio) {
      e.target.checked = false;
      setPriceRadio(null);
      setAllCategory((prev) =>
        prev.filter((category) => !category.endsWith('이하'))
      );
    } else {
      setPriceRadio(e.target.value);
    }
  };

  // ! 기타 (텐키, 블루투스, 백라이트)
  const onChangeTenkeyLess = (e) => {
    setTenkeyLess(e.target.checked);
    if (e.target.checked) {
      setAllCategory((prev) => [...prev, '텐키리스']);
    } else {
      setAllCategory((prev) =>
        prev.filter((category) => category !== '텐키리스')
      );
    }
  };

  const onChangeBluetooth = (e) => {
    setBluetooth(e.target.checked);
    if (e.target.checked) {
      setAllCategory((prev) => [...prev, '블루투스']);
    } else {
      setAllCategory((prev) =>
        prev.filter((category) => category !== '블루투스')
      );
    }
  };

  const onChangeBacklight = (e) => {
    setBacklight(e.target.checked);
    if (e.target.checked) {
      setAllCategory((prev) => [...prev, 'LED백라이트']);
    } else {
      setAllCategory((prev) =>
        prev.filter((category) => category !== 'LED백라이트')
      );
    }
  };

  const onClickResetBtn = () => {
    setAllCategory([]);

    setBrandLogitech(false);
    setBrandKeychron(false);
    setBrandAbko(false);
    setBrandLeopold(false);
    setBrandVarmilo(false);
    setBrandHansung(false);
    setBrandCox(false);
    setBrandMstone(false);
    setBrandCherry(false);
    setBrandCorsair(false);

    setSwitchBrown(false);
    setSwitchRed(false);
    setSwitchBlue(false);
    setSwitchBlack(false);
    setSwitchSilentRed(false);

    setPriceRadio(null);

    setTenkeyLess(false);
    setBluetooth(false);
    setBacklight(false);
  };

  return (
    <>
      <ScrollArrow />
      <div className="keyboard">
        {!firstLoading && (
          <>
            <div className="keyboard-category">
              <div>브랜드</div>
              <div className="category-list horizontal-scroll">
                <Checkbox
                  checked={brandLogitech}
                  onChange={onChangeBrandLogitech}
                >
                  로지텍
                </Checkbox>
                <Checkbox
                  checked={brandKeychron}
                  onChange={onChangeBrandKeychron}
                >
                  키크론
                </Checkbox>
                <Checkbox checked={brandAbko} onChange={onChangeBrandAbko}>
                  앱코
                </Checkbox>
                <Checkbox
                  checked={brandLeopold}
                  onChange={onChangeBrandLeopold}
                >
                  레오폴드
                </Checkbox>
                <Checkbox
                  checked={brandVarmilo}
                  onChange={onChangeBrandVarmilo}
                >
                  바밀로
                </Checkbox>
                <Checkbox
                  checked={brandHansung}
                  onChange={onChangeBrandHansung}
                >
                  한성
                </Checkbox>
                <Checkbox checked={brandCox} onChange={onChangeBrandCox}>
                  콕스
                </Checkbox>
                <Checkbox checked={brandMstone} onChange={onChangeBrandMstone}>
                  엠스톤
                </Checkbox>
                <Checkbox checked={brandCherry} onChange={onChangeBrandCherry}>
                  체리
                </Checkbox>
                <Checkbox
                  checked={brandCorsair}
                  onChange={onChangeBrandCorsair}
                >
                  커세어
                </Checkbox>
              </div>
              <div>키 스위치</div>
              <div className="category-list horizontal-scroll">
                <Checkbox checked={switchBrown} onChange={onChangeSwitchBrown}>
                  갈축
                </Checkbox>
                <Checkbox checked={switchRed} onChange={onChangeSwitchRed}>
                  적축
                </Checkbox>
                <Checkbox checked={switchBlue} onChange={onChangeSwitchBlue}>
                  청축
                </Checkbox>
                <Checkbox checked={switchBlack} onChange={onChangeSwitchBlack}>
                  흑축
                </Checkbox>
                <Checkbox
                  checked={switchSilentRed}
                  onChange={onChangeSwitchSilentRed}
                >
                  저소음적축
                </Checkbox>
              </div>
              <div>가격</div>
              <Radio.Group
                onChange={onChangePriceRadio}
                value={priceRadio}
                className="category-list horizontal-scroll radio-group"
              >
                <Radio value={'5만원 이하'} onClick={onClickPriceRadio}>
                  5만원 이하
                </Radio>
                <Radio value={'10만원 이하'} onClick={onClickPriceRadio}>
                  10만원 이하
                </Radio>
                <Radio value={'15만원 이하'} onClick={onClickPriceRadio}>
                  15만원 이하
                </Radio>
                <Radio value={'20만원 이하'} onClick={onClickPriceRadio}>
                  20만원 이하
                </Radio>
                <Radio value={'30만원 이하'} onClick={onClickPriceRadio}>
                  30만원 이하
                </Radio>
              </Radio.Group>
              <div>기타</div>
              <div className="category-list horizontal-scroll">
                <Checkbox checked={tenkeyLess} onChange={onChangeTenkeyLess}>
                  텐키리스
                </Checkbox>
                <Checkbox checked={bluetooth} onChange={onChangeBluetooth}>
                  블루투스
                </Checkbox>
                <Checkbox checked={backlight} onChange={onChangeBacklight}>
                  LED백라이트
                </Checkbox>
              </div>
              {allCategory.length !== 0 && (
                <>
                  <div className="clear-button-wrapper">
                    <button onClick={onClickResetBtn}>
                      <FiRotateCw />
                      <span>전체 해제</span>
                    </button>
                  </div>
                  <div className="selected-category-wrapper">
                    {allCategory.map((category) => (
                      <div key={category} className="selected-category">
                        <span>{category}</span>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* ! 정렬  */}
            <div className="keyboard-sorting-count-area">
              {width > 768 ? (
                <Space
                  split={<Divider type="vertical" />}
                  style={{ columnGap: '6px !important' }}
                  className="horizontal-scroll"
                >
                  <Typography.Link
                    className={`sorting-tab ${
                      sortingNumber === '1' && 'selected'
                    }`}
                    onClick={onClickHeartDescendingBtn}
                  >
                    <span style={{ marginRight: '5px' }}>
                      {sortingNumber === '1' && <FaCheck />}
                    </span>
                    좋아요 많은순
                  </Typography.Link>
                  <Typography.Link
                    className={`sorting-tab ${
                      sortingNumber === '2' && 'selected'
                    }`}
                    onClick={onClickHeartAscendingBtn}
                  >
                    <span style={{ marginRight: '5px' }}>
                      {sortingNumber === '2' && <FaCheck />}
                    </span>
                    좋아요 적은순
                  </Typography.Link>
                  <Typography.Link
                    className={`sorting-tab ${
                      sortingNumber === '3' && 'selected'
                    }`}
                    onClick={onClickReviewDescendingBtn}
                  >
                    <span style={{ marginRight: '5px' }}>
                      {sortingNumber === '3' && <FaCheck />}
                    </span>
                    리뷰 많은순
                  </Typography.Link>
                  <Typography.Link
                    className={`sorting-tab ${
                      sortingNumber === '4' && 'selected'
                    }`}
                    onClick={onClickReviewAscendingBtn}
                  >
                    <span style={{ marginRight: '5px' }}>
                      {sortingNumber === '4' && <FaCheck />}
                    </span>
                    리뷰 적은순
                  </Typography.Link>
                  <Typography.Link
                    className={`sorting-tab ${
                      sortingNumber === '5' && 'selected'
                    }`}
                    onClick={onClickPriceAscendingBtn}
                  >
                    <span style={{ marginRight: '5px' }}>
                      {sortingNumber === '5' && <FaCheck />}
                    </span>
                    가격 낮은순
                  </Typography.Link>
                  <Typography.Link
                    className={`sorting-tab ${
                      sortingNumber === '6' && 'selected'
                    }`}
                    onClick={onClickPriceDescendingBtn}
                  >
                    <span style={{ marginRight: '5px' }}>
                      {sortingNumber === '6' && <FaCheck />}
                    </span>
                    가격 높은순
                  </Typography.Link>
                </Space>
              ) : (
                <Select defaultValue={sortingNumber} onChange={handleChange}>
                  <Option value="1">좋아요 많은순</Option>
                  <Option value="2">좋아요 적은순</Option>
                  <Option value="3">리뷰 많은순</Option>
                  <Option value="4">리뷰 적은순</Option>
                  <Option value="5">가격 낮은순</Option>
                  <Option value="6">가격 높은순</Option>
                </Select>
              )}
              <div className="keyboard-count">총 {keyboards.length}개</div>
            </div>
          </>
        )}
        <section className="card-section">
          {keyboards.map((keyboard) => (
            <KeyboardCard
              key={`${keyboard.id}_${keyboard.name}`}
              keyboard={keyboard}
            />
          ))}
        </section>
      </div>
    </>
  );
};

export default Keyboard;
