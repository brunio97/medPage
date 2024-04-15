import React, { useState, useEffect } from "react";


export function GetBannerHeight() {
  const [bannerHeight, setBannerHeight]=useState('')
  useEffect(()=>{
    function calculateBannerHeight(){
      if (window.innerWidth < 640) {
        setBannerHeight('200px');
      } 
      else if (window.innerWidth < 1280) {
        setBannerHeight('300px');
      } else {
        setBannerHeight('550px')
      }
    }
    calculateBannerHeight();
    window.addEventListener('resize',GetBannerHeight);
    return ()=>{
      window.removeEventListener('resize',GetBannerHeight)
    };
  },[]);
   return bannerHeight;
  }

  
export function GetBannerMargin(){
  const [bannerMargin,setbannerMargin] = useState('');

  useEffect(()=>{
    function calculateBannerMargin(){
      if(window.innerWidth<992){
        setbannerMargin('100px');
      }else{
        setbannerMargin('200px'); 
      }
    }
  calculateBannerMargin();
  window.addEventListener('resize',calculateBannerMargin);
  return ()=>{
    window.removeEventListener('resize',calculateBannerMargin);
  };
  },[] );
    return bannerMargin;
  }


export function setwidth640() {
    return window.innerWidth < 640;
}
export function setWidth992(){
    return window.innerWidth <992; 
  }

export function setCols(a,b){
    if(window.innerWidth<992){
      return (a);
    }else{
      return (b);
    }
  }

  export function getMaxHeight(cards) {
    let maxHeight = 0;
    cards.forEach(card => {
      const cardHeight = card.clientHeight;
      if (cardHeight > maxHeight) {
        maxHeight = cardHeight;
      }
    });
    return maxHeight;
  }