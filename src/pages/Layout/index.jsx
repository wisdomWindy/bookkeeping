import { Outlet } from "react-router-dom"
import { useEffect } from "react"
import {useDispatch,useSelector} from 'react-redux'
import { fetchBillList } from "@/store/modules/billStore";
export default function Layout(){
  const billList = useSelector(state => state.billStore.billList);
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(fetchBillList());
  },[]);
  return (
    <div className="layout">
      <Outlet></Outlet>
    </div>
  )
}