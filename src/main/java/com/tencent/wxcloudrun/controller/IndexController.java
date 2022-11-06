package com.tencent.wxcloudrun.controller;

import org.apache.commons.io.IOUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.net.URL;
import java.net.URLConnection;

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
        URL resource = this.getClass().getResource("/english.pdf");
        System.out.println("ct:" + resource.openConnection().getContentType());
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

    @RequestMapping("/preview1")
    public void er(HttpServletResponse response) {

        byte[] data = null;
        try {
            InputStream input = this.getClass().getResourceAsStream("/english.pdf");
            data = new byte[input.available()];
            input.read(data);
            response.getOutputStream().write(data);
            input.close();
        } catch (Exception e) {
            System.out.println(e);
        }

    }

    @ResponseBody
    @RequestMapping("/preview2")
    public void findPdf(HttpServletResponse response) throws Exception {
        response.setContentType("application/pdf");
        InputStream in = this.getClass().getResourceAsStream("/english.pdf");
        OutputStream out = response.getOutputStream();
        byte[] b = new byte[512];
        while ((in.read(b)) != -1) {
            out.write(b);
        }
        out.flush();
        in.close();
        out.close();
    }

    @ResponseBody
    @RequestMapping("/preview3")
    public void devDoc(HttpServletRequest request, HttpServletResponse response, String storeName) throws Exception {
        request.setCharacterEncoding("UTF-8");
        response.setContentType("application/pdf");
        InputStream in = this.getClass().getResourceAsStream("/english.pdf");
        OutputStream out = response.getOutputStream();
        byte[] b = new byte[1024];
        while ((in.read(b)) != -1) {
            out.write(b);
        }
        out.flush();
        in.close();
        out.close();
    }

    @ResponseBody
    @RequestMapping("/preview")
    public void download(HttpServletResponse response
    ) throws Exception {

        URL u = this.getClass().getResource("/english.pdf");
        BufferedInputStream br = new BufferedInputStream(u.openStream());
        byte[] bs = new byte[1024];
        int len = 0;
        response.reset(); // 非常重要
        URLConnection urlConnection = u.openConnection();
        String contentType = urlConnection.getContentType();
        response.setContentType(contentType);
        response.setHeader("Content-Disposition", "inline;filename="
                + "2019年上半年英语四级笔试准考证(戴林峰).pdf");
        // 文件名应该编码成utf-8，注意：使用时，我们可忽略这句

        OutputStream out = response.getOutputStream();
        while ((len = br.read(bs)) > 0) {
            out.write(bs, 0, len);
        }
        out.flush();
        out.close();
        br.close();
    }

    @RequestMapping(value = "/showpdf")
    public void showpdf(HttpServletResponse response) {
        try {
            InputStream input = this.getClass().getResourceAsStream("/english.pdf");
            response.setHeader("Content-Type", "application/pdf");
            OutputStream outputStream = response.getOutputStream();
            IOUtils.write(IOUtils.toByteArray(input), outputStream);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
