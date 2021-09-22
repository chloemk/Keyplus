import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from '../utils/customAxios';
import exceptionAxios from 'axios';
import KeyboardCard from './KeyboardCard';

import './Keyboard.scss';
import { isError } from '../reducers/errorReducer';
import 'antd/dist/antd.css';
import {
  Select,
  Space,
  Typography,
  Divider,
  Checkbox,
  Radio,
  Button,
} from 'antd';
const { Option } = Select;

import { FaCheck } from 'react-icons/fa';
import { FiRotateCw } from 'react-icons/fi';

const Keyboard = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.loading);

  const [keyboards, setKeyboards] = useState([]);
  const [allKeyboards, setAllKeyboards] = useState([]);
  const [sortingNumber, setSortingNumber] = useState(1);

  // ! 모든 카테고리
  const [allCategory, setAllCategory] = useState([]);

  // ! 브랜드
  const [brandLogitech, setBrandLogitech] = useState(false);
  const [brandKeychron, setBrandKeychron] = useState(false);
  const [brandAbko, setBrandAbko] = useState(false);
  const [brandLeopold, setBrandLeopold] = useState(false);
  const [brandVarmilo, setBrandVarmilo] = useState(false);

  // ! 스위치
  const [switchBrown, setSwitchBrown] = useState(false);
  const [switchRed, setSwitchRed] = useState(false);
  const [switchBlue, setSwitchBlue] = useState(false);
  const [switchBlack, setSwitchBlack] = useState(false);
  const [switchSilentRed, setSwitchSilentRed] = useState(false);

  // ! 가격
  const [priceRadio, setPriceRadio] = useState(null);

  // ! 기타(텐키, 블루투스, 백라이트)
  const [tenkeyLess, setTenkeyLess] = useState(false);
  const [bluetooth, setBluetooth] = useState(false);
  const [backlight, setBacklight] = useState(false);

  useEffect(async () => {
    try {
      const response = await axios.get('/keyboards');
      setKeyboards(
        response.data.data.sort((a, b) => b.likeCount - a.likeCount)
      );
      setAllKeyboards(
        response.data.data.sort((a, b) => b.likeCount - a.likeCount)
      );
      setSortingNumber(1);
    } catch (err) {
      console.log(err);
      dispatch(isError(err.response));
    }
  }, []);

  // // ! 브랜드용 useEffect
  // const mountedBrand = useRef(false);
  // useEffect(() => {
  //   if (!mountedBrand.current) {
  //     mountedBrand.current = true;
  //   } else {
  //     const brands = [];
  //     if (brandLogitech) brands.push('로지텍');
  //     if (brandKeychron) brands.push('키크론');
  //     if (brandAbko) brands.push('앱코');
  //     if (brandLeopold) brands.push('레오폴드');
  //     if (brandVarmilo) brands.push('바밀로');
  //     setKeyboards((prev) =>
  //       prev.filter((keyboard) => brands.indexOf(keyboard.brand) !== -1)
  //     );
  //   }
  // }, [brandLogitech, brandKeychron, brandAbko, brandLeopold, brandVarmilo]);

  // // ! 스위치용 useEffect
  // const mountedSwitch = useRef(false);
  // useEffect(() => {
  //   if (!mountedSwitch.current) {
  //     mountedSwitch.current = true;
  //   } else {
  //     const switches = [];
  //     if (switchBrown) switches.push('갈축');
  //     if (switchRed) switches.push('적축');
  //     if (switchBlue) switches.push('청축');
  //     if (switchBlack) switches.push('흑축');
  //     if (switchSilentRed) switches.push('저소음적축');
  //     console.log(switches);
  //     setKeyboards((prev) =>
  //       prev.filter((keyboard) => {
  //         let flag = false;
  //         for (let i = 0; i < switches.length; i++) {
  //           if (keyboard.switch[switches[i]]) flag = true;
  //         }
  //         return flag;
  //       })
  //     );
  //   }
  // }, [switchBrown, switchRed, switchBlue, switchBlack, switchSilentRed]);

  // // ! 가격용 useEffect
  // const mountedPrice = useRef(false);
  // useEffect(() => {
  //   if (!mountedPrice.current) {
  //     mountedPrice.current = true;
  //   } else {
  //     // 카테고리 선택에 따라 목록 다시 보여주기
  //     console.log(allCategory);
  //   }
  // }, [priceRadio]);

  // // ! 텐키용 useEffect
  // const mountedTenkey = useRef(false);
  // useEffect(() => {
  //   if (!mountedTenkey.current) {
  //     mountedTenkey.current = true;
  //   } else {
  //     // 카테고리 선택에 따라 목록 다시 보여주기
  //     console.log(allCategory);
  //   }
  // }, [tenkeyLess]);

  // // ! 블루투스용 useEffect
  // const mountedBluetooth = useRef(false);
  // useEffect(() => {
  //   if (!mountedBluetooth.current) {
  //     mountedBluetooth.current = true;
  //   } else {
  //     // 카테고리 선택에 따라 목록 다시 보여주기
  //     console.log(allCategory);
  //   }
  // }, [bluetooth]);

  // // ! 백라이트용 useEffect
  // const mountedBacklight = useRef(false);
  // useEffect(() => {
  //   if (!mountedBacklight.current) {
  //     mountedBacklight.current = true;
  //   } else {
  //     // 카테고리 선택에 따라 목록 다시 보여주기
  //     console.log(allCategory);
  //   }
  // }, [backlight]);
  // ! 정렬
  const onClickHeartDescendingBtn = async () => {
    try {
      setSortingNumber(1);
      const response = await exceptionAxios.get('/keyboards');
      setAllKeyboards(
        response.data.data.sort((a, b) => b.likeCount - a.likeCount)
      );
    } catch (err) {
      console.log(err);
      dispatch(isError(err.response));
    }
  };
  const onClickHeartAscendingBtn = async () => {
    try {
      setSortingNumber(2);
      const response = await exceptionAxios.get('/keyboards');
      setAllKeyboards(
        response.data.data.sort((a, b) => a.likeCount - b.likeCount)
      );
    } catch (err) {
      console.log(err);
      dispatch(isError(err.response));
    }
  };

  const onClickReviewDescendingBtn = async () => {
    setSortingNumber(3);
    setAllKeyboards((keyboards) =>
      [...keyboards].sort((a, b) => b.reviewCount - a.reviewCount)
    );
  };
  const onClickReviewAscendingBtn = async () => {
    setSortingNumber(4);
    setAllKeyboards((keyboards) =>
      [...keyboards].sort((a, b) => a.reviewCount - b.reviewCount)
    );
  };

  const onClickPriceDescendingBtn = async () => {
    setSortingNumber(5);
    setAllKeyboards((keyboards) =>
      [...keyboards].sort((a, b) => b.price - a.price)
    );
  };
  const onClickPriceAscendingBtn = async () => {
    setSortingNumber(6);
    setAllKeyboards((keyboards) =>
      [...keyboards].sort((a, b) => a.price - b.price)
    );
  };

  // ! 전체 카테고리, 정렬용 useEffect
  const mountedAllCategory = useRef(false);
  useEffect(async () => {
    if (!mountedAllCategory.current) {
      mountedAllCategory.current = true;
    } else {
      console.log('할때마다해라');
      // * 초기화
      setKeyboards([...allKeyboards]);

      // switch (sortingNumber) {
      //   case 1: // 좋아요 많은순
      //     setKeyboards(
      //       [...allKeyboards].sort((a, b) => b.likeCount - a.likeCount)
      //     );
      //     // setAllKeyboards((prev) =>
      //     //   prev.sort((a, b) => b.likeCount - a.likeCount)
      //     // );
      //     break;
      //   case 2: // 좋아요 적은순
      //     setKeyboards(
      //       [...allKeyboards].sort((a, b) => a.likeCount - b.likeCount)
      //     );
      //     // setAllKeyboards((prev) =>
      //     //   prev.sort((a, b) => a.likeCount - b.likeCount)
      //     // );
      //     break;
      //   case 3: // 리뷰 많은순
      //     setKeyboards(
      //       [...allKeyboards].sort((a, b) => b.reviewCount - a.reviewCount)
      //     );
      //     // setAllKeyboards((prev) =>
      //     // prev.sort((a, b) => b.reviewCount - a.reviewCount)
      //     // );
      //     break;
      //   case 4: // 리뷰 적은순
      //     setKeyboards(
      //       [...allKeyboards].sort((a, b) => a.reviewCount - b.reviewCount)
      //     );
      //     // setAllKeyboards((prev) =>
      //     // prev.sort((a, b) => a.reviewCount - b.reviewCount)
      //     // );
      //     break;
      //   case 5: // 가격 낮은순
      //     setKeyboards([...allKeyboards].sort((a, b) => a.price - b.price));
      //     // setAllKeyboards((prev) => prev.sort((a, b) => a.price - b.price));
      //     break;
      //   case 6: // 가격 높은순
      //     setKeyboards([...allKeyboards].sort((a, b) => b.price - a.price));
      //     // setAllKeyboards((prev) => prev.sort((a, b) => b.price - a.price));
      //     break;
      //   default:
      //     break;
      // }

      if (allCategory.length !== 0) {
        // * 브랜드
        const brands = [];
        if (brandLogitech) brands.push('로지텍');
        if (brandKeychron) brands.push('키크론');
        if (brandAbko) brands.push('앱코');
        if (brandLeopold) brands.push('레오폴드');
        if (brandVarmilo) brands.push('바밀로');
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
  }, [allKeyboards, allCategory, sortingNumber]);

  // async function handleChange(value) {
  //   switch (value) {
  //     case '1':
  //       try {
  //         const response = await exceptionAxios.get('/keyboards');
  //         setKeyboards(
  //           response.data.data.sort((a, b) => b.likeCount - a.likeCount)
  //         );
  //       } catch (err) {
  //         console.log(err);
  //         dispatch(isError(err.response));
  //       }
  //       break;
  //     case '2':
  //       try {
  //         const response = await exceptionAxios.get('/keyboards');
  //         setKeyboards(
  //           response.data.data.sort((a, b) => a.likeCount - b.likeCount)
  //         );
  //       } catch (err) {
  //         console.log(err);
  //         dispatch(isError(err.response));
  //       }
  //       break;
  //     case '3':
  //       setKeyboards((keyboards) =>
  //         [...keyboards].sort((a, b) => b.reviewCount - a.reviewCount)
  //       );
  //       break;
  //     case '4':
  //       setKeyboards((keyboards) =>
  //         [...keyboards].sort((a, b) => a.reviewCount - b.reviewCount)
  //       );
  //       break;
  //     case '5':
  //       setKeyboards((keyboards) =>
  //         [...keyboards].sort((a, b) => b.price - a.price)
  //       );
  //       break;
  //     case '6':
  //       setKeyboards((keyboards) =>
  //         [...keyboards].sort((a, b) => a.price - b.price)
  //       );
  //       break;
  //     default:
  //       break;
  //   }
  // }

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
    console.log('radio checked', e.target.value);
    setPriceRadio(e.target.value);
    setAllCategory((prev) => [...prev, e.target.value]);
  };

  const onClickPriceRadio = (e) => {
    console.log(e.target.checked);
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

  const handleAllKeyboards = (value) => {
    setAllKeyboards(value);
  };

  return (
    <>
      {!loading && (
        <>
          <div className="keyboard-category">
            <div>브랜드</div>
            <div>
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
              <Checkbox checked={brandLeopold} onChange={onChangeBrandLeopold}>
                레오폴드
              </Checkbox>
              <Checkbox checked={brandVarmilo} onChange={onChangeBrandVarmilo}>
                바밀로
              </Checkbox>
            </div>
            <div>키 스위치</div>
            <div>
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
            <Radio.Group onChange={onChangePriceRadio} value={priceRadio}>
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
            <div>
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
              <div>
                <Button onClick={onClickResetBtn}>
                  <FiRotateCw /> 전체 해제
                </Button>
              </div>
            )}
            <div>
              {allCategory.map((category) => (
                <span
                  key={category}
                  style={{
                    color: '#fff',
                    backgroundColor: '#000',
                    padding: '5px',
                    borderRadius: '10px',
                    marginRight: '3px',
                  }}
                >
                  {category}
                </span>
              ))}
            </div>
          </div>

          {/* ! 정렬  */}
          <Space
            split={<Divider type="vertical" />}
            style={{ marginBottom: '10px' }}
          >
            <Typography.Link onClick={onClickHeartDescendingBtn}>
              {sortingNumber === 1 && <FaCheck />}
              좋아요 많은순
            </Typography.Link>
            <Typography.Link onClick={onClickHeartAscendingBtn}>
              {sortingNumber === 2 && <FaCheck />}
              좋아요 적은순
            </Typography.Link>
            <Typography.Link onClick={onClickReviewDescendingBtn}>
              {sortingNumber === 3 && <FaCheck />}
              리뷰 많은순
            </Typography.Link>
            <Typography.Link onClick={onClickReviewAscendingBtn}>
              {sortingNumber === 4 && <FaCheck />}
              리뷰 적은순
            </Typography.Link>
            <Typography.Link onClick={onClickPriceDescendingBtn}>
              {sortingNumber === 5 && <FaCheck />}
              가격 낮은순
            </Typography.Link>
            <Typography.Link onClick={onClickPriceAscendingBtn}>
              {sortingNumber === 6 && <FaCheck />}
              가격 높은순
            </Typography.Link>
          </Space>
          <div>총 {keyboards.length}개</div>
        </>
      )}
      {/* <Select
        defaultValue="1"
        onChange={handleChange}
        style={{ marginBottom: '30px', minWidth: '150px' }}
      >
        <Option value="1">좋아요 많은순</Option>
        <Option value="2">좋아요 적은순</Option>
        <Option value="3">리뷰 많은순</Option>
        <Option value="4">리뷰 적은순</Option>
        <Option value="5">가격 높은순</Option>
        <Option value="6">가격 낮은순</Option>
      </Select> */}
      <section className="card-section">
        {keyboards.map((keyboard) => (
          <KeyboardCard
            key={`${keyboard.id}_${keyboard.name}`}
            keyboard={keyboard}
          />
        ))}
      </section>
    </>
  );
};

export default Keyboard;
