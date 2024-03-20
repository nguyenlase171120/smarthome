import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonContent,
  IonRouterOutlet,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import Home from "./pages/Home/Home";
import Login from "./pages/auth/login/Login";
import Register from "./pages/auth/register/Register";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { EPath } from "./enums/path";
import PackageDetail from "./pages/PackageDetail/PackageDetail";
import React from "react";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import "./global.css";
import { END_POINTS } from "./utils/constant";

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <Header />
      <IonContent class="content-wrapper">
        <IonRouterOutlet>
          <Route exact path={END_POINTS.CUSTOMER_ROLE.HOME}>
            <Home />
          </Route>
          <Route exact path={`${EPath.Package}`}>
            <PackageDetail />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/register">
            <Register />
          </Route>
          <Route exact path="/">
            <Redirect to="/login" />
          </Route>
        </IonRouterOutlet>
      </IonContent>
      <Footer />
    </IonReactRouter>
  </IonApp>
);

export default App;
