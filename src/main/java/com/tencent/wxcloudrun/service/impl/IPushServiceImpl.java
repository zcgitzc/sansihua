package com.tencent.wxcloudrun.service.impl;

import com.tencent.wxcloudrun.model.Weather;
import com.tencent.wxcloudrun.service.IPushService;
import com.tencent.wxcloudrun.util.CaiHongPiUtils;
import com.tencent.wxcloudrun.util.ChineseCalendar;
import com.tencent.wxcloudrun.util.JiNianRiUtils;
import com.tencent.wxcloudrun.util.WeatherUtils;
import me.chanjar.weixin.mp.api.WxMpInMemoryConfigStorage;
import me.chanjar.weixin.mp.api.WxMpService;
import me.chanjar.weixin.mp.api.impl.WxMpServiceImpl;
import me.chanjar.weixin.mp.bean.template.WxMpTemplateData;
import me.chanjar.weixin.mp.bean.template.WxMpTemplateMessage;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

@Service
public class IPushServiceImpl implements IPushService {

    @Override
    public void push()  {
        // 1，配置
        WxMpInMemoryConfigStorage wxStorage = new WxMpInMemoryConfigStorage();
        wxStorage.setAppId("wxb1fb2aaaeeef4d56");
        wxStorage.setSecret("e67c7893c0319437cbfde5dd525313a7");
//        wxStorage.setAppId("wx76dcbbb0dfefdc76");
//        wxStorage.setSecret("fb02103b59dd7a57023b087dd95b6d15");
        WxMpService wxMpService = new WxMpServiceImpl();
        wxMpService.setWxMpConfigStorage(wxStorage);
        // 2,推送消息
        WxMpTemplateMessage templateMessage = WxMpTemplateMessage.builder()
                //接收方微信openId
                .toUser("onHTm5lo7vQ2vMIsI0yFW5NfuTzI")
                //模板Id
                .templateId("HKypn37GRQri-OmiwVnfE1KO6Jl3Lr3zYUbZ68MXk0M")
                .build();
        // 3,如果是正式版发送模版消息，这里需要配置你的信息
        Weather weather = WeatherUtils.getWeather();
        templateMessage.addData(new WxMpTemplateData("riqi", weather.getDate() + "  " + weather.getWeek(), "#00BFFF"));
        templateMessage.addData(new WxMpTemplateData("city", weather.getCity(), "#e6b422"));
        templateMessage.addData(new WxMpTemplateData("tianqi", weather.getText_now(), "#165eaf"));
        templateMessage.addData(new WxMpTemplateData("low", weather.getLow() + "", "#a4c9dd"));
        templateMessage.addData(new WxMpTemplateData("high", weather.getHigh() + "", "#bf242a"));
        templateMessage.addData(new WxMpTemplateData("wind_dir", weather.getWind_dir() + "", "#FF6347"));
        templateMessage.addData(new WxMpTemplateData("wind_class", weather.getWind_class() + "", "#FF6347"));
        templateMessage.addData(new WxMpTemplateData("static/english", CaiHongPiUtils.getCaiHongPi().get(0), "#FF69B4"));
        templateMessage.addData(new WxMpTemplateData("chinese", CaiHongPiUtils.getCaiHongPi().get(1), "#FF69B4"));
        templateMessage.addData(new WxMpTemplateData("caihongpi", CaiHongPiUtils.getCaiHongPiTianGou().get(0), "#FF69B4"));
        templateMessage.addData(new WxMpTemplateData("lianai", JiNianRiUtils.getLianAi() + "", "#FF1493"));
        templateMessage.addData(new WxMpTemplateData("shengri", JiNianRiUtils.getBirthdayLkx() + "", "#f09199"));

        String beizhu = "xyp❤lxy";
        //获取当前日期
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
        Date date = new Date();
        String today = format.format(date);
        //获取当前时间得阴历时间
        ChineseCalendar calendar = ChineseCalendar.as(today);
        //阴历6月26日  获取阴历得月份和日期进行比较
        if (calendar.getChinaMonth() == 6 && calendar.getChinaDay() == 26) {
            beizhu = "爱妃生日快乐！！！";
        }
        if (calendar.getChinaMonth() == 5 && calendar.getChinaDay() == 24) {
            beizhu = "今天是你宝贝的生日，嘿嘿！";
        }
        //计算距离下一个生日还有多少天
        int birthday = 0;
        int hisbirthday = 0;
        try {
            birthday = ChineseCalendar.getBirthday(today);
            hisbirthday = ChineseCalendar.gethisBirthday(today);
        } catch (ParseException e) {
            e.printStackTrace();
        }
        templateMessage.addData(new WxMpTemplateData("beizhu", beizhu, "#FF0000"));
        templateMessage.addData(new WxMpTemplateData("hersBirthday","距离爱妃生日还有"+birthday+"天", "#b44c97"));
        templateMessage.addData(new WxMpTemplateData("hisBirthday","距离狗子生日还有"+hisbirthday+"天", "#f5b199"));
        try {
            System.out.println(templateMessage.toJson());
            System.out.println(wxMpService.getTemplateMsgService().sendTemplateMsg(templateMessage));
        } catch (Exception e) {
            System.out.println("推送失败：" + e.getMessage());
            e.printStackTrace();
        }
    }


}