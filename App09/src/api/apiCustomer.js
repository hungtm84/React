import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
const _apiGet = 'http://dongxuan.somee.com/api/customer';
const _apiPost = 'http://dongxuan.somee.com/api/customer';
const _apiPut = 'http://dongxuan.somee.com/api/customer';
async function getCustomersFromServer(){
    try{
        let response = await fetch(_apiGet);
        let responseJson = await response.json();
        console.log(JSON.stringify(responseJson));
        return responseJson;
    }catch(error){
        console.log(error);
    }
}

async function insertCustomerToServer(params){
    try{
        let response = await fetch(_apiPost,{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json',
            },
            body: JSON.stringify(params)
        });
        let responseJson = await response.json();
        console.log(JSON.stringify(responseJson));
        return responseJson.result;
    }catch(error){
        console.log(error);
    }
}
async function updateCustomerToServer(params){
    try{
        let response = await fetch(_apiPut,{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json',
            },
            body: JSON.stringify(params)
        });
        let responseJson = await response.json();
        console.log(JSON.stringify(responseJson));
        return responseJson.result;
    }catch(error){
        console.log(error);
    }
}

export{updateCustomerToServer};
export{insertCustomerToServer};
export{getCustomersFromServer};
