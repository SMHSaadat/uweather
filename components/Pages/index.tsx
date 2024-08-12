import Component, { PageEl } from '@/components/Libs/Component';
import Copy from '@/components/Libs/Copy';
import Router from 'next/router'
import Window from '@/components/Libs/Window';
import TextBox from '@/components/Libs/TextBox';
import Icon2Titles from '@/components/Libs/Icon2Titles';
import Icon3Titles from '@/components/Libs/Icon3Titles';
import { url } from 'inspector';


export default p => Component(p, Page);
const Page: PageEl = (props, state, refresh, getProps) => {

  let styles = global.styles
  global.lang = { ff: "vr", ffb: "vb" }

  let name = "سرویس هواشناسی"
  let img_address = "utether\\public\\6256878.jpg"
  
  return (
    <div style={{ direction: "rtl", minHeight: "11vh", }}>
      <br-x />
      <Window title={name}  style={{ minHeight: 500, margin: 10, width: "calc(100% - 20px)", backgroundColor:"midnightblue"}}>
        <br></br>
        <br></br>
        <div className='bg'>
          <br></br>
          <br></br>
          <div className='second-image-div'>
            <img src="/test2.png" alt="hi" />
          </div>
          <div className='image-div'>
            <img src="/weather.png" alt="" />
          </div>

          <div style={{
            width: "70%", height: 300,
            borderRadius: 20, backgroundColor: "rgba(25,25,112,0.80)",
            marginRight: 20, color: "white", 
          }}>
            <ul style={{ margin: 10, paddingTop: 30}}>
              <li className='list-item time hover' style={{fontSize:"140%"}}><span className='time'>{props.api_time.time24.hour.fa}:{props.api_time.time24.minute.fa}:{props.api_time.time24.second.fa} | {props.api_time.date.day.number.fa} {props.api_time.date.month.name} {props.api_time.date.year.number.fa}</span> |<span className='time'>🌇{(parseFloat((props.weather.astronomy[0].sunrise).slice(0, 2)).toLocaleString("fa-IR"))}:{(parseFloat((props.weather.astronomy[0].sunrise).slice(3, 5)).toLocaleString("fa-IR"))}</span> |<span className='time'>🌆{(parseFloat((props.weather.astronomy[0].sunset).slice(0, 2)).toLocaleString("fa-IR"))}:{(parseFloat((props.weather.astronomy[0].sunset).slice(3, 5)).toLocaleString("fa-IR"))}</span></li>
              <li className="list-item location hover"><span className="weather c-blue">ایران</span> | <span className='c-blue'>فارس</span> | <span className='c-blue'>شیراز</span> | <span className='c-blue'>{parseFloat(props.area.population).toLocaleString("fa-IR")} نفر</span></li>
              <li className='list-item weather-info-2 hover'><span className='c-blue'>هوا: آفتابی</span> | <span className='c-blue'>😎 سطح اشعه فرابنفش: {parseFloat(props.current_condition.uvIndex).toLocaleString("fa-IR")}</span></li>
              <li className="list-item weather hover"><span className="c-blue">{parseFloat(props.current_condition.temp_C).toLocaleString("fa-IR")} سانتی گراد</span> | <span className='c-blue'>⬇️{parseFloat(props.weather.mintempC).toLocaleString("fa-IR")}</span> | <span className='c-blue'>⬆️{parseFloat(props.weather.maxtempC).toLocaleString("fa-IR")}</span></li>
              <li className='list-item weather-info hover'><span className='c-blue'>رطوبت: {parseFloat(props.current_condition.humidity).toLocaleString("fa-IR")}٪</span> |<span className='c-blue'>🍃وزش باد: {parseFloat(props.current_condition.windspeedKmph).toLocaleString('fa-IR')}</span><span className='c-blue' style={{fontSize:"15px"}}> کیلومتربرساعت</span></li>

            </ul>
          </div>
          <p style={{width: "calc(100% - 20px)", marginInline:360, marginTop:25}}>تیم پژوهشی تورینگ</p>
        </div>

      </Window>
    </div>
  )
}


export async function getServerSideProps(context) {
  
  
  var session = await global.SSRVerify(context)
  var { uid, name, image, imageprop, lang, cchar,
    unit, workspace, servid, servsecret,
    usedquota, quota, quotaunit, status, regdate, expid,
    role, path, devmod, userip, } = session;
    
    let response = await (await fetch("https://irmapserver.ir/research/api/weather/"))
    let time_response = await (await fetch("https://api.keybit.ir/time/"))
    let api_time = await time_response.json()
    let data = await response.json()
    let current_condition = data.current_condition[0]
    let area = data.nearest_area[0]
    let weather = data.weather[0]
    let sunrise = data.weather[0].astronomy[0].sunrise

    console.log(sunrise.slice(0, 5))


    
    return {
      props: {
        data: global.QSON.stringify({
          current_condition:current_condition,
          area:area,
          weather,
          session,
          api_time:api_time,
          // nlangs,
        })
      },
    }
  }