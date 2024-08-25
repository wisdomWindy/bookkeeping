import { NavBar,DatePicker } from "antd-mobile";
import './index.css'
import { useState,useCallback } from "react";
export default function Month(){
  const [currentDate,setCurrentDate] = useState(new Date())
  const [showDate,setShowDate] = useState(false);
  const statisticsData = {
    output:100,
    income:200,
    rest:100
  }
  // 显示日期选择器
  const selectDate = ()=>{
    setShowDate(true)
  }
  // 确认选择日期
  const confirmSelect = (val)=>{
    setCurrentDate(val)
  }
  const labelRenderer = useCallback((type, data) => {
    switch (type) {
      case "year":
        return data + "年";
      case "month":
        return data + "月";
      case "day":
        return data + "日";
      case "hour":
        return data + "时";
      case "minute":
        return data + "分";
      case "second":
        return data + "秒";
      default:
        return data;
    }
  }, []);
  return (
    <div className="month">
      <NavBar>月度账单</NavBar>
      <div className="header">
        <div className="bill-date" onClick={selectDate}>
          <span>
            {currentDate.getFullYear()}|{currentDate.getMonth() + 1}账单
          </span>
          <span className={`arrow ${showDate ? 'expend':''}`}></span>
        </div>
        <div className="list">
          <div className="list-item">
            <div className="value">{statisticsData.output}</div>
            <div className="label">支出</div>
          </div>
          <div className="list-item">
            <div className="value">{statisticsData.income}</div>
            <div className="label">收入</div>
          </div>
          <div className="list-item">
            <div className="value">{statisticsData.rest}</div>
            <div className="label">结余</div>
          </div>
        </div>
      </div>
      <DatePicker
        title="账单时间选择"
        visible={showDate}
        onClose={() => {
          setShowDate(false);
        }}
        defaultValue={currentDate}
        onConfirm={confirmSelect}
        renderLabel={labelRenderer}
      />
    </div>
  );
}