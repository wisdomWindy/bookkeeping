import {TabBar} from 'antd-mobile'
import './index.css'
export default function Tabbar({tabs,onSwitchRoute}){
  return (
    <TabBar className="tabbar" onChange={onSwitchRoute}>
      {tabs.map((item) => (
        <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
      ))}
    </TabBar>
  );
}