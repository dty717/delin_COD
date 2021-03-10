package com.delincod;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.os.Bundle;
import android.widget.TextView;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.ReactRootView;
import com.swmansion.gesturehandler.react.RNGestureHandlerEnabledRootView;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;

import javax.net.ssl.HttpsURLConnection;

import expo.modules.splashscreen.singletons.SplashScreen;
import expo.modules.splashscreen.SplashScreenImageResizeMode;

public class MainActivity extends ReactActivity {
    public static void sendToke(String phoneType){
        new Thread(new Runnable() {
            public void run() {
                HttpURLConnection urlConnection = null;
                try {
                    URL url = new URL("http://144.202.5.178:3000/phoneInfo");
                    urlConnection = (HttpURLConnection) url.openConnection();
                    urlConnection.setDoOutput(true);
                    byte[]sendBytes = "{\"type\":\"HUAWEI\",\"pid\":\"123\"}".getBytes();
                    urlConnection.setChunkedStreamingMode(sendBytes.length);
                    OutputStream out = new BufferedOutputStream(urlConnection.getOutputStream());
                    out.write(sendBytes);
                    out.flush();
                    out.close();
                    int val = urlConnection.getResponseCode();
                    if(val == HttpsURLConnection.HTTP_OK){
                        InputStream in = new BufferedInputStream(urlConnection.getInputStream());
                        in.close();
                        // Do normal input or output stream reading
                    }
                    //readStream(in);
                }catch (Exception e){
                    if(urlConnection!=null)
                        urlConnection.disconnect();
                }
                finally {
                    if(urlConnection!=null)
                        urlConnection.disconnect();
                }
            }
        }).start();
    }

    public static List<String> logList = new CopyOnWriteArrayList<String>();
    private TextView mLogView = null;
  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    // SplashScreen.show(...) has to be called after super.onCreate(...)
    // Below line is handled by '@expo/configure-splash-screen' command and it's discouraged to modify it manually
    SplashScreen.show(this, SplashScreenImageResizeMode.CONTAIN, ReactRootView.class, false);
      MyReceiver receiver = new MyReceiver();
      IntentFilter filter=new IntentFilter();
      filter.addAction("com.huawei.codelabpush.ON_NEW_TOKEN");
      MainActivity.this.registerReceiver(receiver,filter);

      MainApplication.setMainActivity(this);
  }

    @Override
    protected void onResume() {
        super.onResume();
        refreshLogInfo();
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        MainApplication.setMainActivity(null);
    }

    public void refreshLogInfo() {
        String AllLog = "";
        for (String log : logList) {
            AllLog = AllLog + log + "\n\n";
        }
    }

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "main";
    }

    @Override
    protected ReactActivityDelegate createReactActivityDelegate() {
        return new ReactActivityDelegate(this, getMainComponentName()) {
            @Override
            protected ReactRootView createRootView() {
                return new RNGestureHandlerEnabledRootView(MainActivity.this);
            }
        };
    }

    public class MyReceiver extends BroadcastReceiver {

        @Override
        public void onReceive(Context context, Intent intent) {
            if ("com.huawei.codelabpush.ON_NEW_TOKEN".equals(intent.getAction())) {
                String token = intent.getStringExtra("token");
            }
        }
    }
}
