import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../screens/home';

const Stack = createStackNavigator();

export const Routes = () => {
    return (
        <Stack.Navigator
            headerMode='none'>

            <Stack.Screen name={'home'} component={Home}/>
            <Stack.Screen name={'details'} component={Home}/>


        </Stack.Navigator>
    );
};
