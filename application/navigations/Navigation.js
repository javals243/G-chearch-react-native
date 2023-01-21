import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Logged from './Logged';
import SideMenu from './SideMenu';

const Drawer = createDrawerNavigator();

const Navigation = () => {
  return (
    <Drawer.Navigator initialRouteName="app" drawerContent={(props) => <SideMenu {...props} />}>
      <Drawer.Screen name="main" component={Logged} options={{ headerShown: false }} />
    </Drawer.Navigator>
  );
};

export default Navigation;