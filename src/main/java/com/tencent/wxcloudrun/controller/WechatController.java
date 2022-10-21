package com.tencent.wxcloudrun.controller;

import com.tencent.wxcloudrun.util.WxPublicCheckSignature;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Arrays;

/**
 * @author zhuangchuan
 * @date 2022-09-30 5:37 PM
 */
@RestController
public class WechatController {

    @GetMapping(value = "/wechat")
    public String get(String signature, String timestamp, String nonce, String echostr) {
        System.out.println("request in. signature:" + signature + " timestamp:" + timestamp + " nonce:" + nonce + " echoStr:" + echostr);
        boolean check = WxPublicCheckSignature.checkSignature(signature, timestamp, nonce);
        return check ? echostr : "校验失败";
    }

    public static void main(String[] args) {
        String res = new WechatController().get("d5befd9ceda3e7d1f5a7856a4ceb4c535cb67636", "1666091493", "1229831236", "");
        System.out.println("res:" + res);
    }
}
