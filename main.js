/** @type HTMLCanvasElement */
const canvas = document.getElementById('canvas1');
/** @type CanvasRenderingContext2D */
const ctx = canvas.getContext('2d');

// Configuración del lienzo
canvas.width = 720;
canvas.height = 540;

// Variable para almacenar la imagen
const imagePhoto = new Image();
imagePhoto.src = 'assets/Ro.jpeg';

// Variable para controlar si la imagen se ha cargado completamente
let imgLoaded = false;


let mouseX, mouseY;

//////////    Funciones p5js    /////////////

//Metodo dist()
const dist = function(x1,y1,x2,y2) {
  return Math.sqrt(Math.pow((x2-x1),2) + Math.pow((y2-y1),2))
}

// Metodo map()
function mapValue(value,start1,stop1,start2,stop2) {
  return start2 + (stop2 - start2) * ((value - start1) / (stop1 - start1));
}


// Función para cargar la imagen y comenzar la animación
imagePhoto.onload = function() {
  imgLoaded = true;
  animate();
};



// Actualizar las coordenadas del mouse en cada iteración
canvas.addEventListener('mousemove', function(event){
  mouseX = event.clientX;
  mouseY = event.clientY;
});

canvas.addEventListener('touchmove', function(event){
  mouseX = event.touches[0].clientX;
  mouseY = event.touches[0].clientY;
});

// Función para animar y manipular los píxeles de la imagen
function animate() {
  if (imgLoaded) {
    // Dibuja la imagen en el lienzo
    ctx.drawImage(imagePhoto, 0, 0, canvas.width, canvas.height);
    
    // Obtener los datos de píxeles de la imagen
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;

    function brightness(r, g, b) {
      // Fórmula para calcular la luminosidad (brillo) de un color RGB
      // L = 0.2126 * R + 0.7152 * G + 0.0722 * B
      return 0.2126 * r + 0.7152 * g + 0.0722 * b;
    }
    
    // Manipular los píxeles de la imagen
    for (let x = 0; x < canvas.width; x++) {
      for (let y = 0; y < canvas.height; y++) {
        const loc = (x + y * canvas.width) * 4;
        // Obtener los componentes R, G y B del píxel
        const r = pixels[loc];
        const g = pixels[loc + 1];
        const b = pixels[loc + 2];
        // Calcular la luminosidad del píxel
        const pixelBrightness = brightness(r, g, b);
        // Comparar con la posición X del ratón
        /* if (pixelBrightness > mouseX) {
          pixels[loc] = 255;
          pixels[loc + 1] = 0;
          pixels[loc + 2] = 0;
        } else {
          pixels[loc] = 0;
          pixels[loc + 1] = 0;
          pixels[loc + 2] = 0;
        } */


        //Modo pantalla TV
        /* if (x <= 90) {
          pixels[loc] = pixels[loc];
          pixels[loc + 1] = pixels[loc + 1];
          pixels[loc + 2] = pixels[loc + 2] + 120;
        } else if (x >= 90 && x <= 180) {
          pixels[loc] = 127;
          pixels[loc + 1] = pixels[loc + 1] + 10;
          pixels[loc + 2] = 20;
        } else if (x >= 180 && x <= 270) {
          pixels[loc] = 227;
          pixels[loc + 1] = pixels[loc + 1] + 50;
          pixels[loc + 2] = 150;
        } else if (x >= 270 && x <= 360) {
          pixels[loc] = 50;
          pixels[loc + 1] = pixels[loc + 1];
          pixels[loc + 2] = pixels[loc + 2] + 20;
        } else if (x >= 360 && x <= 450) {
          pixels[loc] = pixels[loc];
          pixels[loc + 1] = 17;
          pixels[loc + 2] = pixels[loc + 2];
        } else if (x >= 450 && x <= 540) {
          pixels[loc] = 127;
          pixels[loc + 1] = pixels[loc + 1];
          pixels[loc + 2] = pixels[loc + 2];
        } else if (x >= 540 && x <= 630) {
          pixels[loc] = 47;
          pixels[loc + 1] = pixels[loc + 1];
          pixels[loc + 2] = pixels[loc + 2] - 70;
        } else if (x >= 630 && x <= 720) {
          pixels[loc] = pixels[loc];
          pixels[loc + 1] = pixels[loc + 1];
          pixels[loc + 2] = 150;
        } */

        

        
      }
    }
    
    

    // Manipular los píxeles de la imagen
    const distLimit = 200;
    for (let x = 0; x < canvas.width; x++) {
      for (let y = 0; y < canvas.height; y++) {
        const loc = (x + y * canvas.width) * 4;
        const distance = dist(mouseX, mouseY,x,y);
        
        let factor = mapValue(distance,0,distLimit,2,0);

        pixels[loc] *= factor;
        pixels[loc + 1] *= factor;
        pixels[loc + 2] *= factor;
        
      }
    }
  
    // Actualizar los píxeles en el lienzo
    ctx.putImageData(imageData, 0, 0);
  }
  requestAnimationFrame(animate);
}

// Llama a la función animate para iniciar la animación
animate();












/* imagePhoto.onload = function() {
    // Calcula el nuevo tamaño de la imagen manteniendo la proporción original
    const aspectRatio = imagePhoto.width / imagePhoto.height;
    const maxWidth = canvas.width;
    const maxHeight = canvas.height;
    let newWidth = maxWidth;
    let newHeight = maxWidth / aspectRatio;

    // Si la altura calculada es mayor que la altura máxima permitida, ajusta el tamaño nuevamente
    if (newHeight > maxHeight) {
        newHeight = maxHeight;
        newWidth = maxHeight * aspectRatio;
    }

    // Dibuja la imagen con el nuevo tamaño
    ctx.drawImage(imagePhoto, 0, 0, newWidth, newHeight);

    const imageData = ctx.getImageData(0,0,imagePhoto.width,imagePhoto.height);
    const data = imageData.data;
    console.log(data)

    function animatePixels() {
        for (let i = 0; i < data.length; i += 4) {
            const grayScaleValue = (data[i] + data[i + 1] + data[i + 2]) / 3;
            // const offset = Math.sin(i / 100) * 10; // Ajusta la amplitud y frecuencia de la oscilación
            // const animatedValue = grayScaleValue + offset;

            data[i] = grayScaleValue;
            data[i + 1] = grayScaleValue;
            data[i + 2] = grayScaleValue;
            data[i + 3] = 255;
        }

        ctx.putImageData(imageData, 0, 0);

        // Llama a la función de animación en el próximo fotograma
        requestAnimationFrame(animatePixels);
    }

    // Inicia la animación
    animatePixels();
};
 */

/* imagePhoto.onload = () => {
  // Calcula el nuevo tamaño de la imagen manteniendo la proporción original
  const aspectRatio = imagePhoto.width / imagePhoto.height;
  const maxWidth = canvas.width;
  const maxHeight = canvas.height;
  let newWidth = maxWidth;
  let newHeight = maxWidth / aspectRatio;

  // Si la altura calculada es mayor que la altura máxima permitida, ajusta el tamaño nuevamente
  if (newHeight > maxHeight) {
      newHeight = maxHeight;
      newWidth = maxHeight * aspectRatio;
  }

  // Dibuja la imagen con el nuevo tamaño
  ctx.drawImage(imagePhoto, 0, 0, newWidth, newHeight);

  // Obtener los píxeles de la imagen
  const imageData = ctx.getImageData(0, 0, newWidth, newHeight);
  const pixels = imageData.data;
  console.log(newWidth, imagePhoto.width)

  // Guardar los píxeles en la propiedad pixels de imagePhoto
  imagePhoto.pixels = pixels;
  
  function animate() {
    let w = imagePhoto.width / 44;
    let h = imagePhoto.height / 33;
  
    for (let j = 0; j < newHeight; j++) {
      for (let i = 0; i < newWidth; i++) {
        const pixelIndex = (i + j * newWidth) * 4;
        const r = imagePhoto.pixels[pixelIndex + 0]; 
        const g = imagePhoto.pixels[pixelIndex + 1]; 
        const b = imagePhoto.pixels[pixelIndex + 2]; 
        const avg = Math.round((r+g+b) / 3);
        ctx.fillStyle = `rgb(${r},${g},${b})`;
        //ctx.fillRect(i * w, j * h, w, w);

        let x = i * w + w / 2;
        let y = j * h - h / 2;
        //ctx.fillStyle = "black"; // Color del texto
        ctx.font = "10px Arial";
        ctx.fillText('G', x, y); 
      }
    }
  }
  animate();
} */