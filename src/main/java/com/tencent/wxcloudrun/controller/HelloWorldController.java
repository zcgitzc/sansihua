package com.tencent.wxcloudrun.controller;

import com.tencent.wxcloudrun.config.ApiResponse;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author zhuangchuan
 * @date 2022-09-30 5:37 PM
 */
@RestController
public class HelloWorldController {

    @GetMapping(value = "/hello")
    ApiResponse get() {
        return ApiResponse.ok("hello");
    }
}
