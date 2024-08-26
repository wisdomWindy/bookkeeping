import { useState,useMemo } from "react";
import "./index.css";
export default function Daily({ billList,title }) {
  const [arrowToggle, setArrowToggle] = useState(false);
  // 计算当月收入、支出、结余
  const dailyResult = useMemo(() => {
    const output = billList
      .filter((item) => item.type === "pay")
      .reduce((pre, current) => {
        return pre + current.amount;
      }, 0);
    const income = billList
      .filter((item) => item.type === "income")
      .reduce((pre, current) => {
        return pre + current.amount;
      }, 0);
    const rest = income - output;
    return {
      output,
      income,
      rest,
    };
  }, [billList]);
  // 格式化title
  const formatTitle = (title) => {
    const arr = title.split("-");
    return `${arr[0]}月${arr[1]}日`;
  };
  // 箭头的toggle状态
  const toggle = () => {
    setArrowToggle(!arrowToggle);
  };
  return (
    <div className="daily">
      <div className="header">
        <div className="title">{formatTitle(title)}</div>
        <div
          className={`arrow ${arrowToggle ? "expend" : ""}`}
          onClick={toggle}
        ></div>
      </div>
      <div className="daily-statistics">
        <div>
          <span className="output-label">支出</span>
          <span>-{dailyResult.output}</span>
        </div>
        <div>
          <span className="income-label">收入</span>
          <span>{dailyResult.income}</span>
        </div>
        <div>
          <span className="rest-amount">{dailyResult.rest}</span>
          <span>结余</span>
        </div>
      </div>
      <div className="bill-sublist" style={{display:arrowToggle?"block":"none"}}>
        {billList.map((item, index) => (
          <div className="bill-sublist-item" key={index}>
            <div className="sublist-item-title">{item.name}</div>
            <div className="sublist-item-amount">-{item.amount}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
