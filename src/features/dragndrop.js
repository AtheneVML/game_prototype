'use client';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';

function dragndrop (){
  const handleDragStart = (e) => {
   e.dataTransfer.setData("image", e.target.src);
  };
  let dragTarget = null;
  let draggingItem = null;
  let offsetX = 0;
  let offsetY = 0;
  const images = [];
  let furnitureItems = [];

 // Draw image on canvas

  const HandleDrop = (e) => {
    e.preventDefault();
        const src = e.dataTransfer.getData('image');
        const canvas = document.getElementById('dropcanvas');
        const rect = canvas.getBoundingClientRect();
        const dropX = e.clientX - rect.left;
        const dropY = e.clientY - rect.top;

        const img = new window.Image();
        img.src = src;
        img.onload = () => {
          furnitureItems.push({
            img: img,
            x: dropX - img.width / 2,
            y: dropY - img.height / 2,
            width: img.width,
            height: img.height
          });
          draw();
        };
   };

  const draw = () => {
    const canvas = document.getElementById('dropcanvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (const item of furnitureItems) {
          ctx.drawImage(item.img, item.x, item.y);
        }
  };

   const HandleDragover = (e) => {
       e.preventDefault();
   };

 const HandleMouseMove = (e) => {

       if (draggingItem) {
             const { x, y } = getMousePos(e);
             draggingItem.x = x - offsetX;
             draggingItem.y = y - offsetY;
             draw();
           }
   };

   const getMousePos = (e) => {
   const canvas = document.getElementById('dropcanvas');
            const rect = canvas.getBoundingClientRect();
                return {
                  x: e.clientX - rect.left,
                  y: e.clientY - rect.top
                };
         };

   const HandleMouseLeave = (e) => {
         draggingItem = null;
      };

      const HandleMouseUp = (e) => {
            draggingItem = null;
         };

         const HandleMouseDown = (e) => {
               const { x, y } = getMousePos(e);
                   for (let i = furnitureItems.length - 1; i >= 0; i--) {
                     const item = furnitureItems[i];
                     if (
                       x >= item.x && x <= item.x + item.width &&
                       y >= item.y && y <= item.y + item.height
                     ) {
                       draggingItem = item;
                       offsetX = x - item.x;
                       offsetY = y - item.y;

                       // Bring the selected item to the front
                       furnitureItems.splice(i, 1);
                       furnitureItems.push(draggingItem);
                       break;
                     }
                   }
            };

   return (
   <div>
   <canvas
   id="dropcanvas"
   onDrop={HandleDrop}
   onDragOver={HandleDragover}
   onMouseMove={HandleMouseMove}
   onMouseLeave={HandleMouseLeave}
   onMouseDown={HandleMouseDown}
   onMouseUp={HandleMouseUp}
   width={600}
          height={600}
   />
   <Image className="image1"
         src="/img.png"
         width={300}
          height={200}
          draggable="true"
          onDragStart={handleDragStart}
         />

   <Image className="image2"
         src="/img_1.png"
         width={300}
          height={200}
          draggable="true"
          onDragStart={handleDragStart}
         />
         </div>

   )
}

export default dragndrop;