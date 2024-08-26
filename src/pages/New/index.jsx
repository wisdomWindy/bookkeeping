import { NavBar,Button } from 'antd-mobile';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import {menuMap} from './utils/constants'
import { useDispatch } from 'react-redux';
import { addPayBill } from '@/store/modules/billStore';
import './index.css'
export default function New(){
  const navigate = useNavigate();
  const [state,setState] = useState('output');
  const [inputAmount,setInputAmount] = useState(0);
  const [payType,setPayType] = useState('');
  const dispatch = useDispatch();
  const formatMoney = (value)=>{
    return (+value).toFixed(2)
  }
  // 切换类型
  const switchStatus = (state)=>{
    setState(state);
  }
  // 导航回退
  const back = ()=>{
    navigate(-1);
  }
  // input输入事件
  const handleInput = (e)=>{
    setInputAmount(e.target.value)
  }
  // 保存账单
  const saveBill = ()=>{
    const data = {
      type:state,
      money:inputAmount,
      date:new Date(),
      billType:payType
    }
    dispatch(addPayBill(data))
  }

  // 设置消费类型
  const setPayTypeHandler = (val)=>{
    setPayType(val)
  }
  return (
    <div className="new">
      <NavBar onBack={back}>记一笔</NavBar>
      <div className="status">
        <div
          className={`status-item ${state === "output" ? "active" : ""}`}
          onClick={() => switchStatus("output")}
        >
          支出
        </div>
        <div
          className={`status-item ${state === "income" ? "active" : ""}`}
          onClick={() => switchStatus("income")}
        >
          收入
        </div>
      </div>
      <div className="input-box">
        <div className="input-icon"></div>
        <div className="input">
          <input className="text-input" type="number" onChange={handleInput} />
        </div>
        <div className="input-value">
          <span className="input-value-amount">{formatMoney(inputAmount)}</span>
          ￥
        </div>
      </div>
      <div className="tabpanel">
        {menuMap[state].map((menu) => (
          <div className="menu" key={menu.name}>
            <div className="menu-name">{menu.name}</div>
            <div className="submenu-list">
              {menu.children.map((submenu) => (
                <div
                  className={`submenu ${payType === submenu.name ? 'submenu-active' :''}`}
                  onClick={() => setPayTypeHandler(submenu.name)}
                  key={menu.name + submenu.name}
                >
                  {submenu.name}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <Button
        className="save-button"
        onClick={saveBill}
        block
        shape="rectangular"
        color="primary"
      >
        保存
      </Button>
    </div>
  );
}