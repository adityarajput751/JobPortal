import { LogBox, SafeAreaView } from "react-native";
import React from "react";
import { LoginStyle } from "./src/theme/styles/LoginStyle";
import MainNavigator from "./src/navigation/MainNavigator";
import "react-native-gesture-handler";
import { Provider } from "react-redux";
import AppLoader from "./src/elements/AppLoader";
import ToastMessage from "./src/elements/ToastMessage";
// import { persistor, store } from "./src/store/store";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./src/store/store";
// import store, { persistor } from "./src/store/store";

const App = () => {
  LogBox.ignoreAllLogs();
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <ToastMessage />
      <SafeAreaView style={LoginStyle.appView}>
        <MainNavigator />
        <AppLoader />
      </SafeAreaView>
      </PersistGate>
    </Provider>
  );
};

export default App;
