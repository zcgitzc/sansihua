package com.tencent.wxcloudrun.service;

import java.text.ParseException;

/**
 * @author byu_rself
 * @date 2022/8/22 17:08
 */
public interface IPushService {
    void push() throws ParseException;
}