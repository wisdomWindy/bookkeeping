import { NavBar,DatePicker } from "antd-mobile";
import './index.css'
import { useState,useCallback,useMemo, useEffect } from "react";
import { useSelector } from "react-redux";
import _ from 'lodash'
import moment from "moment";
import Daily from "./components/Daily";
export default function Month(){
  const billList = useSelector((state) => state.billStore.billList);
  const [currentDate,setCurrentDate] = useState(new Date())
  const [currentMonthList,setCurrentMonthList] = useState([])
  const [showDate,setShowDate] = useState(false);

  // 获取初始渲染时的数据
  useEffect(()=>{
   const date = moment(currentDate).format('YYYY-MM')
   if(monthGroup[date]){
    setCurrentMonthList(monthGroup[date]);
   }
  },[]);
  // 按月分组
  const monthGroup = useMemo(()=>{
    return _.groupBy(billList,(item)=>moment(item.date).format('YYYY-MM'))
  },[billList])
  // 按日分组
   const dayGroup = useMemo(()=>{
    const groupData =_.groupBy(currentMonthList,(item)=>moment(item.date).format('MM-dd'))
    const keys = Object.keys(groupData)
    return {
      groupData,
      keys
    }
  },[currentMonthList])

  // 计算当月收入、支出、结余
  const monthResult = useMemo(()=>{
    const output = currentMonthList.filter(item => item.type === 'pay').reduce((pre,current)=>{return pre+current.amount},0)
    const income = currentMonthList.filter(item => item.type === 'income').reduce((pre,current)=>{return pre+current.amount},0)
    const rest = income - output
    return {
      output,income,rest
    }
  },[currentMonthList])

  // 显示日期选择器
  const selectDate = ()=>{
    setShowDate(true)
  }
  // 确认选择日期
  const confirmSelect = (val)=>{
    const currentMonthList = monthGroup[moment(val).format('YYYY-MM')];
    setCurrentMonthList(currentMonthList);
    setCurrentDate(val)
  }
  // datepicker的选择项渲染函数
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
            <div className="value">{monthResult.output}</div>
            <div className="label">支出</div>
          </div>
          <div className="list-item">
            <div className="value">{monthResult.income}</div>
            <div className="label">收入</div>
          </div>
          <div className="list-item">
            <div className="value">{monthResult.rest}</div>
            <div className="label">结余</div>
          </div>
        </div>
        <div className="bill-list">
          {
            dayGroup.keys.map((item,index)=>(
              <Daily {...{title:item,billList:dayGroup.groupData[item]}} key={index}></Daily>
            ))
          }
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