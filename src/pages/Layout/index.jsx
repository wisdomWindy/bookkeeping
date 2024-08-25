import { Outlet,useNavigate } from "react-router-dom"
import { useEffect } from "react"
import {useDispatch,useSelector} from 'react-redux'
import { fetchBillList } from "@/store/modules/billStore";
import Tabbar from "@/components/Tabbar";
import './index.css'
export default function Layout(){
  const billList = useSelector(state => state.billStore.billList);
  const navigate= useNavigate();
  const dispatch = useDispatch();
  const tabs = [{
    key:'/',
    title:'月度账单'
  },{
    key:'/new',
    title:'记账'
  },{
    key:'/year',
    title:'年度账单'
  }]
  useEffect(()=>{
    dispatch(fetchBillList());
  },[]);
  // 切换路由
  const switchRoute = (route)=>{
    navigate(route)
  }
  return (
    <div className="layout">
      <div className="main">
        <Outlet></Outlet>
      </div>
      <Tabbar tabs={tabs} onSwitchRoute={switchRoute}></Tabbar>
    </div>
  );
}