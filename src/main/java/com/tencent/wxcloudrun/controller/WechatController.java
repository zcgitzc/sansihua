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
    public String get(String signature, String timestamp, String nonce, String echoStr) {
        System.out.println("request in. signature:" + signature + " timestamp:" + timestamp + " nonce:" + nonce + " echoStr:" + echoStr);
        boolean check = WxPublicCheckSignature.checkSignature(signature, timestamp, nonce);
        return check ? echoStr : "校验失败";
    }

    public static void main(String[] args) {
        new WechatController().get("4f3c5689fde215c5ad09189dc685a53762a54817", "1666090739", "", "");
    }
}
