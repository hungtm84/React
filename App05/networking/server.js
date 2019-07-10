import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
const _apiGetAllGirls = 'http://10.0.0.55:3000/app05/get';
const _apiPostGirl = 'http://10.0.0.55:3000/app05/post';
const _apiPutGirl = 'http://10.0.0.55:3000/app05/put';
async function getGirlsFromServer(){
    try{
        let response = await fetch(_apiGetAllGirls);
        let responseJson = await response.json();
        console.log(JSON.stringify(responseJson));
        return responseJson.data;
    }catch(error){
        console.log(error);
    }
}

async function insertGirlsToServer(params){
    try{
        let response = await fetch(_apiPostGirl,{
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
async function updateGirlsToServer(params){
    try{
        let response = await fetch(_apiPutGirl,{
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

export{updateGirlsToServer};
export{insertGirlsToServer};
export{getGirlsFromServer};
