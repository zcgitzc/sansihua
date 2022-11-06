package com.tencent.wxcloudrun.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.FileInputStream;
import java.io.InputStream;
import java.io.OutputStream;

/**
 * index控制器
 */
@Controller
public class IndexController {

    /**
     * 主页页面
     *
     * @return API response html
     */
    @GetMapping
    public String index() {
        return "index";
    }


    @GetMapping("/KCMS/detail/detail/**")
    public String english() {
        return "english";
    }

    @GetMapping("/Kreader/CatalogViewPage**")
    public String preview() {
        return "preview";
    }


    @RequestMapping(value = "/reviewPriceData**")
    public void reviewPriceData(HttpServletResponse response) throws Exception {
        // 获取pdf文件路径（包括文件名）
        InputStream resourceAsStream = this.getClass().getResourceAsStream("/english.pdf");
        response.setHeader("Content-Type", "application/octet-stream");
        response.setHeader("Content-Disposition", "attachment header");
        response.setHeader("X-Frame-Options", "ALLOWALL");
        OutputStream outputStream = response.getOutputStream();
        int count = 0;
        byte[] buffer = new byte[1024 * 1024];
        while ((count = resourceAsStream.read(buffer)) != -1) {
            outputStream.write(buffer, 0, count);
        }
        outputStream.flush();
        outputStream.close();
    }
}
