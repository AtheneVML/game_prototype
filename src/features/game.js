'use client';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';

function startgame (){
useEffect(() => {
  let canvas = document.getElementById('treatCanvas');
  let ctx = canvas.getContext('2d');
  let loadedTreats = [];
  let imageSize = 64;

  // Treats array
  let treats = [
    { src: 'https://cdn-icons-png.flaticon.com/512/616/616408.png', message: "Chocolate, in the form of a bitter drink, originated in Mesoamerica (present-day Mexico) around 1900 BC!" },
    { src: 'https://cdn-icons-png.flaticon.com/512/616/616408.png', message: "We have cute treats <a href='/about'>here</a>!" },
    { src: 'https://cdn-icons-png.flaticon.com/512/616/616408.png', message: "A crunchy surprise!" },
    { src: 'https://cdn-icons-png.flaticon.com/512/616/616408.png', message: "Did you know in 2028 we won treats of the decade" }
  ];

  // Load treat images and assign positions
    treats.forEach((treat, index) => {
      const img = new window.Image();
      img.src = treat.src;
      img.onload = () => {
        const x = 100 + index * 200;
        const y = 250;
        loadedTreats.push({ ...treat, img, x, y });
        drawCanvas();
      };
    });

    const drawCanvas = (e) => {

      ctx.fillStyle = "purple";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      loadedTreats.forEach(t => {
        ctx.drawImage(t.img, t.x, t.y, imageSize, imageSize);
      });
    }

    canvas.addEventListener('click', (e) => {

      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      loadedTreats.forEach(t => {
        if (
          mouseX >= t.x && mouseX <= t.x + imageSize &&
          mouseY >= t.y && mouseY <= t.y + imageSize
        ) {
          alert(t.message); // You can replace with custom modal or on-canvas text
          console.log('my name is Athene');
        }
      });
    });

    }, []);
}

export default startgame;