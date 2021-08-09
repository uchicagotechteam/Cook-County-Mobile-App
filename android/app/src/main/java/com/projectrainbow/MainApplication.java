package com.projectrainbow;

//import android.app.Application;
//import android.content.Context;
//import android.content.res.Configuration;
//import android.os.Bundle;
//
//import androidx.annotation.CallSuper;
//import androidx.annotation.Nullable;
//
//import com.facebook.react.ReactInstanceManager;
//import com.facebook.react.ReactNativeHost;
//
//public class MainApplication extends Application {
////    @Override
////    @CallSuper
////    protected void onCreate(@Nullable Bundle savedInstanceState) {
////        super.onCreate(savedInstanceState);
////
////    }
//
//    // Called when the application is starting, before any other application objects have been created.
//    // Overriding this method is totally optional!
//    @Override
//    public void onCreate() {
//        super.onCreate();
//        // Required initialization logic here!
//    }
//
//    // Called by the system when the device configuration changes while your component is running.
//    // Overriding this method is totally optional!
//    @Override
//    public void onConfigurationChanged(Configuration newConfig) {
//        super.onConfigurationChanged(newConfig);
//    }
//
//    // This is called when the overall system is running low on memory,
//    // and would like actively running processes to tighten their belts.
//    // Overriding this method is totally optional!
//    @Override
//    public void onLowMemory() {
//        super.onLowMemory();
//    }
//}


import android.app.Application;

import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

    private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
        @Override
        public boolean getUseDeveloperSupport() {
            return BuildConfig.DEBUG;
        }

        @Override
        protected List<ReactPackage> getPackages() {
            return Arrays.<ReactPackage>asList(
                    new MainReactPackage()
            );
        }

        @Override
        protected String getJSMainModuleName() {
            return "index";
        }
    };

    @Override
    public ReactNativeHost getReactNativeHost() {
        return mReactNativeHost;
    }

    @Override
    public void onCreate() {
        super.onCreate();
        SoLoader.init(this, /* native exopackage */ false);
    }
}